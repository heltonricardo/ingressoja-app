function onlyNumeros(str) {
  return str.replace(/[^\d]/g, "");
}

function onlyLetrasEEspacos(str) {
  return str.replace(/[^a-zA-Z\s]/g, "");
}

export { onlyNumeros, onlyLetrasEEspacos };
