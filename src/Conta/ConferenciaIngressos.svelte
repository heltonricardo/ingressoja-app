<script>
  import Swal from "sweetalert2";
  import { onMount } from "svelte";
  import { maskBr } from "js-brasil";
  import QrScanner from "qr-scanner";
  import { createEventDispatcher } from "svelte";

  import MSG from "../ENUM/MSG";
  import Botao from "../UI/Botao.svelte";
  import Icone from "../UI/Icone.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import Entrada from "../UI/Entrada.svelte";
  import MiniBotao from "../UI/MiniBotao.svelte";
  import { valorVirgula } from "../utils/formatador";
  import { onlyNumeros } from "../utils/sanitarizador";
  import { getItensVendidos } from "../Conexao/eventoConex";
  import { extrairDataHora } from "../utils/manipulaDataHora";
  import { utilizarIngresso } from "../Conexao/itemPedidoConex";

  const dispatch = createEventDispatcher();
  QrScanner.WORKER_PATH = "./qr-scanner-worker.min.js";

  export let id;

  let yScroll;
  let qrScanner;
  let videoPreview;
  let listaFiltrada;
  let pesquisa = "";
  let utilizacao = "";
  let evento = getItensVendidos(id);

  async function filtro() {
    const e = await evento;
    return e.itensPedido.filter(
      (i) =>
        i.id.toString().includes(pesquisa) ||
        i.ingressante.toLowerCase().includes(pesquisa.toLowerCase()) ||
        i.cpf.includes(onlyNumeros(pesquisa))
    );
  }

  $: pesquisa, (listaFiltrada = filtro());

  let qntUtilizados = (evento) =>
    evento.itensPedido.filter((i) => i.utilizado).length;

  let qntNaoUtilizados = (evento) =>
    evento.itensPedido.length - qntUtilizados(evento);

  function verMais(ingresso) {
    Swal.fire({
      html: `<style>.titulo {font-weight: bold}</style>
        <p class="titulo">Identificador único do ingresso</p>
        <p>${ingresso.id}</p>
        <br />
        <p class="titulo">Nome do(a) portador(a)</p>
        <p>${ingresso.ingressante}</p>
        <br />
        <p class="titulo">CPF</p>
        <p>${maskBr.cpf(ingresso.cpf)}</p>
        <br />
        <p class="titulo">Ingresso já utilizado?</p>
        <p>${ingresso.utilizado ? "Sim" : "Não"}</p>
        <br />
        <p class="titulo">Tipo de ingresso</p>
        <p>${ingresso.tipoDeIngresso.nome}</p>
        <br />
        <p class="titulo">Valor</p>
        <p>R$ ${valorVirgula(ingresso.tipoDeIngresso.valor)}</p>
        <br />
        <p class="titulo">Descrição do ingresso</p>
        <p>${ingresso.tipoDeIngresso.descricao || "Não possui"}</p>`,
      showCloseButton: true,
      showConfirmButton: false,
    });
  }

  async function utilizar(idIngresso) {
    const opcao = await Swal.fire({
      title: `Realizar check-in do ingresso #${idIngresso}?`,
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    });
    if (opcao.isConfirmed) {
      const sucesso = await utilizarIngresso(idIngresso);
      if (sucesso) {
        const yPosition = yScroll;
        evento = getItensVendidos(id);
        pesquisa = "";
        listaFiltrada = filtro();
        listaFiltrada.then(() => window.scrollTo(0, yPosition));
      }
    }
  }

  function ingressoDoEvento(id, itens) {
    return itens.some((i) => i.id == id);
  }

  async function ler(itensPedido, qr = false) {
    const cod = onlyNumeros(utilizacao);
    if (parseInt(cod))
      if (ingressoDoEvento(cod, itensPedido)) await utilizar(cod);
      else await Swal.fire(MSG.RUIM, MSG.INGRESSO_NAO_PERTENCE, "error");
    qr && qrScanner.start();
  }

  function qrCode() {
    qrScanner.start();
  }

  onMount(() => {
    evento.then((ev) => {
      qrScanner = new QrScanner(videoPreview, (result) => {
        utilizacao = result;
        qrScanner.stop();
        ler(ev.itensPedido, true);
      });
    });
  });
</script>

<style>
  .corpo {
    width: 40%;
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
    text-align: center;
    align-self: center;
    margin: 1rem 0;
  }

  .evento {
    margin: 2rem;
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

  .titulo {
    font-weight: bold;
    white-space: nowrap;
    padding: 1rem;
  }

  .utilizado {
    color: red;
  }

  .detalhes {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .voltar {
    margin: 3rem 0;
  }

  .leitura {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    margin-bottom: 1rem;
  }

  .barra-pesquisa {
    width: fit-content;
    margin-right: 1rem;
  }

  video {
    width: 80%;
    border-radius: 10px;
  }

  .inverte {
    text-align: center;
    -webkit-transform: scaleX(-1);
    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    transform: scaleX(-1);
  }

  .nowrap {
    white-space: nowrap;
  }
</style>

<svelte:window bind:scrollY={yScroll} />
<div class="corpo">
  <h1>Check-in de Ingressos</h1>
  {#await evento}
    <Aguarde />
  {:then evento}
    <table class="evento">
      <tr>
        <td class="titulo">Evento:</td>
        <td class="dado">{evento.titulo}</td>
      </tr>
      <tr>
        <td class="titulo">Início:</td>
        <td class="dado"
          >{extrairDataHora(evento.inicio).dataCompleta} • {extrairDataHora(
            evento.inicio
          ).horario}</td
        >
      </tr>
      <tr>
        <td class="titulo">Término:</td>
        <td class="dado"
          >{extrairDataHora(evento.termino).dataCompleta} • {extrairDataHora(
            evento.termino
          ).horario}</td
        >
      </tr>
      <tr>
        <td class="titulo">Total de ingressos:</td>
        <td class="dado">{evento.totalIngressos}</td>
      </tr>
      <tr>
        <td class="titulo">Ingressos vendidos:</td>
        <td class="dado">{evento.itensPedido.length}</td>
      </tr>
      <tr>
        <td class="titulo">Ingressos utilizados:</td>
        <td class="dado">{qntUtilizados(evento)}</td>
      </tr>
      <tr>
        <td class="titulo">Ingressos não utilizados:</td>
        <td class="dado">{qntNaoUtilizados(evento)}</td>
      </tr>
    </table>
    {#if evento.itensPedido.length}
      <div class="inverte">
        <video bind:this={videoPreview}>
          <track kind="captions" />
        </video>
      </div>
      <div class="leitura">
        <div class="barra-pesquisa">
          <Entrada
            type="number"
            id="utilizacao"
            validar={false}
            value={utilizacao}
            on:input={(e) => (utilizacao = e.target.value)}
            label="Insira o id para realizar check-in ou leia o QR Code"
            on:keypress={(e) =>
              "NumpadEnter".includes(e.code) && ler(evento.itensPedido)}
          />
        </div>
        <Icone icon="ticket-alt" on:click={() => ler(evento.itensPedido)} />
        <Icone icon="qrcode" on:click={qrCode} />
      </div>
      <Entrada
        id="pesquisa"
        type="search"
        validar={false}
        label="Pesquisa (ID | Nome | CPF)"
        on:input={(e) => (pesquisa = e.target.value)}
      />
      <br />
      <table class="tabela">
        <tr>
          <th>Id</th>
          <th>Portador(a)</th>
          <th>CPF</th>
          <th>Utilizado?</th>
          <th>Tipo</th>
          <th>Ações</th>
        </tr>
        {#await listaFiltrada then listaDeItens}
          {#each listaDeItens as item}
            <tr class:utilizado={item.utilizado}>
              <td class="nowrap">{item.id}</td>
              <td>{item.ingressante}</td>
              <td>{maskBr.cpf(item.cpf)}</td>
              <td>{item.utilizado ? "Sim" : "Não"}</td>
              <td>{item.tipoDeIngresso.nome}</td>
              <td>
                <div class="detalhes">
                  {#if !item.utilizado}
                    <MiniBotao on:click={() => utilizar(item.id)}
                      >Check-in</MiniBotao
                    >
                  {/if}
                  <MiniBotao on:click={() => verMais(item)}>Ver mais</MiniBotao>
                </div>
              </td>
            </tr>
          {/each}
        {/await}
      </table>
    {:else}
      <p>Não existem ingressos vendidos para esse evento</p>
    {/if}
  {/await}
  <div class="voltar">
    <Botao on:click={() => dispatch("conferencia")}>Voltar</Botao>
  </div>
</div>
