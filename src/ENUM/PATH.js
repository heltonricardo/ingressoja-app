const API = "http://localhost:8080/ingressoja-api";

const PATH = Object.freeze({
  API,
  ADMINISTRADOR: API + "/administrador",
  COMPRADOR: API + "/comprador",
  PRODUTORA: API + "/produtora",
  EVENTO: API + "/evento",
  CATEGORIA_EVENTO: API + "/categoria-evento",
  AUTENTICACAO: API + "/autenticacao",
  PEDIDO: API + "/pedido",
});

export default PATH;
