<script>
  import ItemEvento from "./ItemEvento.svelte";
  import eventoStore from "../Stores/eventoStore";
</script>

<style>
  .corpo {
    margin: 1.5rem auto;
    width: 50%;
  }

  .conteudo {
    margin: 0 auto;
    width: 80%;
    display: block;
    justify-content: center;
  }
</style>

<div class="corpo">
  <div class="conteudo">
    {#each $eventoStore as evento (evento.id)}
      <ItemEvento {evento} />
    {/each}
  </div>
</div>
