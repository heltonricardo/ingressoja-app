import { writable } from "svelte/store";

const store = writable([
  {
    id: 1,
    titulo: "Festa das Galinhas",
    descricao: "Uma festa muito louca!",
    cidade: "Varginha",
    uf: "MG",
    img: "https://www.ahnegao.com.br/wp-content/uploads/2021/06/capa-11.jpg",
  },
  {
    id: 2,
    titulo: "Festa das Pombinhas",
    descricao: "Uma festa muito doida!",
    cidade: "Jaboticabal",
    uf: "SP",
    img: "https://www.ahnegao.com.br/wp-content/uploads/2021/06/capa-13.jpg",
  },
  {
    id: 3,
    titulo: "Festa dos Quero-quero",
    descricao: "Uma festa muito lunática!",
    cidade: "Pato Branco",
    uf: "PR",
    img: "https://www.ahnegao.com.br/wp-content/uploads/2021/06/capa-14.jpg",
  },
]);

const eventos = {
  subscribe: store.subscribe,
};

export default eventos;
