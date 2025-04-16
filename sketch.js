// Slither Io clone
// Utsho Bhattacharjee
//date: 
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let cellsize; 
const SQUARE_DIMENTIONS  = 25;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  circle(mouseX,mouseY,50);
}
function makeGrid(cols, rows){
  newArr = [];
  for (let y = 0; y<cols; y++){
    newArr.push(0);

    for (let x = 0; x<rows; x++ ){
      newArr[y].push(0);
    }
  }
  return newArr;
}
displayGrid(){
  for (let y=0; y<width; y++){
    for (let x =0;x<width,x++){
      if (grid[y][x] = 0){
        fill("white")
      }
    }

  }

}