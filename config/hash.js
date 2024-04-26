const bcrypt = require("bcrypt");
class hash {
  async hashPassword(password) {
    try {
      const has = await bcrypt.hash(password, 10);
      return has;
    } catch (error) {
      throw new Error("Error hash password");
    }
  }
  async comparePassword(password, hashPassword) {
    try {
      const com = await bcrypt.compare(password, hashPassword);
      return com;
    } catch (error) {
      throw new Error("Error compare password");
    }
  }
}
module.exports = new hash();
