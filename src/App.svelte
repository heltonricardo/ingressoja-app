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

  let modo = MODO.NORMAL;
  let id = null;
  let idPedido = null;
  let evento = null;

  function modoNormal() {
    id = null;
    modo = MODO.NORMAL;
    window.scrollTo(0, 0);
  }

  function modoDetalhes(event) {
    id = event.detail;
    modo = MODO.DETALHES;
    window.scrollTo(0, 0);
  }

  function modoCadastraEvento() {
    modo = MODO.NOVO_EVENTO;
    window.scrollTo(0, 0);
  }

  function modoMinhaConta() {
    modo = MODO.MINHA_CONTA;
    window.scrollTo(0, 0);
  }

  function modoFinalizacao(event) {
    evento = event.detail;
    modo = MODO.FINALIZACAO;
    window.scrollTo(0, 0);
  }

  function modoMeusPedidos() {
    modo = MODO.MEUS_PEDIDOS;
    window.scrollTo(0, 0);
  }

  function modoCategoriasEvento() {
    modo = MODO.CATEGORIAS_EVENTO;
    window.scrollTo(0, 0);
  }

  function modoNovoAdm() {
    modo = MODO.NOVO_ADM;
    window.scrollTo(0, 0);
  }

  function modoPedido(event) {
    idPedido = event.detail;
    modo = MODO.DETALHE_PEDIDO;
    window.scrollTo(0, 0);
  }

  function modoMeusDados() {
    modo = MODO.MEUS_DADOS;
    window.scrollTo(0, 0);
  }

  function modoMeusEventos() {
    modo = MODO.MEUS_EVENTOS;
    window.scrollTo(0, 0);
  }
</script>

<BarraSuperior
  {modo}
  on:voltar={modoNormal}
  on:cadastrese={() => (modo = MODO.CADASTRO)}
  on:entrar={() => (modo = MODO.LOGIN)}
  on:minhaconta={modoMinhaConta}
/>

{#if modo === MODO.NORMAL}
  <GridEventos on:vermais={modoDetalhes} />
{:else if modo === MODO.CADASTRO}
  <Cadastro on:voltar={modoNormal} />
{:else if modo === MODO.LOGIN}
  <Login on:voltar={modoNormal} />
{:else if modo === MODO.DETALHES}
  <Detalhes
    {id}
    on:voltar={modoNormal}
    on:finalizacao={modoFinalizacao}
    on:entrar={() => (modo = MODO.LOGIN)}
  />
{:else if modo === MODO.MINHA_CONTA}
  <MinhaConta
    on:voltar={modoNormal}
    on:minhaconta={modoMinhaConta}
    on:meuseventos={modoMeusEventos}
    on:meuspedidos={modoMeusPedidos}
    on:novacategoria={modoCategoriasEvento}
    on:novoadm={modoNovoAdm}
    on:meusdados={modoMeusDados}
  />
{:else if modo === MODO.NOVO_EVENTO}
  <Evento on:minhaconta={modoMinhaConta} />
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
  <Administrador on:minhaconta={modoMinhaConta} />
{:else if modo === MODO.DETALHE_PEDIDO}
  <PedidoDetalhe id={idPedido} on:meuspedidos={modoMeusPedidos} />
{:else if modo === MODO.MEUS_DADOS}
  <MeusDados on:minhaconta={modoMinhaConta} />
{:else if modo === MODO.MEUS_EVENTOS}
  <MeusEventos />
{/if}

<BarraInferior />
