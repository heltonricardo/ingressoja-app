<script>
  import MODO from "./ENUM/MODO";
  import BarraSuperior from "./UI/BarraSuperior/BarraSuperior.svelte";
  import GridEventos from "./Evento//GridEventos.svelte";
  import Cadastro from "./Cadastro/Cadastro.svelte";
  import Login from "./Login/Login.svelte";
  import Detalhes from "./Evento/Detalhes.svelte";
  import Evento from "./Cadastro/Evento.svelte";
  import BarraInferior from "./UI/BarraInferior.svelte";
  import MinhaConta from "./Conta/MinhaConta.svelte";
  import FinalizaPedido from "./Pedido/FinalizaPedido.svelte";

  let modo = MODO.FINALIZACAO;
  let id = null;

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
  }

  function modoFinalizacao(event) {

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
  <Detalhes {id} on:voltar={modoNormal} on:finalizacao={modoFinalizacao} />
{:else if modo === MODO.MINHA_CONTA}
  <MinhaConta
    on:voltar={modoNormal}
    on:minhaconta={modoMinhaConta}
    on:novoevento={modoCadastraEvento}
  />
{:else if modo === MODO.NOVO_EVENTO}
  <Evento on:minhaconta={modoMinhaConta} />
{:else if modo === MODO.FINALIZACAO}
  <FinalizaPedido />
{/if}

<BarraInferior />
