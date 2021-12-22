<script>
  import Swal from "sweetalert2";
  import { maskBr } from "js-brasil";
  import { createEventDispatcher } from "svelte";

  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import Entrada from "../UI/Entrada.svelte";
  import MiniBotao from "../UI/MiniBotao.svelte";
  import { onlyNumeros } from "../utils/sanitarizador";
  import { getProdutoras } from "../Conexao/administradorConex";

  const dispatch = createEventDispatcher();

  let listaFiltrada;
  let pesquisa = "";
  const produtoras = getProdutoras();

  async function filtro() {
    return (await produtoras).filter(
      (c) =>
        c.id.toString().includes(pesquisa) ||
        c.razaoSocial.toLowerCase().includes(pesquisa.toLowerCase()) ||
        c.cnpj.includes(onlyNumeros(pesquisa))
    );
  }

  $: pesquisa, (listaFiltrada = filtro());

  function detalhes(produtora) {
    Swal.fire({
      title: "Dados da produtora",
      html: `<table
          style="word-break: break-all; width: 100%; text-align: left;">
          <tr>
            <td style="font-weight: bold; white-space: nowrap;">Id:</td>
            <td style="padding: 1rem">${produtora.id}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; white-space: nowrap;">
              Razão social:</td>
            <td style="padding: 1rem">${produtora.razaoSocial}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; white-space: nowrap;">
              Nome fantasia:</td>
            <td style="padding: 1rem">${produtora.nomeFantasia}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; white-space: nowrap;">CNPJ:</td>
            <td style="padding: 1rem">${maskBr.cnpj(produtora.cnpj)}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; white-space: nowrap;">E-mail:</td>
            <td style="padding: 1rem">${produtora.email}</td>
          </tr>
        </table>`,
      showCloseButton: true,
      showConfirmButton: false,
    });
  }
</script>

<style>
  .corpo {
    max-width: 50rem;
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

  .entrada {
    align-self: flex-start;
    width: 20rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .tabela {
    border-collapse: collapse;
    text-align: center;
    width: 100%;
    border-radius: 7px;
    overflow: hidden;
    word-break: break-all;
  }

  .tabela td,
  .tabela th {
    border: 1px solid #ddd;
    padding: 8px;
    vertical-align: middle;
  }

  .tabela tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  .tabela tr:nth-child(odd) {
    background-color: var(--branco);
  }

  .tabela tr:hover {
    background-color: #ddd;
  }

  .tabela th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: var(--verde2);
    color: black;
    text-align: center;
    word-break: keep-all;
  }

  .detalhes {
    display: flex;
    justify-content: center;
  }

  .voltar {
    margin: 3rem 0;
  }
</style>

<div class="corpo">
  <h1>Produtoras</h1>
  <div class="entrada">
    <Entrada
      id="pesquisa"
      type="search"
      validar={false}
      label="Pesquisa (ID | Razão Social | CNPJ)"
      on:input={(e) => (pesquisa = e.target.value)}
    />
  </div>
  
  {#await listaFiltrada}
    <Aguarde />
  {:then listaCompradores}
    {#if listaCompradores.length}
      <table class="tabela">
        <tr>
          <th>Id</th>
          <th>Razão Social</th>
          <th>CNPJ</th>
          <th>Ações</th>
        </tr>

        {#each listaCompradores as produtora}
          <tr>
            <td>{produtora.id}</td>
            <td>{produtora.razaoSocial}</td>
            <td>{maskBr.cnpj(produtora.cnpj)}</td>
            <td class="detalhes">
              <MiniBotao on:click={() => detalhes(produtora)}
                >Detalhes</MiniBotao
              >
            </td>
          </tr>
        {/each}
      </table>
    {:else}
      Não há produtoras para mostrar
    {/if}
  {/await}
  <div class="voltar">
    <Botao on:click={() => dispatch("minhaconta")}>Voltar</Botao>
  </div>
</div>
