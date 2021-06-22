<script>
  import ENUM_MODO from "./UI/BarraSuperior/ENUM_MODO";
  import BarraSuperior from "./UI/BarraSuperior/BarraSuperior.svelte";
  import GridEventos from "./Eventos//GridEventos.svelte";
  import Cadastro from "./Cadastro/Cadastro.svelte";
import Login from "./Login/Login.svelte";

  let modo = ENUM_MODO.NORMAL;
</script>

<BarraSuperior
  {modo}
  on:voltar={() => (modo = ENUM_MODO.NORMAL)}
  on:cadastrese={() => (modo = ENUM_MODO.CADASTRO)}
  on:entrar={() => (modo = ENUM_MODO.LOGIN)}
/>

{#if modo === ENUM_MODO.NORMAL}
  <GridEventos />
{:else if modo === ENUM_MODO.CADASTRO}
  <Cadastro on:voltar={() => (modo = ENUM_MODO.NORMAL)} />
{:else if modo === ENUM_MODO.LOGIN}
  <Login on:voltar={() => (modo = ENUM_MODO.NORMAL)} />
{/if}
