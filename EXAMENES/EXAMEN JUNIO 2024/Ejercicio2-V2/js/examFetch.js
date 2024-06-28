$(function () {
   console.log($);
});

window.addEventListener("load", function () {
   console.log("Inicio");

   const baseUrl = new URL("http://localhost/exam/php/getEmployee.php");

   const filmsEndpoint = "films/";

   const filmsUrl = new URL(filmsEndpoint, baseUrl);
   filmsUrl.searchParams.set("search", "Jedi");
   console.log(baseUrl.toString());

   fetch("./php/getEmployee.php")
      .then((response) => response.json())
      .then((data) => {
         let results = data.results;
         console.log(JSON.stringify(data));
      })
      .catch((error) => console.error(error));
});

console.log(window.location);
let url = new URL("./php/saveEmployee.php", window.location);
console.log(url);
console.log(url.href);
