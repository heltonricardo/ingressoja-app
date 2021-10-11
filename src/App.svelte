<script>
  import MODO from "./ENUM/MODO";
  import Login from "./Login/Login.svelte";
  import Evento from "./Cadastro/Evento.svelte";
  import Detalhes from "./Evento/Detalhes.svelte";
  import MeusDados from "./Conta/MeusDados.svelte";
  import Cadastro from "./Cadastro/Cadastro.svelte";
  import MinhaConta from "./Conta/MinhaConta.svelte";
  import Produtoras from "./Conta/Produtoras.svelte";
  import MeusEventos from "./Conta/MeusEventos.svelte";
  import MeusPedidos from "./Conta/MeusPedidos.svelte";
  import Compradores from "./Conta/Compradores.svelte";
  import BarraInferior from "./UI/BarraInferior.svelte";
  import GridEventos from "./Evento//GridEventos.svelte";
  import PedidoDetalhe from "./Conta/PedidoDetalhe.svelte";
  import Administrador from "./Cadastro/Administrador.svelte";
  import FinalizaPedido from "./Pedido/FinalizaPedido.svelte";
  import Administradores from "./Conta/Administradores.svelte";
  import CategoriaEvento from "./Cadastro/CategoriaEvento.svelte";
  import BarraSuperior from "./UI/BarraSuperior/BarraSuperior.svelte";

  let modo = MODO.NORMAL;
  let id = null;
  let idPedido = null;
  let evento = null;
  let dados = null;
  let termoPesquisa = "";
  let idCategoria = null;

  function limpaFiltroPesquisa() {
    idCategoria = null;
    termoPesquisa = "";
  }

  function trocaModo(novoModo) {
    modo = novoModo;
    window.scrollTo(0, 0);
  }

  function modoCadastro(e) {
    dados = e.detail;
    limpaFiltroPesquisa();
    trocaModo(MODO.CADASTRO);
  }

  function modoDetalhes(e) {
    id = e.detail;
    limpaFiltroPesquisa();
    trocaModo(MODO.DETALHES);
  }

  function modoEvento(event) {
    id = event.detail;
    trocaModo(MODO.EVENTO);
  }

  function modoFinalizacao(e) {
    evento = e.detail;
    trocaModo(MODO.FINALIZACAO);
  }

  function modoLogin() {
    limpaFiltroPesquisa();
    trocaModo(MODO.LOGIN);
  }

  function modoMinhaConta() {
    limpaFiltroPesquisa();
    trocaModo(MODO.MINHA_CONTA);
  }

  function modoNormal() {
    id = null;
    trocaModo(MODO.NORMAL);
  }

  function modoNovoAdm(e) {
    dados = e.detail;
    trocaModo(MODO.ADMINISTRADOR);
  }

  function modoPedido(e) {
    idPedido = e.detail;
    trocaModo(MODO.DETALHE_PEDIDO);
  }

  const filtrar = (event) => (idCategoria = event.detail);

  const pesquisar = (event) => (termoPesquisa = event.detail);

  const modoAdministradores = () => trocaModo(MODO.ADMINISTRADORES);

  const modoCategoriasEvento = () => trocaModo(MODO.CATEGORIAS_EVENTO);

  const modoCompradores = () => trocaModo(MODO.COMPRADORES);

  const modoMeusDados = () => trocaModo(MODO.MEUS_DADOS);

  const modoMeusEventos = () => trocaModo(MODO.MEUS_EVENTOS);

  const modoMeusPedidos = () => trocaModo(MODO.MEUS_PEDIDOS);

  const modoProdutoras = () => trocaModo(MODO.PRODUTORAS);
</script>

<BarraSuperior
  {modo}
  on:filtrar={filtrar}
  on:entrar={modoLogin}
  on:voltar={modoNormal}
  on:pesquisar={pesquisar}
  on:cadastro={modoCadastro}
  on:minhaconta={modoMinhaConta}
/>

{#if modo === MODO.NORMAL}
  <GridEventos {termoPesquisa} {idCategoria} on:vermais={modoDetalhes} />
{:else if modo === MODO.CADASTRO}
  <Cadastro {dados} on:meusdados={modoMeusDados} on:voltar={modoNormal} />
{:else if modo === MODO.LOGIN}
  <Login on:voltar={modoNormal} on:cadastro={modoCadastro} />
{:else if modo === MODO.DETALHES}
  <Detalhes
    {id}
    on:entrar={modoLogin}
    on:voltar={modoNormal}
    on:finalizacao={modoFinalizacao}
  />
{:else if modo === MODO.MINHA_CONTA}
  <MinhaConta
    on:voltar={modoNormal}
    on:meusdados={modoMeusDados}
    on:minhaconta={modoMinhaConta}
    on:produtoras={modoProdutoras}
    on:compradores={modoCompradores}
    on:meuseventos={modoMeusEventos}
    on:meuspedidos={modoMeusPedidos}
    on:novacategoria={modoCategoriasEvento}
    on:administradores={modoAdministradores}
  />
{:else if modo === MODO.EVENTO}
  <Evento {id} on:meuseventos={modoMeusEventos} />
{:else if modo === MODO.FINALIZACAO}
  <FinalizaPedido
    {evento}
    on:voltar={modoNormal}
    on:meuspedidos={modoMeusPedidos}
  />
{:else if modo === MODO.MEUS_PEDIDOS}
  <MeusPedidos on:minhaconta={modoMinhaConta} on:detalhespedido={modoPedido} />
{:else if modo === MODO.CATEGORIAS_EVENTO}
  <CategoriaEvento on:minhaconta={modoMinhaConta} />
{:else if modo === MODO.ADMINISTRADOR}
  <Administrador
    {dados}
    on:meusdados={modoMeusDados}
    on:minhaconta={modoMinhaConta}
    on:administradores={modoAdministradores}
  />
{:else if modo === MODO.DETALHE_PEDIDO}
  <PedidoDetalhe id={idPedido} on:meuspedidos={modoMeusPedidos} />
{:else if modo === MODO.MEUS_DADOS}
  <MeusDados
    on:voltar={modoNormal}
    on:novoadm={modoNovoAdm}
    on:cadastro={modoCadastro}
    on:minhaconta={modoMinhaConta}
  />
{:else if modo === MODO.MEUS_EVENTOS}
  <MeusEventos
    on:editar={modoEvento}
    on:novoevento={modoEvento}
    on:minhaconta={modoMinhaConta}
  />
{:else if modo === MODO.ADMINISTRADORES}
  <Administradores on:novoadm={modoNovoAdm} on:minhaconta={modoMinhaConta} />
{:else if modo === MODO.COMPRADORES}
  <Compradores on:minhaconta={modoMinhaConta} />
{:else if modo === MODO.PRODUTORAS}
  <Produtoras on:minhaconta={modoMinhaConta} />
{/if}

<BarraInferior />
