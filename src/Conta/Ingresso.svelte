<script>
  import { maskBr } from "js-brasil";
  import QrCreator from "qr-creator";
  import { onMount } from "svelte";
  import { valorVirgula } from "../utils/formatador";
  import { extrairDataHora } from "../utils/manipulaDataHora";

  let qrcode;

  export let ingresso;

  const qrConfig = {
    text: `${ingresso.id}`,
    radius: 0.33,
    ecLevel: "L",
    fill: "#6b2284",
    background: null,
    size: 128,
  };

  onMount(() => QrCreator.render(qrConfig, qrcode));
</script>

<style>
  #ingresso {
    width: 360px;
    min-width: 360px;
    max-width: 360px;
    height: fit-content;
    background-color: var(--roxo0-1);
    border: 1.5px solid var(--roxo2);
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
    border-top: 3px dotted black;
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
    <span id="titulo">{ingresso.titulo}</span>
    <span id="inicio"
      >{extrairDataHora(ingresso.inicio).dataCompleta} • {extrairDataHora(
        ingresso.inicio
      ).horario} (horário de Brasília)</span
    >
    {#if ingresso.online}
      <span id="online">Evento Online</span>
    {:else}
      <span id="end1"
        >{ingresso.logradouro}, {ingresso.numero} - {ingresso.bairro}</span
      >
      <span id="end2">{ingresso.cidade}-{ingresso.uf}. CEP: {ingresso.cep}</span
      >
    {/if}
    <span id="ingressoja">Distribuição: IngressoJá!</span>
  </div>

  <hr />

  <div id="infos">
    <span id="individual">Ingresso Individual</span>
    <span id="nomeIngresso">Tipo: {ingresso.nomeIngresso}</span>
    <span id="valor"
      >Preço: R$ {valorVirgula(ingresso.valor)}
      <span id="cortesia">
        {#if !ingresso.valor}
          Cortesia (venda proibida)
        {/if}
      </span>
    </span>
    <div id="sensivel">
      <span id="ingressante">{ingresso.ingressante}</span>
      <span id="cpf">CPF: {maskBr.cpf(ingresso.cpf)}</span>
      <div id="moldura">
        <div id="qrcode" bind:this={qrcode} />
      </div>
      <span id="id">#{ingresso.id}</span>
    </div>
  </div>
</div>
