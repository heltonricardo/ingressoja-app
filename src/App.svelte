<script>
  import MODO from "./ENUM/MODO";
  import Login from "./Login/Login.svelte";
  import Evento from "./Cadastro/Evento.svelte";
  import Detalhes from "./Evento/Detalhes.svelte";
  import MeusDados from "./Conta/MeusDados.svelte";
  import Cadastro from "./Cadastro/Cadastro.svelte";
  import MinhaConta from "./Conta/MinhaConta.svelte";
  import BarraInferior from "./UI/BarraInferior.svelte";
  import MeusEventos from "./Conta/MeusEventos.svelte";
  import MeusPedidos from "./Conta/MeusPedidos.svelte";
  import GridEventos from "./Evento//GridEventos.svelte";
  import PedidoDetalhe from "./Conta/PedidoDetalhe.svelte";
  import Administrador from "./Cadastro/Administrador.svelte";
  import FinalizaPedido from "./Pedido/FinalizaPedido.svelte";
  import CategoriaEvento from "./Cadastro/CategoriaEvento.svelte";
  import BarraSuperior from "./UI/BarraSuperior/BarraSuperior.svelte";
  import Administradores from "./Conta/Administradores.svelte";
  import Compradores from "./Conta/Compradores.svelte";
  import Produtoras from "./Conta/Produtoras.svelte";

  let modo = MODO.MEUS_EVENTOS;
  let id = null;
  let idPedido = null;
  let evento = null;
  let dados = null;

  function trocaModo(novoModo) {
    modo = novoModo;
    window.scrollTo(0, 0);
  }

  function modoCadastro(e) {
    dados = e.detail;
    trocaModo(MODO.CADASTRO);
  }

  function modoDetalhes(e) {
    id = e.detail;
    trocaModo(MODO.DETALHES);
  }

  function modoFinalizacao(e) {
    evento = e.detail;
    trocaModo(MODO.FINALIZACAO);
  }

  function modoNovoAdm(e) {
    dados = e.detail;
    trocaModo(MODO.NOVO_ADM);
  }

  function modoNormal() {
    id = null;
    trocaModo(MODO.NORMAL);
  }

  function modoPedido(e) {
    idPedido = e.detail;
    trocaModo(MODO.DETALHE_PEDIDO);
  }

  const modoAdministradores = () => trocaModo(MODO.ADMINISTRADORES);

  const modoCategoriasEvento = () => trocaModo(MODO.CATEGORIAS_EVENTO);

  const modoCompradores = () => trocaModo(MODO.COMPRADORES);

  const modoLogin = () => trocaModo(MODO.LOGIN);

  const modoMeusDados = () => trocaModo(MODO.MEUS_DADOS);

  const modoMeusEventos = () => trocaModo(MODO.MEUS_EVENTOS);

  const modoMeusPedidos = () => trocaModo(MODO.MEUS_PEDIDOS);

  const modoMinhaConta = () => trocaModo(MODO.MINHA_CONTA);

  const modoNovoEvento = () => trocaModo(MODO.NOVO_EVENTO);

  const modoProdutoras = () => trocaModo(MODO.PRODUTORAS);
</script>

<BarraSuperior
  {modo}
  on:voltar={modoNormal}
  on:cadastro={modoCadastro}
  on:entrar={modoLogin}
  on:minhaconta={modoMinhaConta}
/>

{#if modo === MODO.NORMAL}
  <GridEventos on:vermais={modoDetalhes} />
{:else if modo === MODO.CADASTRO}
  <Cadastro {dados} on:meusdados={modoMeusDados} on:voltar={modoNormal} />
{:else if modo === MODO.LOGIN}
  <Login on:voltar={modoNormal} on:cadastro={modoCadastro} />
{:else if modo === MODO.DETALHES}
  <Detalhes
    {id}
    on:voltar={modoNormal}
    on:finalizacao={modoFinalizacao}
    on:entrar={modoLogin}
  />
{:else if modo === MODO.MINHA_CONTA}
  <MinhaConta
    on:administradores={modoAdministradores}
    on:compradores={modoCompradores}
    on:meusdados={modoMeusDados}
    on:meuseventos={modoMeusEventos}
    on:meuspedidos={modoMeusPedidos}
    on:minhaconta={modoMinhaConta}
    on:novacategoria={modoCategoriasEvento}
    on:novoadm={modoNovoAdm}
    on:produtoras={modoProdutoras}
    on:voltar={modoNormal}
  />
{:else if modo === MODO.NOVO_EVENTO}
  <Evento on:meuseventos={modoMeusEventos} />
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
{:else if modo === MODO.NOVO_ADM}
  <Administrador {dados} on:minhaconta={modoMinhaConta} />
{:else if modo === MODO.DETALHE_PEDIDO}
  <PedidoDetalhe id={idPedido} on:meuspedidos={modoMeusPedidos} />
{:else if modo === MODO.MEUS_DADOS}
  <MeusDados
    on:minhaconta={modoMinhaConta}
    on:cadastro={modoCadastro}
    on:novoadm={modoNovoAdm}
    on:voltar={modoNormal}
  />
{:else if modo === MODO.MEUS_EVENTOS}
  <MeusEventos on:minhaconta={modoMinhaConta} on:novoevento={modoNovoEvento} />
{:else if modo === MODO.ADMINISTRADORES}
  <Administradores on:minhaconta={modoMinhaConta} />
{:else if modo === MODO.COMPRADORES}
  <Compradores on:minhaconta={modoMinhaConta} />
{:else if modo === MODO.PRODUTORAS}
  <Produtoras on:minhaconta={modoMinhaConta} />
{/if}

<BarraInferior />
