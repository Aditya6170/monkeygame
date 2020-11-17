
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,300)
  monkey = createSprite(40,235,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(300,280,1600,10);
  ground.velocityX=-3;
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  score = 0;
}


function draw() {
  
    background("LIGHTBLUE");
  
  if(gameState === PLAY){
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
      score = score + Math.round(getFrameRate()/60);
    
    //jump when space key is pressed
    if(keyDown("space") && monkey.y>=244){
      monkey.velocityY = -11;
    }
    monkey.velocityY = monkey.velocityY + 0.5;
    text("SURVIVAL TIME: "+ score, 400,50);
    food();
  Obstacles();
    
    if(monkey.isTouching(FoodGroup)){
    score=score+100;
    FoodGroup.destroyEach();
  }
  
  if (monkey.isTouching(obstacleGroup)){
    gameState=END;
  }
  }
  if(gameState === END){
    score=0;
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    monkey.x=1000;
    ground.velocityX=0;
    ground.y=1000;
    
    
    
  }
  
  console.log(monkey.y);
  
  //stop trex from falling down
  monkey.collide(ground);

  drawSprites();
  
  
}
 function food(){
   if (frameCount % 80 === 0){
     banana = createSprite(600,180,10,10);
     banana.y = Math.round(random(200,120));
     banana.velocityX=-7;
     banana.addImage("image",bananaImage);
     banana.scale=0.1;
     banana.lifetime = 100;
     banana.depth=monkey.depth;
     monkey.depth=monkey.depth+1;
     FoodGroup.add(banana);
    
   } 
   }
 function Obstacles(){
   if (frameCount % 100 === 0){
     obstacle =createSprite(600,260,20,10);
     obstacle.velocityX=-7;
     obstacle.addImage("obstacle",obstacleImage);
     obstacle.scale=0.1;
     obstacle.lifetime = 100;
     obstacleGroup.add(obstacle);
   }
   
   
   
   
 }




