//Rozklad jazdy:
//import throttle
//zadeklarowac wszystko co trzeba
//stworzyc obiekt zawierajacy wszystkie dane tj. email, message
//funkcja ktora zapisuje wszystko w formie, wykonsolować ją, json stringify i setItem na local storage
//funkcja do submit event
//jakiś if gdyby cymbał zostawił puste pola, a jesli git to wyczyscic elementy forma
//catch error i konsol log dla .name i .message
//przeładuj strone i pobierz wartosci z local storage
//te wartosci .parse
//jesli zwracają null to return
//a jesli git to email.value=parsowaneInformacje.email/message
//dać throttle do eventlistenera od zapisywania inputa
import { throttle } from 'lodash';
const feedbackForm = document.querySelector('.feedback-form');
const submitButton = document.getElementById('amazing');
const messageInput = document.getElementById('message-input');
const emailInput = document.getElementById('email-input');
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
}; //zapisz w localstorage userData, konwersja na json
feedbackForm.addEventListener('input', throttle(saveUserData, 500)); //pobiera dane raz na pol sekundy, sprawdzilem
//teraz submit

const getUserData = localStorage.getItem('feedback-form-state');

const submitFunction = event => {
  event.preventDefault();

  if (
    feedbackForm.elements.email.value === '' ||
    feedbackForm.elements.email.value === ''
  ) {
    alert`Please fill all the gaps!`;
  } else {
    try {
      const currentData = JSON.parse(getUserData);
      console.log(`User data: `, currentData);
      localStorage.clear();
      feedbackForm.reset();
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
    submitButton.style.display = 'none';
  } else {
    submitButton.style.display = 'block';
  }
}; //dla submit

//dla message oraz email
const resetMagicPls = () => {
  submitButton.style.display = 'block';
};
messageInput.addEventListener('mouseover', resetMagicPls);
emailInput.addEventListener('mouseover', resetMagicPls);
submitButton.addEventListener('mouseover', magicHappensHereISwear);
//teraz na pewno nie da się submitować przy obu pustych polach :D
