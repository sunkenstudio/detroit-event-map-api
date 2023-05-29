import bcrypt from "bcrypt";

export const Encrypt = {
  genSalt: () => bcrypt.genSalt(10).then((salt) => console.log(salt)),
  cryptPassword: (password, salt) =>
    bcrypt.hash(password, salt).then((hash) => hash),

  comparePassword: (password, hashPassword) =>
    bcrypt.compare(password, hashPassword).then((resp) => resp),
};
