<script>
  import Swal from "sweetalert2";
  import { maskBr } from "js-brasil";
  import { createEventDispatcher } from "svelte";

  import MSG from "../ENUM/MSG";
  import Botao from "../UI/Botao.svelte";
  import Aguarde from "../UI/Aguarde.svelte";
  import TIPOCADASTRO from "../ENUM/TIPOCADASTRO";
  import { getEvento } from "../Conexao/eventoConex";
  import { valorVirgula } from "../utils/formatador";
  import autenticacao from "../Autenticacao/autenticacao";
  import { extrairDataHora } from "../utils/manipulaDataHora";
  import TipoDeIngresso from "../TipoDeIngresso/TipoDeIngresso.svelte";

  const dispatch = createEventDispatcher();

  export let id;

  let total = 0.0;
  let quantidade = 0;

  async function carregaEvento() {
    const res = await getEvento(id);
    if (!res) dispatch("voltar");
    return res;
  }

  let eventoCarregado = carregaEvento();

  function calcular() {
    eventoCarregado.then((evento) => {
      total = evento.tiposDeIngresso.reduce(
        (soma, t) => soma + t.valor * t.quantidade,
        0.0
      );
      quantidade = evento.tiposDeIngresso.find((t) => t.quantidade);
    });
  }

  function comprar() {
    if (autenticacao.estaLogadoComTipo(TIPOCADASTRO.COMPRADOR)) {
      eventoCarregado.then((evento) => dispatch("finalizacao", evento));
    } else {
      Swal.fire(MSG.OPS, MSG.AUTENTIQUE_COMPRADOR, "info");
      dispatch("entrar");
    }
  }
</script>

<style>
  .corpo {
    width: 40%;
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

  .imagem {
    width: 100%;
    height: 25rem;
    border-radius: 5px;
  }

  .titulo {
    margin: 1rem 0;
    font-size: 30pt;
  }

  .categoria {
    color: var(--cinza2);
    word-wrap: break-word;
  }

  .detalhes {
    display: flex;
    margin: 3rem 0;
    line-height: 2rem;
    width: fit-content;
    align-self: flex-end;
  }

  .rotulos {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    font-weight: bold;
  }

  .dados {
    margin-left: 0.6rem;
  }

  .descricao {
    text-align: justify;
    line-height: 2rem;
    margin: 1rem 0;
    word-wrap: break-word;
  }

  .escolha {
    margin-top: 3rem;
    align-self: center;
  }

  .rodape {
    margin-top: 3rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .total {
    font-size: 1.5rem;
  }

  .produtora {
    color: var(--verde4);
  }

  .organizacao {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .nomeFantasia {
    margin: 0.5rem 0;
  }

  .sem-ingressos {
    align-self: center;
    margin: 3rem 0;
    font-size: 20pt;
    font-weight: bold;
    color: red;
  }
</style>

{#await eventoCarregado}
  <Aguarde />
{:then evento}
  <div class="corpo">
    <img class="imagem" src={evento.imagemURL} alt={evento.titulo} />

    <h1 class="titulo">{evento.titulo}</h1>
    <h4 class="categoria">{evento.categoriaEvento.nome}</h4>

    <div class="detalhes">
      <div class="rotulos">
        <span class="local">
          {#if !evento.online}
            <p>
              <i class={"fas fa-location-arrow"} />  Local:
            </p>
          {/if}
        </span>

        <span class="data-hora-inicio">
          <p>
            <i class={"fas fa-clock"} />  Início:
          </p>
        </span>

        <span class="data-hora-termino">
          <p>
            <i class="fas fa-hand-point-left" />  Término:
          </p>
        </span>
      </div>

      <div class="dados">
        <span class="local">
          {#if evento.online}
            <p>
              Evento On-line 
              <i class="fas fa-mouse-pointer" />
            </p>
          {:else}
            <p>
              {evento.bairro} •
              {evento.cidade}-{evento.uf}
            </p>
          {/if}
        </span>

        <span class="data-hora-inicio">
          <p>
            {extrairDataHora(evento.inicio).data} •
            {extrairDataHora(evento.inicio).horario}
          </p>
        </span>

        <span class="data-hora-termino">
          <p>
            {extrairDataHora(evento.termino).data} •
            {extrairDataHora(evento.termino).horario}
          </p>
        </span>
      </div>
    </div>

    <span class="descricao">{evento.descricao}</span>

    <span class="produtora">
      <p class="organizacao">Organização</p>
      <p class="nomeFantasia">
        {evento.produtora.nomeFantasia}. CNPJ: {maskBr.cnpj(
          evento.produtora.cnpj
        )}
      </p>
    </span>

    {#if evento.tiposDeIngresso.length}
      <h2 class="titulo escolha">Selecione os ingressos</h2>
    {:else if evento.ingressosEsgotados}
      <h2 class="sem-ingressos">Ingressos esgotados 🤦🏻‍♂️</h2>
    {:else}
      <h2 class="sem-ingressos">Vendas em breve 👀</h2>
    {/if}

    {#each evento.tiposDeIngresso as tipoDeIngresso}
      <TipoDeIngresso {tipoDeIngresso} on:calcular={calcular} />
    {/each}
    <div class="rodape">
      <Botao on:click={() => dispatch("voltar")}>Voltar</Botao>
      {#if evento.tiposDeIngresso.length}
        <span class="total">Total: R$ {valorVirgula(total)}</span>
        <Botao on:click={comprar} habilitado={quantidade}>Comprar</Botao>
      {/if}
    </div>
  </div>
{/await}
