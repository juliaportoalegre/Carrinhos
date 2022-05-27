var canvas;
var backgroundImage;
var bgImg;
var database;
var form, player;
var playerCount;
var gameState;
var car1, car2, pista;
var car1img, car2img, pistaimg;
var allPlayers;
var carros = [];
var oils, coins;
  var oilsimg, coinsimg, obstacle1Image, obstacle2Image;
  var grupoobsta, obsta;

  function preload() {
  backgroundImage = loadImage("./assets/planodefundo.png");
  car1img = loadImage ("./assets/car1.png");
  car2img = loadImage ("./assets/car2.png");
  pistaimg = loadImage ("./assets/track.jpg");
  oilsimg = loadImage ("./assets/fuel.png");
  coinsimg = loadImage ("./assets/goldCoin.png");
  obstacle1Image = loadImage ("./assets/obstacle1.png");
  obstacle2Image = loadImage ("./assets/obstacle2.png");

}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

}

function draw() {
  background(backgroundImage);
  if(playerCount === 2){
    game.update(1)
  }
  if(gameState === 1){
    game.play()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
