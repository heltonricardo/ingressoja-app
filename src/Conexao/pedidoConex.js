import Swal from "sweetalert2";

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
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return false;
  }

  const status = res.status;

  if (status === STATUS.CREATED) {
    Swal.fire({
      timer: 8000,
      icon: "success",
      title: MSG.APROVADO,
      showCloseButton: true,
      text: MSG.MERCADO_PAGO,
      timerProgressBar: true,
      showConfirmButton: false,
    });
    return await res.json();
  } //
  else if (status === STATUS.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.SERVERROR, "error");
  } //
  else if (status === STATUS.INTERNAL_SERVER_ERROR) {
    Swal.fire(MSG.RUIM, MSG.SERVERROR, "error");
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
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }

  const status = res.status;

  if (status === STATUS.OK) {
    const pedido = await res.json();
    return pedido;
  } //
  else if (status === STATUS.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.NAO_EXISTE, "error");
  }
  return null;
}
