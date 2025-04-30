let coins = [];
let enemies;
let xp = [];


// aliases for different modules

let Engine = Matter.Engine;
let Render = Matter.Render;
let Composite = Matter.Composite;
let Body = Matter.Body;
let Bodies = Matter.Bodies;
let Runner = Matter.Runner;

//make and engine
let engine;
let render;





function setup() {
  noCanvas();
  engine = Engine.create;
  render = Render.create({
    engine: Engine,
    element: document.body,

  });
  Render.run(render);





}



