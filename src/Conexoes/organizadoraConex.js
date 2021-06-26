import swal from "sweetalert";

import MSG from "../ENUM/MSG.js";
import PATH from "../ENUM/PATH.js";
import STATUS from "../ENUM/STATUS.js";

export async function postOrganizadora(organizadora) {
  let res;

  try {
    res = await fetch(PATH.ORGANIZADORA, {
      method: "POST",
      body: JSON.stringify(organizadora),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    swal(MSG.RUIM, MSG.CONEXAO, "error");
    return false;
  }

  const status = res.status;

  if (status === STATUS.CREATED) {
    swal(MSG.BOM, MSG.CRIADO, "success", {timer: 5000});
    return true;
  } //
  else if (status === STATUS.CONFLICT) {
    swal(MSG.RUIM, MSG.DUPLICADO, "error");
  } //
  else if (status === STATUS.NOT_ACCEPTABLE) {
    swal(MSG.RUIM, MSG.INCORRETO, "error");
  } //
  else if (status === STATUS.INTERNAL_SERVER_ERROR) {
    swal(MSG.RUIM, MSG.SERVERROR, "error");
  }
  return false;
}
