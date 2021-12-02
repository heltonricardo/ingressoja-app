import moment from "moment";
import { capitalizar, zeroEsquerda } from "./formatador.js";

export function nomeDoMes(num) {
  return num.toLocaleString("pt-BR", { month: "long" });
}
export function extrairDataHora(info) {
  const dataHora = new Date(info);

  const dia = dataHora.toLocaleString("pt-BR", { day: "2-digit" });
  const mes = capitalizar(dataHora.toLocaleString("pt-BR", { month: "long" }));
  const mesNumero = dataHora.toLocaleString("pt-BR", { month: "2-digit" });
  const ano = dataHora.toLocaleString("pt-BR", { year: "numeric" });

  const anoAtual = new Date().toLocaleString("pt-BR", { year: "numeric" });

  const data = `${dia} de ${mes}` + (ano === anoAtual ? "" : ` de ${ano}`);

  const dataCompleta = `${dia} de ${mes} de ${ano}`;

  const dataCompletaBarras = `${dia}/${mesNumero}/${ano}`;

  const hora = dataHora.toLocaleTimeString("pt-BR", { hour: "2-digit" });
  const minuto = zeroEsquerda(
    dataHora.toLocaleTimeString("pt-BR", { minute: "2-digit" }),
    2
  );
  const horario = `${hora}h` + (minuto === "00" ? "" : minuto);

  return {
    dia,
    mes,
    ano,
    anoAtual,
    data,
    horario,
    dataCompleta,
    dataCompletaBarras,
  };
}

export function UTCParaPtBr(data) {
  var formatada = new Date(data);
  formatada.setMinutes(formatada.getMinutes() - formatada.getTimezoneOffset());
  return formatada.toISOString().slice(0, 16);
}

export const hojeStringISO = moment().format().substring(0, 16);

export const hojeDataStringISO = moment().format().substring(0, 10);
