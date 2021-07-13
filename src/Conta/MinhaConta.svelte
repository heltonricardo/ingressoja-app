<script>
  import { createEventDispatcher, onMount } from "svelte";
  import autenticacao from "../Autenticacao/autenticacao";
  import TIPOCADASTRO from "../ENUM/TIPOCADASTRO";
  import ContaAdministrador from "./ContaAdministrador.svelte";

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
  <ContaComprador on:meuspedidos on:voltar />
{:else if tipo === TIPOCADASTRO.ADMINISTRADOR}
  <ContaAdministrador on:novacategoria on:voltar />
{:else if tipo === TIPOCADASTRO.PRODUTORA}
  <ContaProdutora on:novoevento on:voltar />
{/if}
