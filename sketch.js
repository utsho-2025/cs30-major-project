
let map;
let ground;
let brick;
let questionBlock;
let pipe;

let ball;
let wall;
// let ball = new Sprite(); 
function setup(){


  new Canvas("2:1");
  ball = new Sprite(); 
  // let box = new Sprite();
  box.x = width/3+50;
  console.log(0);
  ball.diameter = 20;
  ball.x = width/2-100;
  ball.y = height/2;
  ball.fill = "white";
  ball.velocity.x = 2;
  for(let i = 0; i< 50; i++){
    let block = new Sprite(width/2+random(-5,5),height/2+random(-5,5),20,20); 


  }
  wall = new Sprite(width,height,20,width+900);
  wall.fill = "green";
  wall.rotation = 270;

  wall.collider = 'static';
  console.log("working");
 
}

function draw(){
  background(92,148,252);

}

function mousePressed(){
  ball.moveTo(mouseX,mouseY, 8);

  console.log("working");
}