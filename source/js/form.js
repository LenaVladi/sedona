"use strict";

var failurePopUp = document.querySelector(".failure-pop-up");
var successPopUp = document.querySelector(".success-pop-up");
var formFeedback = document.querySelector(".get-feedback");
var btn = document.querySelector(".get-feedback__request");
var inputs = formFeedback.querySelectorAll("input[required]");

function setInitialState () {
  formFeedback.reset();
  failurePopUp.classList.remove("failure-pop-up--visible");
  successPopUp.classList.remove("success-pop-up--visible");
}

function sendForm (url, data) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, false);
  xhr.send(new FormData(data));

  if (xhr.status != 200) {
    failurePopUp.classList.add("failure-pop-up--visible");
  } else {
    successPopUp.classList.add("success-pop-up--visible");
    formFeedback.recet();
  }
};

//обработка клика отправки формы -> показ модальных окон
formFeedback.addEventListener("submit", function (event) {
  event.preventDefault();

  var api = formFeedback.getAttribute('action');

  var err = Array.from(inputs).find(function (el) {
    el.value === "";
  });

  if (!err) {
    sendForm(api, formFeedback);
  }
});

//закрывает модальное окно
failurePopUp.querySelector(".failure-pop-up__button").addEventListener("click", function () {
  failurePopUp.classList.remove("failure-pop-up--visible");
});

//закрывает модальное окно
successPopUp.querySelector(".success-pop-up__button").addEventListener("click", function () {
  successPopUp.classList.remove("success-pop-up--visible");
});

setInitialState();
