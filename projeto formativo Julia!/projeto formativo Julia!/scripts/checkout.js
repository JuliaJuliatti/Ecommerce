import {loadCartItem,removeCartItem} from "./functions.js";
let cartItens = JSON.parse(localStorage.getItem("listaCompras")) 


let pedidos = JSON.parse(localStorage.getItem("pedidos"))
if (pedidos == null){ /* Criando uma lista de pedidos vazia*/
    pedidos = []
}

let cartItensHTML = document.querySelector('.carrinho-grid .grid-1 ul')
console.log(cartItensHTML)
loadCartItem(cartItens,cartItensHTML)
removeCartItem(cartItens)

const btnShop = document.querySelector(".product-card-btn")
btnShop.addEventListener("click", ()=> {
    if(cartItens == 0 || cartItens == []){
        alert("Seu carrinho está vazio!")
    } else {
        window.location = "./checkout.html"
    }
})




