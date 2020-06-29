const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  devServer: {
    open: true,
    host: "192.168.1.84",
    port: "8190",
    proxy: {
      "/api": {
        target: "http://192.168.1.84:8191",
        changeOrigin: true
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"));
  }
};
