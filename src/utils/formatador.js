export function capitalizar(str) {
  return str && str[0].toUpperCase() + str.slice(1);
}

export function zeroEsquerda(num, qnt) {
  return ("0".repeat(qnt - 1) + num).toString().slice(-qnt);
}

export function valorVirgula(num) {
  return num.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function porcento3(num) {
  if (Number.isInteger(num)) return num;
  return num.toFixed(3).replace(".", ",");
}
