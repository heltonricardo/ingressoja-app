<script>
  import { createEventDispatcher } from "svelte";
  import autenticacao from "../../Autenticacao/autenticacao";
  import Botao from "../Botao.svelte";

  const dispatch = createEventDispatcher();

  let logado = autenticacao.estaLogado();

  function deslogar() {
    autenticacao.deslogar();
    logado = autenticacao.estaLogado();
  }
</script>

<style>
  #conteudo {
    display: flex;
    margin: 0.5rem 0;
  }
</style>

<div id="conteudo">
  {#if logado}
    <Botao on:click={() => dispatch("minhaconta")}>Minha Conta</Botao>
    <Botao on:click={deslogar}>Sair</Botao>
  {:else}
    <Botao on:click={() => dispatch("cadastro")}>Cadastre-se</Botao>
    <Botao on:click={() => dispatch("entrar")}>Entrar</Botao>
  {/if}
</div>
