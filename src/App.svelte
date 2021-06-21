<script>
  import { ENUM_MODO } from "./UI/BarraSuperior/enums";
  import BarraSuperior from "./UI/BarraSuperior/BarraSuperior.svelte";
  import GridEventos from "./Eventos//GridEventos.svelte";
  import Cadastro from "./Cadastro/Cadastro.svelte";

  let modo = ENUM_MODO.NORMAL;
</script>

<BarraSuperior {modo} on:cadastrese={() => (modo = ENUM_MODO.CADLOGIN)} />

{#if modo === ENUM_MODO.NORMAL}
  <GridEventos />
{:else if modo === ENUM_MODO.CADLOGIN}
  <Cadastro on:voltar={() => (modo = ENUM_MODO.NORMAL)} />
{/if}
