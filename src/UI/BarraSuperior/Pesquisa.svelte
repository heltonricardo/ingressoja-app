<script>
  import Swal from "sweetalert2";
  import { createEventDispatcher } from "svelte";

  import Icone from "../Icone.svelte";
  import Aguarde from "../Aguarde.svelte";
  import { getCategoriasEvento } from "../../Conexao/categoriaEventoConex";

  const dispatch = createEventDispatcher();

  let termo = "";
  let categorias;
  let carregando = false;

  function pesquisar() {
    carregando = true;
    setTimeout(() => {
      carregando = false;
      dispatch("pesquisar", termo.trim().toLowerCase());
    }, 1000);
  }

  async function abrirCategorias() {
    carregando = true;
    categorias = await getCategoriasEvento();
    const opcoes = categorias.reduce(
      (acc, curr) => {
        acc[curr.id] = curr.nome;
        return acc;
      },
      { 0: "Todas" }
    );
    carregando = false;
    const { value: idCategoria } = await Swal.fire({
      title: "Selecione uma categoria de evento para filtrar",
      input: "select",
      showCancelButton: true,
      inputOptions: opcoes,
    });

    if (idCategoria) {
      carregando = true;
      setTimeout(() => {
        carregando = false;
        dispatch("filtrar", Number(idCategoria));
      }, 1000);
    }
  }

  $: if (termo === "") pesquisar();
</script>

<style>
  tr,
  td {
    text-align: center;
    vertical-align: middle;
  }

  #entrada {
    border-radius: 5px;
    height: 3rem;
    width: 23rem;
    font-family: inherit;
    font-size: 1.5rem;
    margin-right: 1rem;
    outline: none;
    background-color: var(--verde2);
    padding-left: 1rem;
    padding-right: 1rem;
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

{#if carregando}
  <Aguarde />
{/if}

<table>
  <tr>
    <td>
      <input
        on:keypress={(e) => e.code === "Enter" && pesquisar()}
        bind:value={termo}
        id="entrada"
        type="search"
        placeholder="Procure um evento..."
      />
    </td>
    <td>
      <Icone icon="search" on:click={pesquisar} />
    </td>
  </tr>
  <tr>
    <td id="segunda-linha">
      <button on:click={abrirCategorias}>Filtrar por categoria</button>
    </td>
  </tr>
</table>
