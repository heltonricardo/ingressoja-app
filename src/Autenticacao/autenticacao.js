import Swal from "sweetalert2";

import MSG from "../ENUM/MSG";
import PATH from "../ENUM/PATH";
import STATUSHTTP from "../ENUM/STATUSHTTP";

const ID = "id";
const TIPO = "tipo";

const autenticacao = {
  estaLogado: () => localStorage.getItem(ID) && localStorage.getItem(TIPO),

  estaLogadoComTipo: (tipo) =>
    localStorage.getItem(ID) && localStorage.getItem(TIPO) === tipo.toString(),

  idLogado: () => parseInt(localStorage.getItem(ID)),

  tipoLogado: () => parseInt(localStorage.getItem(TIPO)),

  deslogar: () => {
    localStorage.clear();
    Swal.fire({
      title: MSG.TCHAU,
      text: MSG.VOLTE_SEMPRE,
      icon: "info",
      timer: 3000,
      timerProgressBar: true,
    });
  },

  logar: async (credencial, exibeMsg) => {
    let res;

    try {
      res = await fetch(PATH.AUTENTICACAO, {
        method: "POST",
        body: JSON.stringify(credencial),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      if (exibeMsg) {
        Swal.fire(MSG.RUIM, MSG.CONEXAO, "error");
      }
      return false;
    }

    const status = res.status;

    if (status === STATUSHTTP.OK) {
      const jsonResp = await res.json();
      localStorage.clear();
      localStorage.setItem(TIPO, jsonResp.tipo);
      localStorage.setItem(ID, jsonResp.id);
      if (exibeMsg) {
        Swal.fire({
          title: MSG.OLA,
          text: MSG.SAUDACAO,
          icon: "success",
          timer: 3000,
          timerProgressBar: true,
        });
      }
      return true;
    } //
    else if (status === STATUSHTTP.UNAUTHORIZED && exibeMsg) {
      Swal.fire(MSG.RUIM, MSG.CREDENCIAL, "error");
    } //
    else if (status === STATUSHTTP.INTERNAL_SERVER_ERROR && exibeMsg) {
      Swal.fire(MSG.RUIM, MSG.SERVERROR, "error");
    }
    return false;
  },
};

export default autenticacao;
