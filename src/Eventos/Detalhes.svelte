<script>
  import eventoStore from "../Stores/eventoStore";
  import { createEventDispatcher } from "svelte";
  import Botao from "../UI/Botao.svelte";
  const dispatch = createEventDispatcher();

  export let id;
  let evento = $eventoStore.find((e) => e.id === id);
</script>

<h1>{evento.nome}</h1>
<Botao on:click={() => dispatch("voltar")}>Voltar</Botao>
