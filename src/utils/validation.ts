export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const validateNote = (title: string, content: string): boolean => {
  return title.trim().length > 0 && content.trim().length > 0;
};

const validation = {
  validateEmail,
  validatePassword,
  validateName,
  validateNote,
};

export default validation;