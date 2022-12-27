var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudiemash;
var obstaculo1;
var obstaculo2;
var obstaculo3;
var obstaculo4;
var obstaculo5;
var obstaculo6;
var score = 0;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var grupocactus;
var gruponuves;
var restart;
var gameover;

function preload() {

  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png")
  cloudiemash = loadImage("cloud.png");
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  finjuego = loadImage("gameOver.png");
  reinicio = loadImage("restart.png");
}

function setup() {

  createCanvas(600, 200);
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collide", trex_collided);
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  //suelo invisible
  invisibleGround = createSprite(200, 190, 400, 20);
  invisibleGround.visible = false;
  //console.log("hola "+trex);
  grupocactus = createGroup();
  gruponuves = createGroup();
  trex.setCollider("circle", 0, 0, 40);
  trex.debug = false;
  gameover = createSprite(300, 100);
  gameover.addImage("fin del juego", finjuego);
  restart = createSprite(300, 140);
  restart.addImage("reiniciar", reinicio);
  gameover.scale = 0.5;
  restart.scale = 0.5;
}

function draw() {

  background("black");
  text("putuacion: "+score, 500, 50);
  //jump when the space button is pressed
  
  trex.collide(invisibleGround);

  if (gamestate === PLAY){
    score = score + Math.round(frameCount/200);
    if (keyDown("space") && trex.y >= 150) {
      trex.velocityY = -12;
    }
  
  trex.velocityY = trex.velocityY + 0.5;
  
   if (ground.x < 0) {
    ground.x = ground.width / 2;
   }
  
   spanwnClouds(Math.round(random(10, 100)));
   createCactus();
   
   if (trex.isTouching(grupocactus)){
    gamestate = END;
   }
  }
  else if (gamestate === END){
    ground.velocityX = 0;
    grupocactus.setVelocityXEach(0);
    gruponuves.setVelocityXEach(0);
    trex.changeAnimation("collide", trex_collided);
    grupocactus.setLifetimeEach(-1);
    gruponuves.setLifetimeEach(-1);
  }
  console.log(gamestate);
  drawSprites();

}

function spanwnClouds(y){
  if (frameCount%60 === 0){
   cloud = createSprite(600, y, 40, 10);
   cloud.scale = 0.1;
   cloud.addImage("nube", cloudiemash);
   cloud.velocityX = -3;
   cloud.depth = trex.depth;
   cloud.lifetime = 220;
   trex.depth = trex.depth + 1;
   gruponuves.add(cloud);
  }
}

function createCactus(){
  if (frameCount%80 === 0){
    var rand;
   cactus = createSprite(600, 165, 10, 40);
   cactus.velocityX = -3;
   rand = Math.round(random(1,6));
   switch(rand){
    case 1: cactus.addImage(obstaculo1);
    break;
    case 2: cactus.addImage(obstaculo2);
    break;
    case 3: cactus.addImage(obstaculo3);
    break;
    case 4: cactus.addImage(obstaculo4);
    break;
    case 5: cactus.addImage(obstaculo5);
    break;
    case 6: cactus.addImage(obstaculo6);
    break;
    default: break;
   }
   cactus.lifetime = 220;
   cactus.scale = 0.5;
   grupocactus.add(cactus);
  }
}