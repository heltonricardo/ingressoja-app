<script>
  import { createEventDispatcher } from "svelte";
  import { postCategoriaEvento } from "../Conexao/categoriaEventoConex";
  import { getCategoriasEvento } from "../Conexao/categoriaEventoConex";
  import Aguarde from "../UI/Aguarde.svelte";
  import Botao from "../UI/Botao.svelte";
  import Entrada from "../UI/Entrada.svelte";

  const dispatch = createEventDispatcher();

  let carregando = false;

  let nome = "";

  async function carregaCategorias() {
    return await getCategoriasEvento();
  }

  async function cadastrar() {
    carregando = true;
    const sucesso = await postCategoriaEvento({ nome });
    if (sucesso) categorias = carregaCategorias();
    carregando = false;
  }

  let categorias = carregaCategorias();
</script>

<style>
  #corpo {
    width: 35%;
    min-width: 30rem;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    background-color: var(--branco);
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 5px;
  }

  h1 {
    font-size: 3rem;
    align-self: center;
    margin: 2rem 0 3rem 0;
  }

  #tabela {
    border-collapse: collapse;
    text-align: center;
    width: 100%;
  }

  #tabela td,
  #tabela th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  #tabela tr:nth-child(even) {
    background-color: #f2f2f2;
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
  }

  #nova {
    margin: 2rem 0;
  }

  #cadastrar {
    display: flex;
    justify-content: flex-end;
  }

  #voltar {
    align-self: center;
    margin: 2rem 0;
  }
</style>

{#if carregando}
  <Aguarde />
{/if}

<div id="corpo">
  <h1>Categorias de Evento</h1>
  {#await categorias}
    <Aguarde />
  {:then categorias}
    {#if categorias.length}
      <table id="tabela">
        <tr>
          <th>Categoria</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>

        {#each categorias as categoria}
          <tr>
            <td>{categoria.id}</td>
            <td>{categoria.nome}</td>
            <td>-</td>
          </tr>
        {/each}
      </table>
    {:else}
      Não há categorias para mostrar
    {/if}
  {/await}

  <div id="nova">
    <Entrada
      id="nome"
      label="Insira o nome de uma categoria para cadastrar:"
      on:input={(event) => (nome = event.target.value)}
    />
    <div id="cadastrar">
      <Botao on:click={cadastrar}>Cadastrar Categoria</Botao>
    </div>
  </div>

  <div id="voltar">
    <Botao on:click={() => dispatch("minhaconta")}>Voltar</Botao>
  </div>
</div>