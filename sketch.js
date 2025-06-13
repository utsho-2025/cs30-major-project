/////TO DO//////
//add sounds
//add a platform
//add an xp system 
//fix the map

//all of the variables
let mapImg;
let groundImg;
let brickImg;
let questionBlockImg;
let pipeImg;
let marioImg;
let ball;
let pipeMDImg;
let wall;
let coinImg;
let tileSize = 16;
let initialGoombas = [];
let initialCoins = [];
let score = 0;
let isDead = false;
let xp = 0;
let bgMusic;
let coinSound;
let stompSound;
let jumpSound;
let qbSound;
let mSpeed = 16;
let presserR = false;
let tpSensor;
let btmSensor;

function preload(){// animation, spritesheets and fonts
  marioAni = loadAnimation("Assets/Mario.png");
  marioImg = loadImage("Assets/Mario.png");
  groundImg = loadImage("Assets/Ground.png");
  questionBlockImg = loadImage("Assets/QuestionBlock.png");
  pipeImg = loadImage("Assets/Pipe.png");
  brickImg = loadImage("Assets/brick.png");
  marioSheet = loadImage("Assets/img1.png");
  pipeMDImg = loadImage("Assets/pipeM.png");
  goombaImg = loadImage("Assets/Goomba.png");
  BgImg = loadImage("Assets/BGpic.png");
  coinImg = loadImage("Assets/coin.png")
  pixelFont = loadFont("Assets/PressStart2P-Regular.ttf");
  bgMusic = loadSound("Sounds/SuperMarioBros.mp3");
  coinSound = loadSound("Sounds/coin.wav");
  stompSound = loadSound("Sounds/stomp.wav")
  qbSound = loadSound("Sounds/qb.wav");
  jumpSound = loadSound("Sounds/jump.wav")


  

}
function backgroundM(){
  bgMusic.play();
  
  bgMusic.setVolume(0.02); 
  userStartAudio();

  


}


function setup(){
  frameRate(60);  
  world.gravity.y = 35;
  new Canvas(windowWidth,windowHeight/2);
  

  walkable = new Group();// this refers to anything mario can walk on 

  mario = new Sprite(100,310); //spawning mario
  mario.bbox = 'rect';
  mario.spriteSheet = marioSheet;
  mario.anis.frameDelay = 4;// how fast is the frame moving
  mario.addAnis({ // mario's animation
    run: {row:0, frames:3},
    stand: {row:0, frames:1},
  });
  mario.scale = tileSize/marioImg.width*2;
  mario.rotationLock = true;
  mario.friction = 1;// makes mario stop sliding when he runs
  mario.scale = tileSize / 180 * 2;
  mario.h = 40;
  mario.w = 15;
  mario.collider = 'DYN';


  coin = new Group();// coin group
  coin.w = 128;
  coin.h = 128;
  coin.spriteSheet = coinImg;
  coin.anis.frameDelay = 2;
  coin.addAnis({
    spin: {row:0, frames:6, frameSize : [200,600]},

  });
  coin.tile = 'c';
  coin.collider = 'none';
  coin.rotationLock = true;
  for (c in coin){
    c.ani = 'spin';
  }
  
  coin.scale = tileSize/coinImg.width*5;


  ground  = new walkable.Group();
  ground.debug = true;

  ground.collider = "s";
  ground.bbox = 'rect';
  ground.image = groundImg;
  ground.scale = tileSize/groundImg.width*1;
  ground.tile = "=";
  ground.w = tileSize;
  ground.h = tileSize+160;

  brick  = new walkable.Group();
  brick.debug = true;
  brick.bbox = 'rect';
  brick.collider = "s";
  brick.image = brickImg;
  brick.tile = "b";
  brick.scale = tileSize/brickImg.width*2;
  brick.w = tileSize+1200*0.2  ;
  brick.h = tileSize+1200*0.4;


  questionB  = new Group();
  // questionB.debug = true;
  questionB.collider = "s";
  questionB.bbox = 'rect';
  questionB.image = questionBlockImg;
  questionB.scale = tileSize/questionBlockImg.width;
  questionB.tile = "?";
  questionB.debug = true;
  
  questionB.w = tileSize+200;
  questionB.h = tileSize+250;

  pipe  = new walkable.Group();
  // pipe.debug = true;
  // pipe.bbox = 'rect';
  pipe.collider = "s";
  pipe.image = pipeImg;
  pipe.scale = tileSize/pipeImg.width*3.196923;
  pipe.tile = "p";
  pipe.w = tileSize+190;
  pipe.h = tileSize+190;

  pipeMD = new Group();
  // pipeMD.debug = true;
  pipeMD.collider = "s";
  pipeMD.image = pipeMDImg;
  pipeMD.scale = tileSize/pipeMDImg.height;
  pipeMD.tile = "|";
  pipeMD.w = tileSize+190;
  pipeMD.h = tileSize+190;

  goomba =new Group();
  // goomba.debug = false;
  goomba.rotationLock = true;
  goomba.collider = 'dynamic';
  goomba.tile = "g";
  goomba.image = goombaImg;
  goomba.h = tileSize+1000;
  goomba.w = tileSize+1200;  
  goomba.scale = tileSize/goombaImg.height*1.23;
  goomba.moving= -2;

  // code for mario's top sensor and bottom sensor. this enables mario to intaract with goombas and Q block


  tpSensor = new Sprite(mario.x-2.5, mario.y-mario.h/2);
  btmSensor = new Sprite(mario.x-0.25, mario.y+mario.h/2);
  tpSensor.w = mario.w/2+10;
  tpSensor.h = 2;
  btmSensor.w = mario.w/2+10;
  btmSensor.h = 2;
  tpSensor.visible = false;
  btmSensor.visible = false;
  
  let btmJoint = new GlueJoint(mario,btmSensor); //sticks to mario's shoes
  let tpJoint = new GlueJoint(mario,tpSensor);// sticks to his cap
  
  tpJoint.visible = false;
  btmJoint.visible = false;
  


  new Tiles(// map for the whole game.
    [
      
      '.......................................................................................................................................................................................................................................................................................',
      '.......................................................................................................................................................................................................................................................................................',
      '.......................................................................................................................................................................................................................................................................................',
      '.......................................................................................................................................................................................................................................................................................',
      '.......................................................................................................................................................................................................................................................................................',
      '.......................................................................................................................................................................................................................................................................................',
      '.......................................................................................................................................................................................................................................................................................',
      '..............................................................................................................................................................................................................................................c....c...ccccc...c....c.....c......c.....c...c..c....c.',
      '...............................................................................................................................................................................................................................................c..c...c.....c..c....c......c....c.c...c....c..c.c..c',
      '.....................................................................................g...g......................................................................................................................................................c.....c.....c..c....c.......c..c...c.c.....c..c..c.c',
      '...................................................................................bbbbbbbb...bbb?.......................?.............bbb.....b??b.............................................................................................c.....c.....c..c....c........c......c......c..c....c',
      '.....................?.............................................................................................................................................................................................bb...........................c.......cccc...cccccc.......................',
      '..................................................................................................................................................................................................................bbb.................................................................',
      '....................ccc..........................................................................................................................................................................................bbbb.................................................................',
      '................?..b?b?b.....................................................b?b.................?.....b?.....bb......?..?..?......b............................................................................bbbbb..................b..............................................',
      
      '..............................................................................................................................................b..b.......................bb..b.................................bbbbbb.................bbb.........ccccccccccccc.......................',
      '...............................................................?.............................................................................bb..bb.....................bbb..bb..............bb?b.............bbbbbbb................bbbbb........ccccccccccccc....................................',
      '......................................................p.....................................................................................bbb..bbb...................bbbb..bbb.............................bbbbbbbb...............bbbbbbb.......ccccccccccccc.....................................',
      '...........................p...ccc..........p.........|....................................................................................bbbb..bbbb.................bbbbb..bbbb.......p...................bbbbbbbbb...............bbbbbbb.......ccccccccccccc..........................................................',
      '...................c.g.....|...ccc...p..g...|..g..g...|...................................................................................bbbbb..bbbbb...............bbbbbb..bbbbb......|...g.........g...p.bbbbbbbbb.........b.....bbbbbbb.......ccccccccccccc.....................................',
      '======================================================================..===============...=================================================================================..===========================================================================================================',
      '======================================================================..===============...=================================================================================..===========================================================================================================',
      '======================================================================..===============...=================================================================================..===========================================================================================================',
      '======================================================================..===============...=================================================================================..===========================================================================================================',
      '======================================================================..===============...=================================================================================..===========================================================================================================',
      '======================================================================..===============...=================================================================================..===========================================================================================================',
      '======================================================================..===============...=================================================================================..===========================================================================================================',
      '======================================================================..===============...=================================================================================..===========================================================================================================',
      '======================================================================..===============...=================================================================================..===========================================================================================================',
      '======================================================================..===============...=================================================================================..===========================================================================================================',
      '======================================================================..===============...=================================================================================..===========================================================================================================',
      // '......................................................??.................p.....................................................................................................................................bbbbbbbb..................',


    ],
    0,
    16,
    tileSize,
    tileSize
    




  );

  for (g of goomba){// pushes initial position of goombas in the empty array. helps count the number of goombas used and their location
    g.moving = -2;
    g.xpGiven = false;
    g.lastTurnTime = 0;
    initialGoombas.push({
      x:g.x,
      y:g.y

    });
  }


  for (let c of coin){// pushes location of coins

    initialCoins.push({
      x:c.x,
      y:c.y,
    });
  }
  for (let q of questionB){
    q.xpGiven = false;
  }

  backgroundM();

}

function draw(){
  background(BgImg);
  mover();
  moveEnemies();
  fotm();
  coinCount();



  

  if (mouse.presses()){// this is for me to check the map, will be removed later
    mario.y = mouse.y;
    mario.x = mouse.x;
    
  }
  collisionCheckerGround();
  
  camera.x = mario.x;// follows mario around
  

  

  for (let g of goomba){
    if (btmSensor.overlapping(g)&&mario.vel.y >0){
      stompSound.play();
      stompSound.setVolume(0.07);
      g.visible = false;
      g.collider= 'none';// makes the goombas temporarily disappear
      


      mario.vel.y = -7;
      

    }
    else if(mario.overlapping(g)&&g.visible){
      isDead = true;// mario is dead
      reset();
    }


  }
  for (let q of questionB){
    if (tpSensor.overlapping(q)&& q.visible){
      q.visible = false;
      qbSound.play();
      qbSound.setVolume(0.07);
      q.collider = 'none';
      xp+= 100;
      q.xpGiven = true;
      
    }

  }
  
}
  
function collisionCheckerGround(){// everything mario collides with
  mario.collide(ground);
  mario.collide(questionB);
  mario.collide(brick);
  mario.collide(pipe);
  mario.collide(goomba);
}
function mover(){// controls for mario
  if (kb.pressing('d') ){
    mario.vel.x = 7;
    mario.ani = 'run';
    mario.mirror.x = false;
  }
  else if (kb.pressing('a')){
    mario.vel.x = -7;
    mario.ani = 'run';
    mario.mirror.x = true;

  }
  else {
    mario.ani = 'stand';
    mario.vel.x = 0;

  }
  if (kb.pressing('space')&& mario.colliding(walkable)&& mario.vel.y<0){
    console.log("jump");
    mario.vel.y = -11.222 *2/3 ;
  }

}
function moveEnemies(){ // controls for goomba
  for (g of goomba){
    g.vel.x = g.moving;
    

    let now =  millis();
    if ((g.colliding(pipe)||g.colliding(pipeMD)||g.colliding(goomba))&& (now-g.lastTurnTime>300)){
      g.moving*=-1;
      g.vel.x = g.moving*1.5;
      g.lastTurnTime = now;

    }

  }

}
function reset(){// what happens after mario dies
  mario.x = 100;
  mario.y = 290;
  tpSensor.x = mario.x;
  tpSensor.y = mario.y - mario.h/2;
  btmSensor.x= mario.x;
  btmSensor.y = mario.y+mario.h/2;
  let i = 0;
  for (let g of goomba){
    g.x = initialGoombas[i].x;
    g.y = initialGoombas[i].y;
    g.vel.x = 0;
    g.moving = -2;
    g.lastTurnTime = 0;
    g.visible = true;
    g.collider= 'dynamic';
    g.xpGiven = false;
    i++;
  }
  let j = 0;
  for (let c of coin){
    c.x = initialCoins[j].x;
    c.y = initialCoins[j].y;
    c.visible = true;
    j++;

  }
  for (let q of questionB ){
    q.visible = true;
    q.collider = 's';
    q.xpGiven = false;

  }
  score = 0;
  xp = 0;
  isDead = false;

  
}

function fotm(){// fell off the map
  if (mario.y>365){
    isDead = true;

    reset();
  }
}



function coinCount(){// counting coins and calculating xp
  textSize(10);
  fill("black");
  textFont(pixelFont);
  textAlign(LEFT, TOP);
  
  text("Coins:" + score, 50, 50);
 
  
  textSize(10);
  fill("black");
  textFont(pixelFont);
  textAlign(RIGHT, TOP);
  text("XP:" + xp, windowWidth-200, 50);
  
  for (let c of coin){
    if (mario.overlapping(c)&&c.visible){
      coinSound.play();
      coinSound.setVolume(0.07);
      c.visible = false;

      score++;

      
      
    }


  }

  
  for (let g of goomba){
    if (btmSensor.overlapping(g)&&!g.visible&&!g.xpGiven){
      xp+=200;

      g.xpGiven = true;

    }

  }


  if (isDead){// score reset
    score = 0;
    xp = 0;


  }
}
