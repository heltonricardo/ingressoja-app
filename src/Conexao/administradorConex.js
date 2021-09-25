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
  else if (status === STATUS.BAD_REQUEST) {
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
  else if (status === STATUS.BAD_REQUEST) {
    swal(MSG.RUIM, MSG.NAO_EXISTE, "error");
  }
  return null;
}

export async function getAdministradores() {
  if (
    !autenticacao.estaLogado() ||
    !autenticacao.estaLogadoComTipo(TIPOCADASTRO.ADMINISTRADOR)
  )
    return null;

  let res;
  try {
    res = await fetch(PATH.ADMINISTRADOR);
  } catch (error) {
    swal(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }

  const status = res.status;

  if (status === STATUS.OK) {
    return await res.json();
  } //
  else if (status === STATUS.BAD_REQUEST) {
    swal(MSG.RUIM, MSG.NAO_EXISTE, "error");
  }
  return null;
}

export async function getCompradores() {
  if (
    !autenticacao.estaLogado() ||
    !autenticacao.estaLogadoComTipo(TIPOCADASTRO.ADMINISTRADOR)
  )
    return null;

  let res;
  try {
    res = await fetch(PATH.COMPRADOR);
  } catch (error) {
    swal(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }

  const status = res.status;

  if (status === STATUS.OK) {
    return await res.json();
  } //
  else if (status === STATUS.BAD_REQUEST) {
    swal(MSG.RUIM, MSG.NAO_EXISTE, "error");
  }
  return null;
}

export async function getProdutoras() {
  if (
    !autenticacao.estaLogado() ||
    !autenticacao.estaLogadoComTipo(TIPOCADASTRO.ADMINISTRADOR)
  )
    return null;

  let res;
  try {
    res = await fetch(PATH.PRODUTORA);
  } catch (error) {
    swal(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }

  const status = res.status;

  if (status === STATUS.OK) {
    return await res.json();
  } //
  else if (status === STATUS.BAD_REQUEST) {
    swal(MSG.RUIM, MSG.NAO_EXISTE, "error");
  }
  return null;
}

export async function deleteAdministrador(id) {
  if (
    !autenticacao.estaLogado() ||
    !autenticacao.estaLogadoComTipo(TIPOCADASTRO.ADMINISTRADOR)
  )
    return null;

  let res;
  try {
    res = await fetch(`${PATH.ADMINISTRADOR}/${id}`, { method: "DELETE" });
  } catch (error) {
    swal(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }

  const status = res.status;

  if (status === STATUS.OK) {
    swal(MSG.BOM, MSG.OK, "success");
    return true;
  } else if (status === STATUS.BAD_REQUEST) {
    swal(MSG.RUIM, MSG.NAO_EXISTE, "error");
  }

  return null;
}

export async function putAdministrador(administrador) {
  if (
    !autenticacao.estaLogado() ||
    autenticacao.tipoLogado() !== TIPOCADASTRO.ADMINISTRADOR
  )
    return null;

  const id = autenticacao.idLogado();

  let res;
  try {
    res = await fetch(`${PATH.ADMINISTRADOR}/${id}`, {
      method: "PUT",
      body: JSON.stringify(administrador),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    swal(MSG.RUIM, MSG.CONEXAO, "error");
    return false;
  }

  const status = res.status;

  if (status === STATUS.OK) {
    swal(MSG.BOM, MSG.ALTERADO, "success", { timer: 5000 });
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
