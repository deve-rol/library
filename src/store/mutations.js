import * as mutation_types from "./mutation_types";

export default {
  [mutation_types.M_TEST](state, payload) {
    state.test = payload;
  },
};
