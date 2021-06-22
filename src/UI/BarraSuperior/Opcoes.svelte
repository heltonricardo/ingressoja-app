<script>
  import { createEventDispatcher } from "svelte";
import Botao from "../Botao.svelte";

  const dispatch = createEventDispatcher();
</script>

<style>
  #conteudo {
    display: flex;
    margin-right: 1rem;
  }
</style>

<div id="conteudo">
  <Botao on:click={() => dispatch("cadastrese")}>Cadastre-se</Botao>
  <Botao on:click={() => dispatch("entrar")}>Entrar</Botao>
</div>
