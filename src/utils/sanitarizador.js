function onlyNumeros(str) {
  return str ? str.replace(/[^\d]/g, "") || null : "";
}

function onlyLetrasEEspacos(str) {
  return str.replace(/[^a-zÀ-ÿ\s]/g, "");
}

export { onlyNumeros, onlyLetrasEEspacos };
