import swal from "sweetalert";

import MSG from "../ENUM/MSG.js";
import PATH from "../ENUM/PATH.js";
import STATUS from "../ENUM/STATUS.js";
import TIPOCADASTRO from "../ENUM/TIPOCADASTRO.js";

import autenticacao from "../Autenticacao/autenticacao.js";

export async function postEvento(evento) {
  if (
    !autenticacao.estaLogado() ||
    !autenticacao.estaLogadoComTipo(TIPOCADASTRO.PRODUTORA)
  )
    return false;

  const produtora = autenticacao.idLogado();
  evento.idProdutora = produtora;

  let res;
  try {
    res = await fetch(PATH.EVENTO, {
      method: "POST",
      body: JSON.stringify(evento),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    swal(MSG.RUIM, MSG.CONEXAO, "error");
    return false;
  }

  const status = res.status;

  if (status === STATUS.CREATED) {
    swal(MSG.BOM, MSG.CRIADO, "success", { timer: 5000 });
    return true;
  } //
  else if (status === STATUS.CONFLICT) {
    swal(MSG.RUIM, MSG.DUPLICADO, "error");
  } //
  else if (status === STATUS.NOT_ACCEPTABLE) {
    swal(MSG.RUIM, MSG.INCORRETO, "error");
  } //
  else if (status === STATUS.INTERNAL_SERVER_ERROR) {
    swal(MSG.RUIM, MSG.SERVERROR, "error");
  }
  return false;
}

export async function getEventos() {
  let res;
  try {
    res = await fetch(PATH.EVENTO);
  } catch (error) {
    swal(MSG.RUIM, MSG.CONEXAO, "error");
    return false;
  }

  const status = res.status;

  if (status === STATUS.OK) {
    return await res.json();
  } //
  else if (status === STATUS.INTERNAL_SERVER_ERROR) {
    swal(MSG.RUIM, MSG.SERVERROR, "error");
  }
  return false;
}

export async function getEvento(id) {
  let res;
  try {
    res = await fetch(`${PATH.EVENTO}/${id}`);
  } catch (error) {
    swal(MSG.RUIM, MSG.CONEXAO, "error");
    return false;
  }

  const status = res.status;

  if (status === STATUS.OK) {
    return await res.json();
  } //
  else if (status === STATUS.INTERNAL_SERVER_ERROR) {
    swal(MSG.RUIM, MSG.SERVERROR, "error");
  }
  return false;
}