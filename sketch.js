var board,
 bluePlayer, redPlayer, bluePlayerImg, redPlayerImg,
 diceImg1, diceImg2, diceImg3, diceImg4, diceImg5, diceImg6, dice, setting, moved;
 
 var boardNo = 1;

function preload(){
    
    board = loadImage('images/background.png');
    
    bluePlayerImg = loadImage('images/bluePiece.png');
    redPlayerImg = loadImage('images/redPiece.png');
    
    diceImg1 = loadImage('images/dieRed1.png');
    diceImg2 = loadImage('images/dieRed2.png');
    diceImg3 = loadImage('images/dieRed3.png');
    diceImg4 = loadImage('images/dieRed4.png');
    diceImg5 = loadImage('images/dieRed5.png');
    diceImg6 = loadImage('images/dieRed6.png');

}

function setup(){
    createCanvas(875,700)

    bluePlayer = createSprite(35,665,50,50);
    bluePlayer.addImage(bluePlayerImg);
    bluePlayer.scale = 0.165;

    moved = false;

   // redPlayer = createSprite(35,665,50,50);
   // redPlayer.addImage(redPlayerImg);
   // redPlayer.scale = 0.165;

    dice = createSprite(780,625,150,150);
    dice.scale = 1.5;
    
    setting = [false,1,0,false,0];

    // 0 = If dice is rolling or not
    // 1 = No displayed
    // 2 = How many times will dice roll
    // 3 = Player will move or not
    // 4 = How many steps in current chance
}

function draw(){
    background('green');

    imageMode(CENTER);
    image(board,350,350,700,700)

    // Move the player
    if(setting[3] == false){
        drawDice(setting[1],dice)
    }

    else{
        drawDice(setting[1],dice);
        
        if(boardNo !== 100 && moved == false){
            if(boardNo % 10 == 0){
                moveUp(bluePlayer);
            }

            else{
                
                var num = Math.floor(boardNo/10);

                if(num == 0 || num == 2 || num == 4 || num == 6 || num == 8){
                    moveRight(bluePlayer);
                }

                else{
                    moveLeft(bluePlayer);
                }
            }

            boardNo++;
            moved = true;
        }
    }

        if(frameCount % 15 == 0){

            setting[4]--;
            moved = false;

            if(setting[4] == 0){
                setting[3] = false;
                setting[0] = false;
                checkForLadderAndSnake(bluePlayer);
            }
        }



    // Make the dice roll
    if(setting[0] == true && setting[2] > 0 && frameCount % 10 == 0){
        setting[2]--;
        setting[1]++;

        if(setting[1] > 6){
            setting[1] = 1;
        }

        if(setting[2] == 0){
         
            setting[3] = true;
            setting[4] = setting[1];
        }
    }

    drawSprites();

    console.log('X: ' + mouseX);
    console.log('Y: ' + mouseY);
    //console.log(bluePlayer.x);
    
}

function keyPressed(){

    if(keyCode == 32 && setting[0] == false){

        setting[0] = true;
        setting[2] = Math.round(random(10,15))
    }
}

function moveRight(object1){
    object1.x = object1.x + 70; 
}

function moveLeft(object1){
    object1.x = object1.x - 70; 
}

function moveUp(object1){
    object1.y = object1.y - 70
}

function moveDown(object1){
    object1.y = object1.y + 70
}


function drawDice(side, object){
    
    if(side == 1){
        object.addImage(diceImg1);
        
    }

    else if(side == 2){
        object.addImage(diceImg2);
        
    }

    else if(side == 3){
        object.addImage(diceImg3);
        
    }

    else if(side == 4){
        object.addImage(diceImg4);
        
    }

    else if(side == 5){
        object.addImage(diceImg5);
        
    }

    else {
        object.addImage(diceImg6);
        
    }
}

function checkForLadderAndSnake(object){
    // Check for ladders:
    
    if(boardNo == 2){
        object.velocityY = -1;
        object.velocityX = 0.4;

        boardNo = 23;        
    }

    if(object.x >= 160 && boardNo == 23){

        object.velocityY = 0;
        object.velocityX = 0;

    }

    if(boardNo == 6){

        object.velocityY = -5;
        object.velocityX = -1.291;

        boardNo = 45;
    }

    if(object.x <= 313 && boardNo == 45){

        object.velocityY = 0;
        object.velocityX = 0;
        
    }

    if(boardNo == 20){

        object.velocityX = 2;
        object.velocityY = -7

        boardNo = 59;
    }

    if(object.x >= 115 && boardNo == 59){

        object.velocityY = 0;
        object.velocityX = 0;
        
    }

    if(boardNo == 28){

        object.velocityX = 1.5;
        object.velocityY = -3

        boardNo = 49;
    }

    if(object.x >= 597 && boardNo == 49){

        object.velocityX = 0;
        object.velocityY = 0;
       
    }

    if(boardNo == 52){

        object.velocityX = 0;
        object.velocityY = -2

        boardNo = 72;
    }

    if(object.x == 595 && object.y >= 175 && boardNo == 72){

        object.velocityX = 0;
        object.velocityY = 0;
        
    }

    if(boardNo == 57){

        object.velocityX = 1.5;
        object.velocityY = -6;

        boardNo = 96;
    }

    if(object.x >= 316 && boardNo == 96){

        object.velocityX = 0;
        object.velocityY = 0;
        
    }

    if(boardNo == 71){
        
        object.velocityX = -1.7;
        object.velocityY = -4;

        boardNo = 92;
    }

    if(object.x <= 604 && boardNo == 92){

        object.velocityX = 0;
        object.velocityY = 0;
        
    }


    // Check for snakes:

    if(boardNo == 98){
        object.velocityY = 2;
        object.velocityX = -0.66;
        boardNo = 40;
    }

    if(object.x <= 35 && boardNo == 40){
        object.velocityY = 0;
        object.velocityX = 0;
    }

    if(boardNo == 87){

        object.velocityX = 2
        object.velocityY = 4

        boardNo = 49
    }

    if(object.x >= 595 && boardNo == 49){
        object.velocityY = 0;
        object.velocityX = 0;
    }

    if(boardNo == 84){

        object.velocityX = -1
        object.velocityY = 3

        boardNo = 58
    }

    if(object.x <= 175 && boardNo == 58){
        object.velocityY = 0;
        object.velocityX = 0;
    }

    if(boardNo == 73){

        object.velocityX = -1.75;
        object.velocityY = 5

        boardNo = 15;
    }

    if(object.x <= 380 && boardNo == 15){

        object.velocityY = 0;
        object.velocityX = 0;
    }

    if(boardNo == 56){

        object.velocityX = 3;
        object.velocityY = 5;

        boardNo = 8;
    }

    if(object.x >= 525 && boardNo == 8){

        object.velocityY = 0;
        object.velocityX = 0;
    }

    if(boardNo == 50){

        object.velocityX = -5;
        object.velocityY = 4;

        boardNo = 5;
    }

    if(object.x <= 315 && boardNo == 5){

        object.velocityY = 0;
        object.velocityX = 0;
    }

    if(boardNo == 43){

        object.velocityX = 2;
        object.velocityY = 6;

        boardNo = 17;
    }

    if(object.x >= 245 && boardNo == 17){

        object.velocityY = 0;
        object.velocityX = 0;
    }

}