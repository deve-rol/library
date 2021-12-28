import * as types from "./types";
import * as mutation_types from "./mutation_types";
import { ApiGet } from "./api/methods";
// import Vue from "vue";

export default {
  [types.A_TEST](context, payload) {
    return new Promise((resolve) => {
      ApiGet(`https://jsonplaceholder.typicode.com/todos/${payload}`).then(
        (res) => {
          context.commit(mutation_types.M_TEST, res.data);
          resolve(res.data);
        }
      );
    });
  },
};
