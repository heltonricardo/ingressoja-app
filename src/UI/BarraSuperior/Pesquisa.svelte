<script>
  import { createEventDispatcher } from "svelte";

  import Icone from "../Icone.svelte";

  const dispatch = createEventDispatcher();

  let termo = "";

  function pesquisar() {
    dispatch("pesquisar", termo.trim().toLowerCase());
  }

  $: if (termo === "") pesquisar();
</script>

<style>
  #conteudo {
    display: flex;
    height: inherit;
    align-items: center;
  }

  #entrada {
    border-radius: 5px;
    height: 3rem;
    width: 23rem;
    font-family: inherit;
    font-size: 1.5rem;
    margin-right: 1rem;
    outline: none;
    background-color: var(--verde2);
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>

<div id="conteudo">
  <input
    on:keypress={(e) => e.code === "Enter" && pesquisar()}
    bind:value={termo}
    id="entrada"
    type="search"
    placeholder="Procure um evento..."
  />
  <Icone icon="search" on:click={pesquisar} />
</div>
