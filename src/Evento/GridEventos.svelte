<script>
  import { getEventos } from "../Conexao/eventoConex";
  import MSG from "../ENUM/MSG"
  import Aguarde from "../UI/Aguarde.svelte";
  import ItemEvento from "./ItemEvento.svelte";
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
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>

<div class="corpo">
  <div class="conteudo">
    {#await getEventos()}
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
