//game state
var gameState;
var PLAY;
var END;

//Global Variables
var player, player_running;
var jungle, jungleImage;
var banana,bananaImage;
var stone, stoneImage, stoneGroup;
var ground;
var score = 0;
var count = 0;


function preload(){
  //loading the image and animation
  jungleImage = loadImage("jungle.jpg");
  bananaImage = loadImage("Banana.png");
  stoneImage = loadImage("stone.png");
  player_running = 
  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
}

function setup() {
  createCanvas(600,300);
  //creating the sprites and adding the image
  jungle = createSprite(500,10,80,50);
  jungle.addImage("jungle",jungleImage);
  jungle.x = jungle.width /2;
  jungle.velocityX = -4; 
  jungle.scale = 1.5;
    
  
  player = createSprite(150,250,20,20);
  player.addAnimation("running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(300,300,600,10);
  ground.visible = false;
  //creating a new group
  stoneGroup = new Group();
  bananaGroup = new Group();
  
  
}


function draw(){
 background(205);
  //creating gamestate as play
  if(gameState === PLAY){
     //making the monkey jump
  if(keyDown("space")) {
    player.velocityY = -14;
  }
     //reseting the jungle 
  if (jungle.x <0){
    jungle.x = jungle.width/2;
  }
    
    //increasing the score by 2 when player touching the banana 
    if(bananaGroup.isTouching (player)){
       bananaGroup.destroyEach();
       score = score+2;
      }
    
    //increasing the size of monkey
  switch(score){
    case 10: player.scale = 0.12;
      break;
    case 20: player.scale = 0.14;
      break;
    case 30: player.scale = 0.16;
      break;
    case 40: player.scale = 0.18;
      break;  
      default:break;
  }
    
    
  
    //adding the gravit
    player.velocityY = player.velocityY + 0.8
   player.collide(ground);
    
    //drecrising the size of the player
  if(stoneGroup.isTouching(player) && count === 0){
     player.scale = 0.08;
    count ++ 
     }
    if(stoneGroup.isTouching(player) && count>0){
      gameState = END;
    } 
  }
    //creating the function
    create();
    rock();
    
   //creating game state as end
  if(gameState === END){
    jungle.velocityX = 0;
    bananaGroup.velocityX = 0;
    stoneGroup.velocityX = 0;
    text("Game Over",300,300);
    
  }
  drawSprites();
  
  //creating the score 
  stroke("white");
  textSize(20);
  fill("white");
  text("score: "+ score, 300,20);  
    
}

function create(){
  //creating the banana after 210 frames
   if(frameCount%210 === 0){
       banana = createSprite(600,random(200,130),20,20);
       banana.addImage("running",bananaImage);
       banana.velocityX = -4;
       banana.scale = 0.04;
       banana.lifetime = 300; 
       bananaGroup.add(banana);
      
    }

}

function rock(){
  //creating the stone after 210 frames
   if(frameCount%150 === 0){
     stone = createSprite(600,273,20,20);
     stone.addImage("running",stoneImage);
     stone.scale = 0.150;
     stone.velocityX = -5;
     stone.lifetime = 300;
     stoneGroup.add(stone);
    }

}
