import bcrypt from 'bcrypt';

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(11));

export const validateHash = (password, hashDB) => bcrypt.compareSync(password, hashDB);