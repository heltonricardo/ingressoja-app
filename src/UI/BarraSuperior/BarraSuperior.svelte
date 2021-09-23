<script>
  import MODO from "../../ENUM/MODO";
  import Pesquisa from "./Pesquisa.svelte";
  import Titulo from "./Titulo.svelte";
  import Opcoes from "./Opcoes.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let modo = MODO.NORMAL;
</script>

<style>
  .barra {
    width: 100%;
    height: fit-content;
    padding: 0.5rem;
    background-color: var(--verde1);

    display: flex;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;

    -webkit-box-shadow: rgba(100, 100, 111, 0.2) 0 0 29px 0;
    -moz-box-shadow: rgba(100, 100, 111, 0.2) 0 0 29px 0;
    box-shadow: rgba(100, 100, 111, 0.2) 0 0 29px 0;
  }

  .um-item {
    justify-content: center;
  }
</style>

<div class="barra" class:um-item={modo !== MODO.NORMAL}>
  <Titulo on:click={() => dispatch("voltar")} />
  {#if modo === MODO.NORMAL}
    <Pesquisa />
    <Opcoes on:cadastro on:entrar on:minhaconta />
  {/if}
</div>
