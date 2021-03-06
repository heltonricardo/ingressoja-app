import Swal from "sweetalert2";

import MSG from "../ENUM/MSG.js";
import PATH from "../ENUM/PATH.js";
import STATUSHTTP from "../ENUM/STATUSHTTP.js";
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
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return false;
  }

  const status = res.status;

  if (status === STATUSHTTP.CREATED) {
    Swal.fire({
      title: MSG.BOM,
      text: MSG.CRIADO,
      icon: "success",
      timer: 5000,
      timerProgressBar: true,
    });
    return true;
  } //
  else if (status === STATUSHTTP.CONFLICT) {
    Swal.fire(MSG.RUIM, MSG.DUPLICADO, "error");
  } //
  else if (status === STATUSHTTP.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.INCORRETO, "error");
  } //
  else if (status === STATUSHTTP.INTERNAL_SERVER_ERROR) {
    Swal.fire(MSG.RUIM, MSG.SERVERROR, "error");
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
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }
  const status = res.status;

  if (status === STATUSHTTP.OK) {
    const produtora = await res.json();
    return produtora;
  } //
  else if (status === STATUSHTTP.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.NAO_EXISTE, "error");
  }
  return null;
}

export async function getEventos() {
  if (
    !autenticacao.estaLogado() ||
    autenticacao.tipoLogado() !== TIPOCADASTRO.PRODUTORA
  )
    return null;

  const id = autenticacao.idLogado();

  let res;
  try {
    res = await fetch(`${PATH.PRODUTORA}/${id}/eventos`);
  } catch (error) {
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }
  const status = res.status;

  if (status === STATUSHTTP.OK) {
    return await res.json();
  } //
  else if (status === STATUSHTTP.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.NAO_EXISTE, "error");
  }
  return null;
}

export async function putProdutora(produtora) {
  if (
    !autenticacao.estaLogado() ||
    autenticacao.tipoLogado() !== TIPOCADASTRO.PRODUTORA
  )
    return null;

  const id = autenticacao.idLogado();

  let res;
  try {
    res = await fetch(`${PATH.PRODUTORA}/${id}`, {
      method: "PUT",
      body: JSON.stringify(produtora),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return false;
  }

  const status = res.status;

  if (status === STATUSHTTP.OK) {
    Swal.fire({
      title: MSG.BOM,
      text: MSG.ALTERADO,
      icon: "success",
      timer: 5000,
      timerProgressBar: true,
    });
    return true;
  } //
  else if (status === STATUSHTTP.CONFLICT) {
    Swal.fire(MSG.RUIM, MSG.DUPLICADO, "error");
  } //
  else if (status === STATUSHTTP.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.INCORRETO, "error");
  } //
  else if (status === STATUSHTTP.INTERNAL_SERVER_ERROR) {
    Swal.fire(MSG.RUIM, MSG.SERVERROR, "error");
  }
  return false;
}

export async function deleteProdutora() {
  if (
    !autenticacao.estaLogado() ||
    autenticacao.tipoLogado() !== TIPOCADASTRO.PRODUTORA
  )
    return null;

  const id = autenticacao.idLogado();

  let res;
  try {
    res = await fetch(`${PATH.PRODUTORA}/${id}`, { method: "DELETE" });
  } catch (error) {
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }

  const status = res.status;

  if (status === STATUSHTTP.OK) {
    autenticacao.deslogar();
    return true;
  } //
  else if (status === STATUSHTTP.CONFLICT) {
    Swal.fire(MSG.RUIM, MSG.POSSUI_EVENTOS, "error");
  } //
  else if (status === STATUSHTTP.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.NAO_EXISTE, "error");
  }

  return null;
}

export async function getAnalise() {
  if (
    !autenticacao.estaLogado() ||
    autenticacao.tipoLogado() !== TIPOCADASTRO.PRODUTORA
  )
    return null;

  const id = autenticacao.idLogado();

  let res;
  try {
    res = await fetch(`${PATH.PRODUTORA}/${id}/analise`);
  } catch (error) {
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }
  const status = res.status;

  if (status === STATUSHTTP.OK) {
    const produtora = await res.json();
    return produtora;
  } //
  else if (status === STATUSHTTP.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.NAO_EXISTE, "error");
  }
  return null;
}
