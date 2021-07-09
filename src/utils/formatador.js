export function capitalizar(str) {
  return str && str[0].toUpperCase() + str.slice(1);
}

export function zeroEsquerda(num, qnt) {
  return ("0".repeat(qnt - 1) + num).toString().slice(-qnt);
}

export function valorVirgula(num) {
  return num ? num.toLocaleString('pt-BR') : "0";
}
