<script>
  import swal from "sweetalert";
  import MSG from "../ENUM/MSG";
  import { createEventDispatcher } from "svelte";
  import eventoStore from "../Store/eventoStore";
  import Botao from "../UI/Botao.svelte";
  import Entrada from "../UI/Entrada.svelte";
  import CardIngresso from "./CardIngresso.svelte";

  const dispatch = createEventDispatcher();

  /************************************/
  export let evento = $eventoStore[1];
  evento.tiposDeIngresso.map((t) => (t.quantidade = 1));
  /************************************/

  let pedido = {};

  let ordem = 0;
  let ingressos = evento.tiposDeIngresso.flatMap((t) => {
    const tmp = [];
    for (let i = 0; i < t.quantidade; i++) {
      tmp.push({ id: t.id, nome: t.nome, valor: t.valor, ordem });
      ++ordem;
    }
    return tmp;
  });

  function voltar() {
    swal({
      title: MSG.CERTEZA,
      text: MSG.PERDER_INFO,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((volte) => volte && dispatch("voltar"));
  }

  async function concluir() {
    carregando = true;

    let itensPedido = ingressos.map((i) => ({
      idTipoDeIngresso: i.id,
      ingressante: i.ingressante,
      email: i.email,
      cpf: i.cpf,
    }));
    
    const pack = { ...pedido, itensPedido };

    const res = await postComprador({ nome, cpf, email, senha });
    carregando = false;
    if (res) {
      await autenticacao.logar({ email, senha }, false);
      dispatch("voltar");
    }
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
  />
  <Entrada
    id="codigoSegurancaCartao"
    label="Código de segurança"
    type="number"
    on:input={(event) => (pedido.codigoSegurancaCartao = event.target.value)}
  />
  <Entrada
    id="nomeTitular"
    label="Titular (como consta no cartão)"
    on:input={(event) => (pedido.nomeTitular = event.target.value)}
  />
  <Entrada
    id="cpfTitular"
    label="CPF do titular"
    on:input={(event) => (pedido.cpfTitular = event.target.value)}
  />

  <div id="botoes">
    <Botao on:click={voltar}>Página principal</Botao>
    <Botao on:click={concluir}>Concluir pedido</Botao>
  </div>
</div>
