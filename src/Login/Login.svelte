<script>
  import { createEventDispatcher } from "svelte";
  import Botao from "../UI/Botao.svelte";
  import Entrada from "../UI/Entrada.svelte";

  const dispatch = createEventDispatcher();
</script>

<style>
  #corpo {
    width: 50%;
    margin: 2rem auto;
  }
</style>

<div id="corpo">
  <Entrada id="email" label="E-mail" />
  <Entrada id="senha" label="Senha" type="password" />

  <Botao on:click={() => dispatch("voltar")}>Voltar</Botao>
  <Botao>Finalizar</Botao>
</div>
