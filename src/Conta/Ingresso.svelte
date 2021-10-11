<script>
  export const ingresso = {
    titulo: "15º Encontro Holístico Brasileiro",
    inicio: "2021-08-27T22:00:00.000+00:00",
    online: true,
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    id: 123,
    ingressante: "Amander",
    cpf: "59453224073",
    nomeIngresso: "Entrada Franca",
    valor: 0.0,
  };
</script>

<style>
</style>

<div id="ingresso">
  <div id="cabecalho">
    <span id="titulo">{ingresso.titulo}</span>
    <span id="titulo">{ingresso.inicio}</span>
    {#if ingresso.online}
      <span id="online">Evento Online</span>
    {:else}
      <span id="end1"
        >{ingresso.logradouro}, {ingresso.numero} - {ingresso.bairro}</span
      >
      <span id="end2">{ingresso.cidade}-{ingresso.uf}. CEP: {ingresso.cep}</span
      >
    {/if}
    <span id="ingressoja">IngressoJá!</span>
  </div>

  <div id="corpo">
    <span id="individual">Ingresso Individual</span>
    <span id="nomeIngresso">{ingresso.nomeIngresso}</span>
    <span id="valor"
      >R$ {ingresso.valor}
      <span id="cortesia">
        {#if !ingresso.valor}
          - Cortesia (venda proibida)
        {/if}
      </span>
    </span>
    <div id="sensivel">
      <span id="ingressante">{ingresso.ingressante}</span>
      <span id="cpf">{ingresso.cpf}</span>
      <div id="qrcode" />
      <span id="id">{ingresso.id}</span>
    </div>
  </div>
</div>
