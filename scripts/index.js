const emailElement = document.querySelector(".email");
const btn = document.querySelector(".notify_me_btn");

/* ================= Utility functions here ================= */

//check input if empty
const isRequired = (value) => {
   return value === "" ? false : true;
};

//check email if valid
const isEmailCorrect = (email) => {
   const format = /[^@\t\r\n]+@[^@\t\r\n]+\.(\w{2,3})+$/;

   return format.test(email);
};

// add or remove classes
const addRemoveClass = (isError, elem) => {
   const warning = document.querySelector(".warning");

   let noError = false;

   if (isError) {
      warning.classList.add("message");
      elem.classList.add("red_border");
   } else {
      warning.classList.remove("message");
      elem.classList.remove("red_border");
      noError = true;
   }

   return noError;
};

/* ================= validating functions start here =================*/

const checkEmail = (elem) => {
   const value = elem.value.trim();
   const getField = elem.parentElement;
   const warning = getField.querySelector(".warning p");

   const isEmpty = !isRequired(value)
      ? (warning.innerHTML =
           "Whoops! It looks like you forgot to add your email")
      : !isEmailCorrect(value)
      ? (warning.innerHTML = "Please provide a valid email address")
      : false;

   return addRemoveClass(isEmpty, elem) && addRemoveClass(isEmpty, elem);
};

/* ================= claim button here =================*/
btn.addEventListener("click", (event) => {
   event.preventDefault();

   let isEmailValid = checkEmail(emailElement);

   if (isEmailValid) {
      alert("Subscribe and get notified?");
      location.reload();
   }
});

/* ================= real time validation ================= */
let timeOutId;
emailElement.addEventListener("input", (event) => {
   //reset timer
   if (timeOutId) {
      clearTimeout(timeOutId);
   }

   // setup timee to delay the validation by 750ms
   timeOutId = setTimeout(() => {
      if (event.target.id === "email") {
         checkEmail(emailElement);
      }
   }, 750);
});
