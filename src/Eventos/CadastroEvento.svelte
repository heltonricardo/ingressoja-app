<script>
  import { createEventDispatcher } from "svelte";
  import { postEvento } from "../Conexoes/eventoConex";
  import Aguarde from "../UI/Aguarde.svelte";
  import Botao from "../UI/Botao.svelte";
  import Entrada from "../UI/Entrada.svelte";
  import TipoDeIngresso from "./TipoDeIngresso.svelte";

  const dispatch = createEventDispatcher();

  let carregando = false;

  let titulo = "";
  let descricao = "";
  let imagemURL = "";
  let online = true;
  let inicio = "";
  let termino = "";
  let url = "";
  let logradouro = "";
  let numero = "";
  let bairro = "";
  let cidade = "";
  let estado = "";
  let pais = "";
  let cep = "";
  let qntTipoDeIngresso = 1;
  let tiposDeIngresso = [];

  async function cadastrar() {
    carregando = true;
    const res = await postEvento({
      titulo,
      descricao,
      imagemURL,
      online,
      inicio,
      termino,
      url,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      pais,
      cep,
    });
    carregando = false;
    if (res) dispatch("voltar");
  }
</script>

<style>
  #corpo {
    width: 30rem;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
  }

  .campos {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-size: 3rem;
    align-self: center;
    margin-bottom: 2rem;
  }

  hr {
    width: 100%;
    margin: 3rem 0;
    height: 0.1rem;
    background-color: var(--roxo2);
    border: none;
  }

  #opcoes {
    margin: 3rem 0;
    display: flex;
    justify-content: space-between;
  }

  #botoes {
    margin: 3rem auto;
    display: flex;
    justify-content: center;
  }
</style>

{#if carregando}
  <Aguarde />
{/if}

<div id="corpo">
  <div class="campos">
    <h1>Novo Evento</h1>
    <Entrada
      id="titulo"
      label="Título"
      on:input={(event) => (titulo = event.target.value)}
    />
    <Entrada
      id="imagemURL"
      label="URL da Imagem de Capa"
      on:input={(event) => (imagemURL = event.target.value)}
    />
    <Entrada
      id="inicio"
      label="Data e Hora de Início"
      type="datetime-local"
      on:input={(event) => (inicio = event.target.value)}
    />
    <Entrada
      id="termino"
      label="Data e Hora de Término"
      type="datetime-local"
      on:input={(event) => (termino = event.target.value)}
    />
    <Entrada
      id="descricao"
      label="Descrição"
      controlType="textarea"
      on:input={(event) => (descricao = event.target.value)}
    />
  </div>

  <div id="opcoes">
    <label>
      <input name="tipoEvento" type="radio" value={true} bind:group={online} />
      Evento On-line
    </label>

    <label>
      <input name="tipoEvento" type="radio" value={false} bind:group={online} />
      Evento Presencial
    </label>
  </div>

  <div class="campos">
    {#if online}
      <Entrada
        id="url"
        label="URL do Evento"
        on:input={(event) => (url = event.target.value)}
      />
    {:else}
      <Entrada
        id="logradouro"
        label="Logradouro"
        on:input={(event) => (logradouro = event.target.value)}
      />
      <Entrada
        id="numero"
        label="Número"
        type="number"
        on:input={(event) => (numero = event.target.value)}
      />
      <Entrada
        id="bairro"
        label="Bairro"
        on:input={(event) => (bairro = event.target.value)}
      />
      <Entrada
        id="cidade"
        label="Cidade"
        on:input={(event) => (cidade = event.target.value)}
      />
      <Entrada
        id="estado"
        label="Estado"
        on:input={(event) => (estado = event.target.value)}
      />
      <Entrada
        id="pais"
        label="País"
        on:input={(event) => (pais = event.target.value)}
      />
      <Entrada
        id="cep"
        label="CEP"
        on:input={(event) => (cep = event.target.value)}
      />
    {/if}
  </div>

  <hr />

  <div class="campos">
    <h1>Tipos de Ingressos</h1>

    <TipoDeIngresso />
  </div>
</div>

<div id="botoes">
  <Botao on:click={() => dispatch("voltar")}>Voltar</Botao>
  <Botao on:click={cadastrar}>Finalizar</Botao>
</div>
