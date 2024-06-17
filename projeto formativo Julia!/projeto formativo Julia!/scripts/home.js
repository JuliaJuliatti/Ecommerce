// Importação da base de dados e das funçoes

import { database } from "./database.js";
import { getProdId, loadProducts} from "./functions.js";

// -------- Variaveis do projeto ------------------------
//const sectionNovidades = document.querySelector("#section-novidades .carrousel")
const sectionMaisVendidos = document.querySelector("#section-maisvendidos")
const sectionMaisVendidos2 = document.querySelector("#section-maisvendidos2")
const sectionPanter = document.querySelector("#section-panter")


//Fitros
//let filtroCategoriaNovidades = database.filter(produto => produto.classificacaoProduto === "Novidades" && produto.exibirHome == true )
let filtroMaisVendidos = database.filter(produto => produto.classificacaoProduto === "Mais_Vendidos" && produto.exibirHome == true )
let filtroMaisVendidos2 = database.filter(produto => produto.classificacaoProduto === "Mais_Vendidos2" && produto.exibirHome == true )
let filtroPanter = database.filter(produto => produto.classificacaoProduto === "Panter" && produto.exibirHome == true )
console.log(filtroMaisVendidos)

//Funçoes com parametros
//loadProducts(filtroCategoriaNovidades,sectionNovidades);
loadProducts(filtroMaisVendidos,sectionMaisVendidos);
loadProducts(filtroMaisVendidos2,sectionMaisVendidos2);
loadProducts(filtroPanter,sectionPanter);
getProdId()








// ------- carrousel de imagens home -------------------

document.querySelectorAll('.section-product').forEach( carrousel => {
const productCarousel = carrousel.querySelector('.carrousel');
const prevBtn = carrousel.querySelector('.prev');
const nextBtn = carrousel.querySelector('.next');

let scrollAmount = 0;

nextBtn.addEventListener('click', () => {
  scrollAmount += 340; // Largura do produto + margem
  if (scrollAmount > productCarousel.scrollWidth - carrousel.offsetWidth) {
    scrollAmount = productCarousel.scrollWidth - carrousel.offsetWidth;
  }
  productCarousel.style.transform = `translateX(-${scrollAmount}px)`;
});

prevBtn.addEventListener('click', () => {
  scrollAmount -= 340; // Largura do produto + margem
  if (scrollAmount < 0) {
    scrollAmount = 0;
  }
  productCarousel.style.transform = `translateX(-${scrollAmount}px)`;
});
})