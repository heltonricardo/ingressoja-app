import swal from "sweetalert";

import MSG from "../ENUM/MSG.js";
import PATH from "../ENUM/PATH.js";
import STATUS from "../ENUM/STATUS.js";
import TIPOCADASTRO from "../ENUM/TIPOCADASTRO.js";

import autenticacao from "../Autenticacao/autenticacao.js";

export async function postProdutora(produtora) {
  let res;

  try {
    res = await fetch(PATH.PRODUTORA, {
      method: "POST",
      body: JSON.stringify(produtora),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    swal(MSG.RUIM, MSG.CONEXAO, "error");
    return false;
  }

  const status = res.status;

  if (status === STATUS.CREATED) {
    swal(MSG.BOM, MSG.CRIADO, "success", {timer: 5000});
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

export async function getProdutora() {
  if (
    !autenticacao.estaLogado() ||
    autenticacao.tipoLogado() !== TIPOCADASTRO.PRODUTORA
  )
    return null;

  const id = autenticacao.idLogado();

  let res;
  try {
    res = await fetch(`${PATH.PRODUTORA}/${id}`);
  } catch (error) {
    swal(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }
  const status = res.status;

  if (status === STATUS.OK) {
    const produtora = await res.json();
    return produtora;
  } //
  else if (status === STATUS.NOT_ACCEPTABLE) {
    swal(MSG.RUIM, MSG.NAO_EXISTE, "error");
  }
  return null;
}