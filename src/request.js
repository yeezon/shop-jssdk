
//
// exports.axios = axios; // JSSDK v2.0

//
// exports.instance = axios.create(); // JSSDK v2.0

//
// Interceptors in exports.instance, remove exports.interceptors on JSSDK v2.0
exports.interceptors = {
    request: {
        use: function(fn) {
            window.yhsd._$interceptors.request.use(fn);
        }
    },
    response: {
        use: function(fn) {
            window.yhsd._$interceptors.response.use(fn);
        }
    }
};