<script>
  import { createEventDispatcher } from "svelte";
  import { postEvento } from "../Conexao/eventoConex";
  import { getCategoriasEvento } from "../Conexao/categoriaEventoConex";
  import Aguarde from "../UI/Aguarde.svelte";
  import Botao from "../UI/Botao.svelte";
  import Icone from "../UI/Icone.svelte";
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
  let categoriaEvento;

  async function carregaCategorias() {
    return await getCategoriasEvento();
  }

  function adicionaIngresso() {
    qntTipoDeIngresso++;
  }

  function removeIngresso() {
    tiposDeIngresso.pop();
    qntTipoDeIngresso--;
  }

  async function cadastrar() {
    carregando = true;
    const sucesso = await postEvento({
      titulo,
      imagemURL,
      inicio,
      termino,
      descricao,
      online,
      url,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      pais,
      cep,
      tiposDeIngresso,
      categoriaEvento,
    });
    carregando = false;
    if (sucesso) dispatch("minhaconta");
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
    margin: 4rem auto;
    display: flex;
    justify-content: center;
  }

  #tipoIngressoControle {
    display: flex;
    justify-content: center;
  }

  label {
    display: block;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  select {
    font: inherit;
    align-self: center;
    width: 100%;
    margin-bottom: 1rem;
    border: none;
    outline: none;
    border-bottom: 2px solid #ccc;
    border-radius: 3px 3px 0 0;
    background: white;
    padding: 0.15rem 0;
    transition: border-color 0.1s ease-out;
    resize: none;
  }

  select:focus {
    border-color: var(--roxo1);
    outline: none;
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

    {#await carregaCategorias()}
      <Aguarde />
    {:then categorias}
      <label for="selecao">Categoria do Evento</label>
      <select bind:value={categoriaEvento}>
        {#each categorias as categoria (categoria.id)}
          <option value={categoria.id}>{categoria.nome}</option>
        {/each}
      </select>
    {/await}

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
    {#each [...Array(qntTipoDeIngresso).keys()] as i}
      <TipoDeIngresso bind:tipoDeIngresso={tiposDeIngresso[i]} />
    {/each}
  </div>

  <div id="tipoIngressoControle">
    {#if qntTipoDeIngresso > 1}
      <Icone icon="minus" on:click={removeIngresso} />
    {/if}
    <Icone icon="plus" on:click={adicionaIngresso} />
  </div>
</div>

<div id="botoes">
  <Botao on:click={() => dispatch("minhaconta")}>Voltar</Botao>
  <Botao on:click={cadastrar}>Finalizar</Botao>
</div>
