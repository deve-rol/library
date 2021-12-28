import axios from "axios";

const api = {
  init(app) {
    const Vue = app.config.globalProperties;

    Vue.Axios = axios.create({
      withCredentials: true,
      // timeout: 60000
    });

    Vue.Api = {
      token: null,
      apiUrl: "",
    };

    /**
     * Check Auth Token
     */

    Vue.Axios.interceptors.response.use(
      function (response) {
        if (response.headers != undefined) {
          Vue.Api.token = response.headers["Cookie"];
        }

        return response;
      },

      function (error) {
        return Promise.reject(error);
      }
    );

    /**
     * Set Auth Token if Exists
     */

    Vue.Axios.interceptors.request.use(
      function (config) {
        const cookie = document.cookie;

        if (!cookie.length) {
          return config;
        }
        let token = cookie
          .split(";")
          .find((x) =>
            x.includes("CommonApplicationAuthTokenCookie_.masterweblight-auth=")
          );
        if (token) {
          token = token.split("=")[1];
        }
        if (token != undefined && token != null && token != "") {
          config.headers["Authorization"] = "Bearer " + token;
        } else {
          // config.headers["Authorization"] = null;
        }

        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    // Vue.Axios.interceptors.request.use(function (config) {
    //
    //     if (Auth.token != undefined && Auth.token != null && Auth.token != "") {
    //         config.headers['Cookie'] = 'XSRF-TOKEN ' + Auth.token;
    //     }
    //
    //     return config;
    //
    // }, function (error) {
    //     return Promise.reject(error);
    // });

    /**
     * Parse HTTP Responses
     * @param response
     * @param resolve
     * @param reject
     * @private
     */

    Vue.Api.__ParseResponse = function (response, resolve, reject) {
      if (
        response != undefined &&
        response != null &&
        (response.status == 200 ||
          response.status == 201 ||
          response.status == 204)
      ) {
        var adapter = {
          status: response.status,
          status_message: response.statusText,
          data: response.data,
        };

        resolve(adapter);
      } else {
        reject(response);
      }
    };

    /**
     * GET HTTP Request
     * @param endpoint
     * @param o
     * @param headers
     * @constructor
     */
    Vue.Api.Get = function (endpoint, o, headers) {
      endpoint = encodeURI(endpoint);
      let chunkOne = endpoint.split("?")[0];
      let chunkTwo = endpoint.split("?")[1];
      if (chunkTwo) {
        chunkTwo = chunkTwo.replace(/:/g, "%3A");
        chunkTwo = chunkTwo.replace(/,/g, "%2C");
        endpoint = chunkOne + "?" + chunkTwo;
      }
      return new Promise((resolve, reject) => {
        var data = {};
        if (o != undefined) data.params = o;
        if (headers != undefined) data.headers = headers;

        Vue.Axios.get(endpoint, data)
          .then(
            function (response) {
              Vue.Api.__ParseResponse(response, resolve, reject);
            },
            (error) => {
              console.log("ERROR GET");
              Vue.Api.__ParseResponse(error.response, resolve, reject);
            }
          )
          .catch(function (error) {
            console.log("CATCH GET");
            Vue.Api.__ParseResponse(error.response, resolve, reject);
          });
      });
    };

    /**
     * POST HTTP Request
     * @param endpoint
     * @param body
     * @param opt
     * @constructor
     */
    Vue.Api.Post = function (endpoint, body, opt) {
      return new Promise((resolve, reject) => {
        Vue.Axios.post(endpoint, body, opt)
          .then(
            (response) => {
              Vue.Api.__ParseResponse(response, resolve, reject);
            },
            (error) => {
              Vue.Api.__ParseResponse(error.response, resolve, reject);
            }
          )
          .catch((error) => {
            Vue.Api.__ParseResponse(error.response, resolve, reject);
          });
      });
    };

    /**
     * PUT HTTP Request
     * @param endpoint
     * @param body
     * @param opt
     * @constructor
     */
    Vue.Api.Put = function (endpoint, body, opt) {
      return new Promise((resolve, reject) => {
        Vue.Axios.put(endpoint, body, opt)
          .then(
            (response) => {
              Vue.Api.__ParseResponse(response, resolve, reject);
            },
            (error) => {
              Vue.Api.__ParseResponse(error.response, resolve, reject);
            }
          )
          .catch((error) => {
            Vue.Api.__ParseResponse(error.response, resolve, reject);
          });
      });
    };

    /**
     * DELETE HTTP Request
     * @param endpoint
     * @param body
     * @param opt
     * @constructor
     */
    Vue.Api.Delete = function (endpoint, body, opt) {
      return new Promise((resolve, reject) => {
        Vue.Axios.delete(endpoint, body, opt)
          .then(
            (response) => {
              Vue.Api.__ParseResponse(response, resolve, reject);
            },
            (error) => {
              Vue.Api.__ParseResponse(error.response, resolve, reject);
            }
          )
          .catch((error) => {
            Vue.Api.__ParseResponse(error.response, resolve, reject);
          });
      });
    };
  },
};

export default api;
