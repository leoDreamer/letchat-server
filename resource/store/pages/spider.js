import * as user from "../modules/user";
import * as spider from "../modules/spider";
import * as show from "../modules/show";
import * as actions from "../action";

const stores = {
  actions,
  modules: {
    user, spider, show
  }
};

export {
  stores
};
