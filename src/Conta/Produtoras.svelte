<script>
  import { maskBr } from "js-brasil";
  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import { createEventDispatcher } from "svelte";
  import { getProdutoras } from "../Conexao/administradorConex";

  const dispatch = createEventDispatcher();

  const produtoras = getProdutoras().then((d) =>
    d.sort((x, y) => {
      const a = x.razaoSocial.toLowerCase();
      const b = y.razaoSocial.toLowerCase();
      return a < b ? -1 : a > b ? 1 : 0;
    })
  );
</script>

<style>
  #corpo {
    width: 40%;
    min-width: 30rem;
    margin: 2rem auto;
    min-height: calc(100vh - 21rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--branco);
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 5px;
  }

  h1 {
    font-size: 3rem;
    align-self: center;
    margin: 1rem 0;
  }

  #tabela {
    border-collapse: collapse;
    text-align: center;
    width: 100%;
    border-radius: 7px;
    overflow: hidden;
    word-break: break-all;
  }

  #tabela td,
  #tabela th {
    border: 1px solid #ddd;
    padding: 8px;
    vertical-align: middle;
  }

  #tabela tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  #tabela tr:nth-child(odd) {
    background-color: var(--branco);
  }

  #tabela tr:hover {
    background-color: #ddd;
  }

  #tabela th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: var(--verde2);
    color: black;
    text-align: center;
    word-break: keep-all;
  }

  #detalhes {
    display: flex;
    justify-content: center;
  }

  #voltar {
    margin: 3rem 0;
  }
</style>

<div id="corpo">
  <h1>Produtoras</h1>
  {#await produtoras}
    <Aguarde />
  {:then produtoras}
    {#if produtoras.length}
      <table id="tabela">
        <tr>
          <th>Razão Social</th>
          <th>CNPJ</th>
          <th>Ações</th>
        </tr>

        {#each produtoras as produtora}
          <tr>
            <td>{produtora.razaoSocial}</td>
            <td>{maskBr.cnpj(produtora.cnpj)}</td>
            <td id="detalhes">
              <Botao>Detalhes</Botao>
            </td>
          </tr>
        {/each}
      </table>
    {:else}
      Não há produtoras para mostrar
    {/if}
  {/await}
  <div id="voltar">
    <Botao on:click={() => dispatch("minhaconta")}>Voltar</Botao>
  </div>
</div>
