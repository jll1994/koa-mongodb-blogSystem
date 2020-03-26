const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const conn = mongoose.connection;

conn.once("open", () => {
  console.log("数据库连接成功");
});
conn.once("close", err => {
  console.log(err);
});

module.exports = mongoose;
