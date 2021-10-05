<script>
  import Swal from "sweetalert2";
  import validator from "validator";
  import { createEventDispatcher } from "svelte";

  import {
    putCategoriaEvento,
    getCategoriasEvento,
    postCategoriaEvento,
    deleteCategoriaEvento,
  } from "../Conexao/categoriaEventoConex";
  import MSG from "../ENUM/MSG";
  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import Entrada from "../UI/Entrada.svelte";
  import MiniBotao from "../UI/MiniBotao.svelte";

  const dispatch = createEventDispatcher();

  let nome = "";
  let carregando = false;
  let categorias = getCategoriasEvento();

  $: nomeValido = validator.isLength(nome.trim(), { min: 1, max: 50 });

  async function cadastrar() {
    carregando = true;
    nome = nome.trim();
    const sucesso = await postCategoriaEvento({ nome });
    if (sucesso) {
      categorias = await getCategoriasEvento();
      nome = "";
    }
    carregando = false;
  }

  async function editar(categoria) {
    const { value: novoNome } = await Swal.fire({
      title: "Entre o novo nome para essa categoria",
      input: "text",
      inputValue: categoria.nome,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) return "Insira um nome de 1 a 50 caracteres";
        else if (value === categoria.nome)
          return "Para manter o mesmo nome, clique em cancelar";
      },
    });
    let res;
    if (novoNome) {
      carregando = true;
      res = await putCategoriaEvento({ nome: novoNome }, categoria.id);
    }
    if (res) categorias = getCategoriasEvento();
    carregando = false;
  }

  async function excluir(categoria) {
    Swal.fire({
      title: MSG.CERTEZA,
      text: MSG.EXCLUIR,
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      focusCancel: true,
    })
      .then((temCerteza) => {
        if (temCerteza.isConfirmed) {
          carregando = true;
          deleteCategoriaEvento(categoria.id).then((res) => {
            if (res) categorias = getCategoriasEvento();
          });
        }
      })
      .then(() => (carregando = false));
  }
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
    min-height: calc(100vh - 21rem);
  }

  h1 {
    font-size: 3rem;
    align-self: center;
    text-align: center;
    margin: 2rem 0 3rem 0;
  }

  #tabela {
    word-break: break-all;
    border-collapse: collapse;
    text-align: center;
    width: 100%;
  }

  #tabela td,
  #tabela th {
    padding: 8px;
    vertical-align: middle;
    border: 1px solid #ddd;
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

  #acoes {
    display: flex;
    justify-content: center;
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
            <td>#{categoria.id}</td>
            <td>{categoria.nome}</td>
            <td id="acoes">
              <MiniBotao on:click={() => editar(categoria)}>Editar</MiniBotao>
              <MiniBotao on:click={() => excluir(categoria)}>Excluir</MiniBotao>
            </td>
          </tr>
        {/each}
      </table>
    {:else}
      Não há categorias para mostrar
    {/if}
  {/await}

  {#if !carregando}
    <div id="nova">
      <Entrada
        id="nome"
        label="Insira o nome de uma categoria para cadastrar:"
        value={nome}
        valido={nomeValido}
        mensagemValidacao="Insira um nome de 1 a 50 caracteres"
        on:input={(event) => (nome = event.target.value)}
        maxlength="50"
      />
      <div id="cadastrar">
        <Botao on:click={cadastrar} habilitado={nomeValido}
          >Cadastrar Categoria</Botao
        >
      </div>
    </div>
  {/if}

  <div id="voltar">
    <Botao on:click={() => dispatch("minhaconta")}>Voltar</Botao>
  </div>
</div>
