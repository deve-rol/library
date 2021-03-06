import { createStore } from "vuex";

import state from "./state";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

import Organization from "./modules/organization/store";

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {
    organization: Organization,
  },
});
