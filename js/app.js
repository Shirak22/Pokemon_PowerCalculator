const pokemons = [{
    id: 1,
    name: 'Bulbasaur',
    cp: 439
},
{
    id: 37,
    name: 'Vulpix',
    cp: 194
},
{
    id: 134,
    name: 'Vaporeon',
    cp: 2469
},
{
    id: 130,
    name: 'Gyarados',
    cp: 2406
},
{
    id: 25,
    name: 'Pikachu',
    cp: 455
},
{
    id: 27,
    name: 'Sandshrew',
    cp: 710
},
{
    id: 52,
    name: 'Meowth',
    cp: 121
},
] ; 

let chosenPokemons= []; 



//1--> rendering the UI from pokemon array // take the objects and draw them in the DOM 

//2--> loop throght the elements in the DOM and add Event Listener that pushes the same 
// generated element to chosenPokemons[] and delete it from the Main pokemon array[] 

update();


function returnIdOFDomElement() {
    let pokemonsCards = document.querySelectorAll('#available__cards .card');
    let chosenCards = document.querySelectorAll('#chosen__cards .card');
    pokemonsCards.forEach(el => {
        el.addEventListener('click', () => {
            moveArrayToArray(parseInt(el.id),pokemons,chosenPokemons);
            update();
        });
    });
    
    
    chosenCards.forEach(card => {
        card.addEventListener('click', () => {
            moveArrayToArray(parseInt(card.id),chosenPokemons,pokemons);
            update();
        });
    });
  
}

function update(){
    updatePokemons(pokemons,'available'); 
    updatePokemons(chosenPokemons,'chosen'); 
    updateTotalCP(chosenPokemons);
    returnIdOFDomElement();
}
function moveArrayToArray(id,arr1,arr2){
    arr1.forEach(el => {
        if(id === el.id){
            arr2.push(el);
            arr1.splice(arr1.indexOf(el), 1);
        }
    });
    
}

function updateTotalCP(arr){
    let total = 0;
    arr.forEach(element => {
        total += element.cp;
    });
    document.querySelector('.chosen__totalCP').innerText = 'Total CP: ' + total; 
}
function updatePokemons(arr,cardsPalceString){
    let domElement = cardsPalceString === 'available' ? document.querySelector('#available__cards') : document.querySelector('#chosen__cards'); 
        domElement.innerHTML = '';
    arr.forEach(element => {
        renderCardUI(domElement, element);
    });
}

function renderCardUI(place,card) {
    let el = document.createElement('article');
    el.classList.add('card');
    el.setAttribute('id',card.id);
    el.innerHTML = `
        <img class="card__img" src="https://upload.wikimedia.org/wikipedia/en/a/a6/Pok%C3%A9mon_Pikachu_art.png" alt="">
        <section class="card__info">
            <h2>${card.name}</h2>
            <p>${card.cp} CP</p>
        </section>
    
    ` ;

    place.appendChild(el);
 }
