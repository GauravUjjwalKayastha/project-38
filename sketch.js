var ninImg,ninStarImg,bg,stoneImg;
var varH=200;
var gameState="start";
var score=0;
var obstaclesGroup,kGroup;//obstacle,kudai;
var obsNin = 1





function preload(){
  ninImg = loadAnimation("Run__000.png","Run__001.png","Run__002.png");
  ninIdle = loadAnimation("Idle__000.png","Idle__000.png");
  ninD=loadAnimation("Dead__007.png");
  ninStarImg=loadImage("Kunai.png");
  bg=loadImage("bambooBG.png");
  stoneImg=loadImage("stone.png");
  musicA=loadSound("alleyWays.mp3");
  chime=loadSound("chime1.mp3");
}


function setup() {
  createCanvas(displayWidth, displayHeight-200);
  
  
 
 /* ground.addImage("ground",bg);
  ground.scale=2.2;
  ground.x = ground.width /2+200;*/
  
  ninja=createSprite(displayWidth/2,varH,100,100);
  ninja.addAnimation("ninjastic",ninImg);
  ninja.addAnimation("ninjaDead",ninD);
  ninja.addAnimation("idling",ninIdle);
  ninja.scale=0.2;
  
  
  kGroup = createGroup();
  obstaclesGroup = createGroup();
  musicA.loop();

  textScore=createElement('h2');
  textScore.style('color',"white");
  textScore.style('font',"times");
  textScore.position(displayWidth-200,50);

  title=createElement('h1',"Ninja Rush");
  title.style('color','red');
  title.position(displayWidth/2-50,50);

  infor=createElement('h2');
  infor.style('color','blue');
  infor.position(500,150);
  infor2=createElement('h2');
  infor2.style('color','blue');
  infor2.position(500,200);
  infor3=createElement('h2');
  infor3.style('color','blue');
  infor3.position(600,400);
  lastText=createElement('h1');
  lastText.style('color','yellow');
  lastText.position(displayWidth/2-50,300)
  
}

function draw() {
  background(220);
  image(bg,0,(-height/2)-20,displayWidth*8,height*2+40);
 // writeIt(1);

 
    textScore.html("Score: "+score);

    stroke("red");
    strokeWeight(8)
    line((displayWidth*8)-displayWidth/2-30,-displayWidth,(displayWidth*8)-displayWidth/2-30,displayHeight*2);


  if(gameState==="start"){
    ninja.visible=false;

    lastText.hide();
    title.show();
    infor.html("Help ninja clear this obstacle coarse");
    infor.show();
    infor2.html("Use arrow keys for control");
    infor2.show();
    infor3.html("Press space to start");
    infor3.show();
    
    if(keyDown("space")){
      gameState="play";
    }
  }
  
  camera.position.x=ninja.x;
  camera.position.y=ninja.y;
  
  if(gameState==="play"){
    ninja.visible=true;
     ninja.changeAnimation("idling",ninIdle);

     title.hide();
     infor.hide();
     infor2.hide();
     infor3.hide();
     lastText.hide();
     
    if(keyDown("up")&&varH>0){
      varH=varH-20;
    }
    
    if(keyDown("down")&&varH<height){
      varH=varH+20;
  }
  if(keyDown("right")){
    ninja.x+=30;
    obsNin=0
  }
  else{
    obsNin=1
  }

  if(obsNin!==1){
    ninja.changeAnimation("ninjastic",ninImg)
  }
  else{
    ninja.changeAnimation("idling",ninIdle);
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
    if(ninja.x>(displayWidth*8)-displayWidth/2-30){
      gameState="win";
    }
    
  }
  
  if(gameState==="end"){
    ninja.changeAnimation("ninjaDead",ninD);

    lastText.html("You lost");
    lastText.show();
    infor3.html("Press space to retry");
    infor3.show();

    if(keyDown("space")){
      score=0;
      reset();
      gameState="play";
    }
    
  }

  if(gameState==="win"){
    ninja.changeAnimation("idling",ninIdle);

    lastText.html("You Won!");
    lastText.show();
    infor3.html("Press space to replay");
    infor3.show();
     
    if(keyDown("space")){
      score=0;
      reset();
      gameState="play";
    }
    
  }
  
  
  drawSprites();
  
  
 /* 
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
   }*/
  
  
}

function spawnObstacles(){
 if (frameCount % 5 === 0&&obsNin===0){
   var obstacle = createSprite(ninja.x+displayWidth/2,random(0,height),10,40);
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
 if (frameCount % 20 === 0&&obsNin===0){
   var kudai = createSprite(ninja.x+displayWidth/2,num,10,40);
  // kudai.velocityX = -(6 + score/3);
   kudai.addImage("stars",ninStarImg)
   kudai.scale=0.4;
   //kudai.lifetime = 220;
  kGroup.add(kudai);
 }
}
function reset()
{
  obstaclesGroup.destroyEach();
  kGroup.destroyEach();
  ninja.x=displayWidth/2;
  ninja.y=height/2;
}