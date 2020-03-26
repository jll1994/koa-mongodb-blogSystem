const crypto = require("crypto");
let key = "aes-key";

export const aesEncrypt = data => {
  const cipher = crypto.createCipher("aes192", key);
  let crypted = cipher.update(data, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
};

export const aesDecrypt = encrypted => {
  const decipher = crypto.createDecipher("aes192", key);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};
