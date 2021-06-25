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
    alert(MSG.CONEXAO);
    return false;
  }

  const status = res.status;

  if (status === STATUS.CREATED) {
    alert(MSG.CRIADO);
    return true;
  } //
  else if (status === STATUS.CONFLICT) alert(MSG.DUPLICADO);
  else if (status === STATUS.NOT_ACCEPTABLE) alert(MSG.INCORRETO);
  else if (status === STATUS.INTERNAL_SERVER_ERROR) alert(MSG.SERVERROR);
  return false;
}
