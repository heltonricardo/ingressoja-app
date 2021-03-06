import Swal from "sweetalert2";

import MSG from "../ENUM/MSG.js";
import PATH from "../ENUM/PATH.js";
import STATUSHTTP from "../ENUM/STATUSHTTP.js";
import TIPOCADASTRO from "../ENUM/TIPOCADASTRO.js";

import autenticacao from "../Autenticacao/autenticacao.js";

export async function postEvento(evento) {
  if (
    !autenticacao.estaLogado() ||
    !autenticacao.estaLogadoComTipo(TIPOCADASTRO.PRODUTORA)
  )
    return false;

  const produtora = autenticacao.idLogado();
  evento.dto.idProdutora = produtora;

  const requisicao = new FormData();
  requisicao.append("evento", JSON.stringify(evento.dto));
  requisicao.append("file", evento.file);

  let res;
  try {
    res = await fetch(PATH.EVENTO, {
      method: "POST",
      body: requisicao,
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
      timer: 3000,
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

export async function putEvento(evento, idEvento) {
  if (
    !autenticacao.estaLogado() ||
    autenticacao.tipoLogado() !== TIPOCADASTRO.PRODUTORA
  )
    return null;

  const idProdutora = autenticacao.idLogado();
  evento.dto.idProdutora = idProdutora;

  const requisicao = new FormData();
  requisicao.append("evento", JSON.stringify(evento.dto));
  requisicao.append("file", evento.file);

  let res;
  try {
    res = await fetch(`${PATH.EVENTO}/${idEvento}`, {
      method: "PUT",
      body: requisicao,
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
      timer: 3000,
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

export async function getEventos() {
  let res;
  try {
    res = await fetch(PATH.EVENTO);
  } catch (error) {
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return false;
  }

  const status = res.status;

  if (status === STATUSHTTP.OK) {
    return await res.json();
  } //
  else if (status === STATUSHTTP.INTERNAL_SERVER_ERROR) {
    Swal.fire(MSG.RUIM, MSG.SERVERROR, "error");
  }
  return false;
}

export async function getEventoParaEdicao(id) {
  let res;
  try {
    res = await fetch(`${PATH.EVENTO}/paraEdicao/${id}`);
  } catch (error) {
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return false;
  }

  const status = res.status;

  if (status === STATUSHTTP.OK) {
    return await res.json();
  } //
  else if (status === STATUSHTTP.INTERNAL_SERVER_ERROR) {
    Swal.fire(MSG.RUIM, MSG.SERVERROR, "error");
  }
  return false;
}

export async function getEvento(id) {
  let res;
  try {
    res = await fetch(`${PATH.EVENTO}/${id}`);
  } catch (error) {
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return false;
  }

  const status = res.status;

  if (status === STATUSHTTP.OK) {
    return await res.json();
  } //
  else if (status === STATUSHTTP.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.INCORRETO, "error");
  } //
  else if (status === STATUSHTTP.INTERNAL_SERVER_ERROR) {
    Swal.fire(MSG.RUIM, MSG.SERVERROR, "error");
  }
  return false;
}

export async function deleteEvento(id) {
  if (
    !autenticacao.estaLogado() ||
    autenticacao.tipoLogado() !== TIPOCADASTRO.PRODUTORA
  )
    return null;

  let res;
  try {
    res = await fetch(`${PATH.EVENTO}/${id}`, { method: "DELETE" });
  } catch (error) {
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }

  const status = res.status;

  if (status === STATUSHTTP.OK) {
    Swal.fire(MSG.BOM, MSG.EXCLUIDO, "success");
    return true;
  } else if (status === STATUSHTTP.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.NAO_EXISTE, "error");
  } else if (status === STATUSHTTP.CONFLICT) {
    Swal.fire(MSG.RUIM, MSG.EVENTO_NAO, "error");
  }

  return null;
}

export async function podeAlterarEvento(id) {
  if (
    !autenticacao.estaLogado() ||
    autenticacao.tipoLogado() !== TIPOCADASTRO.PRODUTORA
  )
    return null;

  let res;
  try {
    res = await fetch(`${PATH.EVENTO}/alterar/${id}`, { method: "GET" });
  } catch (error) {
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }

  const status = res.status;

  if (status === STATUSHTTP.OK) {
    return true;
  } else if (status === STATUSHTTP.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.NAO_EXISTE, "error");
  } else if (status === STATUSHTTP.CONFLICT) {
    Swal.fire(MSG.RUIM, MSG.EVENTO_NAO, "error");
  }

  return null;
}

export async function getItensVendidos(id) {
  if (
    !autenticacao.estaLogado() ||
    !autenticacao.estaLogadoComTipo(TIPOCADASTRO.PRODUTORA)
  )
    return false;

  let res;
  try {
    res = await fetch(`${PATH.EVENTO}/${id}/itens-vendidos`);
  } catch (error) {
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return false;
  }

  const status = res.status;

  if (status === STATUSHTTP.OK) {
    return await res.json();
  } //
  else if (status === STATUSHTTP.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.INCORRETO, "error");
  } //
  else if (status === STATUSHTTP.INTERNAL_SERVER_ERROR) {
    Swal.fire(MSG.RUIM, MSG.SERVERROR, "error");
  }
  return false;
}

export async function pausarRetomarVenda(id, flag) {
  if (
    !autenticacao.estaLogado() ||
    autenticacao.tipoLogado() !== TIPOCADASTRO.PRODUTORA
  )
    return null;

  let res;
  console.log(`${PATH.EVENTO}/${id}/pausar-venda/${flag}`);
  try {
    res = await fetch(`${PATH.EVENTO}/${id}/pausar-venda/${flag}`, {
      method: "PATCH",
    });
  } catch (error) {
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }

  const status = res.status;

  if (status === STATUSHTTP.OK) {
    Swal.fire({
      timer: 3000,
      text: MSG.OK,
      title: MSG.BOM,
      icon: "success",
      timerProgressBar: true,
    });
    return true;
  } else if (status === STATUSHTTP.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.NAO_EXISTE, "error");
  } else if (status === STATUSHTTP.INTERNAL_SERVER_ERROR) {
    Swal.fire(MSG.RUIM, MSG.SERVERROR, "error");
  }
  return null;
}

export async function postDespesa(idEvento, despesa) {
  if (
    !autenticacao.estaLogado() ||
    !autenticacao.estaLogadoComTipo(TIPOCADASTRO.PRODUTORA)
  )
    return false;

  let res;
  try {
    res = await fetch(`${PATH.EVENTO}/${idEvento}/despesas`, {
      method: "POST",
      body: JSON.stringify(despesa),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }

  const status = res.status;

  if (status === STATUSHTTP.CREATED) {
    Swal.fire({
      title: MSG.BOM,
      text: MSG.CRIADO,
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
    });
    return true;
  } //
  else if (status === STATUSHTTP.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.INCORRETO, "error");
  } //
  else if (status === STATUSHTTP.INTERNAL_SERVER_ERROR) {
    Swal.fire(MSG.RUIM, MSG.SERVERROR, "error");
  }
  return false;
}

export async function getDespesas(id) {
  if (
    !autenticacao.estaLogado() ||
    !autenticacao.estaLogadoComTipo(TIPOCADASTRO.PRODUTORA)
  )
    return false;

  let res;
  try {
    res = await fetch(`${PATH.EVENTO}/${id}/despesas`);
  } catch (error) {
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return false;
  }

  const status = res.status;

  if (status === STATUSHTTP.OK) {
    return await res.json();
  } //
  else if (status === STATUSHTTP.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.INCORRETO, "error");
  } //
  else if (status === STATUSHTTP.INTERNAL_SERVER_ERROR) {
    Swal.fire(MSG.RUIM, MSG.SERVERROR, "error");
  }
  return false;
}

export const getAutoEndereco = async (cep) =>
  await fetch(`${PATH.CONSULTA_CEP}/${cep}/json/`)
    .then((r) => r.json())
    .catch(() => null);
