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
  ITEM_PEDIDO: API + "/item-pedido",
  DESPESA: API + "/despesa",
});

export default PATH;
