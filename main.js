window.onload = function(){
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  
  let canvasWidth = window.innerWidth;
  let canvasHeight = window.innerHeight;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  
  let ballsQuantity = 100;
  let balls = [];
  
  //create an object for each ball, that holds the x andy axis, the r(radius) and dx,dy which will tell the ball where to move next
  for(let i=0; i<ballsQuantity; i++){
    let radius =  Math.random() * 15 + 2;
    balls.push({
      r: Math.random() * 15 + 2,
      x: Math.random() * (canvasWidth - radius * 2) + radius, //use this formulla instead of "Math.random() * canvasWidth" so there wont be any glitching balls in the side of the screen, both for width and height of the canvas.
      y: Math.random() * (canvasHeight - radius * 2) + radius,
      dx: (Math.random() - 0.5) * 8,
      dy: (Math.random() - 0.5) * 8
    })
  }
  
  //first, draw every ball on screen at random places within the canvas.
  function drawCircle(){
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for(let i=0; i<ballsQuantity; i++){
      let f = balls[i];
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
    }
    ctx.fill();
    animateDemBalls();
  }
  
  //Then we anymate the balls to move to random places within the canvas.
  function animateDemBalls(){
    for(let i=0; i<ballsQuantity; i++){
      let f = balls[i];
      
      //make sure that balls will bounce back when they hit the sides of the screen.
      if(f.y + f.r > canvasHeight || f.y - f.r < 0){
        f.dy = -f.dy;
      }
      if(f.x + f.r > canvasWidth || f.x - f.r < 0){
        f.dx = -f.dx;
      }
      
      //update balls position
      f.x += f.dx;
      f.y += f.dy;
    }
  }

  setInterval(drawCircle, 25)
}