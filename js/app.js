import generatePassword from "./passwordGenerator.js";
import passwordStrengthCounter from "./passwordStrengthCounter.js";
import { getLastPassword, savePassword } from "./storage.js";

const VALIDATE_PASSWORD_FEATURES = 'VALIDATE_PASSWORD_FEATURES';

const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');
const passwordEl = document.getElementById('password');
const lengthEl = document.getElementById('length');
const urlEl = document.getElementById('url');
const strengthEl = document.getElementById('password-strength');
const featureValidationEl = document.getElementById('feature-validation');

const passwordFeatures = {
  lowercase: 0,
  uppercase: 0,
  numbers: 0,
  symbols: 0
};

const passwordFeaturesId = ['lowercase', 'uppercase', 'numbers', 'symbols'];

passwordFeaturesId.forEach((elementId) => {
  document.getElementById(elementId).addEventListener('click', () => {
    if (passwordFeatures[elementId] === 0) {
      passwordFeatures[elementId] = 1;
    } else {
      passwordFeatures[elementId] = 0;
    }

    document.dispatchEvent(new Event(VALIDATE_PASSWORD_FEATURES));
  });
});

generateBtn.addEventListener('click', () => {
  const length = parseInt(lengthEl.value);
  const url = urlEl.value;
  const password = generatePassword(length, passwordFeatures);
  const passwordStrength = passwordStrengthCounter(password);
  passwordEl.value = password;
  strengthEl.innerText = passwordStrength;

  savePassword(password, url);
});

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(passwordEl.value)
    .then(() => {
      console.log('Password copied to clipboard');
    }).catch((err) => {
      console.error('Failed to copy password', err);
    });
});

window.addEventListener('load', () => {
  const lastPassword = getLastPassword();

  if (lastPassword) {
    passwordEl.value = lastPassword.password;
    urlEl.value = lastPassword.url || '';
    strengthEl.innerText = passwordStrengthCounter(lastPassword.password);
  }
});

document.addEventListener(VALIDATE_PASSWORD_FEATURES, () => {
  let validation = [];

  for (const key in passwordFeatures) {
    if (passwordFeatures[key]) {
      validation.push(passwordFeatures[key]);
    } else {
      validation.push(passwordFeatures[key]);
    }
  }

  if (validation.includes(1)) {
    featureValidationEl.innerText = '';
    generateBtn.removeAttribute('disabled');
  } else {
    featureValidationEl.innerText = 'please choose at least 1 password feature';
    generateBtn.setAttribute('disabled', true);
  }
});
