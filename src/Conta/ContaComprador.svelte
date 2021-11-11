<script>
  import { createEventDispatcher } from "svelte";

  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import { getComprador } from "../Conexao/compradorConex";

  const dispatch = createEventDispatcher();

  async function carregaDados() {
    const res = await getComprador();
    if (!res) dispatch("voltar");
    return res;
  }

  let dadosCarregados = carregaDados();
</script>

<style>
  .corpo {
    width: 30rem;
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

  p {
    text-align: center;
    word-wrap: break-word;
    width: 100%;
  }

  .corpo h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
    align-items: center;
  }

  .corpo p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
</style>

{#await dadosCarregados}
  <Aguarde />
{:then comprador}
  <div class="corpo">
    <h1>Minha Conta</h1>
    <p>Selecione uma das opções abaixo:</p>
    <Botao on:click={() => dispatch("meusdados")}>Meus Dados</Botao>
    <Botao on:click={() => dispatch("meuspedidos")}>Meus Pedidos</Botao>
    <Botao on:click={() => dispatch("voltar")}>Voltar</Botao>
  </div>
{/await}
