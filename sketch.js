/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;
var kangaroo

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);
 
  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  kangaroo = createSprite(100,310)
  kangaroo.addAnimation("running",kangaroo_running)
  kangaroo.addAnimation("collided",kangaroo_collided)
  kangaroo.changeAnimation("running")
  kangaroo.setCollider("circle",0,0,300)
  kangaroo.scale = 0.2
  invisiblejungle = createSprite(400,320,1000,8)
  invisiblejungle.visible = false

  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);
  kangaroo.x = camera.position.x-270
  kangaroo.collide(invisiblejungle)
  if(gameState === PLAY){
    jungle.velocityX  = -4
    if(jungle.x<0){
      jungle.x = width/2
    }
    if(keyDown("space")){
      jumpSound.play()
      kangaroo.velocityY = -20

 }    
  if(kangaroo.isTouching(shrubsGroup)){
    shrubsGroup.destroyEach()
    score += 1
    collidedSound.play()
  }
  if(kangaroo.isTouching(obstaclesGroup)){
   gameState = END
   
  }
  kangaroo.velocityY=kangaroo.velocityY+1    
  spawnShrubs()
  spawnObstacles()

  }
  if(gameState === END){
    jungle.velocityX = 0
    kangaroo.destroy()
    obstaclesGroup.destroyEach()
    shrubsGroup.destroyEach()
    score = 0
   
  }

  drawSprites();

}
function spawnShrubs(){
  if(frameCount%110 === 0){
    var shrub = createSprite(camera.position.x+500,330,40,10)
    shrub.velocityX = -6
    var rand = Math.round(random(1,2,3))
    shrub.lifetime = 300
    shrubsGroup.add(shrub)

    if(rand === 1){
      shrub.addImage(shrub1)
      shrub.scale =  0.05

    
    }
    if(rand === 2){
      shrub.addImage(shrub2)
      shrub.scale =  0.05

    }
    else{
      shrub.addImage(shrub3)
      shrub.scale =  0.05

    }
    
  }
}
function spawnObstacles(){
  if(frameCount%125 === 0){
    var obstacle = createSprite(camera.position.x+500,330,40,10)
    obstacle.addImage(obstacle1)
    obstacle.velocityX = -6
    obstacle.lifetime = 300
    obstacle.scale = 0.08
    obstaclesGroup.add(obstacle)

  }
}