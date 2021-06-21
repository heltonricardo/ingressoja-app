<script>
  import { ENUM_MODO } from "./enums";
  import Pesquisa from "./Pesquisa.svelte";
  import Titulo from "./Titulo.svelte";
  import Opcoes from "./Opcoes.svelte";

  export let modo = ENUM_MODO.NORMAL;
</script>

<style>
  .barra {
    width: 100%;
    height: 7rem;

    background-color: var(--verde1);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .um-item {
    justify-content: center;
  }
</style>

<div class="barra" class:um-item={modo === ENUM_MODO.CADLOGIN}>
  {#if modo === ENUM_MODO.NORMAL}
    <Titulo />
    <Pesquisa />
    <Opcoes />
  {:else if modo === ENUM_MODO.CADLOGIN}
    <Titulo />
  {/if}
</div>
