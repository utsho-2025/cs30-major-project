
let mapImg;
let groundImg;
let brickImg;
let questionBlockImg;
let pipeImg;
let marioImg;
let ball;
let wall;
let tileSize = 16;

// let ball = new Sprite(); 
function setup(){
  world.gravity.y = 40;
  new Canvas(windowWidth,windowHeight/2);
  mario = new Sprite();
  mario.addAni(marioAni);
  mario.scale = tileSize/marioImg.width*2;

  ground  = new Group();
  ground.collider = "s";
  ground.image = groundImg;
  ground.scale = tileSize/groundImg.width;
  ground.tile = "=";
  ground.w = tileSize;
  ground.h = tileSize;

  brick  = new Group();
  brick.collider = "s";
  brick.image = brickImg;
  brick.tile = "b";
  brick.scale = tileSize/brickImg.width*2;
  brick.w = tileSize;
  brick.h = tileSize;

  questionB  = new Group();
  questionB.collider = "s";
  questionB.image = questionBlockImg;
  questionB.scale = tileSize/questionBlockImg.width;
  questionB.tile = "?";
  questionB.w = tileSize;
  questionB.h = tileSize;

  pipe  = new Group();
  pipe.collider = "s";
  pipe.image = pipeImg;
  pipe.scale = tileSize/pipeImg.width*2;
  pipe.tile = "p";
  pipe.w = tileSize;
  pipe.h = tileSize;

  new Tiles(
    [
      '.......................................................................................................................................................................................................................................................................................',
      '...................................................................................bbbbbbbb...bbb?.......................?.............bbb.....b??b.....................................................................................................................................',
      '.......................?.............................................................................................................................................................................................bb.................................................................',
      '....................................................................................................................................................................................................................bbb.................................................................',
      '...................................................................................................................................................................................................................bbbb.................................................................',
      '................?....b?b?b...................................................b?b.................?.....b?.....bb......?..?..?......b............bb................................................................bbbbb.................bb..............................................',
      '.................................................p.........p.............................................................................................b..b............bb..b...................................bbbbbb................bbbb.............................................',

      '.................................................p.........p.............................................................................................b..b............bb..b..................................bbbbbbb................bbbb.............................................',
      '......................................................??.................p.....................................................................................................................................bbbbbbbb..................',


    ],
    0,
    16,
    tileSize,
    tileSize-1,




  );

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


  // // }
  wall = new Sprite(width,height,20,width+900);
  wall.fill = "green";
  wall.rotation = 270;

  wall.collider = 'static';
  console.log("working");
 
}
function preload(){
  marioAni = loadAnimation("Assets/Mario.png");
  marioImg = loadImage("Assets/Mario.png");
  groundImg = loadImage("Assets/Ground.png");
  questionBlockImg = loadImage("Assets/QuestionBlock.png");
  pipeImg = loadImage("Assets/Pipe.png");
  brickImg = loadImage("Assets/brick.png");
  
  

}
function draw(){
  background(92,148,252);

}

// function mousePressed(){
//   ball.moveTo(mouseX,mouseY, 8);

//   console.log("working");
// }