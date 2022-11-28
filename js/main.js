let yourName = prompt("What's your Name?");

document.querySelector('.control-buttons span').onclick = function () {


    if(yourName == null || yourName == ""){
        document.querySelector('.name span').innerHTML = "Unknown" ;
    }else{
        document.querySelector('.name span').innerHTML = yourName ;
    }
    document.querySelector('.control-buttons').remove();

    document.getElementById("background-sound").play();

    let allCards = document.querySelectorAll(".game-block");
    allCards.forEach(function(card){
        card.classList.add("is-flipped");
        setTimeout(() =>{
            card.classList.remove("is-flipped");
        },3000);
    })
    /*
    const startingMinutes = 5;
    let time = startingMinutes* 60;
    const countdownElement = document.getElementById('Conuter-down');
    setInterval(updateCountdown, 1000);
    function updateCountdown(){
        const minutes = Math.floor(time/60);
        let seconds = time % 60;
        countdownElement.innerHTML = `${minutes}: ${seconds}`;

        time--;
        if(seconds < 0){
            countdownElement.innerHTML = "Vous Avez Perdu";
            let gameLost = document.querySelector(".lost-slider");
            gameLost.classList.add("show");
            doucment.getElementById("lost-sound").play();
        }
    }
    */
    let sec = 0;
    function pad(val) {
        return val > 9 ? val : "0" + val;
    }
    let timer = setInterval(function () {
        document.querySelector(".seconds-timer").innerHTML = pad(++sec % 60);
        document.querySelector(".minutes-timer").innerHTML = pad(parseInt(sec / 60, 10));
    }, 1000);
    setTimeout(function () {
        clearInterval(timer);
        document.querySelector(".lost-slider p").innerHTML = "Vous Avez Perdu";
            let gameLost = document.querySelector(".lost-slider");
            gameLost.classList.add("show");
            document.getElementById("lost-sound").play();
            let stopTimer =  document.querySelector(".win-slider.show");

            if(stopTimer==document.querySelector(".win-slider.show")) {
            setTimeout(() => {
                clearInterval(timer);
            }, 2000);

            }

    }, 300000);
    winGameFinale();
};




let duration = 1000;
// select the main container of the game blocks
let blocksContainer = document.querySelector('.memory-game-blocks');
//Create the array for the items from the main container
let blocks = Array.from(blocksContainer.children);
//extract the elements of array into a varaible to be able to use

//method one = let orderRange = [...Array(blocks.length).keys()];
//method two:
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);


//Add order css property to the container elements
blocks.forEach((block, index )=>{
    block.style.order = orderRange[index];
    //add click event
    block.addEventListener('click', function(){

    //trigger the flipBlock fuction
    flipBlock(block);
    })


})
//Flip block function
function flipBlock(selectedBlock){
    selectedBlock.classList.add('is-flipped');
    //collect all flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock =>flippedBlock.classList.contains('is-flipped'));
    //check if there is two blocks are flipped
    if(allFlippedBlocks.length === 2){
        // in the if condition wwe will add two functions

        //stop clicking function
        stopClicking();
        //Check for matched blocks
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

    }
   // console.log(blocks.length);
        winGameFinale(allFlippedBlocks);
}
//stop clicking function
function stopClicking(){
    // add a class on the main container to prevent clicking function
    blocksContainer.classList.add("no-clicking");

    //make a set time out to remove the function
    setTimeout(()=>{
        //remove the no clicking class from the main container after the time out
        blocksContainer.classList.remove("no-clicking");
    }, duration);

}
function checkMatchedBlocks(firstBlock, secondBlock){
    let triesElement = document.querySelector(".tries span");

    if(firstBlock.dataset.animal === secondBlock.dataset.animal){
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-matched");
        secondBlock.classList.add("has-matched");
        document.getElementById('succeed').play();
    }else{
        //add the numer of wronge tries
        triesElement.innerHTML= parseInt(triesElement.innerHTML) + 1;
        // reflip the cards if they don't matches in a set timeout
        setTimeout(() =>{
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration);
        document.getElementById('failed').play();
    }
}
//Shuffle Functions
function shuffle (array){
    //setting the vars
    let current = array.length,
    temp,
    random;

    //loop on the number in the current array
    while(current > 0){
        //get a random number

        random = Math.floor(Math.random()* current);
        current--;
    // save the current array in the stach(temp)
        temp = array[current];
    //current array = random index
        array[current] = array[random];
    // the new random array == the current array in the stach after replacment
        array[random] = temp
    }return array;

}

//let yourName = prompt("What's your Name?");

function winGameFinale(theMatch, theName, theTime){
    let winFlippedBlocks = blocks.filter(flippedBlock =>flippedBlock.classList.contains('has-matched'));

    if(winFlippedBlocks.length===blocks.length){
        let winGame = document.querySelector(".win-slider");
        winGame.classList.add("show");
        document.getElementById("win-audio").play();

        if(yourName == null || yourName == ""){
            document.querySelector('.winner-name span').innerHTML = "Unknown" ;
        }else{
            document.querySelector('.winner-name span').innerHTML = yourName ;
        }
        let sec = 0;
    function pad(val) {
        return val > 9 ? val : "0" + val;
    }
    let stopTimer = setInterval(function () {
       // document.querySelector(".your-time span").innerHTML = pad(parseInt(sec / 60, 10))+ ":" + pad(++sec % 60);
        let timeFinale = document.querySelector(".timer");

        document.querySelector(".sec").innerHTML = pad(++sec % 60);
        document.querySelector(".min").innerHTML = pad(parseInt(sec / 60, 10));



    }, 1000);
    setTimeout(function () {
        if(winGame.classList.contains("show")){
        clearInterval(stopTimer);
    }
    }, 1000);
}
}

