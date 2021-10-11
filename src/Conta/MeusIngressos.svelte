<script>
  import MiniBotao from "../UI/MiniBotao.svelte";

  export let dados;

  console.log(dados)
</script>

<style>
  #corpo {
    width: 43%;
    min-width: 30rem;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--branco);
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 5px;
  }

  h1 {
    font-size: 2rem;
    align-self: center;
    margin: 1rem 0;
    text-align: center;
  }

  #navegacao {
    margin: 3rem 0;
    display: flex;
  }
</style>

<div id="corpo">
  <h1>Pedido #{dados.id}</h1>

  <div id="navegacao">
    <MiniBotao>Imprimir</MiniBotao>
    <MiniBotao>Voltar</MiniBotao>
  </div>
</div>
