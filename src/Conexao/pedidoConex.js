import Swal from "sweetalert2";

import MSG from "../ENUM/MSG.js";
import PATH from "../ENUM/PATH.js";
import STATUSHTTP from "../ENUM/STATUSHTTP.js";
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
  if (status === STATUSHTTP.CREATED) {
    const retorno = await res.json();
    if (retorno.urlPagamento)
      await Swal.fire({
        timer: 10000,
        icon: "success",
        title: MSG.APROVADO,
        showCloseButton: true,
        text: MSG.MERCADO_PAGO,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    else
      await Swal.fire({
        timer: 5000,
        icon: "success",
        title: MSG.APROVADO,
        showCloseButton: true,
        timerProgressBar: true,
        showConfirmButton: false,
        text: MSG.REDIRECIONA_PEDIDOS,
      });
    return retorno;
  } //
  else if (status === STATUSHTTP.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.SERVERROR, "error");
  } //
  else if (status === STATUSHTTP.INTERNAL_SERVER_ERROR) {
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

  if (status === STATUSHTTP.OK) {
    const pedido = await res.json();
    return pedido;
  } //
  else if (status === STATUSHTTP.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.NAO_EXISTE, "error");
  }
  return null;
}

export async function cancelarPedido(id) {
  if (
    !autenticacao.estaLogado() ||
    !autenticacao.estaLogadoComTipo(TIPOCADASTRO.COMPRADOR)
  ) {
    return false;
  }

  let res;
  try {
    res = await fetch(`${PATH.PEDIDO}/${id}/cancelar`, { method: "PUT" });
  } catch (error) {
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return false;
  }

  const status = res.status;
  if (status === STATUSHTTP.OK) {
    Swal.fire({
      title: MSG.BOM,
      icon: "success",
      text: MSG.DEVOLUCAO,
    });
    return true;
  } //
  else if (status === STATUSHTTP.CONFLICT) {
    Swal.fire(MSG.RUIM, MSG.NAO_CANCELA, "error");
  } //
  else if (status === STATUSHTTP.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.SERVERROR, "error");
  } //
  else if (status === STATUSHTTP.INTERNAL_SERVER_ERROR) {
    Swal.fire(MSG.RUIM, MSG.SERVERROR, "error");
  }
  return false;
}
