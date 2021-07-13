<script>
  import { createEventDispatcher } from "svelte";

  import { getAdministrador } from "../Conexao/administradorConex";
  import Aguarde from "../UI/Aguarde.svelte";
  import Botao from "../UI/Botao.svelte";

  const dispatch = createEventDispatcher();

  async function carregaDados() {
    const res = await getAdministrador();
    if (!res) dispatch("voltar");
    return res;
  }

  let dadosCarregados = carregaDados();
</script>

<style>
  #corpo {
    width: 40%;
    min-width: 30rem;
    margin: 2rem auto;
    min-height: calc(100vh - 20rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--branco);
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 5px;
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
{:then administrador}
  <div id="corpo">
    <h1>Minha Conta</h1>
    <p>
      Olá, {administrador.nome.split(" ")[0]}! Selecione uma opção abaixo:
    </p>
    <Botao on:click={() => dispatch("novoadm")}
      >Cadastrar Administrador</Botao
    >
    <Botao on:click={() => dispatch("novacategoria")}
      >Categorias de Evento</Botao
    >
    <Botao on:click={() => dispatch("voltar")}>Voltar</Botao>
  </div>
{/await}
