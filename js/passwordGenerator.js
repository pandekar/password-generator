export default function generatePassword(length, passwordFeatures) {
  let charset = '';

  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+';

  const features = {
    lowercase: lowerCase,
    uppercase: upperCase,
    numbers,
    symbols
  };

  for (const key in passwordFeatures) {
    if (passwordFeatures[key]) {
      charset += features[key]
    }
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
};
