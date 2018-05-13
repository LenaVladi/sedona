"use strict";

const failurePopUp = document.querySelector(".failure-pop-up"),
      successPopUp = document.querySelector(".success-pop-up");

const formFeedback = document.querySelector(".get-feedback"),
      btn = document.querySelector(".get-feedback__request"),
      inputs = formFeedback.querySelectorAll("input[required]");

failurePopUp.classList.remove("failure-pop-up--visible");
successPopUp.classList.remove("success-pop-up--visible");

console.log(inputs);

// заполнены важные поля
let ok = [];

//подписка за событие о заполнении инпутов
Array.from(inputs).forEach(el => {
  el.addEventListener("change", () => {
    if (ok.length == 3) {
      btn.classList.remove("button-disable");
    } else {
      ok.push(el);
    }
  });
})

//обработка клика отправки формы -> показ модальных окон
btn.addEventListener("click", (event) => {
  //event.preventDefault();
  if (btn.classList.contains("button-disable")) {
    return;
  } else {
    const err = Array.from(inputs).find(el => el.value == "");

    if (err) {
      failurePopUp.classList.add("failure-pop-up--visible");
    } else {
      successPopUp.classList.add("success-pop-up--visible");
      //функция отправки формы
    }
  }
})

//закрывает модальное окно
failurePopUp.querySelector(".failure-pop-up__button").addEventListener("click", () => failurePopUp.classList.remove("failure-pop-up--visible"));

//закрывает модальное окно
successPopUp.querySelector(".success-pop-up__button").addEventListener("click", () => successPopUp.classList.remove("success-pop-up--visible"));
