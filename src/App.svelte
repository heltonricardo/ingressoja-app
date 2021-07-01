<script>
  import MODO from "./ENUM/MODO";
  import BarraSuperior from "./UI/BarraSuperior/BarraSuperior.svelte";
  import GridEventos from "./Eventos//GridEventos.svelte";
  import Cadastro from "./Cadastro/Cadastro.svelte";
  import Login from "./Login/Login.svelte";
  import Detalhes from "./Eventos/Detalhes.svelte";
  import CadastroEvento from "./Eventos/CadastroEvento.svelte";
  import BarraInferior from "./UI/BarraInferior.svelte";
  import MinhaConta from "./Conta/MinhaConta.svelte";

  let modo = MODO.NOVO_EVENTO;
  let id = null;

  function modoNormal() {
    id = null;
    modo = MODO.NORMAL;
    window.scrollTo(0, 0);
  }

  function modoDetalhes(event) {
    id = event.detail;
    modo = MODO.DETALHES;
    window.scrollTo(0, 0);
  }
  
  function modoCadastraEvento() {
    modo = MODO.NOVO_EVENTO;
    window.scrollTo(0, 0);
  }
</script>

<BarraSuperior
  {modo}
  on:voltar={modoNormal}
  on:cadastrese={() => (modo = MODO.CADASTRO)}
  on:entrar={() => (modo = MODO.LOGIN)}
  on:minhaconta={() => (modo = MODO.MINHA_CONTA)}
/>

{#if modo === MODO.NORMAL}
  <GridEventos on:vermais={modoDetalhes} />
{:else if modo === MODO.CADASTRO}
  <Cadastro on:voltar={modoNormal} />
{:else if modo === MODO.LOGIN}
  <Login on:voltar={modoNormal} />
{:else if modo === MODO.DETALHES}
  <Detalhes {id} on:voltar={modoNormal} />
{:else if modo === MODO.NOVO_EVENTO}
  <CadastroEvento />
{:else if modo === MODO.MINHA_CONTA}
  <MinhaConta on:voltar={modoNormal} on:novoevento={modoCadastraEvento} />
{:else if modo === MODO.NOVO_EVENTO}
  <CadastroEvento on:voltar={modoNormal} />
{/if}

<BarraInferior />
