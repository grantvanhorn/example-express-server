export const validateUser = (user) => {
  const {
    name,
    email,
    expertise,
  } = user;

  // could go as far as checking each field, creating an array of error messages
  // and returning that array to the user so they know exactly why they failed.
  if (!name || !email || !expertise) {
    return false;
  }

  return true;
};
