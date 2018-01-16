module.exports = app => {
    app.beforeStart(async function () {
        await app.model.sync({ force: false });
    });

    app.validator.addRule("stringNum", (rule, value) => {
        try {
            parseInt(value);
        } catch (err) {
            return "must be number";
        }
    });
};
