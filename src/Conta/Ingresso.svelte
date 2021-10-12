<script>
  import { onMount } from "svelte";
  import { maskBr } from "js-brasil";
  import QrCreator from "qr-creator";

  import { valorVirgula } from "../utils/formatador";
  import { extrairDataHora } from "../utils/manipulaDataHora";

  let qrElemento;

  export let dados;
  export let i;

  const qrConfig = {
    text: `${dados.itensPedido[i].id}`,
    radius: 0.33,
    ecLevel: "L",
    fill: "#6b2284",
    background: null,
    size: 128,
  };

  onMount(() => QrCreator.render(qrConfig, qrElemento));
</script>

<style>
  #ingresso {
    width: 360px;
    min-width: 360px;
    max-width: 360px;
    height: fit-content;
    background-color: var(--roxo0-1);
    border: 3px solid var(--roxo2);
    border-radius: 5px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
  }

  #cabecalho {
    margin: 15px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  #titulo {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 4px;
  }

  #inicio,
  #online,
  #end2,
  #cpf {
    margin-bottom: 20px;
  }

  #end1 {
    margin-bottom: 5px;
  }

  #ingressoja {
    text-align: end;
    color: var(--roxo2);
    font-weight: bold;
  }

  hr {
    width: 100%;
    border: none;
    margin: 0;
    border-top: 3px dotted var(--roxo2);
  }

  #infos {
    padding: 10px;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: var(--verde1);
    overflow: hidden;
  }

  #individual {
    font-style: italic;
    font-weight: bold;
    margin-top: 5px;
    margin-bottom: 10px;
  }

  #nomeIngresso {
    margin-bottom: 10px;
  }

  #valor {
    margin-bottom: 30px;
  }

  #cortesia {
    color: red;
    font-weight: bold;
  }

  #sensivel {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #ingressante {
    font-weight: bold;
    margin-bottom: 10px;
  }

  #id {
    margin-top: 10px;
    font-size: 16px;
    font-weight: bold;
  }
</style>

<div id="ingresso">
  <div id="cabecalho">
    <span id="titulo">{dados.evento.titulo}</span>
    <span id="inicio"
      >{extrairDataHora(dados.evento.inicio).dataCompleta} • {extrairDataHora(
        dados.evento.inicio
      ).horario} (GMT-3)</span
    >
    {#if dados.evento.online}
      <span id="online">Evento Online</span>
    {:else}
      <span id="end1"
        >{dados.evento.logradouro}, {dados.evento.numero} - {dados.evento
          .bairro}</span
      >
      <span id="end2"
        >{dados.evento.cidade}-{dados.evento.uf}. CEP: {dados.evento.cep}</span
      >
    {/if}
    <span id="ingressoja">Distribuição: IngressoJá!</span>
  </div>

  <hr />

  <div id="infos">
    <span id="individual">Ingresso Individual</span>
    <span id="nomeIngresso"
      >Tipo: {dados.itensPedido[i].tipoDeIngresso.nome}</span
    >
    <span id="valor"
      >Preço: R$ {valorVirgula(dados.itensPedido[i].tipoDeIngresso.valor)}
      <span id="cortesia">
        {#if !dados.itensPedido[i].tipoDeIngresso.valor}
          Cortesia (venda proibida)
        {/if}
      </span>
    </span>
    <div id="sensivel">
      <span id="ingressante">{dados.itensPedido[i].ingressante}</span>
      <span id="cpf">CPF: {maskBr.cpf(dados.itensPedido[i].cpf)}</span>
      <div id="moldura">
        <div id="qrcode" bind:this={qrElemento} />
      </div>
      <span id="id">#{dados.itensPedido[i].id}</span>
    </div>
  </div>
</div>
