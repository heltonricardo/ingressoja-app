import Swal from "sweetalert2";

import MSG from "../ENUM/MSG.js";
import PATH from "../ENUM/PATH.js";
import STATUSHTTP from "../ENUM/STATUSHTTP.js";
import TIPOCADASTRO from "../ENUM/TIPOCADASTRO.js";

import autenticacao from "../Autenticacao/autenticacao.js";

export async function postCategoriaEvento(categoriaEvento) {
  if (
    !autenticacao.estaLogado() ||
    !autenticacao.estaLogadoComTipo(TIPOCADASTRO.ADMINISTRADOR)
  )
    return null;

  let res;
  try {
    res = await fetch(PATH.CATEGORIA_EVENTO, {
      method: "POST",
      body: JSON.stringify(categoriaEvento),
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

export async function putCategoriaEvento(categoriaEvento, id) {
  if (
    !autenticacao.estaLogado() ||
    autenticacao.tipoLogado() !== TIPOCADASTRO.ADMINISTRADOR
  )
    return null;

  let res;
  try {
    res = await fetch(`${PATH.CATEGORIA_EVENTO}/${id}`, {
      method: "PUT",
      body: JSON.stringify(categoriaEvento),
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

export async function getCategoriasEvento() {
  let resposta;

  try {
    resposta = await fetch(PATH.CATEGORIA_EVENTO);
  } catch (error) {
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }

  const status = resposta.status;

  if (status === STATUSHTTP.OK) {
    const categoriasEvento = await resposta.json();
    return categoriasEvento;
  }

  return null;
}

export async function getCategoriasEventoAdmin() {
  let resposta;

  try {
    resposta = await fetch(`${PATH.CATEGORIA_EVENTO}/admin`);
  } catch (error) {
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }

  const status = resposta.status;

  if (status === STATUSHTTP.OK) {
    const categoriasEvento = await resposta.json();
    return categoriasEvento;
  }

  return null;
}

export async function deleteCategoriaEvento(id) {
  if (
    !autenticacao.estaLogado() ||
    autenticacao.tipoLogado() !== TIPOCADASTRO.ADMINISTRADOR
  )
    return null;

  let res;
  try {
    res = await fetch(`${PATH.CATEGORIA_EVENTO}/${id}`, { method: "DELETE" });
  } catch (error) {
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }

  const status = res.status;

  if (status === STATUSHTTP.OK) {
    Swal.fire({
      title: MSG.BOM,
      text: MSG.EXCLUIDA,
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
    });
    return true;
  } else if (status === STATUSHTTP.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.NAO_EXISTE, "error");
  }

  return null;
}

export async function reativarCategoriaEvento(id) {
  if (
    !autenticacao.estaLogado() ||
    autenticacao.tipoLogado() !== TIPOCADASTRO.ADMINISTRADOR
  )
    return null;

  let res;
  try {
    res = await fetch(`${PATH.CATEGORIA_EVENTO}/${id}`, { method: "PATCH" });
  } catch (error) {
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }

  const status = res.status;

  if (status === STATUSHTTP.OK) {
    Swal.fire({
      title: MSG.BOM,
      text: MSG.OK,
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
    });
    return true;
  } else if (status === STATUSHTTP.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.NAO_EXISTE, "error");
  }

  return null;
}