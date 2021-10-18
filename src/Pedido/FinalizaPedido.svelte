<script>
  import Swal from "sweetalert2";
  import validator from "validator";
  import { validateBr } from "js-brasil";
  import { createEventDispatcher } from "svelte";

  import MSG from "../ENUM/MSG";
  import Botao from "../UI/Botao.svelte";
  import Entrada from "../UI/Entrada.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import CardIngresso from "./CardIngresso.svelte";
  import { postPedido } from "../Conexao/pedidoConex";
  import { onlyLetrasEEspacos, onlyNumeros } from "../utils/sanitarizador";

  const dispatch = createEventDispatcher();

  export let evento;

  let pedido = {};
  let carregando = false;

  /************************* CRIAÇÃO DE CADA INGRESSO *************************/

  let ordem = 0;
  let ingressos = evento.tiposDeIngresso.flatMap((t) => {
    const tmp = [];
    for (let i = 0; i < t.quantidade; i++) {
      tmp.push({ id: t.id, nome: t.nome, valor: t.valor, ordem });
      ++ordem;
    }
    return tmp;
  });

  /************************** VOLTAR COM CONFIRMAÇÃO **************************/

  function voltar() {
    Swal.fire({
      title: MSG.CERTEZA,
      text: MSG.PERDER_INFO,
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      cancelButtonText: "Cancelar",
    }).then((volte) => volte.isConfirmed && dispatch("voltar"));
  }

  /***************************** EFETIVAR PEDIDO ******************************/

  async function concluir() {
    carregando = true;

    pedido.numeroCartao = onlyNumeros(pedido.numeroCartao);
    pedido.codigoCartao = onlyNumeros(pedido.codigoCartao);
    pedido.cpfTitular = onlyNumeros(pedido.cpfTitular);

    let itensPedido = ingressos.map((i) => ({
      idTipoDeIngresso: i.id,
      ingressante: i.ingressante,
      cpf: onlyNumeros(i.cpf),
    }));

    pedido = { ...pedido, itensPedido, idEvento: evento.id };

    const res = await postPedido(pedido);
    if (res) {
      dispatch("meuspedidos");
    }
    carregando = false;
  }

  /*************************** VALIDAÇÃO DE CAMPOS ****************************/

  pedido.numeroCartao = "";
  pedido.codigoCartao = "";
  pedido.nomeTitular = "";
  pedido.cpfTitular = "";

  $: numeroCartaoValido = validator.isCreditCard(pedido.numeroCartao);
  $: codigoCartaoValido =
    validator.isLength(pedido.codigoCartao.trim(), { min: 3, max: 4 }) &&
    validator.isNumeric(pedido.codigoCartao);
  $: nomeTitularValido =
    validator.isLength(pedido.nomeTitular.trim(), { min: 1, max: 255 }) &&
    validator.isAlpha(pedido.nomeTitular, "pt-BR", { ignore: " " });
  $: cpfTitularValido = validateBr.cpf(pedido.cpfTitular);

  $: formularioValido =
    numeroCartaoValido &&
    codigoCartaoValido &&
    nomeTitularValido &&
    cpfTitularValido &&
    ingressos.every((i) => i.valido);
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
    min-height: calc(100vh - 20rem);
  }

  #titulo {
    margin: 2rem 0;
    font-size: 3rem;
    text-align: center;
  }

  #subtitulo {
    margin: 2rem 0;
    text-align: center;
  }

  #botoes {
    margin: 3rem 0;
    display: flex;
    justify-content: space-around;
  }
</style>

{#if carregando}
  <Aguarde />
{/if}

<div id="corpo">
  <h1 id="titulo">Detalhes de Ingresso</h1>
  <h3 id="subtitulo">Insira os dados de cada ingressante:</h3>

  {#each [...Array(ingressos.length).keys()] as x}
    <CardIngresso bind:ingresso={ingressos[x]} />
  {/each}

  <h1 id="titulo">Detalhes de Pagamento</h1>
  <h3 id="subtitulo">Insira os dados do cartão de crédito:</h3>

  <Entrada
    id="numeroCartao"
    label="Número do cartão"
    on:input={(event) => (pedido.numeroCartao = event.target.value)}
    valido={numeroCartaoValido}
    mensagemValidacao="Insira um número de cartão de crédito válido"
    maxlength="19"
  />
  <Entrada
    id="codigoCartao"
    label="Código de segurança"
    type="number"
    on:input={(event) => (pedido.codigoCartao = event.target.value)}
    valido={codigoCartaoValido}
    mensagemValidacao="Insira um código de segurança válido"
    maxlength="4"
  />
  <Entrada
    id="nomeTitular"
    label="Titular (como consta no cartão)"
    on:input={(event) => (pedido.nomeTitular = event.target.value)}
    valido={nomeTitularValido}
    mensagemValidacao="Insira um titular válido"
  />
  <Entrada
    id="cpfTitular"
    label="CPF do titular"
    on:input={(event) => (pedido.cpfTitular = event.target.value)}
    valido={cpfTitularValido}
    mensagemValidacao="Insira um CPF válido"
  />

  <div id="botoes">
    <Botao on:click={voltar}>Página principal</Botao>
    <Botao on:click={concluir} habilitado={formularioValido}
      >Concluir pedido</Botao
    >
  </div>
</div>
