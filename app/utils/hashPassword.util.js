import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hashSync(password, 10);
  return hashedPassword;
};
export const comparePassword = async (enteredPasswored, savedPassword) => {
  const isPasswordCorrect = await bcrypt.compareSync(
    enteredPasswored,
    savedPassword,
  );
  return isPasswordCorrect;
};
