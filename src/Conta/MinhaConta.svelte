<script>
  import { createEventDispatcher, onMount } from "svelte";
  import autenticacao from "../Autenticacao/autenticacao";
  import TIPOCADASTRO from "../ENUM/TIPOCADASTRO";

  import ContaComprador from "./ContaComprador.svelte";
  import ContaProdutora from "./ContaProdutora.svelte";

  const dispatch = createEventDispatcher();

  onMount(() => {
    if (!autenticacao.estaLogado()) {
      dispatch("voltar");
    }
  });

  const tipo = autenticacao.tipoLogado();
</script>

{#if tipo === TIPOCADASTRO.COMPRADOR}
  <ContaComprador on:voltar />
  {:else}
  <ContaProdutora on:novoevento on:voltar />
{/if}
