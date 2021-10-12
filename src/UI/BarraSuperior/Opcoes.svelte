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
  tr,
  td {
    text-align: center;
    vertical-align: middle;
  }

  #segunda-linha {
    padding-top: 0.3rem;
  }

  button {
    border: none;
    font-size: 12pt;
    font-family: "Poppins", sans-serif;
    background-color: transparent;
  }

  button:hover {
    cursor: pointer;
    font-weight: bolder;
  }
</style>

<table>
  <tr>
    {#if logado}
      <td>
        <Botao on:click={() => dispatch("minhaconta")}>Minha Conta</Botao>
      </td>
      <td>
        <Botao on:click={deslogar}>Sair</Botao>
      </td>
    {:else}
      <td>
        <Botao on:click={() => dispatch("cadastro")}>Cadastre-se</Botao>
      </td>
      <td>
        <Botao on:click={() => dispatch("entrar")}>Entrar</Botao>
      </td>
    {/if}
  </tr>
  <tr>
    <td colspan="2" id="segunda-linha">
      <button>Verificar meu ingresso</button>
    </td>
  </tr>
</table>
