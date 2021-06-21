<script>
  import { ENUM_MODO } from "./UI/BarraSuperior/enums";
  import BarraSuperior from "./UI/BarraSuperior/BarraSuperior.svelte";
  import GridEventos from "./Eventos//GridEventos.svelte";
  import Teste from "./Teste.svelte";
  import Cadastro from "./Cadastro/Cadastro.svelte";

  let modo = ENUM_MODO.CADLOGIN;
</script>

<!-- <Teste /> -->

<BarraSuperior {modo} />
{#if modo === ENUM_MODO.NORMAL}
  <GridEventos />
{:else if modo === ENUM_MODO.CADLOGIN}
  <Cadastro />
{/if}
