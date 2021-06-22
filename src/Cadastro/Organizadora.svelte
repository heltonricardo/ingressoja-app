<script>
  import { createEventDispatcher } from "svelte";
  import Entrada from "../UI/Entrada.svelte";
  import Botao from "../UI/Botao.svelte";

  const dispatch = createEventDispatcher();

  let senha;
  let senha2;
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

<div id="corpo">
  <Entrada id="razao" label="Razão Social" />
  <Entrada id="cnpj" label="CNPJ" />
  <Entrada id="nome" label="Nome Fantasia" />
  <Entrada id="email" label="E-mail" />
  <Entrada id="banco" label="Banco" />
  <Entrada id="agencia" label="Agência" />
  <Entrada id="conta" label="Conta" />
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
  <Botao>Finalizar</Botao>
</div>
