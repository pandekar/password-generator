import generatePassword from "./passwordGenerator.js";
import passwordStrengthCounter from "./passwordStrengthCounter.js";
import { getLastPassword, savePassword } from "./storage.js";

const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');
const passwordEl = document.getElementById('password');
const lengthEl = document.getElementById('length');
const urlEl = document.getElementById('url');
const strengthEl = document.getElementById('password-strength');

generateBtn.addEventListener('click', () => {
  const length = parseInt(lengthEl.value);
  const url = urlEl.value;
  const password = generatePassword(length);
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
