function toUpper(str) {
  const palabras = str
    .split(" ")
    .map(
      (palabra) =>
        palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
    )
    .join(" ");
  console.log(palabras);
}

toUpper("hello friend con cuatro palabras mas");
toUpper("HELLO FRIEND con CUATRO O MAS palabras");
