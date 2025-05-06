

// let boxX = 400;
// // module aliases
// let Engine = Matter.Engine,
//   Render = Matter.Render,
//   Runner = Matter.Runner,
//   Bodies = Matter.Bodies,
//   Composite = Matter.Composite;

// // create an engine
// let engine = Engine.create();

// // create a renderer
// let render = Render.create({
//   element: document.body,
//   engine: engine
// });

// // create two boxes and a ground
// let boxA = Bodies.rectangle(boxX, 200, 80, 80);
// let boxB = Bodies.rectangle(450, 50, 80, 80);
// let ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// // add all of the bodies to the world
// Composite.add(engine.world, [boxA, boxB, ground]);

// // run the renderer
// Render.run(render);

// // create runner
// let runner = Runner.create();

// // run the engine
// Runner.run(runner, engine);
// // let spr;
// function setup() {
//   createCanvas(400, 400);
//   spr = createSprite(
//     width/2, height/2, 40, 40);
//   spr.shapeColor = color(255);
//   spr.velocity.y = 0.5;
// }
// function draw() {
//   background(50);
//   drawSprites();
// }
// function mousePressed() {
//   spr.position.x = mouseX;
//   spr.position.y = mouseY;
// }
function setup(){


  new Canvas("2:1");
  let ball = new Sprite(); 
  ball.diameter = 20;
  ball.x = width/2-100;
  ball.y = height/2;
  ball.fill = "white";
  ball.velocity.x = 2;
  for(let i = 0; i< 10; i++){
    let block = new Sprite(width/2+random(-5,5),height/2+random(-5,5),20,20); 


  }
 
}

function draw(){
  background(220);
}

function mousePressed(){
  ball.moveTo(mouseX,mouseY,8);
}