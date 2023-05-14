import {menuArray} from '/data.js'

let orderContainer = document.getElementById("order-container")
let checkoutModal = document.getElementById("checkout-modal")

function getMenuHtml(){
      
    let menuHtml = ''
    menuArray.forEach(function(item){
        menuHtml += `
        <div id="menu-item">
            <div id="menu-inner"> 
                <p id="menu-icon">${item.emoji}</p>
                <div class="block" id="menu-text"> 
                <h3> ${item.name}</h3>
                <p> ${item.ingredients}</p>
                <p id="price">$${item.price}</p>
                </div> 
                <button id="add-btn" data-add="${item.id}"> + </button> 
            </div>
        </div>`
   })
   return menuHtml
}
 
 function renderMenu(){
    document.getElementById("menu-options").innerHTML = getMenuHtml()
 }

 renderMenu()

 //Event Listeners


document.addEventListener('click', (e) => {
  if (e.target.dataset.add) {
    handleAddClick(e.target.dataset.add)
  } else if 
    (e.target.dataset.remove){
      handleRemoveClick(e.target.dataset.remove)
    } else if (e.target.id === 'checkout-btn'){
      checkoutModal.style.display ='block'
    } else if (e.target.id === 'modal-close-btn'){
      checkoutModal.style.display ='none'
    } else if (e.target.id === 'payment-btn'){
      handleSubmitPayment(e)
    }
  })

function handleAddClick(itemId) {
  menuArray[itemId].quantity++
  renderOrder()
}

function handleRemoveClick(itemId) {
  menuArray[itemId].quantity-- 
  renderOrder()
}


function renderOrder(){
  document.getElementById('order-items').innerHTML =""
  let totalPrice = 0
  menuArray.forEach(item => {
    if (item.quantity >0) {
      totalPrice += item.price*item.quantity
      document.getElementById('order-items').innerHTML += `
      <div class="order-item">
        <div> 
        <h3> ${item.name} </h3>
        <p class="item-quantity">Qty: ${item.quantity}</p>
        <p class="remove-btn" data-remove="${item.id}">remove</p>
        <p>\$${item.price * item.quantity}.00 </p>
        </div>
      
      </div>`
    }
    if(totalPrice=== 0) {
      orderContainer.style.display="none"
    } else {
      orderContainer.style.display="block"
    }
    document.getElementById('total-price').textContent =`\$${totalPrice}.00`
  }) 
}



