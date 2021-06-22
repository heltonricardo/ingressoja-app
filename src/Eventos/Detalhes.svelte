<script>
  import eventoStore from "../Stores/eventoStore";
  import { createEventDispatcher } from "svelte";
  import Botao from "../UI/Botao.svelte";
  const dispatch = createEventDispatcher();

  export let id = 1;
  let evento = $eventoStore.find((e) => e.id === id);
</script>

<style>
  #corpo {
    width: 50%;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
  }

  #imagem {
    width: 100%;
    height: 25rem;
    border-radius: 5px;
  }

  #nome {
    margin: 0.5rem 0;
    font-size: 30pt;
  }

  #descricao {
    margin: 3rem 0;
  }
</style>

<div id="corpo">
  <img id="imagem" src={evento.imagemURL} alt={evento.nome} />

  <h1 id="nome">{evento.nome}</h1>

  {#if evento.online}
    <span>Evento On-line</span>
  {:else}
    <span id="local"
      >{evento.bairro}, {evento.cidade}-{evento.uf} • {evento.pais}</span
    >
  {/if}

  <span id="descricao">{evento.descricao}</span>

  <Botao on:click={() => dispatch("voltar")}>Voltar</Botao>
</div>
