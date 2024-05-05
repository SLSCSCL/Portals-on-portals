// Your JavaScript code for the game goes here
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
//var p;
// Define your game objects and variables here
// For simplicity, we'll create a simple car and moving portals
var car = {
    x: 50,
    y: 200,
    width: 50,
    height: 30,
    speed: 5,
    color: 'red',
    color2: null
};

var car2 = {
    x: 700,
    y: 200,
    width: 50,
    height: 30,
    speed: 5,
    color: "blue",
    color2: null
}

var portals = [{
    x: 200,
    y: 0,
    type: 'baby',
    speed: 2
}, {
    x: 400,
    y: (canvas.height - 30),
    type: 'dead',
    speed: 2
}, {
    x: 600,
    y: 0,
    type: 'ocean',
    speed: 8
}, {
    x: 300,
    y: 150,
    type: 'invisible',
    speed: 10
}, // Add an invisible portal
{
    x: 500,
    y: 300,
    type: 'fire',
    speed: 8
}, {
    x: 700,
    y: 0,
    type: 'baby',
    speed: 2
}, {
    x: 900,
    y: (canvas.height - 30),
    type: 'dead',
    speed: 2
}, {
    x: 1100,
    y: 0,
    type: 'ocean',
    speed: 8
}, {
    x: 820,
    y: 450,
    type: 'invisible',
    speed: 10
}, // Add an invisible portal
{
    x: 1000,
    y: 300,
    type: 'fire',
    speed: 8
}];

const powerups = [{
    x: 350,
    y: 100,
    type: 'vision saftey'
}, {
    x: 150,
    y: 50,
    type: 'world safety'
}, {
    x: 700,
    y: 50,
    type: 'speed up'
}, {
    x: 150,
    y: 250,
    type: 'slow down'
}, {
    x: 650,
    y: 50,
    type: 'normal speed'
}];
var fail = new Audio("Fail.mp3")
  , win = new Audio("Win.mp3")
  , yasmia = new Audio("yasmia.mp3")
  , portal_power = new Audio("portal power.mp3")
  , sMinus = 1500
  , sPlus = 10000
  , scale = 1;

let s = {
    x: 330,
    y: 130,
    width: 140,
    height: 140,
    xSpeed: 1,
    // Horizontal speed
    ySpeed: 1,
    // Vertical speed
    buffer: 5 // Buffer distance from the edges
};

function updateGameArea() {
    if (!SL) {
        s = {
            x: null,
            y: null,
            width: null,
            height: null,
            xSpeed: null,
            ySpeed: null,
            buffer: null
        }
    }
    if (p > 0) {
        // Move Sactintra horizontally
        s.x += s.xSpeed;

        // Check horizontal boundaries
        if (s.x + s.width + s.buffer > canvas.width) {
            s.x = canvas.width - s.width - s.buffer;
            // Move away from the edge
            s.xSpeed = -s.xSpeed;
            // Reverse direction
        }
        if (s.x - s.buffer < 0) {
            s.x = s.buffer;
            // Move away from the edge
            s.xSpeed = Math.abs(s.xSpeed);
            // Change direction
        }

        // Move Sactintra vertically
        if (p == 3) {
            s.y += s.ySpeed;
        }
        // Check vertical boundaries
        if (s.y + s.height + s.buffer > canvas.height) {
            s.y = canvas.height - s.height - s.buffer;
            // Move away from the edge
            s.ySpeed = -s.ySpeed;
            // Reverse direction
        }
        if (s.y - s.buffer < 0) {
            s.y = s.buffer;
            // Move away from the edge
            s.ySpeed = Math.abs(s.ySpeed);
            // Change direction
        }
    }
    // Draw Sactintra
    Sactintra();
    crash();
}


function changeBackground(className) {
    document.body.className = className;
}
const comb = new Path2D();
function Sactintra() {
    ctx.font = "75px Century Gothic"
    ctx.fillStyle = "#0ff";
    ctx.fillText("O", s.x + 45.5, s.y + 50);
    //Arms
    ctx.fillRect(s.x + 20, s.y + 50, 100, 20);
    //Body
    ctx.fillRect(s.x + 53, s.y + 50, 33, 40);
    //Legs
    ctx.fillRect(s.x, s.y + 90, 140, 20);
    ctx.fillRect(s.x, s.y + 90, 20, 50);
    ctx.fillRect(s.x + 40, s.y + 90, 20, 50);
    ctx.fillRect(s.x + 80, s.y + 90, 20, 50);
    ctx.fillRect(s.x + 120, s.y + 90, 20, 50);
    //Face
    ctx.fillStyle = "#000";
    ctx.fillRect(s.x + 62.5, s.y + 5, 35, 1.7);
    //Unibrow
    ctx.fillRect(s.x + 62.5, s.y + 10, 10, 10);
    //Eye 1
    ctx.fillRect(s.x + 82.5, s.y + 10, 10, 10);
    //Eye 2
    //Dripping blood
    ctx.fillStyle = "darkred";
    ctx.fillRect(s.x + 62.5, s.y + 30, 30, 5);
    ctx.fillRect(s.x + 62.5, s.y + 30, 5, 20);
    ctx.fillRect(s.x + 72.5, s.y + 30, 5, 10);
    ctx.fillRect(s.x + 81.5, s.y + 30, 5, 15);
    ctx.fillRect(s.x + 87.5, s.y + 30, 5, 20);
}

var sl, sfail = new Audio("failed.mp3");
function drawSL() {
    sl = SL / 7142.857142857143;
    ctx.fillStyle = "yellow";
    ctx.fillRect(s.x + 20, s.y - 20, sl, 10);
}

function muhaha() {
    fail.play();
}
function drawLives() {
    ctx.fillStyle = "turquoise";
    ctx.font = "24px Imprint MT Shadow";
    if ((w <= 0 || f <= 0 || i <= 0) && time > 0) {
        f = -1;
        w = -1;
        l = 0;
        l2 = 0;
        li = 0;
        ctx.fillRect(100, 100, 30, 30);
        ctx.fillRect(500, 100, 30, 30);
        ctx.fillRect(130, 270, 370, 30);
        ctx.fillRect(100, 290, 30, 30);
        ctx.fillRect(500, 290, 30, 30);
        ctx.fillRect(70, 310, 30, 30);
        ctx.fillRect(530, 310, 30, 30);
        ctx.fillRect(160, 240, 310, 30);
        if (!lose) {
            sfail.play();
            fail.play();
        }
        keys.Escape = true;
        ctx.fillText("Reload to try again.", 24, 374);
        if (!music.paused) {
            music.pause();
        }
        return;
    } else if (time <= 0 && SL <= 0) {
        f = -1;
        w = -1;
        ctx.fillRect(100, 100, 30, 30);
        ctx.fillRect(500, 100, 30, 30);
        ctx.fillRect(130, 270, 370, 30);
        ctx.fillRect(100, 250, 30, 30);
        ctx.fillRect(500, 250, 30, 30);
        ctx.fillRect(70, 230, 30, 30);
        ctx.fillRect(530, 230, 30, 30);
        ctx.fillStyle = "#0dd";
        keys.Escape = true;
        ctx.font = "24px Imprint MT Shadow";
        portal_power.play();
        if (p != 3) {
            ctx.fillText("      +25%", 560, 124);
            win.play();
        }
        ctx.fillRect(580, 126, 100, 100);
        ctx.fillText("Portal Power", 565, 228 + 24);
        if (!music.paused) {
            music.pause();
        }
        if (p == 3) {
            ctx.fillText("   Complete", 560, 124);
            ctx.font = "24px Imprint MT Shadow";
            if (!tru) {
                ctx.fillText("The code for upgrading is: " + code[codeNum], 50, 34);
            }
            if (tru) {
                var sWin = new Audio("S-win.mp3");
                sWin.play();
            } else {
                yasmia.play();
            }
        }
        ctx.fillText("Reload to go to the next level.", 24, 374);
        if (p == 3 && tru) {
            ctx.clearRect(0, 300, 475, 100);
        }
        return;
    }
    ctx.fillRect(10, 10, f, 10);
    if (p > 0) {
        ctx.fillRect(10, canvas.height - 20, w, 10);
    }
    if (p == 3) {
        ctx.fillRect(canvas.width - 20, 10, 10, i);
    }
    if (!tru) {
        SL = -10000000000000000000000000000000000000000000000000;
    }
}

function powers() {
    ctx.fillStyle = "gold";
    ctx.font = "30px Century Gothic";
    if (powered.type === "win" && (l <= 100000 || l2 <= 100000 || li <= 100000)) {
        ctx.fillRect(powered.x, powered.y, 15, 15);
    } else if (powered.type === "life" && (l <= 100000 || l2 <= 100000 || li <= 100000)) {
        ctx.fillRect(powered.x, powered.y, 30, 15);
    } else if (powered.type === "destroy" && (l <= 100000 || l2 <= 100000 || li <= 100000)) {
        ctx.fillText("💥", powered.x, powered.y);
    }
    getPower();
}

function getPower() {
    if (car.x < powered.x + 30 && car.x + car.width > powered.x && car.y < powered.y + 30 && car.y + car.height > powered.y) {
        if (powered.type === "win" && (l <= 100000 || l2 <= 100000 || li <= 100000)) {
            time = 0;
            powered = {
                x: null,
                y: null,
                type: null
            };
        } else if (powered.type === "life" && (l <= 100000 || l2 <= 100000 || li <= 100000)) {
            l = 1000000;
            l2 = 1000000;
            li = 1000000;
            powered = {
                x: null,
                y: null,
                type: null
            };
        } else if (powered.type === "destroy" && (l <= 100000 || l2 <= 100000 || li <= 100000)) {
            var des = window.prompt("What portal? Fire, Invisible, Water, or Sactintra? Make sure that you spell it with a capital.");
            //To Do: Set all control keys to false
            if (des === "Fire") {
                portals = [{
                    x: 200,
                    y: 0,
                    type: 'baby',
                    speed: 2
                }, {
                    x: 400,
                    y: (canvas.height - 30),
                    type: 'dead',
                    speed: 2
                }, {
                    x: 600,
                    y: 0,
                    type: 'ocean',
                    speed: 8
                }, {
                    x: 300,
                    y: 150,
                    type: 'invisible',
                    speed: 10
                }, // Add an invisible portal
                {
                    x: 700,
                    y: 0,
                    type: 'baby',
                    speed: 2
                }, {
                    x: 900,
                    y: (canvas.height - 30),
                    type: 'dead',
                    speed: 2
                }, {
                    x: 1100,
                    y: 0,
                    type: 'ocean',
                    speed: 8
                }, {
                    x: 802,
                    y: 150,
                    type: 'invisible',
                    speed: 10
                }, // Add an invisible portal
                ];
                powered = {
                    x: null,
                    y: null,
                    type: null
                };
                keys.d = false;
            } else if (des === "Invisible") {
                portals = [{
                    x: 200,
                    y: 0,
                    type: 'baby',
                    speed: 2
                }, {
                    x: 400,
                    y: (canvas.height - 30),
                    type: 'dead',
                    speed: 2
                }, {
                    x: 600,
                    y: 0,
                    type: 'ocean',
                    speed: 8
                }, {
                    x: 1000,
                    y: 300,
                    type: 'fire',
                    speed: 8
                }, {
                    x: 700,
                    y: 0,
                    type: 'baby',
                    speed: 2
                }, {
                    x: 900,
                    y: (canvas.height - 30),
                    type: 'dead',
                    speed: 2
                }, {
                    x: 1100,
                    y: 0,
                    type: 'ocean',
                    speed: 8
                }, {
                    x: 1000,
                    y: 300,
                    type: 'fire',
                    speed: 8
                }];
                powered = {
                    x: null,
                    y: null,
                    type: null
                };
            } else if (des === "Water") {
                portals = [{
                    x: 200,
                    y: 0,
                    type: 'baby',
                    speed: 2
                }, {
                    x: 400,
                    y: (canvas.height - 30),
                    type: 'dead',
                    speed: 2
                }, {
                    x: 1000,
                    y: 300,
                    type: 'fire',
                    speed: 8
                }, {
                    x: 300,
                    y: 150,
                    type: 'invisible',
                    speed: 10
                }, // Add an invisible portal
                {
                    x: 700,
                    y: 0,
                    type: 'baby',
                    speed: 2
                }, {
                    x: 900,
                    y: (canvas.height - 30),
                    type: 'dead',
                    speed: 2
                }, {
                    x: 802,
                    y: 150,
                    type: 'invisible',
                    speed: 10
                }, // Add an invisible portal
                {
                    x: 1000,
                    y: 300,
                    type: 'fire',
                    speed: 8
                }];
                powered = {
                    x: null,
                    y: null,
                    type: null
                };
            } else if (des === "Sactintra") {
                SL = 0;
                powered = {
                    x: null,
                    y: null,
                    type: null
                };
            }
            keys.w = false;
            keys.W = false;
            keys.a = false;
            keys.A = false;
            keys.s = false;
            keys.S = false;
            keys.d = false;
            keys.D = false;
        }
    }
}

function drawCar() {
    ctx.fillStyle = car.color;
    ctx.fillRect(car.x, car.y, car.width, car.height);
    if (car.color2) {
        ctx.fillStyle = car.color2;
        ctx.fillRect(car.x, car.y, 25, 30);
    }
    ctx.strokeRect(car.x, car.y, car.width, car.height);
    ctx.fillStyle = '#fff';
    ctx.fillRect(car.x + 45, car.y + 5, 5, 5);
    ctx.fillRect(car.x + 45, car.y + 20, 5, 5);
    if (car.color !== 'darkred') {
        ctx.fillStyle = "darkred";
    } else if (car.color === 'darkred') {
        ctx.fillStyle = "red";
    }
    ctx.fillRect(car.x, car.y + 5, 5, 5);
    ctx.fillRect(car.x, car.y + 20, 5, 5);
    ctx.fillStyle = "#000";
    ctx.fillRect(car.x + 10, car.y + 10, 30, 10);
    ctx.strokeRect(car.x + 10, car.y + 1, 30, 28);
    ctx.fillStyle = "turquoise";
    ctx.fillRect(car.x + 8, car.y + 5, 1, 20);
    ctx.fillRect(car.x + 41, car.y + 5, 1, 20);
}

function drawCar2() {
    ctx.fillStyle = car2.color;
    ctx.fillRect(car2.x, car2.y, car2.width, car2.height);
    if (car2.color2) {
        ctx.fillStyle = car2.color2;
        ctx.fillRect(car2.x, car2.y, 25, 30);
    }
    ctx.strokeRect(car2.x, car2.y, car2.width, car2.height);
    ctx.fillStyle = '#fff';
    ctx.fillRect(car2.x + 45, car2.y + 5, 5, 5);
    ctx.fillRect(car2.x + 45, car2.y + 20, 5, 5);
    if (car.color !== 'darkred') {
        ctx.fillStyle = "darkred";
    } else if (car2.color === 'darkred') {
        ctx.fillStyle = "red";
    }
    ctx.fillRect(car2.x, car2.y + 5, 5, 5);
    ctx.fillRect(car2.x, car2.y + 20, 5, 5);
    ctx.fillStyle = "#000";
    ctx.fillRect(car2.x + 10, car2.y + 10, 30, 10);
    ctx.strokeRect(car2.x + 10, car2.y + 1, 30, 28);
    ctx.fillStyle = "turquoise";
    ctx.fillRect(car2.x + 8, car2.y + 5, 1, 20);
    ctx.fillRect(car2.x + 41, car2.y + 5, 1, 20);
}

function drawPortals() {
    portals.forEach((portal)=>{
        if (portal.type === 'baby') {
            ctx.fillStyle = 'pink';
            ctx.fillRect(portal.x, portal.y, 30, 30);
            ctx.strokeRect(portal.x, portal.y, 30, 30);
            ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
            ctx.fillRect(portal.x + 5, portal.y + 5, 20, 5);
            ctx.fillRect(portal.x + 20, portal.y + 10, 5, 15);
            ctx.fillRect(portal.x + 5, portal.y + 20, 15, 5);
            ctx.fillRect(portal.x + 5, portal.y + 13, 5, 7);
            ctx.fillRect(portal.x + 10, portal.y + 13, 5, 5);
        } else if (portal.type === 'dead') {
            ctx.fillStyle = 'gray';
            ctx.fillRect(portal.x, portal.y, 30, 30);
            ctx.strokeRect(portal.x, portal.y, 30, 30);
            ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
            ctx.fillRect(portal.x + 5, portal.y + 5, 20, 5);
            ctx.fillRect(portal.x + 20, portal.y + 10, 5, 15);
            ctx.fillRect(portal.x + 5, portal.y + 20, 15, 5);
            ctx.fillRect(portal.x + 5, portal.y + 13, 5, 7);
            ctx.fillRect(portal.x + 10, portal.y + 13, 5, 5);
            ctx.fillStyle = '';
        } else if (portal.type === 'ocean' && power != 2 && n2) {
            ctx.fillStyle = 'turquoise';
            ctx.fillRect(portal.x, portal.y, 30, 30);
            ctx.strokeRect(portal.x, portal.y, 30, 30);
            ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
            ctx.fillRect(portal.x + 5, portal.y + 5, 20, 5);
            ctx.fillRect(portal.x + 20, portal.y + 10, 5, 15);
            ctx.fillRect(portal.x + 5, portal.y + 20, 15, 5);
            ctx.fillRect(portal.x + 5, portal.y + 13, 5, 7);
            ctx.fillRect(portal.x + 10, portal.y + 13, 5, 5);
            ctx.fillStyle = '';
        } else if (portal.type === 'invisible' && power != 1) {
            // Make the invisible portal translucent (50% opacity)
            ctx.fillStyle = 'orange';
            ctx.strokeRect(portal.x, portal.y, 30, 30);
            ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
            ctx.fillRect(portal.x + 5, portal.y + 5, 20, 5);
            ctx.fillRect(portal.x + 20, portal.y + 10, 5, 15);
            ctx.fillRect(portal.x + 5, portal.y + 20, 15, 5);
            ctx.fillRect(portal.x + 5, portal.y + 13, 5, 7);
            ctx.fillRect(portal.x + 10, portal.y + 13, 5, 5);
        } else if (portal.type === 'fire' && power != 2 && n1) {
            ctx.fillStyle = 'orange';
            ctx.fillRect(portal.x, portal.y, 30, 30);
            ctx.strokeRect(portal.x, portal.y, 30, 30);
            ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
            ctx.fillRect(portal.x + 5, portal.y + 5, 20, 5);
            ctx.fillRect(portal.x + 20, portal.y + 10, 5, 15);
            ctx.fillRect(portal.x + 5, portal.y + 20, 15, 5);
            ctx.fillRect(portal.x + 5, portal.y + 13, 5, 7);
            ctx.fillRect(portal.x + 10, portal.y + 13, 5, 5);
            ctx.fillStyle = "";
        }
    }
    );
}

function drawPowerups() {
    powerups.forEach((powerup)=>{
        if (powerup.type === 'vision saftey') {
            ctx.fillStyle = 'green';
        } else if (powerup.type === 'world safety') {
            ctx.fillStyle = 'black';
            ctx.fillRect(powerup.x, powerup.y, 20, 20);
            ctx.fillStyle = 'rgba(0, 0, 0, 0)';
        } else if (powerup.type === 'speed up' && (!q || power == 2)) {
            ctx.fillStyle = 'pink';
        } else if (powerup.type === 'slow down' && (!q || power == 2)) {
            ctx.fillStyle = 'darkred';
        } else if (powerup.type === 'normal speed' && (!q || power == 2)) {
            ctx.fillStyle = 'turquoise';
        }

        ctx.fillRect(powerup.x, powerup.y, 20, 20);
        ctx.fillStyle = '';
    }
    );
}

var x, y, xA = [0, 180, 360, 540, 720, 900], yA = [0, 121, 242, 363, 0, 0], num = 0, die = 0;

function drawFire() {
    ctx.fillStyle = "darkorange";
    for (var r1 = 0; r1 <= 6; r1++) {
        y = r1 * 99;
        for (var r2 = 0; r2 <= 12; r2++) {
            x = r2 * 100;
            ctx.fillRect(x, y + 50, 75, 15);
            ctx.fillRect(x + 15, y + 35, 45, 15);
            ctx.fillRect(x + 30, y + 20, 15, 15);
            ctx.fillRect(x + 30, y, 15, 20);
        }
    }
}

function drawFish() {
    for (var r1 = 0; r1 <= 2; r1++) {
        ctx.fillStyle = "orange";
        y = r1 * ((99 + 22) * 2);
        for (var r2 = 0; r2 <= 5; r2++) {
            x = r2 * 360;
            ctx.fillStyle = "orange";
            ctx.fillRect(x, y + 30, 15, 45);
            ctx.fillRect(x + 15, y + 15, 15, 75);
            ctx.fillRect(x + 30, y, 15, 105);
            ctx.fillRect(x + 60, y, 15, 105);
            ctx.fillRect(x + 90, y + 45, 15, 15);
            ctx.fillRect(x + 120, y + 15, 15, 75);
            ctx.fillStyle = "#000";
            ctx.fillRect(x + 15, y + 45, 15, 15);
            //Eye
            ctx.fillRect(x + 45, y, 15, 105);
            ctx.fillRect(x + 75, y + 30, 15, 45);
            ctx.fillRect(x + 105, y + 30, 15, 45);
            ctx.fillStyle = "#fff";
            ctx.fillRect(x + 15, y + 45, 5, 5);
            //Eye
            ctx.fillRect(x + 25, y + 55, 5, 5);
            //Eye
        }
    }
}

var c, z, power = 0, l = 1000000, p = null, time = 10000000, w, f, l2 = 1000000, q, hf = null, hw = null, r = Math.round(Math.random * 10) / 10, n1 = true, n2 = true, g, por = new Audio("portal.mp3"), pow = new Audio("powerup.mp3"), m, SL = 1000000, sactintra = new Audio("sactintra.mp3");
if (volume) {
    m = new Audio("car.mp3");
} else {
    m = new Audio("car2.mp3");
}
var lose, eat = new Audio("eat.mp3");
function crash() {
    if (car.x < s.x + 140 && car.x + car.width > s.x && car.y < s.y + 110 && car.y + car.height > s.y && tru && SL >= 0) {
        f = 0;
        w = 0;
        i = 0;
        lose = true;
        eat.play();
        localStorage.removeItem("fixedVariable");
        codeNum++;
        localStorage.setItem("code", codeNum.toString());
        if (codeNum > (code.length - 1)) {
            codeNum = 0;
            localStorage.setItem("code", codeNum.toString());
        }
        drawLives();
    } else if (car2.x < s.x + 140 && car2.x + car2.width > s.x && car2.y < s.y + 110 && car2.y + car2.height > s.y && tru && SL >= 0) {
        f = 0;
        w = 0;
        i = 0;
        lose = true;
        eat.play();
        drawLives();
        localStorage.removeItem("fixedVariable");
        var codeTest = 0;
        if (codeTest == 0){
            codeNum++;
            localStorage.setItem("code", codeNum.toString());
            codeTest++;
        }
        if (codeNum > (code.length - 1)) {
            localStorage.setItem("code", "0");
            codeNum = parseInt(localStorage.getItem("code"), 10);
        }
    }
    if (SL == 0) {
        SL = -10000000000000000000000000000000000000000000000000;
    }
    if (keys.Escape && esc) {
        canvas.width = 800;
        canvas.height = 400;
        car2.x = 700;
        car.x = 50;
        car.y = 200;
        car2.y = 200;
        s.x = 500;
        s.y = 100;
        esc = false;
        drawLives();
        s.xSpeed /= (13 / 8);
        s.ySpeed /= 1.5;
    }
}
function changeParagraphColor(color) {
    var paragraphs = document.getElementsByTagName('p');
    for (var i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.color = color; // Change color to green for all paragraphs
    }
}

var changeColor = false;

function Easy() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLives();
    crash();
    if (!changeColor) {
        changeParagraphColor("white");
        changeColor = true;
    }
    if (f != -1) {
        f = l / 2000;
        if (power != 2 && c == 2 && z == 1 || c == 1 && z == 1 && power != 2) {
            ctx.fillStyle = 'orange';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            q = true;
            drawFire();
        } else if (power != 2 && c == 2 && z == 2 || c == 1 && z == 2 && power != 2) {
            ctx.fillStyle = 'turquoise';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            drawFish();
        }
        drawLives();
        // Update car position
        if ((keys.d || keys.D) && car.x < canvas.width - car.width) {
            car.x += car.speed;
            m.play();

        }
        if ((keys.a || keys.A) && car.x > 0) {
            car.x -= car.speed;
            m.play();

        }
        if ((keys.s || keys.S) && car.y < canvas.height - car.height) {
            car.y += car.speed;
            m.play();

        }
        if ((keys.w || keys.W) && car.y > 0) {
            car.y -= car.speed;
            m.play();

        }
        // Update car position
        if ((keys.l || keys.L) && car2.x < canvas.width - car2.width && tru) {
            car2.x += car2.speed;
            m.play();

        }
        if ((keys.j || keys.J) && car2.x > 0 && tru) {
            car2.x -= car2.speed;
            m.play();

        }
        if ((keys.k || keys.K) && car2.y < canvas.height - car2.height && tru) {
            car2.y += car2.speed;
            m.play();

        }
        if ((keys.i || keys.I) && car2.y > 0 && tru) {
            car2.y -= car2.speed;
            m.play();

        }
        if (tru && SL > 0) {
            updateGameArea();
            drawSL();
            if (sactintra != 1) {
                sactintra.play();
                sactintra = 1;
            }
        }
        // Update portal positions
        portals.forEach((portal)=>{
            portal.y += portal.speed;
            if (portal.y > canvas.height) {
                // Reset portal to the top if it goes below the canvas
                portal.y = 0;
            }
        }
        );
        powers();
        // Check for collisions with portals
        portals.forEach((portal)=>{
            if (car.x < portal.x + 30 && car.x + car2.width > portal.x && car.y < portal.y + 30 && car.y + car.height > portal.y) {
                if (portal.type === 'baby') {
                    c = 0;
                    n1 = true;
                    n2 = true;
                    SL -= 1500;
                    time -= 10000;
                    z = 0;
                    power = 0;
                    q = false;
                    por.play();
                    car.color2 = null;
                    switch (car.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        break;
                    default:
                        car.color = 'red';
                        break;
                    }
                } else if (portal.type === 'ocean' && power != 2) {
                    c = 2;
                    z = 2;
                    n1 = true;
                    n2 = false;
                    por.play();
                    car.color = 'blue';
                    if (g >= 1 && g <= 10) {
                        l += 10000;
                        g++;
                        time -= 10000;
                        SL -= 1500;
                    } else {
                        l -= 10000;
                        time += 10000;
                        SL += 10000;
                    }
                    q = true;
                    car.speed = 5;
                    // You can implement logic to change the game environment here
                } else if (portal.type === 'invisible' && power != 1) {
                    c = 1;
                    n1 = true;
                    por.play();
                    n2 = true;
                    l -= 10000;
                    SL += 10000;
                } else if (portal.type === 'dead') {
                    c = 0;
                    n1 = true;
                    n2 = true;
                    SL -= 1500;
                    por.play();
                    time -= 10000;
                    power = 0;
                    car.color2 = null;
                    q = false;
                    switch (car.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        break;
                    default:
                        car.color = 'red';
                        break;
                    }
                } else if (portal.type === 'fire' && power != 2) {
                    c = 2;
                    z = 1;
                    n1 = false;
                    por.play();
                    n2 = true;
                    g = 1;
                    drawFire();
                    car.color = 'darkorange';
                    l -= 10000;
                    q = true;
                    car.speed = 5;
                    time += 10000;
                    SL += 10000;
                    // You can implement logic to change the game environment here
                }
            }
        }
        );
        portals.forEach((portal)=>{
            if (car2.x < portal.x + 30 && car2.x + car2.width > portal.x && car2.y < portal.y + 30 && car2.y + car2.height > portal.y && tru) {
                if (portal.type === 'baby') {
                    c = 0;
                    n1 = true;
                    n2 = true;
                    SL -= 1500;
                    time -= 10000;
                    z = 0;
                    power = 0;
                    q = false;
                    por.play();
                    car2.color2 = null;
                    switch (car2.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        break;
                    default:
                        car2.color = 'blue';
                        break;
                    }
                } else if (portal.type === 'ocean' && power != 2) {
                    c = 2;
                    z = 2;
                    n1 = true;
                    n2 = false;
                    por.play();
                    car2.color = 'blue';
                    SL += 10000;
                    if (g >= 1 && g <= 10) {
                        l += 10000;
                        g++;
                        time -= 10000;
                    } else {
                        l -= 10000;
                        time += 10000;
                    }
                    q = true;
                    car2.speed = 5;
                    // You can implement logic to change the game environment here
                } else if (portal.type === 'invisible' && power != 1) {
                    c = 1;
                    n1 = true;
                    por.play();
                    n2 = true;
                    l -= 10000;
                    SL += 10000;
                } else if (portal.type === 'dead') {
                    c = 0;
                    n1 = true;
                    SL -= 1500;
                    n2 = true;
                    por.play();
                    time -= 10000;
                    power = 0;
                    car2.color2 = null;
                    q = false;
                    switch (car2.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        break;
                    default:
                        car2.color = 'blue';
                        break;
                    }
                } else if (portal.type === 'fire' && power != 2) {
                    c = 2;
                    z = 1;
                    n1 = false;
                    por.play();
                    n2 = true;
                    g = 1;
                    SL += 10000;
                    drawFire();
                    car2.color = 'darkorange';
                    l -= 10000;
                    q = true;
                    car2.speed = 5;
                    time += 10000;
                    // You can implement logic to change the game environment here
                }
            }
        }
        );
        powerups.forEach((powerup)=>{
            if (car.x < powerup.x + 15 && car.x + car.width > powerup.x && car.y < powerup.y + 15 && car.y + car.height > powerup.y) {
                if (powerup.type === 'vision saftey') {
                    power = 1;
                    time -= 10000;
                    pow.play();
                    SL -= 1500;
                    switch (car.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        car.color2 = 'green';
                        break;
                    default:
                        car.color = 'green';
                        break;
                    }
                } else if (powerup.type === 'world safety') {
                    power = 2;
                    time -= 10000;
                    SL -= 1500;
                    pow.play();
                    switch (car.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        car.color2 = 'black';
                        break;
                    default:
                        car.color = 'black';
                        break;
                    }
                } else if (powerup.type === 'speed up' && (!q || power == 2)) {
                    car.speed = 7;
                    car.color = 'pink';
                    pow.play();
                    time -= 10000;
                    SL -= 1500;
                    switch (car.color) {
                    case 'black':
                        car.color2 = 'black';
                        break;
                    case 'green':
                        car.color2 = 'green';
                        break;
                    default:
                        car.color2 = '';
                        break;
                    }
                } else if (powerup.type === 'slow down' && (!q || power == 2)) {
                    car.speed = 3;
                    pow.play();
                    SL -= 1500;
                    car.color = 'darkred';
                    time -= 10000;
                    switch (car.color) {
                    case 'black':
                        car.color2 = 'black';
                        break;
                    case 'green':
                        car.color2 = 'green';
                        break;
                    default:
                        car.color2 = '';
                        break;
                    }
                } else if (powerup.type === 'normal speed' && (!q || power == 2)) {
                    car.speed = 5;
                    pow.play();
                    SL -= 1500;
                    car.color = 'turquoise';
                    time -= 10000;
                    switch (car.color) {
                    case 'black':
                        car.color2 = 'black';
                        break;
                    case 'green':
                        car.color2 = 'green';
                        break;
                    default:
                        car.color2 = '';
                        break;
                    }
                }
            }
        }
        );
        powerups.forEach((powerup)=>{
            if (car2.x < powerup.x + 15 && car2.x + car2.width > powerup.x && car2.y < powerup.y + 15 && car2.y + car2.height > powerup.y && tru) {
                if (powerup.type === 'vision saftey') {
                    power = 1;
                    time -= 10000;
                    pow.play();
                    SL -= 1500;
                    switch (car2.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        car2.color2 = 'green';
                        break;
                    default:
                        car2.color = 'green';
                        break;
                    }
                } else if (powerup.type === 'world safety') {
                    power = 2;
                    time -= 10000;
                    pow.play();
                    SL -= 1500;
                    switch (car2.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        car2.color2 = 'black';
                        break;
                    default:
                        car2.color = 'black';
                        break;
                    }
                } else if (powerup.type === 'speed up' && (!q || power == 2)) {
                    car2.speed = 7;
                    car2.color = 'pink';
                    pow.play();
                    SL -= 1500;
                    time -= 10000;
                    switch (car2.color) {
                    case 'black':
                        car2.color2 = 'black';
                        break;
                    case 'green':
                        car2.color2 = 'green';
                        break;
                    default:
                        car2.color2 = '';
                        break;
                    }
                } else if (powerup.type === 'slow down' && (!q || power == 2)) {
                    car2.speed = 3;
                    pow.play();
                    SL -= 1500;
                    car2.color = 'darkred';
                    time -= 10000;
                    switch (car2.color) {
                    case 'black':
                        car2.color2 = 'black';
                        break;
                    case 'green':
                        car2.color2 = 'green';
                        break;
                    default:
                        car2.color2 = '';
                        break;
                    }
                } else if (powerup.type === 'normal speed' && (!q || power == 2)) {
                    car2.speed = 5;
                    pow.play();
                    SL -= 1500;
                    car2.color = 'turquoise';
                    time -= 10000;
                    switch (car2.color) {
                    case 'black':
                        car2.color2 = 'black';
                        break;
                    case 'green':
                        car2.color2 = 'green';
                        break;
                    default:
                        car2.color2 = '';
                        break;
                    }
                }
            }
        }
        );
        // Draw game objects
        drawPortals();
        drawPowerups();
        if (c != 1 || power == 1) {
            drawCar();
            if (tru) {
                drawCar2();
            }
        }
        requestAnimationFrame(Easy);
    }
}

function Medium() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLives();
    crash();
    if (!changeColor) {
        changeParagraphColor("white");
        changeColor = true;
    }
    if (f != -1 && w != -1) {
        f = l / 2000;
        w = l2 / 2000;
        if (power != 2 && c == 2 && z == 1 || c == 1 && z == 1 && power != 2) {
            ctx.fillStyle = 'orange';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            q = true;
            drawFire();
        } else if (power != 2 && c == 2 && z == 2 || c == 1 && z == 2 && power != 2) {
            ctx.fillStyle = 'turquoise';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            drawFish();
        }
        drawLives();
        //    crash();
        // Update car position
        if ((keys.d || keys.D) && car.x < canvas.width - car.width) {
            car.x += car.speed;
            m.play();

        }
        if ((keys.a || keys.A) && car.x > 0) {
            car.x -= car.speed;
            m.play();

        }
        if ((keys.s || keys.S) && car.y < canvas.height - car.height) {
            car.y += car.speed;
            m.play();

        }
        if ((keys.w || keys.W) && car.y > 0) {
            car.y -= car.speed;
            m.play();

        }
        // Update car position
        if ((keys.l || keys.L) && car2.x < canvas.width - car2.width && tru) {
            car2.x += car2.speed;
            m.play();

        }
        if ((keys.j || keys.J) && car2.x > 0 && tru) {
            car2.x -= car2.speed;
            m.play();

        }
        if ((keys.k || keys.K) && car2.y < canvas.height - car2.height && tru) {
            car2.y += car2.speed;
            m.play();

        }
        if ((keys.i || keys.I) && car2.y > 0 && tru) {
            car2.y -= car2.speed;
            m.play();

        }
        if (tru && SL > 0) {
            updateGameArea();
            drawSL();
            if (sactintra != 1) {
                sactintra.play();
                sactintra = 1;
            }
        }
        // Update portal positions
        portals.forEach((portal)=>{
            portal.y += portal.speed;
            if (portal.y > canvas.height) {
                // Reset portal to the top if it goes below the canvas
                portal.y = 0;
            }
        }
        );
        powers();
        // Check for collisions with portals
        portals.forEach((portal)=>{
            if (car.x < portal.x + 30 && car.x + car.width > portal.x && car.y < portal.y + 30 && car.y + car.height > portal.y) {
                if (portal.type === 'baby') {
                    c = 0;
                    n1 = true;
                    n2 = true;
                    SL -= 1500;
                    time -= 10000;
                    z = 0;
                    por.play();
                    power = 0;
                    q = false;
                    car.color2 = null;
                    switch (car.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        break;
                    default:
                        car.color = 'red';
                        break;
                    }
                } else if (portal.type === 'ocean' && power != 2) {
                    c = 2;
                    z = 2;
                    n1 = true;
                    por.play();
                    n2 = false;
                    car.color = 'blue';
                    q = true;
                    car.speed = 5;
                    l2 -= 10000;
                    SL += 10000;
                    time += 10000;
                    if (l2 < 0) {
                        f = -1
                        w = -1;
                    }
                    // You can implement logic to change the game environment here
                } else if (portal.type === 'invisible' && power != 1) {
                    c = 1;
                    n1 = true;
                    n2 = true;
                    por.play();
                    time += 10000;
                    l -= 10000;
                    SL += 10000;
                } else if (portal.type === 'dead') {
                    c = 0;
                    n1 = true;
                    n2 = true;
                    SL -= 1500;
                    por.play();
                    time -= 10000;
                    power = 0;
                    car.color2 = null;
                    q = false;
                    switch (car.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        break;
                    default:
                        car.color = 'red';
                        break;
                    }
                } else if (portal.type === 'fire' && power != 2) {
                    c = 2;
                    n1 = false;
                    n2 = true;
                    time += 10000;
                    por.play();
                    z = 1;
                    p = 1;
                    SL += 10000;
                    car.color = 'darkorange';
                    l -= 10000;
                    if (l < 0) {
                        f = -1;
                        w = -1;
                    }
                    q = true;
                    car.speed = 5;
                    // You can implement logic to change the game environment here
                }
            }
        }
        );
        // Check for collisions with portals
        portals.forEach((portal)=>{
            if (car2.x < portal.x + 30 && car2.x + car2.width > portal.x && car2.y < portal.y + 30 && car2.y + car2.height > portal.y && tru) {
                if (portal.type === 'baby') {
                    c = 0;
                    n1 = true;
                    n2 = true;
                    SL -= 1500;
                    time -= 10000;
                    z = 0;
                    por.play();
                    power = 0;
                    q = false;
                    car2.color2 = null;
                    switch (car2.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        break;
                    default:
                        car2.color = 'blue';
                        break;
                    }
                } else if (portal.type === 'ocean' && power != 2) {
                    c = 2;
                    z = 2;
                    n1 = true;
                    por.play();
                    n2 = false;
                    car2.color = 'blue';
                    q = true;
                    car2.speed = 5;
                    l2 -= 10000;
                    SL += 10000;
                    time += 10000;
                    if (l2 < 0) {
                        f = -1
                        w = -1;
                    }
                    // You can implement logic to change the game environment here
                } else if (portal.type === 'invisible' && power != 1) {
                    c = 1;
                    n1 = true;
                    n2 = true;
                    por.play();
                    time += 10000;
                    l -= 10000;
                    SL += 10000;
                } else if (portal.type === 'dead') {
                    c = 0;
                    n1 = true;
                    n2 = true;
                    SL -= 1500;
                    por.play();
                    time -= 10000;
                    power = 0;
                    car2.color2 = null;
                    q = false;
                    switch (car2.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        break;
                    default:
                        car2.color = 'blue';
                        break;
                    }
                } else if (portal.type === 'fire' && power != 2) {
                    c = 2;
                    n1 = false;
                    n2 = true;
                    time += 10000;
                    por.play();
                    SL += 10000;
                    z = 1;
                    p = 1;
                    car2.color = 'darkorange';
                    l -= 10000;
                    if (l < 0) {
                        f = -1;
                        w = -1;
                    }
                    q = true;
                    car2.speed = 5;
                    // You can implement logic to change the game environment here
                }
            }
        }
        );
        powerups.forEach((powerup)=>{
            if (car.x < powerup.x + 15 && car.x + car.width > powerup.x && car.y < powerup.y + 15 && car.y + car.height > powerup.y) {
                if (powerup.type === 'vision saftey') {
                    power = 1;
                    pow.play();
                    SL -= 1500;
                    time -= 10000;
                    switch (car.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        car.color2 = 'green';
                        break;
                    default:
                        car.color = 'green';
                        break;
                    }
                } else if (powerup.type === 'world safety') {
                    power = 2;
                    pow.play();
                    SL -= 1500;
                    time -= 10000;
                    switch (car.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        car.color2 = 'black';
                        break;
                    default:
                        car.color = 'black';
                        break;
                    }
                } else if (powerup.type === 'speed up' && (!q || power == 2)) {
                    car.speed = 7;
                    pow.play();
                    SL -= 1500;
                    car.color = 'pink';
                    time -= 10000;
                    switch (car.color) {
                    case 'black':
                        car.color2 = 'black';
                        break;
                    case 'green':
                        car.color2 = 'green';
                        break;
                    default:
                        car.color2 = '';
                        break;
                    }
                } else if (powerup.type === 'slow down' && (!q || power == 2)) {
                    car.speed = 3;
                    pow.play();
                    car.color = 'darkred';
                    SL -= 1500;
                    time -= 10000;
                    switch (car.color) {
                    case 'black':
                        car.color2 = 'black';
                        break;
                    case 'green':
                        car.color2 = 'green';
                        break;
                    default:
                        car.color2 = '';
                        break;
                    }
                } else if (powerup.type === 'normal speed' && (!q || power == 2)) {
                    car.speed = 5;
                    car.color = 'turquoise';
                    pow.play();
                    SL -= 1500;
                    time -= 10000;
                    switch (car.color) {
                    case 'black':
                        car.color2 = 'black';
                        break;
                    case 'green':
                        car.color2 = 'green';
                        break;
                    default:
                        car.color2 = '';
                        break;
                    }
                }
            }
        }
        );
        powerups.forEach((powerup)=>{
            if (car2.x < powerup.x + 15 && car2.x + car2.width > powerup.x && car2.y < powerup.y + 15 && car2.y + car2.height > powerup.y && tru) {
                if (powerup.type === 'vision saftey') {
                    power = 1;
                    pow.play();
                    time -= 10000;
                    SL -= 1500;
                    switch (car2.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        car2.color2 = 'green';
                        break;
                    default:
                        car2.color = 'green';
                        break;
                    }
                } else if (powerup.type === 'world safety') {
                    power = 2;
                    pow.play();
                    time -= 10000;
                    SL -= 1500;
                    switch (car2.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        car2.color2 = 'black';
                        break;
                    default:
                        car2.color = 'black';
                        break;
                    }
                } else if (powerup.type === 'speed up' && (!q || power == 2)) {
                    car2.speed = 7;
                    pow.play();
                    car2.color = 'pink';
                    SL -= 1500;
                    time -= 10000;
                    switch (car2.color) {
                    case 'black':
                        car2.color2 = 'black';
                        break;
                    case 'green':
                        car2.color2 = 'green';
                        break;
                    default:
                        car2.color2 = '';
                        break;
                    }
                } else if (powerup.type === 'slow down' && (!q || power == 2)) {
                    car2.speed = 3;
                    pow.play();
                    car2.color = 'darkred';
                    SL -= 1500;
                    time -= 10000;
                    switch (car2.color) {
                    case 'black':
                        car2.color2 = 'black';
                        break;
                    case 'green':
                        car2.color2 = 'green';
                        break;
                    default:
                        car2.color2 = '';
                        break;
                    }
                } else if (powerup.type === 'normal speed' && (!q || power == 2)) {
                    car2.speed = 5;
                    car2.color = 'turquoise';
                    pow.play();
                    SL -= 1500;
                    time -= 10000;
                    switch (car2.color) {
                    case 'black':
                        car2.color2 = 'black';
                        break;
                    case 'green':
                        car2.color2 = 'green';
                        break;
                    default:
                        car2.color2 = '';
                        break;
                    }
                }
            }
        }
        );
        // Draw game objects
        drawPortals();
        drawPowerups();
        if (c != 1 || power == 1) {
            drawCar();
            if (tru) {
                drawCar2();
            }
        }
        requestAnimationFrame(Medium);
    }
}

function Hard() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLives();
    crash();
    if (!changeColor) {
        changeParagraphColor("black");
        changeColor = true;
    }
    if (f != -1 && w != -1) {
        f = l / 2000;
        w = l2 / 2000;
        if (power != 2 && c == 2 && z == 1 || c == 1 && z == 1 && power != 2) {
            ctx.fillStyle = 'orange';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            q = true;
            drawFire();
        } else if (power != 2 && c == 2 && z == 2 || c == 1 && z == 2 && power != 2) {
            ctx.fillStyle = 'turquoise';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            drawFish();
        }
        drawLives();
        //        crash();
        // Update car position
        if ((keys.d || keys.D) && car.x < canvas.width - car.width) {
            car.x += car.speed;
            m.play();
        }
        if ((keys.a || keys.A) && car.x > 0) {
            car.x -= car.speed;
            m.play();

        }
        if ((keys.s || keys.S) && car.y < canvas.height - car.height) {
            car.y += car.speed;
            m.play();

        }
        if ((keys.w || keys.W) && car.y > 0) {
            car.y -= car.speed;
            m.play();

        }
        // Update car position
        if ((keys.l || keys.L) && car2.x < canvas.width - car2.width && tru) {
            car2.x += car2.speed;
            m.play();

        }
        if ((keys.j || keys.J) && car2.x > 0 && tru) {
            car2.x -= car2.speed;
            m.play();

        }
        if ((keys.k || keys.K) && car2.y < canvas.height - car2.height && tru) {
            car2.y += car2.speed;
            m.play();

        }
        if ((keys.i || keys.I) && car2.y > 0 && tru) {
            car2.y -= car2.speed;
            m.play();

        }
        if (tru && SL > 0) {
            updateGameArea();
            drawSL();
            if (sactintra != 1) {
                sactintra.play();
                sactintra = 1;
            }
        }
        // Update portal positions
        portals.forEach((portal)=>{
            portal.y += portal.speed;
            if (portal.y > canvas.height) {
                // Reset portal to the top if it goes below the canvas
                portal.y = 0;
            }
        }
        );
        powers();
        // Check for collisions with portals
        portals.forEach((portal)=>{
            if (car.x < portal.x + 30 && car.x + car.width > portal.x && car.y < portal.y + 30 && car.y + car.height > portal.y) {
                if (portal.type === 'baby') {
                    c = 0;
                    n1 = true;
                    n2 = true;
                    por.play();
                    time -= 10000;
                    z = 0;
                    SL -= 1500;
                    power = 0;
                    q = false;
                    car.color2 = null;
                    hf = null;
                    hw = null;
                    switch (car.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        break;
                    default:
                        car.color = 'red';
                        break;
                    }
                } else if (portal.type === 'ocean' && power != 2) {
                    c = 2;
                    z = 2;
                    n1 = true;
                    n2 = false;
                    por.play();
                    SL += 10000;
                    time += 10000;
                    car.color = 'blue';
                    q = true;
                    car.speed = 5;
                    hw = true;
                    hf = false;
                    if (l2 < 0) {
                        f = -1
                        w = -1;
                    }
                    // You can implement logic to change the game environment here
                } else if (portal.type === 'invisible' && power != 1) {
                    c = 1;
                    n1 = true;
                    n2 = true;
                    time += 10000;
                    por.play();
                    l -= 10000;
                    SL += 10000;
                } else if (portal.type === 'dead') {
                    c = 0;
                    n1 = true;
                    n2 = true;
                    power = 0;
                    por.play();
                    SL -= 1500;
                    time -= 10000;
                    car.color2 = null;
                    q = false;
                    hf = null;
                    hw = null;
                    switch (car.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        break;
                    default:
                        car.color = 'red';
                        break;
                    }
                } else if (portal.type === 'fire' && power != 2) {
                    c = 2;
                    n1 = false;
                    n2 = true;
                    time += 10000;
                    SL += 10000;
                    por.play();
                    z = 1;
                    p = 1;
                    car.color = 'darkorange';
                    hf = true;
                    hw = false;
                    if (l < 0) {
                        f = -1;
                        w = -1;
                    }
                    q = true;
                    car.speed = 5;
                    // You can implement logic to change the game environment here
                }
            }
        }
        );
        // Check for collisions with portals
        portals.forEach((portal)=>{
            if (car2.x < portal.x + 30 && car2.x + car2.width > portal.x && car2.y < portal.y + 30 && car2.y + car2.height > portal.y && tru) {
                if (portal.type === 'baby') {
                    c = 0;
                    n1 = true;
                    n2 = true;
                    SL -= 1500;
                    por.play();
                    time -= 10000;
                    z = 0;
                    power = 0;
                    q = false;
                    car2.color2 = null;
                    hf = null;
                    hw = null;
                    switch (car2.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        break;
                    default:
                        car2.color = 'blue';
                        break;
                    }
                } else if (portal.type === 'ocean' && power != 2) {
                    c = 2;
                    z = 2;
                    n1 = true;
                    n2 = false;
                    por.play();
                    time += 10000;
                    car2.color = 'blue';
                    q = true;
                    car2.speed = 5;
                    hw = true;
                    hf = false;
                    if (l2 < 0) {
                        f = -1
                        w = -1;
                    }
                    // You can implement logic to change the game environment here
                } else if (portal.type === 'invisible' && power != 1) {
                    c = 1;
                    n1 = true;
                    n2 = true;
                    time += 10000;
                    por.play();
                    l -= 10000;
                } else if (portal.type === 'dead') {
                    c = 0;
                    n1 = true;
                    n2 = true;
                    SL -= 1500;
                    power = 0;
                    por.play();
                    time -= 10000;
                    car2.color2 = null;
                    q = false;
                    hf = null;
                    hw = null;
                    switch (car2.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        break;
                    default:
                        car2.color = 'blue';
                        break;
                    }
                } else if (portal.type === 'fire' && power != 2) {
                    c = 2;
                    n1 = false;
                    n2 = true;
                    time += 10000;
                    por.play();
                    z = 1;
                    p = 1;
                    car2.color = 'darkorange';
                    hf = true;
                    hw = false;
                    if (l < 0) {
                        f = -1;
                        w = -1;
                    }
                    q = true;
                    car2.speed = 5;
                    // You can implement logic to change the game environment here
                }
            }
        }
        );
        powerups.forEach((powerup)=>{
            if (car.x < powerup.x + 15 && car.x + car.width > powerup.x && car.y < powerup.y + 15 && car.y + car.height > powerup.y) {
                if (powerup.type === 'vision saftey') {
                    power = 1;
                    pow.play();
                    SL -= 1500;
                    time -= 10000;
                    switch (car.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        car.color2 = 'green';
                        break;
                    default:
                        car.color = 'green';
                        break;
                    }
                } else if (powerup.type === 'world safety') {
                    power = 2;
                    time -= 10000;
                    pow.play();
                    SL -= 1500;
                    switch (car.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        car.color2 = 'black';
                        break;
                    default:
                        car.color = 'black';
                        break;
                    }
                } else if (powerup.type === 'speed up' && (!q || power == 2)) {
                    car.speed = 7;
                    car.color = 'pink';
                    time -= 10000;
                    pow.play();
                    SL -= 1500;
                    switch (car.color) {
                    case 'black':
                        car.color2 = 'black';
                        break;
                    case 'green':
                        car.color2 = 'green';
                        break;
                    default:
                        car.color2 = '';
                        break;
                    }
                } else if (powerup.type === 'slow down' && (!q || power == 2)) {
                    car.speed = 3;
                    pow.play();
                    SL -= 1500;
                    car.color = 'darkred';
                    time -= 10000;
                    switch (car.color) {
                    case 'black':
                        car.color2 = 'black';
                        break;
                    case 'green':
                        car.color2 = 'green';
                        break;
                    default:
                        car.color2 = '';
                        break;
                    }
                } else if (powerup.type === 'normal speed' && (!q || power == 2)) {
                    car.speed = 5;
                    SL -= 1500;
                    car.color = 'turquoise';
                    time -= 10000;
                    pow.play();
                    switch (car.color) {
                    case 'black':
                        car.color2 = 'black';
                        break;
                    case 'green':
                        car.color2 = 'green';
                        break;
                    default:
                        car.color2 = '';
                        break;
                    }
                }
            }
        }
        );
        powerups.forEach((powerup)=>{
            if (car2.x < powerup.x + 15 && car2.x + car2.width > powerup.x && car2.y < powerup.y + 15 && car2.y + car2.height > powerup.y && tru) {
                if (powerup.type === 'vision saftey') {
                    power = 1;
                    pow.play();
                    time -= 10000;
                    SL -= 1500;
                    switch (car2.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        car2.color2 = 'green';
                        break;
                    default:
                        car2.color = 'green';
                        break;
                    }
                } else if (powerup.type === 'world safety') {
                    power = 2;
                    time -= 10000;
                    pow.play();
                    SL -= 1500;
                    switch (car2.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        car2.color2 = 'black';
                        break;
                    default:
                        car2.color = 'black';
                        break;
                    }
                } else if (powerup.type === 'speed up' && (!q || power == 2)) {
                    car2.speed = 7;
                    car2.color = 'pink';
                    SL -= 1500;
                    time -= 10000;
                    pow.play();
                    switch (car2.color) {
                    case 'black':
                        car2.color2 = 'black';
                        break;
                    case 'green':
                        car2.color2 = 'green';
                        break;
                    default:
                        car2.color2 = '';
                        break;
                    }
                } else if (powerup.type === 'slow down' && (!q || power == 2)) {
                    car2.speed = 3;
                    pow.play();
                    car2.color = 'darkred';
                    time -= 10000;
                    SL -= 1500;
                    switch (car2.color) {
                    case 'black':
                        car2.color2 = 'black';
                        break;
                    case 'green':
                        car2.color2 = 'green';
                        break;
                    default:
                        car2.color2 = '';
                        break;
                    }
                } else if (powerup.type === 'normal speed' && (!q || power == 2)) {
                    car2.speed = 5;
                    car2.color = 'turquoise';
                    time -= 10000;
                    SL -= 1500;
                    pow.play();
                    switch (car2.color) {
                    case 'black':
                        car2.color2 = 'black';
                        break;
                    case 'green':
                        car2.color2 = 'green';
                        break;
                    default:
                        car2.color2 = '';
                        break;
                    }
                }
            }
        }
        );
        // Draw game objects
        drawPortals();
        drawPowerups();
        if (c != 1 || power == 1) {
            drawCar();
            if (tru) {
                drawCar2();
            }
        }
        requestAnimationFrame(Hard);
        if (hw) {
            l2 -= 1500;
        } else if (hf) {
            l -= 1500;
        }
    }
}

var li = 1000000, i, ii = null;
function Insane() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawLives();
    crash();
    if (!changeColor) {
        changeParagraphColor("#000");
        changeColor = true;
    }
    if (f != -1 && w != -1) {
        f = l / 2000;
        w = l2 / 2000;
        i = li / 2631.578947368421;
        if (power != 2 && c == 2 && z == 1 || c == 1 && z == 1 && power != 2) {
            ctx.fillStyle = 'orange';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            q = true;
            drawFire();
        } else if (power != 2 && c == 2 && z == 2 || c == 1 && z == 2 && power != 2) {
            ctx.fillStyle = 'turquoise';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            drawFish();
        }
        drawLives();
        //crash();
        if (tru && SL > 0) {
            updateGameArea();
            drawSL();
            if (sactintra != 1) {
                sactintra.play();
                sactintra = 1;
            }
        }
        // Update car position
        if ((keys.d || keys.D) && car.x < canvas.width - car.width) {
            car.x += car.speed;
            m.play();

        }
        if ((keys.a || keys.A) && car.x > 0) {
            car.x -= car.speed;
            m.play();

        }
        if ((keys.s || keys.S) && car.y < canvas.height - car.height) {
            car.y += car.speed;
            m.play();

        }
        if ((keys.w || keys.W) && car.y > 0) {
            car.y -= car.speed;
            m.play();

        }
        // Update car position
        if ((keys.l || keys.L) && car2.x < canvas.width - car2.width && tru) {
            car2.x += car2.speed;
            m.play();

        }
        if ((keys.j || keys.J) && car2.x > 0 && tru) {
            car2.x -= car2.speed;
            m.play();

        }
        if ((keys.k || keys.K) && car2.y < canvas.height - car2.height && tru) {
            car2.y += car2.speed;
            m.play();

        }
        if ((keys.i || keys.I) && car2.y > 0 && tru) {
            car2.y -= car2.speed;
            m.play();

        }
        // Update portal positions
        portals.forEach((portal)=>{
            portal.y += portal.speed;
            if (portal.y > canvas.height) {
                // Reset portal to the top if it goes below the canvas
                portal.y = 0;
            }
        }
        );
        powers();
        // Check for collisions with portals
        portals.forEach((portal)=>{
            if (car.x < portal.x + 30 && car.x + car.width > portal.x && car.y < portal.y + 30 && car.y + car.height > portal.y) {
                if (portal.type === 'baby') {
                    c = 0;
                    n1 = true;
                    n2 = true;
                    por.play();
                    time -= 10000;
                    z = 0;
                    power = 0;
                    q = false;
                    car.color2 = null;
                    hf = null;
                    hw = null;
                    ii = null;
                    if (tru) {
                        SL -= 1500;
                    }
                    por.play();
                    switch (car.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        break;
                    default:
                        car.color = 'red';
                        break;
                    }
                } else if (portal.type === 'ocean' && power != 2) {
                    c = 2;
                    z = 2;
                    n1 = true;
                    n2 = false;
                    if (tru) {
                        SL += 10000;
                    }
                    por.play();
                    time += 10000;
                    car.color = 'blue';
                    q = true;
                    car.speed = 5;
                    hw = true;
                    hf = false;
                    ii = null;
                    if (l2 < 0) {
                        f = -1
                        w = -1;
                    }
                    // You can implement logic to change the game environment here
                } else if (portal.type === 'invisible' && power != 1) {
                    c = 1;
                    n1 = true;
                    n2 = true;
                    if (tru) {
                        SL += 10000;
                    }
                    por.play();
                    time += 10000;
                    ii = true;
                } else if (portal.type === 'dead') {
                    c = 0;
                    n1 = true;
                    n2 = true;
                    power = 0;
                    if (tru) {
                        SL -= 1500;
                    }
                    time -= 10000;
                    por.play();
                    car.color2 = null;
                    q = false;
                    hf = null;
                    hw = null;
                    ii = null;
                    switch (car.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        break;
                    default:
                        car.color = 'red';
                        break;
                    }
                } else if (portal.type === 'fire' && power != 2) {
                    c = 2;
                    n1 = false;
                    n2 = true;
                    if (tru) {
                        SL += 10000;
                    }
                    por.play();
                    time += 10000;
                    z = 1;
                    car.color = 'darkorange';
                    hf = true;
                    hw = false;
                    ii = null;
                    if (l < 0) {
                        f = -1;
                        w = -1;
                    }
                    q = true;
                    car.speed = 5;
                    // You can implement logic to change the game environment here
                }
            }
        }
        );
        // Check for collisions with portals
        portals.forEach((portal)=>{
            if (car2.x < portal.x + 30 && car2.x + car2.width > portal.x && car2.y < portal.y + 30 && car2.y + car2.height > portal.y && tru) {
                if (portal.type === 'baby') {
                    c = 0;
                    n1 = true;
                    n2 = true;
                    if (tru) {
                        SL -= 1500;
                    }
                    por.play();
                    time -= 10000;
                    z = 0;
                    power = 0;
                    q = false;
                    car2.color2 = null;
                    hf = null;
                    hw = null;
                    ii = null;
                    por.play();
                    switch (car2.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        break;
                    default:
                        car2.color = 'blue';
                        break;
                    }
                } else if (portal.type === 'ocean' && power != 2) {
                    c = 2;
                    z = 2;
                    n1 = true;
                    n2 = false;
                    if (tru) {
                        SL += 10000;
                    }
                    por.play();
                    time += 10000;
                    car2.color = 'blue';
                    q = true;
                    car2.speed = 5;
                    hw = true;
                    hf = false;
                    ii = null;
                    if (l2 < 0) {
                        f = -1
                        w = -1;
                    }
                    // You can implement logic to change the game environment here
                } else if (portal.type === 'invisible' && power != 1) {
                    c = 1;
                    n1 = true;
                    n2 = true;
                    if (tru) {
                        SL += 10000;
                    }
                    por.play();
                    time += 10000;
                    ii = true;
                } else if (portal.type === 'dead') {
                    c = 0;
                    n1 = true;
                    n2 = true;
                    if (tru) {
                        SL -= 1500;
                    }
                    power = 0;
                    time -= 10000;
                    por.play();
                    car2.color2 = null;
                    q = false;
                    hf = null;
                    hw = null;
                    ii = null;
                    switch (car2.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        break;
                    default:
                        car2.color = 'blue';
                        break;
                    }
                } else if (portal.type === 'fire' && power != 2) {
                    c = 2;
                    n1 = false;
                    n2 = true;
                    if (tru) {
                        SL += 10000;
                    }
                    por.play();
                    time += 10000;
                    z = 1;
                    car2.color = 'darkorange';
                    hf = true;
                    hw = false;
                    ii = null;
                    if (l < 0) {
                        f = -1;
                        w = -1;
                    }
                    q = true;
                    car2.speed = 5;
                    // You can implement logic to change the game environment here
                }
            }
        }
        );
        powerups.forEach((powerup)=>{
            if (car.x < powerup.x + 15 && car.x + car.width > powerup.x && car.y < powerup.y + 15 && car.y + car.height > powerup.y) {
                if (powerup.type === 'vision saftey') {
                    power = 1;
                    time -= 10000;
                    pow.play();
                    switch (car.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        car.color2 = 'green';
                        break;
                    default:
                        car.color = 'green';
                        break;
                    }
                    if (tru) {
                        SL -= 1500;
                    }
                } else if (powerup.type === 'world safety') {
                    power = 2;
                    time -= 10000;
                    pow.play();
                    switch (car.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        car.color2 = 'black';
                        break;
                    default:
                        car.color = 'black';
                        break;
                    }
                    if (tru) {
                        SL -= 1500;
                    }
                } else if (powerup.type === 'speed up' && (!q || power == 2)) {
                    car.speed = 7;
                    car.color = 'pink';
                    time -= 10000;
                    pow.play();
                    switch (car.color) {
                    case 'black':
                        car.color2 = 'black';
                        break;
                    case 'green':
                        car.color2 = 'green';
                        break;
                    default:
                        car.color2 = '';
                        break;
                    }
                    if (tru) {
                        SL -= 1500;
                    }
                } else if (powerup.type === 'slow down' && (!q || power == 2)) {
                    car.speed = 3;
                    car.color = 'darkred';
                    time -= 10000;
                    pow.play();
                    switch (car.color) {
                    case 'black':
                        car.color2 = 'black';
                        break;
                    case 'green':
                        car.color2 = 'green';
                        break;
                    default:
                        car.color2 = '';
                        break;
                    }
                    if (tru) {
                        SL -= 1500;
                    }
                } else if (powerup.type === 'normal speed' && (!q || power == 2)) {
                    car.speed = 5;
                    car.color = 'turquoise';
                    time -= 10000;
                    pow.play();
                    switch (car.color) {
                    case 'black':
                        car.color2 = 'black';
                        break;
                    case 'green':
                        car.color2 = 'green';
                        break;
                    default:
                        car.color2 = '';
                        break;
                    }
                    if (tru) {
                        SL -= 1500;
                    }
                }
            }
        }
        );
        powerups.forEach((powerup)=>{
            if (car2.x < powerup.x + 15 && car2.x + car2.width > powerup.x && car2.y < powerup.y + 15 && car2.y + car2.height > powerup.y && tru) {
                if (powerup.type === 'vision saftey') {
                    power = 1;
                    time -= 10000;
                    pow.play();
                    switch (car2.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        car2.color2 = 'green';
                        break;
                    default:
                        car2.color = 'green';
                        break;
                    }
                    if (tru) {
                        SL -= 1500;
                    }
                } else if (powerup.type === 'world safety') {
                    power = 2;
                    time -= 10000;
                    pow.play();
                    switch (car2.color) {
                    case 'turquoise':
                    case 'darkred':
                    case 'pink':
                        car2.color2 = 'black';
                        break;
                    default:
                        car2.color = 'black';
                        break;
                    }
                    if (tru) {
                        SL -= 1500;
                    }
                } else if (powerup.type === 'speed up' && (!q || power == 2)) {
                    car2.speed = 7;
                    car2.color = 'pink';
                    time -= 10000;
                    pow.play();
                    switch (car2.color) {
                    case 'black':
                        car2.color2 = 'black';
                        break;
                    case 'green':
                        car2.color2 = 'green';
                        break;
                    default:
                        car2.color2 = '';
                        break;
                    }
                    if (tru) {
                        SL -= 1500;
                    }
                } else if (powerup.type === 'slow down' && (!q || power == 2)) {
                    car2.speed = 3;
                    car2.color = 'darkred';
                    time -= 10000;
                    pow.play();
                    switch (car2.color) {
                    case 'black':
                        car2.color2 = 'black';
                        break;
                    case 'green':
                        car2.color2 = 'green';
                        break;
                    default:
                        car2.color2 = '';
                        break;
                    }
                    if (tru) {
                        SL -= 1500;
                    }
                } else if (powerup.type === 'normal speed' && (!q || power == 2)) {
                    car2.speed = 5;
                    car2.color = 'turquoise';
                    time -= 10000;
                    pow.play();
                    switch (car2.color) {
                    case 'black':
                        car2.color2 = 'black';
                        break;
                    case 'green':
                        car2.color2 = 'green';
                        break;
                    default:
                        car2.color2 = '';
                        break;
                    }
                    if (tru) {
                        SL -= 1500;
                    }
                }
            }
        }
        );
        // Draw game objects
        drawPortals();
        drawPowerups();
        if (c != 1 || power == 1) {
            drawCar();
            if (tru) {
                drawCar2();
            }
        }
        requestAnimationFrame(Insane);
        if (hw) {
            l2 -= 1500;
        } else if (hf) {
            l -= 1500;
        } else if (ii) {
            li -= 1500;
        }
    }
}



// Keyboard controls
const keys = {};

document.addEventListener('keydown', (e)=>{
    keys[e.key] = true;
});

document.addEventListener('keyup', (e)=>{
    keys[e.key] = false;
    m.pause();
});


//The Portal Game is ready to play!
