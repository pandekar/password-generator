export function savePassword(password, url) {
  localStorage.setItem('lastGeneratedPassword', JSON.stringify({ password, url }));
};

export function getLastPassword() {
  const storedPassword = localStorage.getItem('lastGeneratedPassword');

  return storedPassword ? JSON.parse(storedPassword) : null;
};
