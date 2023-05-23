
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let engine;
let world;
var ball;
var ground;

var plinko = [];
var particle = null;
var divisions = [];

var divisionHeight = 2;

var rows = 8;
var cols = 16;

var ground;

var score = 0;
var turn = 0;

var restart;

var gameState = "play";

function setup() {
  createCanvas(657,700);

  engine = Engine.create();
  world = engine.world;
  
   var ball_options = {
    restitution: 0.95,
    frictionAir:0.01
  }

  restart = loadImage("restart_button.png");

   ground = new Ground(330, 1150, 657, 20);

   for (var i = 0; i <= width; i = i+80) {
    divisions.push(
      new Division(i, height - divisionHeight / 2, 6, divisionHeight)
    );
   }
  

   newParticle();
   var spacing = width/ cols;
   for (var j = 0; j < rows; j++) {
    for(var i = 0; i < cols + 5; i++) {
      var x = i* spacing;
      if(j % 2 == 0){
        x += spacing/2;
      }
      var y = spacing + j * spacing;
      var p = new Plinko(x, y, 50);
      plinko.push(p);
    }
   }
  rectMode(CENTER);
}

function newParticle(){
  var p = new Particle(190, 0, 10);
  //particles.push(p);
}

function draw() 
{
  background(51);
  if (frameCount % 115 == 0) {
    newParticle();
  }
  
  Engine.update(engine, 1000/ 30);

  if (gameState !== 'end') {
  fill("white");
  textSize(26);
  text("Score: " + score, 500, 24);

  text("400", 20, 400);
  text("300", 100, 400);
  text("200", 182, 400);
  text("100", 260, 400);
  text("100", 340, 400);
  text("200", 416, 400);
  text("300", 496, 400);
  text("400", 575, 400);
  

  for(var x = 0; x<plinko.length; x = x+1){
    plinko[x].display();
  }

  for (var x = 0; x < divisions.length; x++){
    divisions[x].display();
  }

  if (particle !== null) {
    particle.display();

    var pos = particle.body.position;

    if (pos.y > 700) {
      if ((pos.x > 0 && pos.x < 80) || (pos.x > 577 && pos.y < 700)) {
        score = score + 400;
        particle = null;
        if (turn >= 5) {
          gameState = "end";
        }
      }

      if ((pos.x > 80 && pos.x < 160) || (pos.x > 497 && pos.x < 577)) {
        score = score+300;
        particle = null;
        if (turn >= 5) {
          gameState = "end";
        }
      }
      if ((pos.x > 160 && pos.x < 240) || (pos.x > 417 && pos.x < 497)) {
        score = score + 200;
        particle = null;
        if (turn >= 5) {
          gameState = "end";
        }
      }
      if ((pos.x > 240 && pos.x < 320) || (pos.x > 337 && pos.x < 417)) {
        score = score + 100;
        particle = null;
        if (turn >= 5) {
          gameState = "end";
        }
      }
    }
  }
  ground.display();
}

  if (gameState === "end") {
    fill ("Red");
    textSize(50);
    text("Game Over", 200, 150);
    text("Total Score: " + score, 160, 250);
    //text("Press ENTER to restart", 90, 350)

    if(keyIsDown("enter")) {
      gameState = "play";
      score = 0;
      turn = 0;
    }
  
  }
}

function mouseReleased(){
  if (gameState !== 'end' && particle === null) {
    particle = new Particle(mouseX, 10);
  turn++;
  }
  
}

