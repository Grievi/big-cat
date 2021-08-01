const addButton = document.getElementById('add-btn');
const list = document.getElementById('list');
const order = document.getElementById('order');
const priceInput = document.getElementById('price');
const quantityInput = document.getElementById('quantity');
const totalPrice = document.getElementById('total-price');
const cart = document.getElementById('cart');
const totalDiv = document.getElementById('total-div');

const cartList = [];
let total = 0;

const state = {};

addButton.addEventListener('click', (e)=> {
    e.preventDefault();
    const meal = capitalize(order.value);
    const mealPrice = priceInput.value;
    const mealQuantity = quantityInput.value;
    if(meal !== '' && !cartList.includes(meal)) {

        state[`${meal}`] = { 
            price: `${mealPrice}`,
            quantity: `${mealQuantity}`
        };

        cartList.push(meal);
        
        renderList();

        total += parseFloat(mealPrice) * parseInt(mealQuantity);
        order.value = '';
        quantityInput.value = '1';
        priceInput.value = '';
        renderTotal();
    }
});

list.addEventListener('click', (e)=>{
    const element = e.target;
    if(element.classList[0] === 'button') {
        const elementNode = element.parentElement;
        const elementDataName = element.dataset.name;
        let elementDataPrice = parseFloat(element.dataset.price);
        let elementDataQuantity = parseInt(element.dataset.quantity);
        total = total - (parseFloat(elementDataPrice) * parseInt(elementDataQuantity));
        elementNode.remove();
        if(cartList.includes(elementDataName))
        {
            const index = cartList.indexOf(elementDataName);
            cartList.splice(index,1);
            delete state[`${elementDataName}`];
        }

        renderList();
        renderTotal();
    }
});

totalPrice.addEventListener('click', () => {

    totalDiv.classList.toggle('hidden');
    renderTotal();
    
})

// addButton.addEventListener('click', crustType);

cart.addEventListener('click', () => {
    list.classList.toggle('hidden');
})

const renderList = () => {
    list.innerHTML = '';
    
    //console.log(quantityInput.value);
    // Setting the items in alphabetical order
    cartList.sort();
    cartList.forEach((orderedMeal) => {        

        itemHtml = `
            <div class="mt-sm-3 bg-light alert flexview">
                <p class="large">${orderedMeal}</p>
                <button type="button" class="btn btn-danger col-sm-2 remove-btn" data-name="${orderedMeal}" data-price="${state[`${orderedMeal}`].price}" data-quantity="${state[`${orderedMeal}`].quantity}">Remove</button>
            </div>`;    
        list.insertAdjacentHTML('beforeend', itemHtml);
    })
}

// function crustType(){

//  console.log("crustType"); 
// }

const renderTotal = () => {

    let crustCost;

    if (crustOptions.value === 'crispy')
    {
        
        crustCost = 200;
        alert('Cripsy!');

    } else if (crustOptions.value === 'stuffed')
    {

        crustCost = 270;
        alert('Stuffed!');

    } else if (crustOptions.value === 'gluten-free')
    {

        crustCost = 300;
        alert('Gluten-free!');

    }

    totalDiv.innerHTML = '';
    //const html = `Total : <span>${total}</span>`;
    const html = `<p class="display-4">Your total is: <span>KES${total + crustCost}</span></p>`;
    totalDiv.insertAdjacentHTML('afterbegin', html);
}

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const crustOptions = document.querySelector('.form-select');



