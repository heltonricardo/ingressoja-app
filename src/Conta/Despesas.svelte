<script>
  import Swal from "sweetalert2";
  import validator from "validator";
  import { createEventDispatcher } from "svelte";

  import MSG from "../ENUM/MSG";
  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import MiniBotao from "../UI/MiniBotao.svelte";
  import { valorVirgula } from "../utils/formatador";
  import { deleteDespesa } from "../Conexao/despesaConex";
  import { getDespesas, postDespesa } from "../Conexao/eventoConex";

  const dispatch = createEventDispatcher();

  export let idEvento;

  let valor = 0.0;
  let descricao = "";
  let carregando = false;
  let valorTocado = false;
  let descricaoTocada = false;
  let evento = getDespesas(idEvento);

  $: valorValido = validator.isNumeric(valor + "") && valor >= 0.01;
  $: descricaoValida = validator.isLength(descricao.trim(), {
    min: 1,
    max: 50,
  });
  $: formularioValido = valorValido && descricaoValida;

  function resetForm() {
    descricaoTocada = valorTocado = false;
    descricao = "";
    valor = 0.0;
  }

  /******************************** CADASTRAR *********************************/

  async function cadastrar() {
    if (!formularioValido) {
      descricaoTocada = valorTocado = true;
      return;
    }

    carregando = true;
    const sucesso = await postDespesa(idEvento, { descricao, valor });
    if (sucesso) {
      evento = getDespesas(idEvento);
      resetForm();
    }
    carregando = false;
  }

  /********************************* EXCLUIR **********************************/

  async function excluir(id) {
    const opcao = await Swal.fire({
      icon: "warning",
      focusCancel: true,
      title: MSG.CERTEZA,
      showCancelButton: true,
      text: MSG.EXCLUIR_DESPESA,
      cancelButtonText: "Cancelar",
    });

    if (opcao.isConfirmed)
      (await deleteDespesa(id)) && (evento = getDespesas(idEvento));
  }

  function detalhar() {
    Swal.fire({
      title: "💰 Taxa de serviços IngressoJá!",
      text: `Esse valor refere-se à taxa fixa de 10% cobrada pela Plataforma
      IngressoJá! sobre cada pedido processado de um evento.`,
      icon: "info",
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

  h1,
  h2 {
    font-size: 3rem;
    text-align: center;
    align-self: center;
    margin: 1rem 0 3rem 0;
  }

  h2 {
    font-size: 1.5rem;
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
    flex-direction: column;
    align-items: center;
  }

  .cadastrar {
    display: flex;
    justify-content: center;
  }

  .voltar {
    margin: 3rem 0;
  }

  input {
    display: block;
    width: calc(100% - 0.5rem);
    font: inherit;
    border: none;
    border-bottom: 2px solid #ccc;
    border-radius: 3px 3px 0 0;
    background: var(--cinza0-5);
    padding: 0.15rem 0.25rem;
    transition: border-color 0.1s ease-out;
    resize: none;
  }

  input:focus {
    border-color: var(--roxo1);
    outline: none;
  }

  input:disabled {
    border-color: var(--cinza0-5);
    outline: none;
    cursor: no-drop;
  }

  .valid {
    border-color: rgb(0, 192, 10);
    background: #e3fde9;
  }

  .invalid {
    border-color: red;
    background: #fde3e3;
  }

  .error-message {
    color: red;
    margin: 0.25rem 0;
  }

  .dinheiro {
    display: flex;
  }

  .dinheiro span {
    display: flex;
    min-width: fit-content;
    align-items: center;
    padding-right: 0.2rem;
  }

  .total-despesas {
    font-size: 1.35rem;
  }
</style>

{#if carregando}
  <Aguarde />
{/if}

<div class="corpo">
  <h1>Despesas</h1>
  {#await evento}
    <Aguarde />
  {:then evento}
    <h2>
      {evento.titulo}
    </h2>
    <table class="tabela">
      <tr>
        <th>Descrição</th>
        <th>Valor</th>
        <th>Ações</th>
      </tr>
      {#if evento.despesas.length}
        {#each evento.despesas as despesa}
          <tr>
            <td>{despesa.descricao}</td>
            <td>R$ {valorVirgula(despesa.valor)}</td>
            <td>
              <div class="detalhes">
                {#if despesa.descricao !== "Taxa de serviços IngressoJá!"}
                  <MiniBotao on:click={() => excluir(despesa.id)}
                    >Excluir</MiniBotao
                  >
                {:else}
                  <MiniBotao on:click={detalhar}>Detalhes</MiniBotao>
                {/if}
              </div>
            </td>
          </tr>
        {/each}
      {/if}
      <tr>
        <td>
          <input
            type="text"
            id="descricao"
            bind:value={descricao}
            on:blur={() => (descricaoTocada = true)}
            class:valid={descricaoValida && descricaoTocada}
            class:invalid={!descricaoValida && descricaoTocada}
          />
          {#if descricaoTocada && !descricaoValida}
            <p class="error-message">Insira uma descrição válida</p>
          {/if}
        </td>
        <td>
          <div class="dinheiro">
            <span>R$</span>
            <input
              id="valor"
              type="number"
              min="0.01"
              bind:value={valor}
              on:blur={() => (valorTocado = true)}
              class:valid={valorValido && valorTocado}
              class:invalid={!valorValido && valorTocado}
              on:keypress={(e) => "NumpadEnter".includes(e.code) && cadastrar()}
            />
          </div>
          {#if valorTocado && !valorValido}
            <p class="error-message">Insira um valor válido</p>
          {/if}
        </td>
        <td>
          <div class="cadastrar">
            <MiniBotao on:click={cadastrar} invalido={!formularioValido}
              >Cadastrar</MiniBotao
            >
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <span class="total-despesas">
            Total das despesas: R$ {valorVirgula(evento.totalDespesas)}
          </span>
        </td>
      </tr>
    </table>
  {/await}
  <div class="voltar">
    <Botao on:click={() => dispatch("gerenciaeventos")}>Voltar</Botao>
  </div>
</div>
