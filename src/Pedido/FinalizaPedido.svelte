<script>
  import Swal from "sweetalert2";
  import { createEventDispatcher } from "svelte";

  import MSG from "../ENUM/MSG";
  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import CardIngresso from "./CardIngresso.svelte";
  import { postPedido } from "../Conexao/pedidoConex";
  import { onlyNumeros } from "../utils/sanitarizador";

  const dispatch = createEventDispatcher();

  export let evento;

  let carregando = false;
  let tocarCampos = false;

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

  /*************************** VALIDAÇÃO DE CAMPOS ****************************/

  $: formularioValido = ingressos.every((i) => i.valido);

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
    if (!formularioValido) {
      tocarCampos = true;
      return;
    }

    carregando = true;

    let itensPedido = ingressos.map((i) => ({
      idTipoDeIngresso: i.id,
      ingressante: i.ingressante,
      cpf: onlyNumeros(i.cpf),
    }));

    let pedido = { itensPedido, idEvento: evento.id };

    const res = await postPedido(pedido);
    if (res) {
      console.log(res);
      dispatch("meuspedidos");
    }
    carregando = false;
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
    justify-content: center;
  }
</style>

{#if carregando}
  <Aguarde />
{/if}

<div id="corpo">
  <h1 id="titulo">Detalhes de Ingresso</h1>
  <h3 id="subtitulo">Insira os dados de cada ingressante:</h3>

  {#each [...Array(ingressos.length).keys()] as x}
    <CardIngresso {tocarCampos} bind:ingresso={ingressos[x]} />
  {/each}

  <div id="botoes">
    <Botao on:click={voltar}>Cancelar</Botao>
    <Botao on:click={concluir} invalido={!formularioValido}
      >Efetuar pedido</Botao
    >
  </div>
</div>
