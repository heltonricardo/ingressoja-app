import Cookies from "js-cookie";
import PATH from "../ENUM/PATH";
import STATUS from "../ENUM/STATUS";
import MSG from "../ENUM/MSG";

const ID = "id";
const TIPO = "tipo";

const autenticacao = {
  estaLogado: () => Cookies.get(ID) && Cookies.get(TIPO),

  estaLogadoComTipo: (tipo) => estaLogado() && Cookies.get(TIPO) === tipo,

  tipoLogado: () => Cookies.get(TIPO),

  deslogar: () => {
    Cookies.remove(ID);
    Cookies.remove(TIPO);
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
      const tipo = await res.json();
      Cookies.set(TIPO, tipo);
      swal(MSG.BOM, MSG.BEM_VINDO, "success", { timer: 3000 });
      return true;
    } //
    else if (status === STATUS.UNAUTHORIZED) {
      swal(MSG.RUIM, MSG.CREDENCIAL, "error");
    }
    return false;
  },
};

export default autenticacao;
