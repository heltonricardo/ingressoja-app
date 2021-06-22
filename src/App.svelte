<script>
  import MODO from "./UI/BarraSuperior/MODO";
  import BarraSuperior from "./UI/BarraSuperior/BarraSuperior.svelte";
  import GridEventos from "./Eventos//GridEventos.svelte";
  import Cadastro from "./Cadastro/Cadastro.svelte";
  import Login from "./Login/Login.svelte";
  import Detalhes from "./Eventos/Detalhes.svelte";

  let modo = MODO.CADASTRO;
  // let modo = MODO.NORMAL;
  let id = null;

  function modoNormal() {
    id = null;
    modo = MODO.NORMAL;
  }

  function modoDetalhes(event) {
    id = event.detail;
    modo = MODO.DETALHES;
  }
</script>

<BarraSuperior
  {modo}
  on:voltar={modoNormal}
  on:cadastrese={() => (modo = MODO.CADASTRO)}
  on:entrar={() => (modo = MODO.LOGIN)}
/>

{#if modo === MODO.NORMAL}
  <GridEventos on:vermais={modoDetalhes} />
{:else if modo === MODO.CADASTRO}
  <Cadastro on:voltar={modoNormal} />
{:else if modo === MODO.LOGIN}
  <Login on:voltar={modoNormal} />
{:else if modo === MODO.DETALHES}
  <Detalhes {id} on:voltar={modoNormal} />
{/if}
