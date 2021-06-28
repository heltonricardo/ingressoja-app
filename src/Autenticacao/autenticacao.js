import PATH from "../ENUM/PATH";
import STATUS from "../ENUM/STATUS";
import MSG from "../ENUM/MSG";

const ID = "id";
const TIPO = "tipo";

const autenticacao = {
  estaLogado: () => localStorage.getItem(ID) && localStorage.getItem(TIPO),

  estaLogadoComTipo: (tipo) =>
    estaLogado() && localStorage.getItem(TIPO) === tipo,

  idLogado: () => parseInt(localStorage.getItem(ID)),

  tipoLogado: () => parseInt(localStorage.getItem(TIPO)),

  deslogar: () => {
    localStorage.clear();
    swal(MSG.TCHAU, MSG.VOLTE_SEMPRE, "info", { timer: 3000 });
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
        swal(MSG.RUIM, MSG.CONEXAO, "error");
      }
      return false;
    }

    const status = res.status;

    if (status === STATUS.OK) {
      const jsonResp = await res.json();
      localStorage.setItem(TIPO, jsonResp.tipo);
      localStorage.setItem(ID, jsonResp.id);
      if (exibeMsg) {
        swal(MSG.OLA, MSG.SAUDACAO, "success", { timer: 3000 });
      }
      return true;
    } //
    else if (status === STATUS.UNAUTHORIZED && exibeMsg) {
      swal(MSG.RUIM, MSG.CREDENCIAL, "error");
    } //
    else if (status === STATUS.INTERNAL_SERVER_ERROR && exibeMsg) {
      swal(MSG.RUIM, MSG.SERVERROR, "error");
    }
    return false;
  },
};

export default autenticacao;
