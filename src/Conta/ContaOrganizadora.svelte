<script>
  import { createEventDispatcher } from "svelte";

  import { getOrganizadora } from "../Conexoes/organizadoraConex";
  import Aguarde from "../UI/Aguarde.svelte";

  const dispatch = createEventDispatcher();

  async function carregaDados() {
    return await getOrganizadora();
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
  }

  #corpo h1 {
    align-self: center;
    font-size: 3rem;
    margin-bottom: 2rem;
  }

  #corpo h2 {
    align-self: center;
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
</style>

{#await dadosCarregados}
  <Aguarde />
{:then organizadora}
  <div id="corpo">
    <h1>Minha Conta</h1>
    <h2>Olá, {organizadora.nomeFantasia.split(" ")[0]}!</h2>
  </div>
{/await}
