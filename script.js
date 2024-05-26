// Name: Aayan Rahman
// Date: May 12th 2023
// Course: ICS201
// Description: Carnaval game assignement 

// Variables
let ducks = [];
let amplitude = [30, 40];
let frequency = [0.06, 0.05];
let heightRatio = [0.4, 0.2];
let speed = [4, 3];
let score = [0, 0];
let objY = 440;
let objX = 300;
let shot = false;
let turnLeft = false;
let turnRight = false;
let canon = 290;
let distance = [0, 0];
let buttonPress = 0;
let hitboxRadius = 30;
let players = 1;
let rounds = 1;


function setup() {
  createCanvas(600, 600);
  textAlign(CENTER,CENTER)
  // Create 3 ducks with different y values
  for (let i = 0; i < 2; i++) {
    ducks.push({
      x: 0,
      y: amplitude[i] * sin(frameCount * frequency[i]) + heightRatio[i] * height,
    });
  }
}

function draw() {
  background(173, 216, 230);

  // Update duck positions
  for (let i = 0; i < 2; i++) {
    if (rounds < 3) {
      ducks[i].x += speed[i];
      if (ducks[i].x > width) {
        ducks[i].x = -125;
      }
      ducks[i].y = amplitude[i] * sin(frameCount * frequency[i]) + heightRatio[i] * height;
    }
  }

  // Draw ducks
  for (let i = 0; i < 2; i++) {
    push();
    translate(ducks[i].x - 170, ducks[i].y - 130); // Center the duck model
    drawDuck();
    pop();
  }

  // Round tables at the end of the game 
  if(rounds<3){ 
    fill(0);
    textSize(18);
    text('Player 1 score is ' + score[0], 90, 20);
    text('Player 2 score is ' + score[1], 510, 20);
    text('Round: ' + round(rounds/2),310,50)
    text('Player ' + players + ' turn',310,20)
  }

  // Bottom table
  fill(255, 0, 0);
  rect(0, 450, 600, 150);

  // Button 1
  fill(255);
  rect(270, 520, 60, 60);

  // Button 2
  rect(50, 520, 60, 60);

  // Button 3
  rect(500, 520, 60, 60);

  // Cannon
  fill(0);
  rect(canon, 440, 20, 70);
  line(0, 510, 600, 510);

  // Cannon ball
  fill(0);
  ellipse(objX, objY, 20, 20);
  if (shot == true) {
    objY -= 7;
  }

  if (objY < 0) {
    buttonPress++;
    objY = 440;
    shot = false;
  }

  // Scoring system
  for (let i = 0; i < 2; i++) {
    distance[i] = dist(objX, objY, ducks[i].x, ducks[i].y);
    if (distance[i] < hitboxRadius) { // Use hitboxRadius as the collision threshold
      let duckPoints = 0;
      let duckDistance = round(dist(ducks[i].x, height, width / 2, height));

      // Calculate points based on duck distance from center
      if (i === 0) { // First duck
        duckPoints = 10 + round((duckDistance * 0.1)); 
      } else { // Second duck
        duckPoints = 15 + round((duckDistance * 0.1));
      }

      // Add points to the appropriate player's score
      if (players === 1) {
        score[0] += duckPoints;
      } else {
        score[1] += duckPoints;
      }

      // Reset variables and move duck off-screen
      buttonPress++;
      objY = 440;
      ducks[i].x = -120;
      shot = false;
    }
  }

  // Code for scoring tables 
  if (rounds>=3) {
    fill(110)
    stroke(50)
    strokeWeight(3)
    rect(150,150,300,200)
    fill(0)
    stroke(0)
    strokeWeight(1)
    if(score[0]>score[1]){ 
      text('Player 1 won!',300,250)
    } else if(score[1]>score[0]){ 
      text('Player 2 won!', 300, 250)
    } else { 
      text('tie',300,250)
    }
  }

  // Switch players 
  if (buttonPress == 2) {
    if (players == 1) {
      players = 2;
    } else { 
      players = 1;
    }
    rounds++;
    buttonPress = 0;
  } 

  if(rounds<3){ 
    // Move cannon left or right on button press 
    if (mouseIsPressed && mouseX > 50 && mouseX < 110 && mouseY > 520 && mouseY < 580 && buttonPress < 2) { 
      canon -= 4;
      objX -= 4;
    } else if (mouseIsPressed && mouseX > 500 && mouseX < 560 && mouseY > 520 && mouseY < 580 && buttonPress < 2) { 
      canon += 4;
      objX += 4;
    }
  }
  
}

function mousePressed() {

  if(rounds<3){ 
    // Code for when button 1 is pressed
    if (mouseX > 270 && mouseX < 330 && mouseY > 500 && mouseY < 560 && buttonPress < 2) {
      shot = true;
    }
  }
  
}

// The duck drawing
function drawDuck() {
  noStroke();
  fill(255, 255, 0);
  ellipse(200, 100, 40, 30);
  ellipse(190, 120, 30, 50);
  ellipse(170, 130, 70, 50);
  ellipse(140, 120, 20, 10);
  fill(255, 102, 0);
  ellipse(222, 98, 20, 10);
  fill(255);
  ellipse(200, 100, 12, 12);
  fill(0);
  ellipse(200, 100, 4, 4);
  fill(255, 0, 0);
  ellipse(170, 130, 30, 30);
  fill(255);
  ellipse(170, 130, 20, 20);
  fill(255, 0, 0);
  ellipse(170, 130, 10, 10);
}
