import swal from "sweetalert";

import MSG from "../ENUM/MSG.js";
import PATH from "../ENUM/PATH.js";
import STATUS from "../ENUM/STATUS.js";
import TIPOCADASTRO from "../ENUM/TIPOCADASTRO";

import autenticacao from "../Autenticacao/autenticacao";

export async function postComprador(comprador) {
  let res;

  try {
    res = await fetch(PATH.COMPRADOR, {
      method: "POST",
      body: JSON.stringify(comprador),
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
  else if (status === STATUS.BAD_REQUEST) {
    swal(MSG.RUIM, MSG.INCORRETO, "error");
  } //
  else if (status === STATUS.INTERNAL_SERVER_ERROR) {
    swal(MSG.RUIM, MSG.SERVERROR, "error");
  }
  return false;
}

export async function getComprador() {
  if (
    !autenticacao.estaLogado() ||
    autenticacao.tipoLogado() !== TIPOCADASTRO.COMPRADOR
  )
    return null;

  const id = autenticacao.idLogado();

  let res;
  try {
    res = await fetch(`${PATH.COMPRADOR}/${id}`);
  } catch (error) {
    swal(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }

  const status = res.status;

  if (status === STATUS.OK) {
    const comprador = await res.json();
    return comprador;
  } //
  else if (status === STATUS.BAD_REQUEST) {
    swal(MSG.RUIM, MSG.NAO_EXISTE, "error");
  }
  return null;
}

export async function getPedidos() {
  if (
    !autenticacao.estaLogado() ||
    autenticacao.tipoLogado() !== TIPOCADASTRO.COMPRADOR
  )
    return null;

  const id = autenticacao.idLogado();

  let res;
  try {
    res = await fetch(`${PATH.COMPRADOR}/${id}/pedidos`);
  } catch (error) {
    swal(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }

  const status = res.status;

  if (status === STATUS.OK) {
    const pedidos = await res.json();
    return pedidos;
  } //
  else if (status === STATUS.BAD_REQUEST) {
    swal(MSG.RUIM, MSG.NAO_EXISTE, "error");
  }
  return null;
}
