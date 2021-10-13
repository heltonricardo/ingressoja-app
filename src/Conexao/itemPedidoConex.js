import Swal from "sweetalert2";

import MSG from "../ENUM/MSG.js";
import PATH from "../ENUM/PATH.js";
import STATUS from "../ENUM/STATUS.js";

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

  if (status === STATUS.OK) {
    return await res.json();
  } //
  else if (status === STATUS.BAD_REQUEST) {
    Swal.fire(MSG.RUIM, MSG.CPF_NAO_INGRESSO, "error");
  }
  return null;
}
