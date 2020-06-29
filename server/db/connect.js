const mongoose = require("mongoose");
const { database } = require("../config");

const url = `mongodb://${database.user}:${database.password}@${database.host}:${database.port}/${database.dbName}`;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const conn = mongoose.connection;

conn.once("open", () => {
  console.log("数据库连接成功");
});
conn.once("close", (err) => {
  console.log(err);
});

module.exports = mongoose;
