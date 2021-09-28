import Swal from "sweetalert2";

import MSG from "../ENUM/MSG.js";
import PATH from "../ENUM/PATH.js";
import STATUS from "../ENUM/STATUS.js";
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

  if (status === STATUS.CREATED) {
    Swal.fire(MSG.BOM, MSG.CRIADO, "success", { timer: 5000 });
    return true;
  } //
  else if (status === STATUS.CONFLICT) {
    Swal.fire(MSG.RUIM, MSG.DUPLICADO, "error");
  } //
  else if (status === STATUS.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.INCORRETO, "error");
  } //
  else if (status === STATUS.INTERNAL_SERVER_ERROR) {
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

  if (status === STATUS.OK) {
    const categoriasEvento = await resposta.json();
    return categoriasEvento;
  }

  return null;
}
