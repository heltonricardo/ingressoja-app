import swal from "sweetalert";

import MSG from "../ENUM/MSG.js";
import PATH from "../ENUM/PATH.js";
import STATUS from "../ENUM/STATUS.js";
import TIPOCADASTRO from "../ENUM/TIPOCADASTRO";

import autenticacao from "../Autenticacao/autenticacao";

export async function postAdministrador(administrador) {
  if (
    !autenticacao.estaLogado() ||
    !autenticacao.estaLogadoComTipo(TIPOCADASTRO.ADMINISTRADOR)
  )
    return null;

  let res;
  try {
    res = await fetch(PATH.ADMINISTRADOR, {
      method: "POST",
      body: JSON.stringify(administrador),
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

export async function getAdministrador() {
  if (
    !autenticacao.estaLogado() ||
    !autenticacao.estaLogadoComTipo(TIPOCADASTRO.ADMINISTRADOR)
  )
    return null;

  const id = autenticacao.idLogado();

  let res;
  try {
    res = await fetch(`${PATH.ADMINISTRADOR}/${id}`);
  } catch (error) {
    swal(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }

  const status = res.status;

  if (status === STATUS.OK) {
    const administrador = await res.json();
    return administrador;
  } //
  else if (status === STATUS.NOT_ACCEPTABLE) {
    swal(MSG.RUIM, MSG.NAO_EXISTE, "error");
  }
  return null;
}