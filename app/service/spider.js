const requestPromise = require("request-promise");
const cheerio = require("cheerio");

module.exports = app => {
  const request = function(obj) {
    return requestPromise(Object.assign({}, {
      baseUrl: app.config.custom.huiboHost,
      methods: "GET"
    }, obj))
      .catch(err =>  {
        if (err) {
          throw Error(`fetch ${err.options.baseUrl + err.options.url} fail: ${err}`);
        }
      })
      .then(body => {
        console.log(`fetch ${obj.url} success`);
        return body;
      });
  };

  function analysisSearchPage(page, path) {
    const $ = cheerio.load(page);
    const jobs = [];
    const jobList = $(".postIntro");
    for (let i = 0; i < jobList.length; i++) {
      const job = $(jobList[i]);
      const requireDomList = $(job.find("div.job-detList")[0]).find("p");
      const requires = [];
      const title = $(job.find(".title").find("a")[0]).attr("title");
      const industry = $(job.find(".title").find("span").find("a")[0]).attr("title");
      const name = $(job.find("p.clearfix").find(".des_title")[0]).text().replace("\n", "");
      const money = $(job.find("p.clearfix").find("span.money")[0])
        .text().replace("\n", "").replace("￥", "");
      const address = $(job.find("p.clearfix").find("span.address")[0]).text().replace("\n", "");
      const exp = $(job.find("p.clearfix").find("span.exp")[0]).text().replace("\n", "");
      const publicTime = $(job.find("p.clearfix").find("span.job_time")[0])
        .text().replace("\n", "");
      const url = $(job.find("a.des_title")[0]).attr("href");
      for (let j = 0; j < requireDomList.length; j++) {
        if ($(requireDomList[j]).text() !== "") { requires.push($(requireDomList[j]).text()); }
      }
      jobs.push({
        title, industry, name, money, address, exp, publicTime, requires, url,
        uri: app.config.custom.huiboHost +
          `?params=p${path.i}&key=${encodeURI(path.word)}&timestamp=${path.timestamp}#list`
      });
    }
    return jobs;
  }

  class Spider extends app.Service {
    async fetchHuiboPage (path) {
      const page = await request({
        url: `?params=p${path.i}&key=${encodeURI(path.word)}&timestamp=${path.timestamp}#list`
      });
      if (page instanceof Error) { return; };
      const $ = cheerio.load(page);
      const timestamp = $($("div.page").find("a")[2]).attr("href").split("=").pop().replace("#list", ""); // eslint-disable-line
      const jobs = analysisSearchPage(page, path);
      return {
        timestamp: timestamp * 1 || path.timestamp,
        jobs
      };
    }
  }
  return Spider;
};
