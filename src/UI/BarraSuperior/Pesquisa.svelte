<script>
  import { createEventDispatcher } from "svelte";

  import Icone from "../Icone.svelte";

  const dispatch = createEventDispatcher();

  let termo = "";

  function pesquisar() {
    dispatch("pesquisar", termo.trim().toLowerCase());
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
    padding-top: 0.5rem;
  }

  #filtro:hover {
    cursor: pointer;
    font-weight: bolder;
  }
</style>

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
      <a id="filtro"> Filtrar por categoria </a>
    </td>
  </tr>
</table>
