import swal from "sweetalert";

import MSG from "../ENUM/MSG.js";
import PATH from "../ENUM/PATH.js";
import STATUS from "../ENUM/STATUS.js";
import TIPOCADASTRO from "../ENUM/TIPOCADASTRO.js";

import autenticacao from "../Autenticacao/autenticacao.js";

export async function postPedido(pedido) {

  if (
    !autenticacao.estaLogado() ||
    !autenticacao.estaLogadoComTipo(TIPOCADASTRO.COMPRADOR)
  ) {
    return false;
  }

  pedido.idComprador = autenticacao.idLogado();

  let res;
  try {
    res = await fetch(PATH.PEDIDO, {
      method: "POST",
      body: JSON.stringify(pedido),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    swal(MSG.RUIM, MSG.CONEXAO, "error");
    return false;
  }

  const status = res.status;

  if (status === STATUS.CREATED) {
    await new Promise(resolve => setTimeout(resolve, 4000));
    swal(MSG.APROVADO, MSG.PED_REALIZADO, "success", { timer: 5000 });
    return true;
  } //
  else if (status === STATUS.BAD_REQUEST) {
    swal(MSG.RUIM, MSG.INCORRETO, "error");
  } //
  else if (status === STATUS.INTERNAL_SERVER_ERROR) {
    swal(MSG.RUIM, MSG.SERVERROR, "error");
  }
  return false;
}

export async function getPedido(id) {
  if (
    !autenticacao.estaLogado() ||
    autenticacao.tipoLogado() !== TIPOCADASTRO.COMPRADOR
  )
    return null;

  let res;
  try {
    res = await fetch(`${PATH.PEDIDO}/${id}`);
  } catch (error) {
    swal(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }

  const status = res.status;

  if (status === STATUS.OK) {
    const pedido = await res.json();
    return pedido;
  } //
  else if (status === STATUS.BAD_REQUEST) {
    swal(MSG.RUIM, MSG.NAO_EXISTE, "error");
  }
  return null;
}