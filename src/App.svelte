<script>
  import MODO from "./ENUM/MODO";
  import Login from "./Login/Login.svelte";
  import Analise from "./Conta/Analise.svelte";
  import Evento from "./Cadastro/Evento.svelte";
  import Despesas from "./Conta/Despesas.svelte";
  import Detalhes from "./Evento/Detalhes.svelte";
  import MeusDados from "./Conta/MeusDados.svelte";
  import Cadastro from "./Cadastro/Cadastro.svelte";
  import MinhaConta from "./Conta/MinhaConta.svelte";
  import Produtoras from "./Conta/Produtoras.svelte";
  import MeusPedidos from "./Conta/MeusPedidos.svelte";
  import Compradores from "./Conta/Compradores.svelte";
  import BarraInferior from "./UI/BarraInferior.svelte";
  import AnaliseAdmin from "./Conta/AnaliseAdmin.svelte";
  import GridEventos from "./Evento//GridEventos.svelte";
  import MeusIngressos from "./Conta/MeusIngressos.svelte";
  import PedidoDetalhe from "./Conta/PedidoDetalhe.svelte";
  import Administrador from "./Cadastro/Administrador.svelte";
  import FinalizaPedido from "./Pedido/FinalizaPedido.svelte";
  import Administradores from "./Conta/Administradores.svelte";
  import CadastroEventos from "./Conta/CadastroEventos.svelte";
  import GerenciaEventos from "./Conta/GerenciaEventos.svelte";
  import CategoriaEvento from "./Cadastro/CategoriaEvento.svelte";
  import BarraSuperior from "./UI/BarraSuperior/BarraSuperior.svelte";
  import ConferenciaIngressos from "./Conta/ConferenciaIngressos.svelte";

  let id = null;
  let dados = null;
  let evento = null;
  let idPedido = null;
  let idCategoria = null;
  let modo = MODO.NORMAL;
  let termoPesquisa = "";

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

  function modoDespesas(e) {
    id = e.detail;
    trocaModo(MODO.DESPESAS);
  }

  function modoDetalhes(e) {
    id = e.detail;
    limpaFiltroPesquisa();
    trocaModo(MODO.DETALHES);
  }

  function modoEvento(e) {
    id = e.detail;
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

  function modoMeusIngressos(e) {
    dados = e.detail;
    trocaModo(MODO.MEUS_INGRESSOS);
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

  function modoUtilizacao(e) {
    id = e.detail;
    trocaModo(MODO.UTILIZACAO);
  }

  const filtrar = (event) => (idCategoria = event.detail);

  const pesquisar = (event) => (termoPesquisa = event.detail);

  const modoAnalise = () => trocaModo(MODO.ANALISES);
  
  const modoMeusDados = () => trocaModo(MODO.MEUS_DADOS);
  
  const modoProdutoras = () => trocaModo(MODO.PRODUTORAS);
  
  const modoCompradores = () => trocaModo(MODO.COMPRADORES);
  
  const modoConferencia = () => trocaModo(MODO.CONFERENCIA);
  
  const modoMeusPedidos = () => trocaModo(MODO.MEUS_PEDIDOS);

  const modoAnaliseAdmin = () => trocaModo(MODO.ANALISE_ADMIN);
  
  const modoAdministradores = () => trocaModo(MODO.ADMINISTRADORES);

  const modoCadastroEventos = () => trocaModo(MODO.CADASTRO_EVENTOS);

  const modoGerenciaEventos = () => trocaModo(MODO.GERENCIA_EVENTOS);

  const modoCategoriasEvento = () => trocaModo(MODO.CATEGORIAS_EVENTO);
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
    on:analises={modoAnalise}
    on:meusdados={modoMeusDados}
    on:minhaconta={modoMinhaConta}
    on:produtoras={modoProdutoras}
    on:analiseadm={modoAnaliseAdmin}
    on:compradores={modoCompradores}
    on:conferencia={modoConferencia}
    on:meuspedidos={modoMeusPedidos}
    on:novacategoria={modoCategoriasEvento}
    on:administradores={modoAdministradores}
    on:cadastroeventos={modoCadastroEventos}
    on:gerenciaeventos={modoGerenciaEventos}
  />
{:else if modo === MODO.EVENTO}
  <Evento {id} on:cadastroeventos={modoCadastroEventos} />
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
    on:administradores={modoAdministradores}
  />
{:else if modo === MODO.DETALHE_PEDIDO}
  <PedidoDetalhe
    id={idPedido}
    on:meuspedidos={modoMeusPedidos}
    on:meusingressos={modoMeusIngressos}
  />
{:else if modo === MODO.MEUS_DADOS}
  <MeusDados
    on:voltar={modoNormal}
    on:novoadm={modoNovoAdm}
    on:cadastro={modoCadastro}
    on:minhaconta={modoMinhaConta}
  />
{:else if modo === MODO.CADASTRO_EVENTOS}
  <CadastroEventos
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
{:else if modo === MODO.MEUS_INGRESSOS}
  <MeusIngressos {dados} on:detalhespedido={modoPedido} />
{:else if modo === MODO.CONFERENCIA}
  <GerenciaEventos
    conferencia={true}
    on:conferencia={modoUtilizacao}
    on:minhaconta={modoMinhaConta}
  />
{:else if modo === MODO.UTILIZACAO}
  <ConferenciaIngressos {id} on:conferencia={modoConferencia} />
{:else if modo === MODO.GERENCIA_EVENTOS}
  <GerenciaEventos on:despesas={modoDespesas} on:minhaconta={modoMinhaConta} />
{:else if modo === MODO.DESPESAS}
  <Despesas idEvento={id} on:gerenciaeventos={modoGerenciaEventos} />
{:else if modo === MODO.ANALISES}
  <Analise on:minhaconta={modoMinhaConta} />
{:else if modo === MODO.ANALISE_ADMIN}
  <AnaliseAdmin on:minhaconta={modoMinhaConta} />
{/if}

<BarraInferior />
