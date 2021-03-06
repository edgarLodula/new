
var trex ,trex_running;
var solo2;
var edges;
var solo,solo_run;
var c1,c2,c3,c4,c5,c6,c7;
var pite;
var cabeça;
var gr="jogar"
var g_nuv
var g_cac
var morte
var ponto=0
var reset,fim,resetmg
var fimg
var jump,point,colide
var velo=4
function preload(){ // funç~;ao que carregar todas as imagens e animações
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
solo_run= loadImage("ground2.png")
pite=loadAnimation("ptr1.png","ptr2.png")
cabeça=loadAnimation("trex_d1.png","trex_d2.png")

c1= loadImage("cloud.png")
c2=loadImage("obstacle1.png")
c3=loadImage("obstacle2.png")
c4=loadImage("obstacle3.png")
c5=loadImage("obstacle4.png")
c6=loadImage("obstacle5.png")
c7=loadImage("obstacle6.png")

morte=loadAnimation("trex_collided.png")

resetmg= loadImage("restart.png")
fimg=loadImage("gameOver.png")

jump=loadSound("jump.mp3")
point=loadSound("checkPoint.mp3")
colide=loadSound("die.mp3")
}

function setup(){ // todas as configuraçoes dos objetos
  createCanvas(600,200)
  
  //crie um sprite de trex
 // solo = createSprite(300,190,600,20);
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("morte",morte)
  trex.scale = 0.5;
  trex.addAnimation("down",cabeça)
  //trex.debug=true
  solo2 = createSprite(300,200,600,10);
  solo2.visible=false
  edges = createEdgeSprites();
 
  solo = createSprite(300,190,600,20);
  solo.addImage("run",solo_run)
g_nuv=new Group()
g_cac=new Group()

reset= createSprite(300,100,10,10)
reset.addImage("reset",resetmg)
reset.scale=0.5
reset.visible=false

fim= createSprite(300,50,10,10)
fim.addImage("gameOver",fimg)
fim.visible=false
}

function draw(){
  background("white");
  if(gr==="jogar"){
    nuvem();
    cactu();
    if(ponto>0&&ponto%100===0){
      point.play()
      velo=velo+1
    }
    if(keyDown("space")&&trex.y>160){
      trex.velocityY = -8;
      jump.play()
    }
    if(keyDown("down")){
      trex.changeAnimation("down",cabeça)
      trex.scale=0.3
      trex.setCollider("circle",0,0,40)
    }
    else{
      trex.changeAnimation("running",trex_running)
      trex.scale=0.5;
    }
    trex.velocityY = trex.velocityY + 0.5; // gravidade
    
  solo.velocityX = -velo
  if(solo.x<0){
    solo.x=solo.width/2
  }
  if(trex.isTouching(g_cac)){
    gr="fim"
    colide.play()
  }
  ponto++
  }
  else if(gr==="fim"){
solo.velocityX=0
g_cac.setVelocityXEach(0)
g_nuv.setVelocityXEach(0)
g_cac.setLifetimeEach(-1)
g_nuv.setLifetimeEach(-1)
trex.changeAnimation("morte",morte)
trex.velocityY=0
  
reset.visible=true
fim.visible=true
if(mousePressedOver(reset)){
  botao()
}
}
  
  trex.collide(solo2)
  drawSprites();
text("ponto "+ponto,17,12)

}

function nuvem(){
if(frameCount%60===0){
  
  var cumulo=createSprite(600,85,20,20);
  cumulo.velocityX=-4
cumulo.addImage(c1)
cumulo.y=Math.round(random(9,90))
cumulo.lifetime=300;
cumulo.depth=trex.depth
trex.depth+=1
g_nuv.add(cumulo)
}
  

}

function cactu(){
  
  if(frameCount%60===0){
    var obstaculo=createSprite(600,180,10,10);
    obstaculo.velocityX=-velo
    var SL
    SL=Math.round(random(1,7))
    g_cac.add(obstaculo)
    obstaculo.scale=0.5
    obstaculo.lifetime=300;
    if(SL===7){
      var ave;
      ave=createSprite(600,180,20,20);
      ave.velocityX=-velo;
      ave.addAnimation("ave",pite);
      ave.scale=0.6;
      ave.lifetime=200;
      ave.y=Math.round(random(140,180))
      obstaculo.y=ave.y;
      g_cac.add(ave)
    }  
    else{
      switch(SL){
        case 1:obstaculo.addImage(c2)
         break;
         case 2:obstaculo.addImage(c3)
         break;
         case 3:obstaculo.addImage(c4)
         break;
         case 4:obstaculo.addImage(c5)
         break;
         case 5:obstaculo.addImage(c6)
         break; 
         case 6:obstaculo.addImage(c7)
         break;
    }
  }
    
    
    
      


  }

}

function botao(){
 gr="jogar" 
 g_nuv.destroyEach()
 g_cac.destroyEach()
 fim.visible=false
 reset.visible=false
 ponto=0
}
//texte