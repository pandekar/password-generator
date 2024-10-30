export default function passwordStrengthCounter(password) {
  let counter = 0;

  if (/[a-z]/.test(password)) counter++;
  if (/[A-Z]/.test(password)) counter++;
  if (/[0-9]/.test(password)) counter++;
  if (/[!@#$%^&*()_+]/.test(password)) counter++;
  if (password.length >= 12) counter++;

  if (counter === 5) return 'STRONG';
  if (counter >= 3) return 'MEDIUM';

  return 'WEAK';
};
