const STORAGE_KEY = 'LAST-GENERATED-PASSWORD';

const getStorageItem = () => JSON.parse(localStorage.getItem(STORAGE_KEY));

export function savePassword(password, url) {
  const data = getStorageItem();

  if (data !== null) {
    if (data.length > 4) {
      // removes the first element
      data.shift();
      // adds the specified elements to the end of an array
      data.push({ password, url });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...data, { password, url }]));
    }
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([{ password, url }]));
  }
};

export function getLastPassword() {
  const storedPassword = localStorage.getItem(STORAGE_KEY);
  let lastPassword = null;

  const parsedData = JSON.parse(storedPassword);
  if (storedPassword) {
    lastPassword = parsedData[parsedData.length - 1];

    return lastPassword;
  }

  return null;
};
