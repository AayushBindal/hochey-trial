var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

//create wall1 leftMost vertical wall
var wall1 = createSprite(0,200,20,400);
//create wall2 topMost horizontall wall
var wall2 = createSprite(200,5,400,9);
//create wall3 rightMost vertical wall
var wall3 = createSprite(396,200,8,400);
//create wall4 bottomMost horizontal wall
var wall4 = createSprite(200,399,400,20);
//create wall5 near wall1 2nd leftMost vertical wall
var wall5 = createSprite(23,200,10,400);
//create wall6  near wall2 2nd topMost horizontal wall
var wall6 = createSprite(200,23,400,7);
//create wall7 near wall3 2nd rightMost vertical wall
var wall7 = createSprite(380,200,8,400);
//create wall8 near wall4 2nd bottomMost horizontal wall 
var wall8 = createSprite(200,375,400,8);
//create wall9 3rd topMost white horizontal wall
var wall9 = createSprite(200,130,400,8);
//create wall10 3rd bottomMost white horizontal wall
var wall10 = createSprite(200,270,400,8);
//create goal1 topmost yellow color  
var goal1 = createSprite(210,40,100,20);
//create goal2 downMost yellow color
var goal2 = createSprite(210,360,100,20);
//have a white striker
var striker = createSprite(210,200,10,10);

//have a computerMallet
var computerMallet = createSprite(211,340,50,20);
//have a playerMallet 
var playerMallet = createSprite(211,60,50,20);
//have a start view
var gameState = "serve";
//have a computerMallet score
var computerScore = 0;
//have a playerMallet score 
var playerScore = 0;

function reset(){
striker.velocityX=0;
striker.velocityY=0; 
striker.x=210;
striker.y=200;
}


//let striker bounce off 
function bounceoff(){
striker.bounceOff(computerMallet);
striker.bounceOff(playerMallet);
striker.bounceOff(wall1);
striker.bounceOff(wall2);
striker.bounceOff(wall3);
striker.bounceOff(wall4);
striker.bounceOff(wall5);
striker.bounceOff(wall6);
striker.bounceOff(wall7);
striker.bounceOff(wall8);
striker.bounceOff(goal2);

playerMallet.bounceOff(wall5);
playerMallet.bounceOff(wall6);
playerMallet.bounceOff(wall7);
playerMallet.bounceOff(wall8);
playerMallet.bounceOff(wall9);
playerMallet.bounceOff(goal1);

computerMallet.bounceOff(wall5);
computerMallet.bounceOff(wall6);
computerMallet.bounceOff(wall7);
computerMallet.bounceOff(wall8);
computerMallet.bounceOff(wall9);
computerMallet.bounceOff(goal2);
}

function draw() {
//have a green background 
background("green");
//order computer to create edge sprites
createEdgeSprites();
//order computer to draw sprites
drawSprites();

//have a loop
for (var i = 0; i < 400;i=i+20) {
line(i,199,i+10,199);
}
textSize(20);
if(gameState==="serve") {
text("press space to serve",120,189);
}
//have a shape color 
wall1.shapeColor="white";
wall2.shapeColor="white";
wall3.shapeColor="white";
wall4.shapeColor="white";
wall5.shapeColor="white";
wall6.shapeColor="white";
wall7.shapeColor="white";
wall8.shapeColor="white";
wall9.shapeColor="white";
wall10.shapeColor="white";
goal1.shapeColor="yellow";
goal2.shapeColor="yellow";
striker.shapeColor="white";
computerMallet.shapeColor="black";
playerMallet.shapeColor="black";

//let playerMallet move
if (keyDown(UP_ARROW)) {
playerMallet.y=playerMallet.y-5;
}
if (keyDown(LEFT_ARROW)) {
playerMallet.x=playerMallet.x-5;
}
if(keyDown(RIGHT_ARROW)){
playerMallet.x=playerMallet.x+5;

}
if(keyDown(DOWN_ARROW)){
playerMallet.y=playerMallet.y+5;
}
//call bounce off function
bounceoff();

computerMallet.x=striker.x;

if (keyDown("space") && (gameState==="serve")) {
striker.setVelocity(3.6,4);
gameState="play";
}
 
text(computerScore,28,220);
text(playerScore,28,180); 

if ((striker.isTouching(goal1))) {
computerScore = computerScore + 1;
reset();
gameState="serve";
}
if (computerScore===5) {
text("press R to restart the game",100,180);
gameState="end";
}
if (keyDown("r") && (gameState==="end")) {
gameState="serve";
computerScore=0;
playerScore=0;
playerMallet.x=211;
}
if (striker.isTouching(wall5)) {
  playSound("assets/category_background/f1_race.mp3", false);
}
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
