<script>
  import MSG from "../ENUM/MSG";
  import Aguarde from "../UI/Aguarde.svelte";
  import ItemEvento from "./ItemEvento.svelte";
  import { getEventos } from "../Conexao/eventoConex";

  export let termoPesquisa = "";
  export let idCategoria = null;

  let eventos = getEventos();

  $: if (termoPesquisa !== "") {
    getEventos().then(
      (data) =>
        (eventos = data.filter((e) =>
          e.titulo.toLowerCase().includes(termoPesquisa)
        ))
    );
  } else if (idCategoria) {
    getEventos().then(
      (data) =>
        (eventos = data.filter((e) => e.categoriaEvento.id === idCategoria))
    );
  } else eventos = getEventos();
</script>

<style>
  .corpo {
    width: 95%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    min-height: calc(100vh - 17rem);
    justify-content: center;
  }

  .conteudo {
    margin: 2rem auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>

<div class="corpo">
  <div class="conteudo">
    {#await eventos}
      <Aguarde />
    {:then eventos}
      {#if eventos.length}
        {#each eventos as evento (evento.id)}
          <ItemEvento {evento} on:vermais />
        {/each}
      {:else}
        {MSG.SEM_EVENTO}
      {/if}
    {/await}
  </div>
</div>
