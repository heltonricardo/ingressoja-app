<script>
  import Swal from "sweetalert2";
  import { maskBr } from "js-brasil";

  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import Entrada from "../UI/Entrada.svelte";
  import { createEventDispatcher } from "svelte";
  import MiniBotao from "../UI/MiniBotao.svelte";
  import { onlyNumeros } from "../utils/sanitarizador";
  import { getCompradores } from "../Conexao/administradorConex";

  const dispatch = createEventDispatcher();

  let listaFiltrada;
  let pesquisa = "";
  const compradores = getCompradores();

  async function filtro() {
    return (await compradores).filter(
      (c) =>
        c.id.toString().includes(pesquisa) ||
        c.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
        c.cpf.includes(onlyNumeros(pesquisa))
    );
  }

  $: pesquisa, (listaFiltrada = filtro());

  function detalhes(comprador) {
    Swal.fire({
      title: "Dados do comprador",
      html: `<table
      style="word-break: break-all; width: 100%; text-align: left;">
          <tr>
            <td style="font-weight: bold; white-space: nowrap;">Id:</td>
            <td style="padding: 1rem">${comprador.id}</td>
          </tr>
          <tr>
            <td style="font-weight: bold; white-space: nowrap;">Nome:</td>
            <td style="padding: 1rem">${comprador.nome}</td>
          </tr style="padding: 1rem">
          <tr>
            <td style="font-weight: bold; white-space: nowrap;">E-mail:</td>
            <td style="padding: 1rem">${comprador.email}</td>
          </tr>
          <tr style="padding: 1rem">
            <td style="font-weight: bold; white-space: nowrap;">CPF:</td>
            <td style="padding: 1rem">${maskBr.cpf(comprador.cpf)}</td>
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
  <h1>Compradores</h1>
  <div class="entrada">
    <Entrada
      id="pesquisa"
      type="search"
      validar={false}
      label="Pesquisa (ID | Nome | CPF)"
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
          <th>Nome</th>
          <th>CPF</th>
          <th>Ações</th>
        </tr>

        {#each listaCompradores as comprador}
          <tr>
            <td>{comprador.id}</td>
            <td>{comprador.nome}</td>
            <td>{maskBr.cpf(comprador.cpf)}</td>
            <td class="detalhes">
              <MiniBotao on:click={() => detalhes(comprador)}
                >Detalhes</MiniBotao
              >
            </td>
          </tr>
        {/each}
      </table>
    {:else}
      Não há compradores para mostrar
    {/if}
  {/await}
  <div class="voltar">
    <Botao on:click={() => dispatch("minhaconta")}>Voltar</Botao>
  </div>
</div>
