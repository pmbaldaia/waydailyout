const cards = document.querySelectorAll('.memory-card');
let firstCard, secondCard;
let hasFlipped = false;
let moves = 0;
noClick = false;
document.querySelectorAll('.moves')[0].innerText = moves;

mixCards()
function mixCards(){
    cards.forEach((card) =>{
        card.style.order = Math.floor(Math.random() * 11 + 1)
    });
}

function flipCard(){
    if(firstCard === this){
        return 
    }
    this.classList.add('flip');
    console.log(this)
    if(!hasFlipped){
        firstCard = this;
        hasFlipped = true;
    }else{
        moves++;
        document.querySelectorAll('.moves')[0].innerText = moves;
        secondCard = this;
        hasFlipped = false;
        if(firstCard.dataset.name == secondCard.dataset.name){
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
            setTimeout(()=>{
                firstCard.classList.add('card-ok')
                secondCard.classList.add('card-ok')
            }, 500);
        }else{
            setTimeout(()=>{
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                firstCard = null;
                secondCard= null;
            }, 800);
        }
    }
    
}
cards.forEach((card) => card.addEventListener('click', flipCard));

function dashboard(){
    window.location='../index.html'
}

function game2(){
    window.location='../html/game.html'
}
  