import PATH from "../PATH.js";

export function postComprador(comprador) {
  fetch(PATH.COMPRADOR, {
    method: "POST",
    body: JSON.stringify(comprador),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw "Ocorreu um erro";
      }
      alert("Cadastro efetuado!");
    })
    .catch((err) => console.log(err.response ? err.response.data : err));
}
