import Cookies from "js-cookie";
import PATH from "../ENUM/PATH";
import STATUS from "../ENUM/STATUS";
import MSG from "../ENUM/MSG";

const ID = "id";
const TIPO = "tipo";

const autenticacao = {
  estaLogado: () => Cookies.get(ID) && Cookies.get(TIPO),

  estaLogadoComTipo: (tipo) => estaLogado() && Cookies.get(TIPO) === tipo,

  idLogado: () => parseInt(Cookies.get(ID)),
  
  tipoLogado: () => parseInt(Cookies.get(TIPO)),

  deslogar: () => {
    Cookies.remove(ID);
    Cookies.remove(TIPO);
    swal(MSG.TCHAU, MSG.VOLTE_SEMPRE, "info", { timer: 3000 });
  },

  logar: async (credencial) => {
    let res;

    try {
      res = await fetch(PATH.AUTENTICACAO, {
        method: "POST",
        body: JSON.stringify(credencial),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      swal(MSG.RUIM, MSG.CONEXAO, "error");
      return false;
    }
    
    const status = res.status;

    if (status === STATUS.OK) {
      const jsonResp = await res.json();
      Cookies.set(TIPO, jsonResp.tipo, { expires: 7 });
      Cookies.set(ID, jsonResp.id, { expires: 7 });
      swal(MSG.OLA, MSG.SAUDACAO, "success", { timer: 3000 });
      return true;
    } //
    else if (status === STATUS.UNAUTHORIZED) {
      swal(MSG.RUIM, MSG.CREDENCIAL, "error");
    } //
    else if (status === STATUS.INTERNAL_SERVER_ERROR) {
      swal(MSG.RUIM, MSG.SERVERROR, "error");
    }
    return false;
  },
};

export default autenticacao;
