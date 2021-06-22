<script>
  import ItemEvento from "./ItemEvento.svelte";
  import eventoStore from "../Stores/eventoStore";
</script>

<style>
  .corpo {
    width: 90%;
    margin: 0 auto;
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
    {#each $eventoStore as evento (evento.id)}
      <ItemEvento {evento} on:vermais />
    {/each}
  </div>
</div>
