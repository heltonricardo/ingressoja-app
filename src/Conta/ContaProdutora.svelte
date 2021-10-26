<script>
  import { createEventDispatcher } from "svelte";

  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import { getProdutora } from "../Conexao/produtoraConex";

  const dispatch = createEventDispatcher();

  async function carregaDados() {
    const res = await getProdutora();
    if (!res) dispatch("voltar");
    return res;
  }

  let dadosCarregados = carregaDados();
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
{:then produtora}
  <div class="corpo">
    <h1>Minha Conta</h1>
    <p>
      Olá, {produtora.nomeFantasia.split(" ")[0]}! Selecione uma opção abaixo:
    </p>
    <Botao on:click={() => dispatch("meusdados")}>Meus Dados</Botao>
    <Botao on:click={() => dispatch("meuseventos")}>Meus Eventos</Botao>
    <Botao on:click={() => dispatch("conferencia")}
      >Conferência de Ingressos</Botao
    >
    <Botao on:click={() => dispatch("voltar")}>Voltar</Botao>
  </div>
{/await}
