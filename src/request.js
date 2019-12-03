
var _global = (window || global);

//
// exports.axios = axios; // JSSDK v2.0

//
// exports.instance = axios.create(); // JSSDK v2.0

//
// Interceptors in exports.instance, remove exports.interceptors on JSSDK v2.0
exports.interceptors = {
    request: {
        use: function(fn) {
            _global.yhsd._$interceptors.request.use(fn);
        }
    },
    response: {
        use: function(fn) {
            _global.yhsd._$interceptors.response.use(fn);
        }
    }
};
