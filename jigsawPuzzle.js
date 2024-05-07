//////////////////////////////////FOR RANDOMIZING IMAGE SET//////////////////////////////////////////////////
function chooseImageSet(){
    //move the screen elements to center & start timer
    puzzleSetup();
    startTimer();

    //create list of image id's
    imgId1 = ["1-1","1-2","1-3","1-4","1-5","1-6","1-7","1-8","1-9","1-10","1-11","1-12"];
    imgId2 = ["2-1","2-2","2-3","2-4","2-5","2-6","2-7","2-8","2-9","2-10","2-11","2-12"];
    imgId3 = ["3-1","3-2","3-3","3-4","3-5","3-6","3-7","3-8","3-9","3-10","3-11","3-12"];
    allImages = [imgId1, imgId2, imgId3];

    //choose a random set of image id's
    var rnd_idx = Math.trunc(Math.random() * 3);
    chosenList = allImages[rnd_idx];

    //bring those image id's to front of page
    for (var item of chosenList){
        currentPic = document.getElementById(item);
        currentPic.style.zIndex = "10";
    }

    randomOrder();
}

function puzzleSetup(){
    puzzleback = document.getElementById("frame");
    puzzleback.style.left = (window.innerWidth - 400) / 2 + "px";
    puzzleback.style.top = 10 + "px";

    buttonFrame = document.getElementById("button");
    buttonFrame.style.left = (window.innerWidth - buttonFrame.offsetWidth) / 2 + "px";
    buttonFrame.style.top = 370 + "px";

    messageFrame = document.getElementById("puzzleMessage");
    messageFrame.style.left = (window.innerWidth - messageFrame.offsetWidth) / 2 + "px";
    messageFrame.style.top = 340 + "px";

    timerFrame = document.getElementById("timerText");
    timerFrame.style.left = (window.innerWidth - timerFrame.offsetWidth) / 2 + "px";
    timerFrame.style.top = 315 + "px";
}


//////////////////////////////////FOR RANDOMIZING ORDER OF BLOCKS//////////////////////////////////////////////////
function randomOrder(){
    //populate a list of all spans
    var spanList = []
    for (var i = 1; i <= 12; i++){
        spanList.push(document.getElementById(i.toString()));
    }

    //randomize spanList
    var randomSpanList = spanList.sort(() => Math.random() - 0.5); 
    console.log(randomSpanList);
    placeSpans(randomSpanList);
}

function placeSpans(list){
    var marginTop = 400;
    var marginLeft = (window.innerWidth - 660) / 2;
    var spacing = 110

    for (var i = 0; i < list.length; i++) {
        var row = Math.floor(i/6);
        var column = i % 6;
        list[i].style.top = (row * spacing + marginTop) + "px";
        list[i].style.left = (column * spacing + marginLeft) + "px";
    }
}

//////////////////////////////////////////FOR MOVING IMAGES//////////////////////////////////////////////////////
function grabber(event) {

    // Set the global variable for the element to be moved
    theElement = event.currentTarget;
 
    // Determine the position of the word to be grabbed, first removing the units from left and top
    posX = parseInt(theElement.style.left);
    posY = parseInt(theElement.style.top);
 
    // Compute the difference between where it is and where the mouse click occurred
    diffX = event.clientX - posX;
    diffY = event.clientY - posY;
 
    // Now register the event handlers for moving and dropping the img
    document.addEventListener("mousemove", mover, true);
    document.addEventListener("mouseup", dropper, true);
 
 }
 
 // The event handler function for moving the img
 function mover(event) {
    // Compute the new position, add the units, and move the img
    theElement.style.left = (event.clientX - diffX) + "px";
    theElement.style.top = (event.clientY - diffY) + "px";
 }
 
 // The event handler function for dropping the img
 function dropper(event) {
    // Unregister the event handlers for mouseup and mousemove
    document.removeEventListener("mouseup", dropper, true);
    document.removeEventListener("mousemove", mover, true);
 }

 //////////////////////////////////////////FOR TIMER//////////////////////////////////////////////////////
let timer = setInterval; 
let timerCount = 0;

function startTimer(){
    timer = setInterval(addCount, 1000);
}

function addCount(){
    timerCount ++;
    timerFrame.textContent = "Time: " + timerCount.toString() + " second(s)";
    timerFrame.style.left = (window.innerWidth - timerFrame.offsetWidth) / 2 + "px";
}

function endTimer() {
    clearInterval(timer);
    checkPuzzle();
}

 //////////////////////////////////////////FOR CHECKING PUZZLE////////////////////////////////////////////
function checkPuzzle() {
    correctPieces = 0
    puzzlebackObject = document.getElementById("frame").getBoundingClientRect();

    referenceX = puzzlebackObject.left;
    referenceY = puzzlebackObject.top;

    for (var i = 0; i < 12; i++) {
        xStart = referenceX + (i%4) * 100;
        yStart = referenceY + Math.floor(i/4) * 100;
        xEnd = xStart + 100;
        yEnd = yStart + 100;

        currentPiece = document.getElementById((i+1).toString())
        currentPieceFrame = currentPiece.getBoundingClientRect();
        pieceMidX = currentPieceFrame.left + 50;
        pieceMidY = currentPieceFrame.top + 50;

        if (xStart < pieceMidX && pieceMidX < xEnd && yStart < pieceMidY && pieceMidY < yEnd) {
            correctPieces ++;
        }
    }

    messageFrame.textContent =  correctPieces.toString() + " / 12 pieces correct. ";
    if (correctPieces == 12) {
        messageFrame.textContent = messageFrame.textContent + "Congratulations! You got it!";
    } else {
        messageFrame.textContent = messageFrame.textContent + "Better luck next time.";
    }

    messageFrame.style.left = (window.innerWidth - messageFrame.offsetWidth) / 2 + "px";
}