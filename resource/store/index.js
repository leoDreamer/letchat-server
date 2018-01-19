import * as user from "./modules/user";
import * as information from "./modules/information";
import * as show from "./modules/show";
import * as visit from "./modules/visit";
import * as actions from "./action";

const stores = {
  actions,
  modules: {
    user, information, visit, show
  }
};

export {
  stores
};
