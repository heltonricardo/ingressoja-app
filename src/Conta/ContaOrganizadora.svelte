<script>
  import { createEventDispatcher } from "svelte";

  import { getOrganizadora } from "../Conexao/organizadoraConex";
  import Aguarde from "../UI/Aguarde.svelte";
  import Botao from "../UI/Botao.svelte";

  const dispatch = createEventDispatcher();

  async function carregaDados() {
    const res = await getOrganizadora();
    if (!res) dispatch("voltar")
  }

  let dadosCarregados = carregaDados();
</script>

<style>
  #corpo {
    width: 40rem;
    margin: 2rem auto;
    min-height: calc(100vh - 21rem);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #corpo h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
    align-items: center;
  }

  #corpo p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
</style>

{#await dadosCarregados}
  <Aguarde />
{:then organizadora}
  <div id="corpo">
    <h1>Minha Conta</h1>
    <p>
      Olá, {organizadora.nomeFantasia.split(" ")[0]}! Selecione uma opção
      abaixo:
    </p>
    <Botao on:click={() => dispatch("novoevento")}>Cadastrar Evento</Botao>
    <Botao on:click={() => dispatch("voltar")}>Voltar</Botao>
  </div>
{/await}
