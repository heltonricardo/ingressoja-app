<script>
  import Swal from "sweetalert2";
  import validator from "validator";
  import { maskBr } from "js-brasil";
  import { validateBr } from "js-brasil";
  import { createEventDispatcher } from "svelte";

  import {
    putEvento,
    postEvento,
    getAutoEndereco,
    getEventoParaEdicao,
  } from "../Conexao/eventoConex";

  import MSG from "../ENUM/MSG";
  import ESTADOS from "../ENUM/ESTADOS";
  import Botao from "../UI/Botao.svelte";
  import Icone from "../UI/Icone.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import Entrada from "../UI/Entrada.svelte";
  import { imagemIsValida } from "../utils/validador";
  import { onlyNumeros } from "../utils/sanitarizador";
  import TipoDeIngresso from "./TipoDeIngresso.svelte";
  import { getCategoriasEvento } from "../Conexao/categoriaEventoConex";
  import { hojeStringISO, UTCParaPtBr } from "../utils/manipulaDataHora";

  /******************************** DEFINIÇÕES ********************************/

  const dispatch = createEventDispatcher();
  export let id = null;

  let imagemURL = null;
  let carregando = false;
  let tocarCampos = false;
  let imagemTocada = false;
  let imagemAWS = Boolean(id);

  let obj = {
    dto: {
      uf: "",
      cep: "",
      url: "",
      bairro: "",
      cidade: "",
      numero: "",
      titulo: "",
      online: true,
      descricao: "",
      logradouro: "",
      totalIngressos: 1,
      tiposDeIngresso: [],
      qntTipoDeIngresso: 1,
      inicio: hojeStringISO,
      termino: hojeStringISO,
      idCategoria: undefined,
    },
    file: null,
  };

  id &&
    getEventoParaEdicao(id).then((r) => {
      imagemURL = r.imagemURL;
      obj.dto.uf = r.uf;
      obj.dto.url = r.url;
      obj.dto.bairro = r.bairro;
      obj.dto.cidade = r.cidade;
      obj.dto.numero = r.numero;
      obj.dto.online = r.online;
      obj.dto.titulo = r.titulo;
      obj.dto.cep = maskBr.cep(r.cep);
      obj.dto.descricao = r.descricao;
      obj.dto.logradouro = r.logradouro;
      obj.dto.inicio = UTCParaPtBr(r.inicio);
      obj.dto.termino = UTCParaPtBr(r.termino);
      obj.dto.totalIngressos = r.totalIngressos;
      obj.dto.idCategoria = r.categoriaEvento.id;
      obj.dto.tiposDeIngresso = r.tiposDeIngresso.map((t) => ({
        ...t,
        inicio: UTCParaPtBr(t.inicio),
        termino: UTCParaPtBr(t.termino),
      }));
      obj.dto.qntTipoDeIngresso = r.tiposDeIngresso.length;
    });

  /*************************** VALIDAÇÃO DE CAMPOS ****************************/

  function totalIngressosAtual() {
    return obj.dto.tiposDeIngresso.reduce(
      (s, t) => s + t.quantidadeDisponivel,
      0
    );
  }

  const qntMaxGratis = () => Math.floor(obj.dto.totalIngressos * 0.1);

  function qntIngressosGratis() {
    return obj.dto.tiposDeIngresso
      .filter((t) => !t.valor)
      .reduce((s, t) => s + t.quantidadeDisponivel, 0);
  }

  $: tituloValido = validator.isLength(obj.dto.titulo.trim(), {
    min: 1,
    max: 255,
  });
  $: descricaoValida = validator.isLength(obj.dto.descricao.trim(), {
    min: 1,
    max: 2000,
  });
  $: imagemValida = imagemIsValida(obj.file) || imagemAWS;
  $: inicioValido = validator.isAfter(obj.dto.inicio);
  $: terminoValido = validator.isAfter(obj.dto.termino, obj.dto.inicio);
  $: urlValida = obj.dto.online
    ? validator.isURL(obj.dto.url, {
        require_protocol: true,
        protocols: ["http", "https"],
      }) && validator.isLength(obj.dto.url.trim(), { min: 1, max: 1000 })
    : true;
  $: logradouroValido = obj.dto.online
    ? true
    : validator.isLength(obj.dto.logradouro.trim(), {
        min: 1,
        max: 100,
      });
  $: numeroValido = obj.dto.online
    ? true
    : validator.isLength(obj.dto.numero.trim(), { min: 1, max: 10 });
  $: bairroValido = obj.dto.online
    ? true
    : validator.isLength(obj.dto.bairro.trim(), { min: 1, max: 50 });
  $: cidadeValida = obj.dto.online
    ? true
    : validator.isLength(obj.dto.cidade.trim(), { min: 1, max: 50 });
  $: ufValida = obj.dto.online
    ? true
    : ESTADOS.includes(obj.dto.uf.toLowerCase());
  $: cepValido = obj.dto.online ? true : validateBr.cep(obj.dto.cep);
  $: totalIngressosValido = obj.dto.totalIngressos > 0;

  $: formularioValido =
    ufValida &&
    cepValido &&
    urlValida &&
    bairroValido &&
    cidadeValida &&
    imagemValida &&
    inicioValido &&
    numeroValido &&
    tituloValido &&
    terminoValido &&
    descricaoValida &&
    logradouroValido &&
    totalIngressosValido &&
    obj.dto.tiposDeIngresso.every((t) => t.tipoValido);

  /********************************* FUNÇÕES **********************************/

  $: if (obj.dto.online) {
    obj.dto.uf = "";
    obj.dto.cep = "";
    obj.dto.bairro = "";
    obj.dto.cidade = "";
    obj.dto.numero = "";
    obj.dto.logradouro = "";
  } else {
    obj.dto.url = "";
  }

  /******************************* TROCA IMAGEM *******************************/

  function trocaImagem(event) {
    imagemAWS = false;
    obj.file = event.target.files[0];
  }

  /**************************** ADICIONAR INGRESSO ****************************/

  function adicionaIngresso() {
    if (obj.dto.totalIngressos > totalIngressosAtual())
      obj.dto.qntTipoDeIngresso++;
    else Swal.fire({ title: MSG.OPS, icon: "warning", text: MSG.AUMENTE_QNT });
  }

  /***************************** REMOVE INGRESSO ******************************/

  function removeIngresso() {
    obj.dto.tiposDeIngresso.pop();
    obj.dto.qntTipoDeIngresso--;
  }

  /************************* PROBLEMAS COM INGRESSOS? *************************/

  function problemasComIngressos() {
    let msg;

    if (obj.dto.totalIngressos != totalIngressosAtual()) {
      if (obj.dto.totalIngressos > totalIngressosAtual())
        msg = `Por favor, distribua <b style="font-weight: bold">${
          obj.dto.totalIngressos - totalIngressosAtual()
        }</b> ingresso(s) entre os tipos disponíveis ou crie novos tipos \
        de ingresso!`;
      else
        msg = `Por favor, adicione <b style="font-weight: bold">${
          totalIngressosAtual() - obj.dto.totalIngressos
        }</b> na quantidade total de ingressos do evento!`;
      Swal.fire({
        title: MSG.OPS,
        icon: "warning",
        html: ` <p>${MSG.QNT_DIFERENTE}</p><p>${msg}</p>`,
      });
      return true;
    }

    if (qntIngressosGratis() > qntMaxGratis()) {
      msg = `A quantidade máxima de ingressos grátis para esse evento é 
      <b style="font-weight: bold">${qntMaxGratis()}</b>. Por favor, remova
      <b style="font-weight: bold">${
        qntIngressosGratis() - qntMaxGratis()
      }</b> ingresso(s) grátis!`;
      Swal.fire({
        title: MSG.OPS,
        icon: "warning",
        html: ` <p>${MSG.INGRESSOS_GRATIS}</p><p>${msg}</p>`,
      });
      return true;
    }

    return false;
  }

  /********************************** SALVAR **********************************/

  async function salvar() {
    if (!formularioValido) {
      tocarCampos = true;
      imagemTocada = true;
      return;
    }

    if (problemasComIngressos()) return;

    carregando = true;
    obj.dto.cep = validator.whitelist(obj.dto.cep, /\d/g);
    const sucesso = id ? await putEvento(obj, id) : await postEvento(obj);
    carregando = false;
    if (sucesso) dispatch("cadastroeventos");
    else obj.dto.cep = maskBr.cep(obj.dto.cep);
  }

  /************************** PREENCHER INFORMAÇÕES ***************************/

  async function preencherInfo() {
    carregando = true;
    const cep = onlyNumeros(obj.dto.cep);
    const endereco = await getAutoEndereco(cep);
    if (endereco) {
      obj.dto.uf = endereco.uf;
      obj.dto.bairro = endereco.bairro;
      obj.dto.cidade = endereco.localidade;
      obj.dto.logradouro = endereco.logradouro;
    }
    carregando = false;
  }

  /********************************** VOLTAR **********************************/

  function voltar() {
    Swal.fire({
      icon: "warning",
      focusCancel: true,
      title: MSG.CERTEZA,
      showCancelButton: true,
      text: MSG.ALTERADO_NAO_SALV,
      cancelButtonText: "Cancelar",
    }).then((volte) => volte.isConfirmed && dispatch("cadastroeventos"));
  }
</script>

<style>
  .corpo {
    width: 35%;
    min-width: 30rem;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    background-color: var(--branco);
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 5px;
    min-height: calc(100vh - 21rem);
  }

  .campos {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-size: 3rem;
    align-self: center;
    margin: 3rem 0 1rem 0;
  }

  .opcoes {
    margin: 3rem 0;
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  .opcoes label {
    width: fit-content;
  }
  .botoes {
    margin: 4rem auto;
    display: flex;
    justify-content: center;
  }

  .tipoIngressoControle {
    display: flex;
    justify-content: center;
  }

  label {
    display: block;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    width: 100%;
  }

  select,
  .imagem {
    font: inherit;
    align-self: center;
    width: 100%;
    margin-bottom: 1rem;
    border: none;
    outline: none;
    border-bottom: 2px solid #ccc;
    border-radius: 3px 3px 0 0;
    background: var(--cinza0-5);
    padding: 0.15rem 0;
    transition: border-color 0.1s ease-out;
    resize: none;
  }

  .preview {
    max-height: 20rem;
    max-width: 20rem;
    align-self: center;
    border-radius: 5px;
    margin-bottom: 1rem;
  }

  .error-message {
    color: red;
    margin-top: -0.75rem;
  }

  select:focus {
    border-color: var(--roxo1);
    outline: none;
  }
</style>

{#if carregando}
  <Aguarde />
{/if}

<div class="corpo">
  {#if id}
    <h1>Editar Evento</h1>
  {:else}
    <h1>Novo Evento</h1>
  {/if}
  <div class="campos">
    <Entrada
      id="titulo"
      label="Título"
      tocado={tocarCampos}
      valido={tituloValido}
      value={obj.dto.titulo}
      mensagemValidacao="Insira um título válido"
      on:input={(event) => (obj.dto.titulo = event.target.value)}
    />

    {#await getCategoriasEvento()}
      <Aguarde />
    {:then categorias}
      <label for="selecao">Categoria do Evento</label>
      <select bind:value={obj.dto.idCategoria}>
        {#each categorias as categoria (categoria.id)}
          <option value={categoria.id}>{categoria.nome}</option>
        {/each}
      </select>
    {/await}

    <label for="imagem">Imagem da capa (máx. 2 MB)</label>
    <img
      class="preview"
      src={imagemAWS
        ? imagemURL
        : obj.file
        ? URL.createObjectURL(obj.file)
        : ""}
      alt=""
    />
    <input
      type="file"
      class="imagem"
      accept="image/bmp, image/jpeg, image/png"
      on:blur={() => (imagemTocada = true)}
      on:change={trocaImagem}
    />
    {#if imagemTocada && !imagemValida}
      <p class="error-message">Anexe uma imagem válida</p>
    {/if}

    <Entrada
      id="inicio"
      min={hojeStringISO}
      tocado={tocarCampos}
      type="datetime-local"
      valido={inicioValido}
      label="Data e Hora de Início"
      value={id ? obj.dto.inicio : hojeStringISO}
      mensagemValidacao="Insira uma data de início válida"
      on:input={(event) => (obj.dto.inicio = event.target.value)}
    />
    <Entrada
      id="termino"
      min={obj.dto.inicio}
      tocado={tocarCampos}
      type="datetime-local"
      valido={terminoValido}
      label="Data e Hora de Término"
      value={id ? obj.dto.termino : hojeStringISO}
      on:input={(event) => (obj.dto.termino = event.target.value)}
      mensagemValidacao="A data de término deve ser depois da data de início"
    />
    <Entrada
      id="descricao"
      maxlength="2000"
      label="Descrição"
      tocado={tocarCampos}
      controlType="textarea"
      valido={descricaoValida}
      value={obj.dto.descricao}
      mensagemValidacao="Insira uma descrição válida"
      on:input={(event) => (obj.dto.descricao = event.target.value)}
    />
    <Entrada
      min="1"
      type="number"
      id="totalIngressos"
      tocado={tocarCampos}
      valido={totalIngressosValido}
      value={obj.dto.totalIngressos}
      label="Quantidade total de ingressos do evento"
      mensagemValidacao="Insira uma quantidade válida"
      on:input={(event) => (obj.dto.totalIngressos = event.target.value)}
    />
  </div>

  <div class="opcoes">
    <label>
      <input
        type="radio"
        name="tipoEvento"
        value={true}
        bind:group={obj.dto.online}
      />
      Evento On-line
    </label>

    <label>
      <input
        type="radio"
        name="tipoEvento"
        value={false}
        bind:group={obj.dto.online}
      />
      Evento Presencial
    </label>
  </div>

  <div class="campos">
    {#if obj.dto.online}
      <Entrada
        id="url"
        maxlength="1000"
        valido={urlValida}
        value={obj.dto.url}
        tocado={tocarCampos}
        label="URL do Evento"
        mensagemValidacao="Insira uma URL válida"
        on:input={(event) => (obj.dto.url = event.target.value)}
      />
    {:else}
      <Entrada
        id="cep"
        label="CEP"
        maxlength="9"
        valido={cepValido}
        value={obj.dto.cep}
        tocado={tocarCampos}
        on:saiu={() => preencherInfo()}
        mensagemValidacao="Insira um CEP válido"
        on:input={(event) => (obj.dto.cep = event.target.value)}
      />
      <Entrada
        id="uf"
        label="UF"
        maxlength="2"
        valido={ufValida}
        value={obj.dto.uf}
        tocado={tocarCampos}
        mensagemValidacao="Insira uma UF válida"
        on:input={(event) => (obj.dto.uf = event.target.value)}
      />
      <Entrada
        id="cidade"
        label="Cidade"
        maxlength="50"
        tocado={tocarCampos}
        valido={cidadeValida}
        value={obj.dto.cidade}
        mensagemValidacao="Insira uma cidade válida"
        on:input={(event) => (obj.dto.cidade = event.target.value)}
      />
      <Entrada
        id="bairro"
        label="Bairro"
        maxlength="50"
        tocado={tocarCampos}
        valido={bairroValido}
        value={obj.dto.bairro}
        mensagemValidacao="Insira um bairro válido"
        on:input={(event) => (obj.dto.bairro = event.target.value)}
      />
      <Entrada
        id="logradouro"
        maxlength="100"
        label="Logradouro"
        tocado={tocarCampos}
        valido={logradouroValido}
        value={obj.dto.logradouro}
        mensagemValidacao="Insira um logradouro válido"
        on:input={(event) => (obj.dto.logradouro = event.target.value)}
      />
      <Entrada
        id="numero"
        type="number"
        label="Número"
        maxlength="10"
        tocado={tocarCampos}
        valido={numeroValido}
        value={obj.dto.numero}
        mensagemValidacao="Insira um número válido"
        on:input={(event) => (obj.dto.numero = event.target.value)}
      />
    {/if}
  </div>

  <br />

  <h1>Tipos de Ingressos</h1>
  <div class="campos">
    {#each [...Array(obj.dto.qntTipoDeIngresso).keys()] as i}
      <TipoDeIngresso
        {tocarCampos}
        terminoEvento={obj.dto.termino}
        bind:tipoDeIngresso={obj.dto.tiposDeIngresso[i]}
      />
    {/each}
  </div>

  <div class="tipoIngressoControle">
    {#if obj.dto.qntTipoDeIngresso > 1}
      <Icone icon="minus" on:click={removeIngresso} />
    {/if}
    <Icone icon="plus" on:click={adicionaIngresso} />
  </div>

  <div class="botoes">
    <Botao on:click={voltar}>Voltar</Botao>
    <Botao on:click={salvar} invalido={!formularioValido}>Salvar</Botao>
  </div>
</div>
