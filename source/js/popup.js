"use strict";

var failurePopUp = document.querySelector(".failure-pop-up"),
      successPopUp = document.querySelector(".success-pop-up");

var formFeedback = document.querySelector(".get-feedback"),
      btn = document.querySelector(".get-feedback__request"),
      inputs = formFeedback.querySelectorAll("input[required]");

failurePopUp.classList.remove("failure-pop-up--visible");
successPopUp.classList.remove("success-pop-up--visible");

//обработка клика отправки формы -> показ модальных окон
formFeedback.addEventListener("submit", function(event) {
  event.preventDefault();
  var err = Array.from(inputs).find(function (el) {
    el.value == "";
  });

  if (err) {
    failurePopUp.classList.add("failure-pop-up--visible");
  } else {
    successPopUp.classList.add("success-pop-up--visible");
    //функция отправки формы
  }
})

//закрывает модальное окно
failurePopUp.querySelector(".failure-pop-up__button").addEventListener("click", function() {
  failurePopUp.classList.remove("failure-pop-up--visible");
});

//закрывает модальное окно
successPopUp.querySelector(".success-pop-up__button").addEventListener("click", function() {
  successPopUp.classList.remove("success-pop-up--visible");
});
