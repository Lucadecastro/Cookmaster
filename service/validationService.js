const userModel = require('../model/userModel');

const validateEmail = (email) => {
  /* eslint no-control-regex: "error" */
  const re = RegExp( /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ );
  if (re.test(email)) {
    const splittedEmail = email.split('@')
    const emailFinalParts = splittedEmail[1].split('.')
    return (emailFinalParts.length === 0) ? false : (emailFinalParts.length == 1) ?
      false : (!isNaN(emailFinalParts[0])) ? false : true
  }
  return false;
};

const validateNewUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (!validateEmail(email)) {
    res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  const user = await userModel.getUserByEmail(email);
  if (user.email === email) {
    res.status(409).json({ message: 'Email already registered' });
  }
};

const validateLogin = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) res.status(401).json({ message: 'All fields must be filled' });
  if (!validateEmail(email)) res.status(401).json({ message: 'Incorrect username or password' });
  if (password.length < 8) res.status(401).json({ message: 'Incorrect username or password' });
};

module.exports = { validateNewUser, validateLogin };
