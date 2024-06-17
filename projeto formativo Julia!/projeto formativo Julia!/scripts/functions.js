export function loadProducts(productList, load) {
  /* carrega os produtos na home e na pagina de prododus*/
  
  productList.forEach((produto) => {
    const valParcela = (produto.preco / 10).toFixed(2);
    const html = `<div class="product-card" id="${produto.codigoProduto}">
    <!-- container que controla o tamanho da imagem -->
    <div class="card-image-container">
      <img src="${produto.imagemProduto.img1}" alt="Bolsa Bege" />
    </div>
    <!-- container que agrupa  as informações do produto -->
    <div class="product-card-info-container">
      <h2 class="product-card-title" title="Bolsa Bege Elegante">
        ${produto.tituloProduto}
      </h2>
      <h3 class="product-card-price">R$ ${produto.preco}</h3>
    </div>
    <!-- botao de comprar, que levara para a pagina do produto-->
    <a href="./produto_1.html" id="${produto.codigoProduto}">
      <button class="product-card-btn" id="${produto.codigoProduto}">COMPRAR</button>
    </a>
  </div>`;
    load.innerHTML += html;
  });
}

// captura o codigo/id do produto
export function getProdId(){
  let itens = document.querySelectorAll(".product-card")
  console.log(itens)
  itens.forEach(item => item.addEventListener('click',(evento)=>{
      let prodID = evento.target.id
      localStorage.setItem('prodId',prodID)
      
  }))
}

// localiza o produto na base de dados
export function findProduct(productList, productId){
  let produto = productList.find(produto => produto.codigoProduto == productId)
  return produto
}

//carrega o produto na pagina do produto

export function loadProduct(produto,selecaoProduto){

const productTitle = document.querySelector(".product-title h2");
console.log(productTitle)
productTitle.innerText = `${produto.tituloProduto}`;


// const productTitle = document.querySelector("#product-title")

// productTitle.children[0].innerText = `COD: ${produto.codigoProduto}`
// productTitle.children[1].innerText = `${produto.tituloProduto}`


 const HTML = `<div class="grid-images">
 <div class="carrousel">
     <div class="thumb">
         <img src="${produto.imagemProduto.img2}">
     </div>
     <div class="thumb">
         <img src="${produto.imagemProduto.img3}">
     </div>
     <div class="thumb">
         <img src="${produto.imagemProduto.img4}">
     </div>
     <div class="thumb">
         <img src="${produto.imagemProduto.img1}">
     </div>
 </div>
 <!-- imagem maior (principal) -->
 <div class="main-image-container">
     <img src="${produto.imagemProduto.img1}" alt="" class="main-image">
 </div>
 <!-- descrição do produto -->
</div>
<div class="product-description">
 <h2 class="main-title">Descrição</h2>
 <p>
     ${produto.descricao}
 </p>
</div>`
selecaoProduto.innerHTML = HTML

const price = document.querySelector(".price-container h2")
const parcela = (produto.preco/10).toFixed(2)
price.innerText = `R$ ${produto.preco.toFixed(2)}`
//price.children[1].innerText = `Ou em ate 10x sem juros de R$ ${parcela} no cartão de credito`



}

function cartTotal(cartItens) {
  return cartItens.reduce((total, item) => total + item.preco * item.quantity, 0);
}


export function loadCartItem(cartItens,cartItensHTML){

  if(cartItens.length == [] || cartItens.length == [] ){
    cartItensHTML.innerHTML = `Seu carrinho está vazio`
  } else {
    cartItens.forEach(item => {  
      let html = `
      <li id=${item.codigoProduto}>
              <div class="cart-item">
                <div class="cart-item-img">
                  <div class="cart-img-container">
                    <img src="${item.imagemProduto.img1}" alt="">
                  </div>


                </div>
                <div class="cart-item-info">
                  <p>${item.tituloProduto}</p>
                  <h2>R$ ${item.preco.toFixed(2)}</h2>
                  <input type="number" name="" id="" value="${item.quantity}">
                  <i class="bi bi-trash3 remove"></i>

                </div>
              </div>
            </li>
  `
  cartItensHTML.innerHTML += html
  })

  const total = cartTotal(cartItens);
  localStorage.setItem('totalValue', total);
  const price = document.querySelector('.total-container .total-info:nth-child(1) h2:nth-of-type(2');
  const price2 = document.querySelector('.total-container .total-info:nth-child(3) h2:nth-of-type(2');
  console.log(price)
  price.innerHTML = `R$ ${total.toFixed(2)}`
  price2.innerHTML = `R$ ${total.toFixed(2)}`
}

  }
  


  export function removeCartItem(sacolaCompras) {
    let botaoDel = document.querySelectorAll("i.remove") /* remover produto do carrinho */
    let cartItens = document.querySelector("ul.cart")
    console.log(cartItens)
    botaoDel.forEach(botao => botao.addEventListener('click', (event) => {
      let item = event.target.parentElement.parentElement.parentElement
      console.log(item)
      cartItens.removeChild(item)
      console.log(item.id)
      let index = sacolaCompras.findIndex(i => i.codigoProduto == item.id)
      console.log(index)
      sacolaCompras.splice(index, 1)
      console.log(sacolaCompras)
      localStorage.setItem('listaCompras', JSON.stringify(sacolaCompras))
  
      // Update the price element here
      const total = cartTotal(sacolaCompras);
      localStorage.setItem('totalValue', total);
      const price = document.querySelector('.total-container .total-info:nth-child(1) h2:nth-of-type(2');
  const price2 = document.querySelector('.total-container .total-info:nth-child(3) h2:nth-of-type(2');
  console.log(price)
  price.innerHTML = `R$ ${total.toFixed(2)}`
  price2.innerHTML = `R$ ${total.toFixed(2)}`
     
    }));
  }


export function shop(pedidos){

const form = document.querySelector('#checkout form');
const inputs = form.querySelectorAll('input,select');
const inputValues = {};
inputs.forEach((input) => {
  if (input.type!== 'submit' && input.type!== 'button') {
    inputValues[input.name] = input.value;
  }
});
console.log(inputValues);
const order = {
   id: pedidos.length > 0? pedidos[pedidos.length - 1].id + 1 : 1,
   address:{...inputValues},
   items: JSON.parse(localStorage.getItem("listaCompras")),
   totalValue: parseFloat(localStorage.getItem("totalValue"))
};

pedidos.push(order);
localStorage.setItem("pedidos", JSON.stringify(pedidos));;
alert("pedido realizado com sucesso")
localStorage.removeItem("listaCompras");
localStorage.removeItem("totalValue");
window.location = "./index.html"
} 