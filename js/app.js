import generatePassword from "./passwordGenerator";
import { getLastPassword, savePassword } from "./storage";

const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('copy');
const passwordEl = document.getElementById('password');
const lengthEl = document.getElementById('length');
const urlEl = document.getElementById('url');

generateBtn.addEventListener('click', () => {
  const length = parseInt(lengthEl.value);
  const url = urlEl.value;
  const password = generatePassword(length);
  passwordEl.value = password;

  savePassword(password, url);
});
