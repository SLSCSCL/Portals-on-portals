const canvas2 = document.getElementById("sequel"), ct = canvas2.getContext("2d");
function Namyami() {
    ct.fillStyle = "#d340a6";
    ct.font = "75px Century Gothic"
    //First we'll
    ct.fillText("O", s.x + 45.5, s.y + 50);
    //Arms
    ct.fillRect(s.x + 20, s.y + 50, 100, 20);
    //Body
    ct.fillRect(s.x + 53, s.y + 50, 33, 40);
    //Legs
    ct.fillRect(s.x, s.y + 90, 140, 20);
    ct.fillRect(s.x, s.y + 90, 20, 50);
    ct.fillRect(s.x + 40, s.y + 90, 20, 50);
    ct.fillRect(s.x + 80, s.y + 90, 20, 50);
    ct.fillRect(s.x + 120, s.y + 90, 20, 50);
    //Face
    ct.fillStyle = "#000";
    //Unibrow
    ct.fillRect(s.x + 62.5, s.y + 5, 35, 1.7);
    //Eye 1
    ct.fillRect(s.x + 62.5, s.y + 10, 10, 10);
    //Eye 2
    ct.fillRect(s.x + 82.5, s.y + 10, 10, 10);
    //Mouth
    //Dripping blood
    ct.fillStyle = "darkred";
    ct.fillRect(s.x + 62.5, s.y + 30, 30, 5);
    ct.fillRect(s.x + 62.5, s.y + 30, 5, 20);
    ct.fillRect(s.x + 72.5, s.y + 30, 5, 10);
    ct.fillRect(s.x + 81.5, s.y + 30, 5, 15);
    ct.fillRect(s.x + 87.5, s.y + 30, 5, 20);
}

const cloud = new Image();
cloud.src = 'cloud.PNG';
cloud.onload = function() {
    drawCloud();
}

// Draw the balloon
function drawBalloon(x, y, color) {
    ct.beginPath();
    ct.arc(x, y, 50, 0, Math.PI * 2);
    ct.fillStyle = color;
    ct.fill();

    // Draw the balloon string
    ct.moveTo(x, y + 50);
    ct.lineTo(x, y + 50 + 50);
    ct.strokeStyle = 'black';
    // Color of the string
    ct.lineWidth = 3;
    // Thickness of the string
    ct.stroke();
}

var cloudX = 5
  , cloudY = 1;

function drawCloud() {
    canvas2.width = 750;
    ct.fillStyle = "#80D2E8";
    ct.fillRect(0, 0, canvas2.width, canvas2.height);
    for (var r1 = 0; r1 <= cloudY; r1++) {
        y = r1 * 100;
        for (var r2 = 0; r2 <= cloudX; r2++) {
            x = r2 * 150;
            ct.drawImage(cloud, x, y, 150, 100);
        }
    }
    ct.fillStyle = "green";
    ct.fillRect(0, canvas2.height - 100, canvas2.width, 100);
}

function Yusee() {
    ct.fillStyle = car.color;
    ct.fillRect(car.x, car.y, car.width, car.height);
    if (car.color2) {
        ct.fillStyle = car.color2;
        ct.fillRect(car.x, car.y, 25, 30);
    }
    ct.strokeRect(car.x, car.y, car.width, car.height);
    ct.fillStyle = '#fff';
    ct.fillRect(car.x + 45, car.y + 5, 5, 5);
    ct.fillRect(car.x + 45, car.y + 20, 5, 5);
    if (car.color !== 'darkred') {
        ct.fillStyle = "darkred";
    } else if (car.color === 'darkred') {
        ct.fillStyle = "red";
    }
    ct.fillRect(car.x, car.y + 5, 5, 5);
    ct.fillRect(car.x, car.y + 20, 5, 5);
    ct.fillStyle = "#000";
    ct.fillRect(car.x + 10, car.y + 10, 30, 10);
    ct.strokeRect(car.x + 10, car.y + 1, 30, 28);
    ct.fillStyle = "turquoise";
    ct.fillRect(car.x + 8, car.y + 5, 1, 20);
    ct.fillRect(car.x + 41, car.y + 5, 1, 20);
}

function Yasmia() {
    ct.fillStyle = car2.color;
    ct.fillRect(car2.x, car2.y, car2.width, car2.height);
    if (car2.color2) {
        ct.fillStyle = car2.color2;
        ct.fillRect(car2.x, car2.y, 25, 30);
    }
    ct.strokeRect(car2.x, car2.y, car2.width, car2.height);
    ct.fillStyle = '#fff';
    ct.fillRect(car2.x + 45, car2.y + 5, 5, 5);
    ct.fillRect(car2.x + 45, car2.y + 20, 5, 5);
    if (car.color !== 'darkred') {
        ct.fillStyle = "darkred";
    } else if (car2.color === 'darkred') {
        ct.fillStyle = "red";
    }
    ct.fillRect(car2.x, car2.y + 5, 5, 5);
    ct.fillRect(car2.x, car2.y + 20, 5, 5);
    ct.fillStyle = "#000";
    ct.fillRect(car2.x + 10, car2.y + 10, 30, 10);
    ct.strokeRect(car2.x + 10, car2.y + 1, 30, 28);
    ct.fillStyle = "turquoise";
    ct.fillRect(car2.x + 8, car2.y + 5, 1, 20);
    ct.fillRect(car2.x + 41, car2.y + 5, 1, 20);
}

var pP, pC, pY = 0;
function balloon() {
    if (!pP) {
        pP = Math.random() * canvas2.width - 100 / 750;
    }
    if (!pC) {
        pC = Math.random();
        if (pC <= 0.3) {
            pC = "darkorange";
        } else if (pC <= 0.6 && pC > 0.3) {
            pC = "turquoise";
        } else if (pC <= 0.8 && pC > 0.6) {
            pC = "rgba(0, 0, 0, 0)";
        } else if (pC <= 1 && pC > 0.8) {
            pC = "pink";
        }
    }
    pY++;
    drawBalloon(pP, pY, pC);
    if (pY == canvas2.height - 100) {
        pC = null;
        pP = null;
        pY = 0;
    }
}

function portalPiew() {
}

car.y = 325;
car2.y = 325;
function balloonCatch() {
    ct.clearRect(0, 0, canvas2.width, canvas2.height);
    drawCloud();
    balloon();
    if ((keys.d || keys.D) && car.x < canvas.width - car.width) {
        car.x += car.speed;
        m.play();

    }
    if ((keys.a || keys.A) && car.x > 0) {
        car.x -= car.speed;
        m.play();

    }
    // Update car position
    if ((keys.l || keys.L) && car2.x < canvas.width - car2.width) {
        car2.x += car2.speed;
        m.play();

    }
    if ((keys.j || keys.J) && car2.x > 0) {
        car2.x -= car2.speed;
        m.play();

    }
    if (car.x < pP + 30 && car.x + car2.width > pP && car.y < (pY + 80) + 30 && car.y + car.height > pY) {
        
    }
    Yusee();
    Yasmia();
    requestAnimationFrame(balloonCatch);
}
balloonCatch();
