

// variables and objects
let cellSize;
let score = 0;
const SQUARE_DIMENSIONS = 40;
let grid;
let thePlayer = {
  x:0,
  y:0,
};
let fps = 10;
let cols;
let rows;
let snake = [{
  x:0,
  y:0,
}];
let DIRECTIONSTATE = "right";
let food = {x :5,y:5};
let gameOver = false;
let ateFood = false;





function setup() {
  createCanvas(windowWidth, windowHeight);

  //make the largest square that fits
  if (height > width) {
    cellSize = width / SQUARE_DIMENSIONS;
  }
  else {
    cellSize = height / SQUARE_DIMENSIONS;
  }
  grid = generateGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
  spawnFood();
  frameRate(fps);//controls how fast the game goes

}

function draw() {
  background(220);
  if (!gameOver){//these functions are going to keep running until the snake hits the wall
    displayGrid();
    moveSnake();
    scoreCounter();
    checkCollisions();
    checkFoodConsumption();
  }
  else{
    gameOverScreen();//endscreen

  }



}

function keyPressed(){//all of the controls
  if ( key=== "d" && DIRECTIONSTATE !== "left"){
    DIRECTIONSTATE = "right";

  }

  if ( key=== "a" && DIRECTIONSTATE !== "right"){
    DIRECTIONSTATE = "left";

  }
  
  if ( key=== "w" && DIRECTIONSTATE !== "down"){
    DIRECTIONSTATE = "up";

  }
  
  if ( key=== "s" && DIRECTIONSTATE !== "up"){
    DIRECTIONSTATE = "down";

  }

}
function moveSnake(){//logic for moving snake, moves infinitely in one direction
  let snakeHead = {...snake[0]};// added this so in future if i add something complex to my object it wont throw an error
  if (DIRECTIONSTATE=== "right"){
    snakeHead.x +=1;

  }
  if (DIRECTIONSTATE=== "left"){
    snakeHead.x -=1;

  }
  if (DIRECTIONSTATE=== "up"){
    snakeHead.y -=1;

  }
  if (DIRECTIONSTATE=== "down"){
    snakeHead.y +=1;

  } 
  snake.unshift(snakeHead);//add new head to the front

  if (!ateFood){
    snake.pop();//if snake doesnt eat food its going to stay small, this removes the trail it would make 
  }
  else{
    ateFood = false;//resets the food state
  }
}

function displayGrid() {//colors for the grid and food along with displaying the grid
  for (let y = 0; y < SQUARE_DIMENSIONS; y++) {
    for (let x = 0; x < SQUARE_DIMENSIONS; x++) {
      if (snakeId(x,y)){
        fill("black");
      }
      else if(x===food.x&&y===food.y){
        fill("red");

      }
      else{
        fill("white");


      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);


    }
      
  }
}
function generateGrid(cols, rows) {//generates the actual grid
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}
function spawnFood(){//spawns food randomly in the grid
  food = {
    x: floor(random(SQUARE_DIMENSIONS)),
    y: floor(random(SQUARE_DIMENSIONS)),
  };
}
function checkCollisions(){//checks if the snake hits the wall
  let head = snake[0];
  if (head.x<0||head.x>=SQUARE_DIMENSIONS||head.y <0 || head.y >= SQUARE_DIMENSIONS){
    gameOver = true;

  }

}
function checkFoodConsumption(){//did the snake eat the food?
  let head = snake[0];
  if (head.x===food.x && head.y===food.y ){
    ateFood = true;
    spawnFood();
  }
}
function gameOverScreen(){//end screen and it keeps the score for you
  fill(0);
  textSize(30);
  textAlign(CENTER,CENTER);
  text("Game Over", width/2,height/2);
  text("Your score was: "+score, width/2,height/2+50);

}
function snakeId(x,y){//if the snakes body is in a specific cell, return true
  for (let i = 0; i<snake.length; i++){
    if (snake[i].x===x&&snake[i].y ===y){
      return true;//cell is occupied

    }
  }
  return false; //cell is empty
  
}
function scoreCounter(){//counts the score while in game
  let head = snake[0];
  if (food.x === head.x && food.y === head.y){
    score +=1;
  
  }
  fill(0);
  textSize(30);
  textAlign(RIGHT,TOP);
  text("Score: "+ score, width-10,10);

}