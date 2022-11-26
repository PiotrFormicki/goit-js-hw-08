import { throttle } from 'lodash';
const feedbackForm = document.querySelector('.feedback-form');
const submitButton = document.querySelector('button[type="submit"]');
const messageInput = document.querySelector('textarea[name="message"]');
const emailInput = document.querySelector('input[type="email"]');
let userData = {
  email: '',
  message: '',
};
const saveUserData = () => {
  userData = {
    email: feedbackForm.elements.email.value,
    message: feedbackForm.elements.message.value,
  };
  console.log(userData);
  localStorage.setItem('feedback-form-state', JSON.stringify(userData));
};

//zapisz w localstorage userData, konwersja na json
feedbackForm.addEventListener('input', throttle(saveUserData, 500)); //pobiera dane raz na pol sekundy, sprawdzilem
const disableButtonIfEmpty = () => {
  if (messageInput.value !== '' && emailInput.value !== '') {
    submitButton.disabled = false;
  }
};
messageInput.addEventListener('input', disableButtonIfEmpty);
emailInput.addEventListener('input', disableButtonIfEmpty);
const getUserData = localStorage.getItem('feedback-form-state');

const submitFunction = event => {
  event.preventDefault();

  if (
    feedbackForm.elements.email.value === '' ||
    feedbackForm.elements.message.value === ''
  ) {
    alert`Please fill all the gaps!`;
    return;
  } else {
    try {
      console.log(`User data: `, userData);
      feedbackForm.reset();
      localStorage.clear();
    } catch (error) {
      console.log(error.name);
      console.log(error.message);
    }
  }
};

feedbackForm.addEventListener('submit', submitFunction);
// load event
const loadPage = () => {
  try {
    const existingUserData = JSON.parse(getUserData);
    if (existingUserData === null) {
      return;
    } //jeśli nie ma zapisanych danych to nie rob nic
    //jeśli są dane to przywróć te wartości
    else {
      feedbackForm.elements.email.value = existingUserData.email;
      feedbackForm.elements.message.value = existingUserData.message;
    }
  } catch (error) {
    console.log(error.name);
    console.log(error.message); //jesli error to zwroc jego nazwe i message
  }
};
window.addEventListener('load', loadPage); //event listener na window a nie form, bo to ono jest przeładowywane

const magicHappensHereISwear = () => {
  if (
    feedbackForm.elements.message.value === '' ||
    feedbackForm.elements.email.value === ''
  ) {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
};
submitButton.addEventListener('mouseover', magicHappensHereISwear);
