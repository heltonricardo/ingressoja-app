<script>
  import { createEventDispatcher } from "svelte";
  import Entrada from "../UI/Entrada.svelte";
  import Botao from "../UI/Botao.svelte";
  import { postProdutora } from "../Conexao/produtoraConex";
  import Aguarde from "../UI/Aguarde.svelte";
  import autenticacao from "../Autenticacao/autenticacao";

  const dispatch = createEventDispatcher();

  let carregando = false;

  let razaoSocial;
  let cnpj;
  let nomeFantasia;
  let email;
  let banco;
  let agencia;
  let conta;
  let senha;
  let senha2;

  async function cadastrar() {
    if (senha === senha2) {
      carregando = true;
      const res = await postProdutora({
        razaoSocial,
        cnpj,
        nomeFantasia,
        email,
        banco,
        agencia,
        conta,
        senha,
      });
      carregando = false;
      if (res) {
        await autenticacao.logar({ email, senha }, false);
        dispatch("voltar");
      }
    }
  }
</script>

<style>
  #botoes {
    margin: 3rem auto;
    display: flex;
    justify-content: center;
  }

  #senha {
    margin: 3rem 0;
  }
</style>

{#if carregando}
  <Aguarde />
{/if}

<div id="corpo">
  <Entrada
    id="razaoSocial"
    label="Razão Social"
    on:input={(event) => (razaoSocial = event.target.value)}
  />
  <Entrada
    id="cnpj"
    label="CNPJ"
    on:input={(event) => (cnpj = event.target.value)}
  />
  <Entrada
    id="nomeFantasia"
    label="Nome Fantasia"
    on:input={(event) => (nomeFantasia = event.target.value)}
  />
  <Entrada
    id="email"
    label="E-mail"
    on:input={(event) => (email = event.target.value)}
  />
  <Entrada
    id="banco"
    label="Banco"
    on:input={(event) => (banco = event.target.value)}
  />
  <Entrada
    id="agencia"
    label="Agência"
    on:input={(event) => (agencia = event.target.value)}
  />
  <Entrada
    id="conta"
    label="Conta"
    on:input={(event) => (conta = event.target.value)}
  />
</div>

<div id="senha">
  <Entrada
    id="senha1"
    type="password"
    label="Crie uma senha"
    on:input={(event) => (senha = event.target.value)}
  />
  <Entrada
    id="senha2"
    type="password"
    label="Repita sua senha"
    on:input={(event) => (senha2 = event.target.value)}
  />
</div>

<div id="botoes">
  <Botao on:click={() => dispatch("voltar")}>Voltar</Botao>
  <Botao on:click={cadastrar}>Salvar</Botao>
</div>
