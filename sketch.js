
let mapImg;
let groundImg;
let brickImg;
let questionBlockImg;
let pipeImg;
let marioImg;
let ball;
let wall;


// let ball = new Sprite(); 
function setup(){
  world.gravity.y = 40;
  new Canvas(windowWidth,windowHeight/2);
  mario = new Sprite();
  mario.addAni(marioAni);
  // ground  = new Sprite(width/2, );
  // ground.collider = "s";


  // new Canvas("2:1");
  // ball = new Sprite(); 
  // // let box = new Sprite();
  // box.x = width/3+50;
  // console.log(0);
  // ball.diameter = 20;
  // ball.x = width/2-100;
  // ball.y = height/2;
  // ball.fill = "white";
  // ball.velocity.x = 2;
  // ball.gravity = -5;

  // for(let i = 0; i< 50; i++){
  //   let block = new Sprite(width/2+random(-5,5),height/2+random(-5,5),20,20); 


  // }
  wall = new Sprite(width,height,20,width+900);
  wall.fill = "green";
  wall.rotation = 270;

  wall.collider = 'static';
  console.log("working");
 
}
function preload(){
  marioAni = loadAnimation("Mario.png");
  marioImg = loadImage("Mario.png");
  groundImg = loadImage("Ground.png");
  questionBlockImg = loadImage("QuestionBlock.png");
  pipeImg = loadImage("Pipe.png");
  
  

}
function draw(){
  background(92,148,252);

}

// function mousePressed(){
//   ball.moveTo(mouseX,mouseY, 8);

//   console.log("working");
// }