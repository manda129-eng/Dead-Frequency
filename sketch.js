//player variables
let hero;
let darkness;
let bg; 

let bullets = [];
let droids = [];
let spikes = [];

//scene variables
let scenenumber = 0;
let transition = false;
let transframe = 0;
let duration = 30;
let nextscene = 0;
let restarting = false;

function setup() {
   createCanvas(600, 600);
	frameRate(60);
	createElement('style', `
  @import url('https://fonts.googleapis.com/css2?family=Jim+Nightshade&family=Cinzel&family=IM+Fell+DW+Pica+SC&display=swap');
`);
	//fonts: 'Jim Nightshade' , 'IM Fell DW Pica SC' , 'Cinzel'

	bg = new Background();
	
	darkness = new Darkness();

	reset();
	
   rectMode(CENTER);
}

function reset(){

	hero = new Hero();

	bullets = [];
	droids = [];
	spikes = [];

	droids[0] = new Droids(300, 50, 0.5, 0.02); //x,y,speed,rotation
	droids[1] = new Droids(-100, 120, 0.75, 0.03);
	droids[2] = new Droids(600, 200, 0.5, -0.02);
	droids[3] = new Droids(450, 700, 1, 0.05);
	droids[4] = new Droids(175, 550, 0.5, -0.03);

	//spikes
	spikes[0] = new Spikes(300, 50, 0.8, 0.05);
	spikes[1] = new Spikes(-100, 250, 1, 0.09);
	spikes[2] = new Spikes(800, 0, 1.5, -0.1);
	spikes[3] = new Spikes(450, 700, 1, 0.08);
	spikes[4] = new Spikes(175, 680, 1.25, -0.07);
	spikes[5] = new Spikes(-300, 420, 1.5, -0.12);
	spikes[6] = new Spikes(500, 900, 1.3, 0.13);

	scenenumber = 0;
	nextscene = 0;
}

function draw() {

	if(hero.alive == false){
		death();
		if(restarting == true){
			fade();
		}
		return;
	}

	if(scenenumber == 0){
		scene0();
	} else if(scenenumber == 1) {
		scene1();
	} 
	else if(scenenumber == 2)
	{  
		scene2();
	}
	else if(scenenumber == 3){
		win1();
	}
	else if(scenenumber == 4){
		win2();
	}
	
	fade();
}

function keyPressed(){
	if(hero.alive == false || scenenumber == 4){
		if((key === 'r' || key === 'R') && !restarting){
			restarting = true;
			transition = true;
			transframe = frameCount;
			nextscene = 0;
		}
		return;
	}
	
	if(key === '1' && scenenumber == 0 && !transition){
		transition = true;
		transframe = frameCount;
		nextscene = 1;
	}
	if(key === '2' && scenenumber == 3 && !transition){
		transition = true;
		transframe = frameCount;
		nextscene = 2;
	}
	if(key === '0' && scenenumber!= 0 && !transition) {
		transition = true;
		transframe = frameCount;
		nextscene = 0;
	}
	
	if(key === ' ' && scenenumber == 1){
		hero.shoot();
	}
	if(key === ' ' && scenenumber == 2){
		hero.laserFrames = 3;
	}
}

function fade(){
	if(transition){
		let i = frameCount - transframe;
		let opacity;
		
		if(i <= duration){
			opacity = map(i, 0, duration, 0, 255);
		}
		else {
			opacity = map(i, duration, duration * 2, 255, 0);
		}
		if(i >= duration){

			if(restarting == true){
				reset();
				restarting = false;
			}

			scenenumber = nextscene;
		}
		
		noStroke();
		fill(0, 0, 0, constrain(opacity, 0, 255));
		rect(width/2, height/2, width, height);
		
		if(i >= duration * 2){
			transition = false;
    }
  }
}

function win1(){
		background(0);
	
		push();

		textAlign(CENTER);
		textFont('IM Fell DW Pica Sc');
		noStroke();

		textSize(65);
	fill(255, 255, 255, 20);
	text("ROUND 1 OVER!", 300, 325);

	textSize(66);
	fill(255, 255, 255, 40);
	text("ROUND 1 OVER!", 300, 320);

	textSize(67);
	fill(255, 255, 255, 60);
	text("ROUND 1 OVER!", 300, 315);
  
    textSize(68);
	fill(255, 255, 255, 80);
	text("ROUND 1 OVER!", 300, 310);

    textSize(69);
	fill(255, 255, 255, 100);
	text("ROUND 1 OVER!", 300, 305);
	
		textSize(70);
		fill(255, 0, 0);
		text("ROUND 1 OVER!", 300, 300);
	
		textSize(30);
		textFont('Jim Nightshade');
		fill(255, 0, 0);
		text("PRESS 2 TO CONTINUE", 300, 400);
	
		pop();
}

function win2(){
	background(0);
	
		push();

		textAlign(CENTER);
		textFont('IM Fell DW Pica Sc');
		noStroke();

		textSize(65);
	fill(255, 255, 255, 20);
	text("YOU WIN!!", 300, 325);

	textSize(66);
	fill(255, 255, 255, 40);
	text("YOU WIN!!", 300, 320);

	textSize(67);
	fill(255, 255, 255, 60);
	text("YOU WIN!!", 300, 315);
  
    textSize(68);
	fill(255, 255, 255, 80);
	text("YOU WIN!!", 300, 310);

    textSize(69);
	fill(255, 255, 255, 100);
	text("YOU WIN!!", 300, 305);
	
		textSize(70);
		fill(255, 0, 0);
		text("YOU WIN!!", 300, 300);
	
		textSize(30);
		textFont('Jim Nightshade');
		fill(255, 0, 0);
		text("PRESS R TO PLAY AGAIN", 300, 400);
	
		pop();
}

function death(){
	background(0);
	// bg.displaydeath();
	
	push();

	textAlign(CENTER);
	textFont('IM Fell DW Pica Sc');
	noStroke();

	textSize(65);
	fill(255, 255, 255, 20);
	text("YOU LOSE", 300, 325);

	textSize(66);
	fill(255, 255, 255, 40);
	text("YOU LOSE", 300, 320);

	textSize(67);
	fill(255, 255, 255, 60);
	text("YOU LOSE", 300, 315);
  
    textSize(68);
	fill(255, 255, 255, 80);
	text("YOU LOSE", 300, 310);

    textSize(69);
	fill(255, 255, 255, 100);
	text("YOU LOSE", 300, 305);
	
	textSize(70);
	fill(255, 0, 0);
	text("YOU LOSE", 300, 300);
	
	textSize(30);
	textFont('Jim Nightshade');
	fill(255, 0, 0);
	text("PRESS R TO TRY AGAIN!", 300, 400);
	
	pop();
}

//opening scene
function scene0(){

	bg.display0();
	
	//HERO EYE
	noFill();
	stroke('white');
	strokeWeight(3);

	beginShape();
	
	vertex(140, 250);
	bezierVertex(250, 140);
	bezierVertex(350, 140);
	bezierVertex(460, 250);
	
	bezierVertex(350, 360);
	bezierVertex(250, 360);
	bezierVertex(140, 250);
	
	endShape(CLOSE);
	
	fill(255, 240, 240);
	noStroke();
	
	beginShape();
	
	vertex(150, 250);
	bezierVertex(250, 150);
	bezierVertex(350, 150);
	bezierVertex(450, 250);
	
	bezierVertex(350, 350);
	bezierVertex(250, 350);
	bezierVertex(150, 250);
	
	endShape(CLOSE);

	//iris + pupil
	let irisX;

	if(floor(frameCount/60) % 2 == 0){
		irisX = 250;
	} else {
		irisX = 350;
	}

	fill(0, 0, 0);
	circle(irisX, 250, 100);

	fill(255, 0, 0);
	circle(irisX, 250, 30);
}

function scene1(){

	bg.display1();
	
	hero.move();
	hero.light();
	// hero.line();

	darkness.update(hero);
	// darkness.display();

	for(let i = 0; i < bullets.length; i++){
		bullets[i].update();
		bullets[i].display();
	}
	
	hero.display();

	for(i = droids.length - 1; i >= 0; i--){

		for(j = bullets.length - 1; j >= 0; j--){
			let distance = dist(droids[i].x, droids[i].y,
								bullets[j].x, bullets[j].y);
			if(distance < 15){
				droids.splice(i, 1);
				bullets.splice(j, 1);
				break;
			}
		}
	}

	for(let i = 0; i < droids.length; i++){
		droids[i].update();
		droids[i].display();

		let distance = dist(droids[i].x, droids[i].y, hero.x, hero.y);

		if(distance < hero.hitbox){
			hero.alive = false;
		}
}
	if(droids.length == 0 && !transition && hero.alive){
			transition = true;
			transframe = frameCount;
			nextscene = 3;
		}
}

function scene2(){
	bg.display2();

	hero.move();
	hero.light();
	
	hero.display();

	if(hero.laserFrames > 0){
		hero.line();

		for(let i = spikes.length - 1; i >= 0; i--){

			let dx = spikes[i].x - hero.x;
			let dy = spikes[i].y - hero.y;

			let front = dx*cos(hero.lightAngle) - dy*sin(hero.lightAngle);
			let side = abs(dx*sin(hero.lightAngle) + dy*cos(hero.lightAngle));

			if(front >= 20 && front <= 600 && side < 10){
				spikes.splice(i, 1);
			}
		}
		
		hero.laserFrames--;
	}

	for(let i = 0; i < spikes.length; i++){
		spikes[i].update();
		spikes[i].display();

		let distance = dist(spikes[i].x, spikes[i].y, hero.x, hero.y);

		if(distance < hero.hitbox + 10){
			hero.alive = false;
		}
	}
	if(spikes.length == 0 && !transition && hero.alive){
		transition = true;
		transframe = frameCount;
		nextscene = 4;
	}
}

//Background
class Background{
	constructor(){
		this.bgcol = color('blue');
	}

	display0(){
		let topColor = color(0, 0, 0);
		let bottomColor = color(255, 0, 0);
		for (let y = 0; y < height; y++) {
			let gradient = pow(map(y, 0, height, 0, 1), 2.5);
			stroke(lerpColor(topColor, bottomColor, gradient));
			line(0, y, width, y);
		}
		push();

		noStroke();
		textAlign(CENTER);
		textFont('IM Fell DW Pica Sc');
		
		textSize(50);
		fill(255, 0, 0, 100);
		text("DEAD FREQUENCY", 300, 110);
		textSize(49);
		fill(255, 0, 0, 80);
		text("DEAD FREQUENCY", 300, 120);
		textSize(48);
		fill(255, 0, 0, 60);
		text("DEAD FREQUENCY", 300, 130);
		textSize(47);
		fill(255, 0, 0, 40);
		text("DEAD FREQUENCY", 300, 140);
		textSize(46);
		fill(255, 0, 0, 30);
		text("DEAD FREQUENCY", 300, 150);
		textSize(45);
		fill(255, 0, 0, 20);
		text("DEAD FREQUENCY", 300, 160);
		textSize(44);
		fill(255, 0, 0, 10);
		text("DEAD FREQUENCY", 300, 170);

		textSize(51);
		fill(255, 0, 0);
		text("DEAD FREQUENCY", 300, 100);

		stroke('red');
	
		textSize(35);
		textFont('Jim Nightshade');
		fill(255, 255, 255);
		text("WASD to move around", 300, 400);
		text("Arrow Keys to see", 300, 440);
		text("Spacebar to shoot", 300, 480)
		text("Eliminate the Droids", 300, 520);
		text("Press 1 to begin", 300, 560);

		pop();
	}
	
	display1(){
		let topColor = color(0, 255, 0);
		let bottomColor = color(0, 0, 0);
		for (let y = 0; y < height; y++) {
			let gradient = pow(map(y, 0, height, 0, 1), 0.5);
			stroke(lerpColor(topColor, bottomColor, gradient));
			line(0, y, width, y);
		}
	}
	display2(){
		let topColor = color(0, 0, 255);
		let bottomColor = color(0, 0, 0);
		for (let y = 0; y < height; y++) {
			let gradient = pow(map(y, 0, height, 0, 1), 0.5);
			stroke(lerpColor(topColor, bottomColor, gradient));
			line(0, y, width, y);
		}
	}
	displaydeath(){
		let topColor = color(0, 0, 255);
		let bottomColor = color(0, 0, 0);
		for (let y = 0; y < height; y++) {
			let gradient = pow(map(y, 0, height, 0, 1), 0.5);
			stroke(lerpColor(topColor, bottomColor, gradient));
			line(0, y, width, y);
		}
	}
}

//HERO CLASS
class Hero{
  constructor(){

	  //Hero Variables
	  this.x = width/2; //300
	  this.y = height/2; //300
	  
	  this.x1 = width/2;
	  this.y1 = height/2;
	  
	  this.x2 = width/2;
	  this.y2 = height/2;

	  this.xL;
	  this.yL;
	  
	  this.size = 40;
	  this.speed = 3;

	  this.erX = 12;
	  this.erY = 5;

	  this.hitbox = 30;
	  this.alive = true;

	  //Light Variables
	  this.lightAngle = HALF_PI;
	  this.rotation = 0.06;
	  this.increment = 5;
	  this.lightLength = 130;
	  this.lightWidth = 100;
	  this.lightOpacity = 255;

	  this.laserFrames = 0;
  }
	
  display(){
	  
	  push();
	  translate(this.x, this.y);

	  strokeWeight(2);
	  stroke(0, 0, 0);
	  fill(255);

	  beginShape();
	  vertex(-30, 0);
	  bezierVertex(-15, -25);
	  bezierVertex(15, -25);
	  bezierVertex(30, 0);
	  
	  bezierVertex(15, 25);
	  bezierVertex(-15, 25);
	  bezierVertex(-30, 0);

	  endShape(CLOSE);
	  pop();

	  push();
	  noStroke();
	  fill(0); //iris
	  circle(this.x1, this.y1, 25);

	  noStroke();
	  fill(255, 0, 0); //retina
	  circle(this.x2, this.y2, 10);
	  pop();
}
	line(){
		push();
		
		translate(this.x, this.y);
		rotate(HALF_PI - this.lightAngle);

		stroke(255, 0, 0, 50);
		strokeWeight(15);
		line(0, -20, 0, - 600);
		
		stroke(255, 0, 0, 100);
		strokeWeight(6);
		line(0, -20, 0, - 600);
		
		stroke(255, 0, 0);
		strokeWeight(2);
		line(0, -10, 0, -600);   
		
		pop();
	}
	
	light() {
		if (keyIsDown(RIGHT_ARROW)) {
			this.lightAngle -= this.rotation;
		}
		if (keyIsDown(LEFT_ARROW)) {
			this.lightAngle += this.rotation;
		}
		if(keyIsDown(UP_ARROW)){
			this.lightLength += this.increment;
			this.lightWidth -= (this.increment - 2);
		}
		if(keyIsDown(DOWN_ARROW)){
			this.lightLength -= this.increment;
			this.lightWidth += (this.increment - 1);
		}
		if(this.lightLength >= 160){
			this.lightWidth = 90;
		}
		if(this.lightLength >= 230){
			this.lightLength = 230;
		}
		if(this.lightLength <= 70){
			this.lightLength = 70;
		}
		if(this.lightWidth >= 120){
			this.lightWidth = 120;
		}

		this.x1 = this.x + cos(this.lightAngle) * this.erX;
		this.y1 = this.y - sin(this.lightAngle) * this.erY;
		this.x2 = this.x1;
		this.y2 = this.y1;
	}

	move(){
		if(keyIsDown('w')) { //up
			this.y -= this.speed;
			this.y1 -= this.speed;
			this.y2 -= this.speed;
		}
		if(keyIsDown('a')) { //left
			this.x -= this.speed;
			this.x1 -= this.speed;
			this.x2 -= this.speed;
		}
		if(keyIsDown('s')) { //down
			this.y += this.speed;
			this.y1 += this.speed;
			this.y2 += this.speed;
		}
		if(keyIsDown('d')) { //right
			this.x += this.speed;
			this.x1 += this.speed;
			this.x2 += this.speed;
		}

		//constraining the movement
		if(this.x >= (width/2 + 150)) {
			this.x = width/2 + 150;
			this.x1 = width/2 + 150;
			this.x2 = width/2 + 150;
		}
		if(this.x <= (width/2 - 150)) {
			this.x = width/2 - 150;
			this.x1 = width/2 - 150;
			this.x2 = width/2 - 150;
		}
		if(this.y >= (height/2 + 150)) {
			this.y = height/2 + 150;
			this.y1 = height/2 + 150;
			this.y2 = height/2 + 150;
		}
		if(this.y <= (height/2 - 150)) {
			this.y = height/2 - 150;
			this.y1 = height/2 - 150;
			this.y2 = height/2 - 150;
		}
	}
	shoot(){
		bullets.push(new Bullet(this.x, this.y, this.lightAngle));
	}
}

class Darkness{
	constructor(){
		this.buffer = createGraphics(height, width);
	}
	
	update(hero) {
		this.buffer.background(0);

		this.buffer.push();
		
		this.buffer.translate(hero.x, hero.y);
		this.buffer.rotate(HALF_PI - hero.lightAngle);
		
		//AI Assisted
		let ctx = this.buffer.drawingContext;
		ctx.save();
		ctx.globalCompositeOperation = 'destination-out';
		
		ctx.filter = 'blur(15px)'; //softens the flashlight blur
		
		//actual gradient
		let gradient = ctx.createLinearGradient(0, 0,
		    0, -hero.lightLength - 40);
		gradient.addColorStop(0, 'rgba(255,255,255,1)');
		gradient.addColorStop(0.5, 'rgba(255,255,255,0.8)');
		gradient.addColorStop(1, 'rgba(255,255,255,0)');
		ctx.fillStyle = gradient;

  // Drawing the flashlight as one continuous shape
		ctx.beginPath();
		ctx.moveTo(0, -20);
		
		ctx.lineTo(-hero.lightWidth/2, -hero.lightLength);
		
		ctx.ellipse(0, -hero.lightLength, hero.lightWidth / 2,
					35, 0, PI, TWO_PI);
		
		ctx.lineTo(0, -20);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
		
		this.buffer.pop();
}
	display(){
		image(this.buffer, 0, 0);
	}
}

class Bullet{
	constructor(x, y, angle){
		this.x = x;
		this.y = y;
		this.angle = angle;
		this.speed = 15;
	}
	display(){

		push();
		translate(this.x, this.y);
		
		rotate(HALF_PI - this.angle);

		stroke(255, 0, 0, 100);
		strokeWeight(4);
		line(0, -10, 0, -30);
		
		stroke(255, 0, 0);
		strokeWeight(3);
		line(0, -10, 0, -30);

		pop();
	}
	update(){
		this.x += cos(this.angle) * this.speed;
		this.y -= sin(this.angle) * this.speed;
	}
}

class Droids{
	constructor(x, y, speed, rotation){
		this.x = x;
		this.y = y;
		this.angle = 0;
		this.rotate = rotation
		this.speed = speed;
	}
	display(){
		push();
		
		translate(this.x, this.y);
		rotate(this.angle);

		//1
		stroke(0);
		strokeWeight(5);
		fill(255, 0, 0);
		circle(0, 0, 30);
		
		fill(0, 0, 0);
		circle(0, 0, 8);

		rectMode(CORNER);
		noStroke();
		fill(0);
		rect(-5, -15, 10, -12);

		noStroke();
		fill(0);
		rect(-5, 15, 10, 12);

		

		pop();
	}
	update(){
		this.angle += this.rotate;

		let dx = hero.x - this.x;
		let dy = hero.y - this.y;
		let distance = dist(this.x, this.y, hero.x, hero.y);
		
		if(distance > 0){
			this.x += (dx / distance) * this.speed;
			this.y += (dy / distance) * this.speed;
	}
}
}

class Spikes{
	constructor(x, y, speed, rotation){
		this.x = x;
		this.y = y;
		this.angle = 0;
		this.speed = speed;
		this.rotate = rotation;
	}

	display(){
		push();
      translate(this.x, this.y);
		rotate(this.angle);
      
      noStroke();
      fill(0);
      circle(0, 0, 30);

      fill(255, 0, 0);
      circle(0, 0,12);

      for(let i = 0; i < 8; i++){
        fill(0);
        triangle(-5, -10, 0, -25, 5, -10);
        rotate(PI/4);
      }
		
      pop();
	}
	update(){
		this.angle += this.rotate;

		let dx = hero.x - this.x;
		let dy = hero.y - this.y;
		let distance = dist(this.x, this.y, hero.x, hero.y);
		
		if(distance > 0){
			this.x += (dx / distance) * this.speed;
			this.y += (dy / distance) * this.speed;
		}
	}
}