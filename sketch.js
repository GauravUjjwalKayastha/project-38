var ninImg,ninStarImg,bg,stoneImg;
var varH=100;
var gameState="start";
var score=0;
var obstaclesGroup,kGroup;//obstacle,kudai;





function preload(){
  ninImg = loadAnimation("Run__000.png","Run__001.png","Run__002.png");
  ninD=loadAnimation("Dead__007.png");
  ninStarImg=loadImage("Kunai.png");
  bg=loadImage("bambooBG.png");
  stoneImg=loadImage("stone.png");
  musicA=loadSound("alleyWays.mp3");
  chime=loadSound("chime1.mp3");
}


function setup() {
  createCanvas(displayWidth, displayHeight-300);
  
  
 
 /* ground.addImage("ground",bg);
  ground.scale=2.2;
  ground.x = ground.width /2+200;*/
  
  ninja=createSprite(100,varH,100,100);
  ninja.addAnimation("ninjastic",ninImg);
  ninja.addAnimation("ninjaDead",ninD);
  ninja.scale=0.2;
  
  
  kGroup = createGroup();
  obstaclesGroup = createGroup();
  musicA.loop();
  
}

function draw() {
  background(220);
  image(bg,0,0,displayWidth*5,displayHeight);
  if(gameState==="start"){
    ninja.visible=false;
    
    if(keyDown("space")){
      gameState="play";
    }
  }
  
  camera.position.x=ninja.x;
  
  if(gameState==="play"){
    ninja.visible=true;
     ninja.changeAnimation("ninjastic",ninImg);
    
    //ground.velocityX = -(6 + score/3);
    /*if (ground.x < 140){
      ground.x = ground.width/2;
    }*/
    
    
    if(keyDown("up")&&varH>0){
      varH=varH-15;
    }
    
    if(keyDown("down")&&varH<height){
      varH=varH+15;
  }
  if(keyDown("right")){
    ninja.x+=15;
  }
    ninja.y=varH;
    
    spawnKudai();
    spawnObstacles();
    
    if(ninja.isTouching(obstaclesGroup)){
    gameState="end";
    chime.play();
    }
    if(ninja.isTouching(kGroup)){
    kGroup.destroyEach();
      score+=1;
      chime.play();
    }
    if(obstaclesGroup.isTouching(kGroup)){
    kGroup.destroyEach();
      //score+=1;
    }
    
  }
  
  if(gameState==="end"){
    ninja.changeAnimation("ninjaDead",ninD);
    ground.velocityX=0;
    
    obstaclesGroup.setLifetimeEach(-1);
    kGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     kGroup.setVelocityXEach(0);  
     
    if(keyDown("space")){
      score=0;
      reset();
      gameState="play";
    }
    
  }
  
  
  
  drawSprites();
  
  
  
  textSize(30)
  fill("white");
  text("Score: "+score,displayWidth-400,100)
  
  
  
  
   if(gameState==="start"){
     fill("red");
     textSize(60);
    text("Ninja Rush",displayWidth/2-150,100)
     
     fill("blue");
     textSize(20);
    text("A ninja has lost his weapons while training!",150,200)
     text("Help Ninja collect his lost weapons.",150,240)
     text("Use arrow keys to move the ninja.",150,280)
     text("Press space to start",150,320)
      }
  
  
   if(gameState==="end"){
    fill("red");
     textSize(60);
    text("Game Over",displayWidth/2-200,200)
    
     fill("blue");
     textSize(20);
    text("Press space to retry",displayWidth/2-150,300)
   }
  
  
}

function spawnObstacles(){
 if (frameCount % 10 === 0){
   var obstacle = createSprite(random(100,displayWidth*5),random(0,height),10,40);
  // obstacle.velocityX = -(6 + score/3);
   obstacle.addImage("stones",stoneImg)
   obstacle.scale=0.2;
  // obstacle.lifetime = 220;
   //obstacle.debug=true;
   obstacle.setCollider("rectangle",0,0,60,60)
  obstaclesGroup.add(obstacle);
 }
}
function spawnKudai(){
  var num=random(0,height);
 if (frameCount % 150 === 0){
   var kudai = createSprite(width,num,10,40);
  // kudai.velocityX = -(6 + score/3);
   kudai.addImage("stars",ninStarImg)
   kudai.scale=0.4;
   kudai.lifetime = 220;
  kGroup.add(kudai);
 }
}
function reset()
{
  obstaclesGroup.destroyEach();
  kGroup.destroyEach();
}