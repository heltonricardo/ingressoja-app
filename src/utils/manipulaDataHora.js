import { capitalizar, zeroEsquerda } from "./formatador.js";
import moment from "moment"

export function nomeDoMes(num) {
  return num.toLocaleString("pt-BR", { month: "long" });
}
export function extrairDataHora(info) {
  const dataHora = new Date(info);

  const dia = dataHora.toLocaleString("pt-BR", { day: "2-digit" });
  const mes = capitalizar(dataHora.toLocaleString("pt-BR", { month: "long" }));
  const ano = dataHora.toLocaleString("pt-BR", { year: "numeric" });

  const anoAtual = new Date().toLocaleString("pt-BR", { year: "numeric" });

  const data = `${dia} de ${mes}` + (ano === anoAtual ? "" : ` de ${ano}`);

  const hora = dataHora.toLocaleTimeString("pt-BR", { hour: "2-digit" });
  const minuto = zeroEsquerda(
    dataHora.toLocaleTimeString("pt-BR", { minute: "2-digit" }),
    2
  );
  const horario = `${hora}h` + (minuto === "00" ? "" : minuto);

  return { dia, mes, ano, anoAtual, data, horario };
}

export const hojeStringISO = moment().format().substring(0, 16);