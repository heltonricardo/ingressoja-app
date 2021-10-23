import Swal from "sweetalert2";

import MSG from "../ENUM/MSG.js";
import PATH from "../ENUM/PATH.js";
import STATUSHTTP from "../ENUM/STATUSHTTP.js";

export async function validarIngresso(obj) {
  let res;
  try {
    res = await fetch(`${PATH.ITEM_PEDIDO}/validar`, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }

  const status = res.status;

  if (status === STATUSHTTP.OK) {
    return await res.json();
  } //
  else if (status === STATUSHTTP.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.CPF_NAO_INGRESSO, "error");
  }
  return null;
}

export async function utilizarIngresso(id) {
  let res;
  try {
    res = await fetch(`${PATH.ITEM_PEDIDO}/${id}`, { method: "PATCH" });
  } catch (error) {
    Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
    return null;
  }

  const status = res.status;

  if (status === STATUSHTTP.OK) {
    Swal.fire({
      timer: 1750,
      text: MSG.OK,
      title: MSG.BOM,
      icon: "success",
      timerProgressBar: true,
    });
    return true;
  } //
  else if (status === STATUSHTTP.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.CPF_NAO_INGRESSO, "error");
  } //
  else if (status === STATUSHTTP.CONFLICT) {
    Swal.fire(MSG.OPS, MSG.INGRESSO_UTILIZADO, "error");
  }
  return null;
}
