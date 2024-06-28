//Función que se encarga de mostrar feedback al usuario, a la hora de validar el formulario.
function showFeedBack(input, valid, message) {
   const validClass = valid ? "is-valid" : "is-invalid";
   const messageDiv = valid ? input.parentElement.querySelector("div.valid-feedback") : input.parentElement.querySelector("div.invalid-feedback");
   for (const div of input.parentElement.getElementsByTagName("div")) {
      div.classList.remove("d-block");
   }
   messageDiv.classList.remove("d-none");
   messageDiv.classList.add("d-block");
   input.classList.remove("is-valid");
   input.classList.remove("is-invalid");
   input.classList.add(validClass);
   if (message) {
      messageDiv.innerHTML = message;
   }
}
//Función que se encarga de validar el formulario.
function defaultCheckElement(event) {
   this.value = this.value.trim();
   if (!this.checkValidity()) {
      showFeedBack(this, false);
   } else {
      showFeedBack(this, true);
   }
}

//Función que se encarga de validar el formulario para la creación de un plato.
function newDishValidation(handler) {
   const form = document.forms.fNewDish;
   form.setAttribute("novalidate", "");
   form.addEventListener("submit", function (event) {
      let isValid = true;
      let firstInvalidElement = null;

      this.npDescription.value = this.npDescription.value.trim();
      showFeedBack(this.npDescription, true);

      this.npIngredients.value = this.npIngredients.value.trim();
      showFeedBack(this.npIngredients, true);

      if (!this.npName.checkValidity()) {
         isValid = false;
         showFeedBack(this.npName, false);
         firstInvalidElement = this.npName;
      } else {
         showFeedBack(this.npName, true);
      }

      if (!this.npUrl.checkValidity()) {
         isValid = false;
         showFeedBack(this.npUrl, false);
         firstInvalidElement = this.npUrl;
      } else {
         showFeedBack(this.npUrl, true);
      }

      if (!this.npCategories.checkValidity()) {
         isValid = false;
         showFeedBack(this.npCategories, false);
         firstInvalidElement = this.npCategories;
      } else {
         showFeedBack(this.npCategories, true);
      }

      if (!this.npAllergen.checkValidity()) {
         isValid = false;
         showFeedBack(this.npAllergen, false);
         firstInvalidElement = this.npAllergen;
      } else {
         showFeedBack(this.npAllergen, true);
      }

      if (!isValid) {
         firstInvalidElement.focus();
      } else {
         const categories = [...this.npCategories.selectedOptions].map((option) => option.value);
         const allergens = [...this.npAllergen.selectedOptions].map((option) => option.value);
         handler(this.npName.value, this.npDescription.value, this.npUrl.value, this.npIngredients.value, categories, allergens);
      }
      event.preventDefault();
      event.stopPropagation();

      form.addEventListener("reset", function (event) {
         for (const div of this.querySelectorAll("div.valid-feedback, div.invalid-feedback")) {
            div.classList.remove("d-block");
            div.classList.add("d-none");
         }
         for (const input of this.querySelectorAll("input")) {
            input.classList.remove("is-valid");
            input.classList.remove("is-invalid");
         }
         this.npName.focus();
      });

      form.npName.addEventListener("change", defaultCheckElement);
      form.npIngredients.addEventListener("change", defaultCheckElement);
      form.npDescription.addEventListener("change", defaultCheckElement);
      form.npUrl.addEventListener("change", defaultCheckElement);
      form.npCategories.addEventListener("change", defaultCheckElement);
      form.npAllergen.addEventListener("change", defaultCheckElement);
   });
}

//Función que se encarga de validar el formulario para la creación de una categoría.
function newCategoryValidation(handler) {
   const form = document.forms.fNewCategory;
   form.setAttribute("novalidate", true);
   form.addEventListener("submit", function (event) {
      let isValid = true;
      let firstInvalidElement = null;
      this.ncDescription.value = this.ncDescription.value.trim();
      showFeedBack(this.ncDescription, true);
      if (!this.ncUrl.checkValidity()) {
         isValid = false;
         showFeedBack(this.ncUrl, false);
         firstInvalidElement = this.ncUrl;
      } else {
         showFeedBack(this.ncUrl, true);
      }
      if (!this.ncName.checkValidity()) {
         isValid = false;
         showFeedBack(this.ncName, false);
         firstInvalidElement = this.ncName;
      } else {
         showFeedBack(this.ncName, true);
      }
      if (!isValid) {
         firstInvalidElement.focus();
      } else {
         handler(this.ncName.value, this.ncUrl.value, this.ncDescription.value);
      }
      event.preventDefault();
      event.stopPropagation();
   });
   form.addEventListener("reset", function (event) {
      for (const div of this.querySelectorAll("div.valid-feedback, div.invalid-feedback")) {
         div.classList.remove("d-block");
         div.classList.add("d-none");
      }
      for (const input of this.querySelectorAll("input")) {
         input.classList.remove("is-valid");
         input.classList.remove("is-invalid");
      }
      this.ncName.focus();
   });
   form.ncName.addEventListener("change", defaultCheckElement);
   form.ncUrl.addEventListener("change", defaultCheckElement);
}

//Función que se encarga de validar el formulario para la creación de un restaurante.
function newRestaurantValidation(handler) {
   const form = document.forms.fNewRestaurant;
   form.setAttribute("novalidate", "");
   form.addEventListener("submit", function (event) {
      let isValid = true;
      let firstInvalidElement = null;

      this.npDescription.value = this.npDescription.value.trim();
      showFeedBack(this.nrDescription, true);

      if (!this.nrName.checkValidity()) {
         isValid = false;
         showFeedBack(this.nrName, false);
         firstInvalidElement = this.nrName;
      } else {
         showFeedBack(this.nrName, true);
      }

      if (!this.nrUrl.checkValidity()) {
         isValid = false;
         showFeedBack(this.nrUrl, false);
         firstInvalidElement = this.nrUrl;
      } else {
         showFeedBack(this.nrUrl, true);
      }

      if (!this.nrLatitude.checkValidity()) {
         isValid = false;
         showFeedBack(this.nrLatitude, false);
         firstInvalidElement = this.nrLatitude;
      } else {
         showFeedBack(this.nrLatitude, true);
      }

      if (!this.nrLongitude.checkValidity()) {
         isValid = false;
         showFeedBack(this.nrLongitude, false);
         firstInvalidElement = this.nrLongitude;
      } else {
         showFeedBack(this.nrLongitude, true);
      }

      if (!isValid) {
         firstInvalidElement.focus();
      } else {
         handler(this.nrName.value, this.nrDescription.value, this.nrUrl.value, this.nrLatitude.value, this.nrLongitude.value);
      }
      event.preventDefault();
      event.stopPropagation();

      form.addEventListener("reset", function (event) {
         for (const div of this.querySelectorAll("div.valid-feedback, div.invalid-feedback")) {
            div.classList.remove("d-block");
            div.classList.add("d-none");
         }
         for (const input of this.querySelectorAll("input")) {
            input.classList.remove("is-valid");
            input.classList.remove("is-invalid");
         }
         this.nrName.focus();
      });

      form.nrName.addEventListener("change", defaultCheckElement);
      form.nrDescription.addEventListener("change", defaultCheckElement);
      form.nrUrl.addEventListener("change", defaultCheckElement);
      form.nrLatitude.addEventListener("change", defaultCheckElement);
      form.nrLongitude.addEventListener("change", defaultCheckElement);
   });
}

export { newDishValidation, newCategoryValidation, newRestaurantValidation };
