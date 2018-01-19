import * as user from "../modules/user";
import * as chat from "../modules/chat";
import * as show from "../modules/show";
import * as actions from "../action";

const stores = {
  actions,
  modules: {
    user, chat, show
  }
};

export {
  stores
};
