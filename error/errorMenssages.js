// errorMessages.js
module.exports = {
  requiredField: (field) => ({
    status: 400,
    error: `${field} is required!`,
    details: `${field} is a required field.`,
  }),
  passwordMismatch: {
    status: 'error',
    message: 'Passwords do not match',
    details:
      'The provided passwords do not match. Please make sure the passwords match exactly.',
  },
  invalidEmailFormat: {
    status: 400,
    error: 'Invalid email format',
    details: 'The provided email address is not in a valid format.',
  },
  emailInUse: {
    status: 400,
    error: 'Email is already in use',
    details:
      'The provided email address is already registered. Please use a different email address.',
  },
  usernameInUse: {
    status: 400,
    error: 'Username is already in use',
    details:
      'The provided username is already taken. Please choose a different username.',
  },
};
