// Crear la instancia de Protectora (Singleton)
const protectora = new Protectora();
const protectora2 = new Protectora();
const protectora3 = new Protectora();

console.log(protectora === protectora2); // true
console.log(protectora === protectora3); // true
console.log(protectora3 === protectora2); // true

try {
   
   const animal = new Animal();
} catch (error) {
   console.log(error);
}
try {
   
   const canino = new Canino();
} catch (error) {
   console.log(error);
}
try {
   
   const felino = new Felino();
} catch (error) {
   console.log(error);
}

// Crear algunos animales
const perro = new Perro("Rex", "foto1.jpg", "pienso", "jardín", "mediano");
const gato = new Gato("Misu", "foto2.jpg", "pescado", "casa", "pequeño");
const lobo = new Lobo("Luna", "foto3.jpg", "carne", "bosque", "grande");
const tigre = new Tigre("Sherkhan", "foto4.jpg", "carne", "selva", "grande");
const leon = new Leon("Simba", "foto5.jpg", "carne", "sabana", "grande");

// Añadir animales a la protectora
try {
   protectora.addAnimal(perro, gato, lobo, tigre, leon);
} catch (error) {
   console.error(error.message);
}

// Mostrar todos los animales
console.log("Todos los animales en la protectora:");
for (let animal of protectora.animales) {
   console.log(animal.toString());
}
// Mostrar accion de comer de cada animal
console.log("Todos los animales en la protectora comen:");
for (let animal of protectora.animales) {
   animal.comer();
}
// Mostrar todos los perros
console.log("Todos los perros en la protectora:");
for (let perro of protectora.getAnimals(Perro)) {
   console.log(perro.toString());
}

// Encontrar animales grandes
console.log("Animales grandes:");
for (let animal of protectora.find((animal) => animal.tamano === "grande")) {
   console.log(animal.toString());
}

// Encontrar animales que viven en el jardín
console.log("Animales que comen carne:");
for (let animal of protectora.find((animal) => animal.comida === "carne")) {
   console.log(animal.toString());
}

// Eliminar un animal
try {
   protectora.removeAnimal(perro);
} catch (error) {
   console.error(error.message);
}

// Mostrar todos los animales después de eliminar
console.log("Todos los animales en la protectora después de eliminar a Rex:");
for (let animal of protectora.animales) {
   console.log(animal.toString());
}

// Agregar un gato y perro grandes
const perroGrande = new Perro("mimi", "foto6.jpg", "pienso", "jardín", "grande");
const gatoGrande = new Gato("yupi", "foto7.jpg", "atun", "casa", "grande");
try {
   protectora.addAnimal(perroGrande, gatoGrande);
} catch (error) {
   console.error(error.message);
} 

// Encontrar animales grandes que sean gatos o perros
console.log("Animales grandes que sean gatos o perros:");
for (let animal of protectora.find((animal) => {
   return animal.tamano === "grande" && (animal instanceof Gato || animal instanceof Perro);
})) {
   console.log(animal.toString());
}
