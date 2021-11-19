<script>
  import { createEventDispatcher, onMount } from "svelte";

  import TIPOCADASTRO from "../ENUM/TIPOCADASTRO";
  import ContaComprador from "./ContaComprador.svelte";
  import ContaProdutora from "./ContaProdutora.svelte";
  import autenticacao from "../Autenticacao/autenticacao";
  import ContaAdministrador from "./ContaAdministrador.svelte";

  const dispatch = createEventDispatcher();

  onMount(() => {
    if (!autenticacao.estaLogado()) {
      dispatch("voltar");
    }
  });

  const tipo = autenticacao.tipoLogado();
</script>

{#if tipo === TIPOCADASTRO.COMPRADOR}
  <ContaComprador on:meuspedidos on:voltar on:meusdados />
{:else if tipo === TIPOCADASTRO.PRODUTORA}
  <ContaProdutora
    on:voltar
    on:analises
    on:carteira
    on:meusdados
    on:conferencia
    on:cadastroeventos
    on:gerenciaeventos
  />
{:else if tipo === TIPOCADASTRO.ADMINISTRADOR}
  <ContaAdministrador
    on:voltar
    on:novoadm
    on:meusdados
    on:produtoras
    on:compradores
    on:novacategoria
    on:administradores
  />
{/if}
