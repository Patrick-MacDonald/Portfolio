/* inspired by http://jamie-wong.com/2014/08/19/metaballs-and-marching-squares/ */

class Ball {
    constructor(x, y, rad, vector) {
        this.x = x;
        this.y = y;
        this.r = rad;
        this.vec = vector; /* [[x,y], speed] --> ex. [[0,1], 0.5] 
        TODO: Normalize initialized vectors*/
    }

    x_bounce() {
        if (this.x - this.r <= 0) {
            this.vec[0][0] = Math.abs(this.vec[0][0]);
        }
        else if (this.x + this.r >= 100) {
            this.vec[0][0] = -Math.abs(this.vec[0][0]);
        }
    }

    

    move() {
        this.x += this.vec[0][0]/(Math.abs(this.vec[0][0])+Math.abs(this.vec[0][1]))*this.vec[1];
        this.y += this.vec[0][1]/(Math.abs(this.vec[0][0])+Math.abs(this.vec[0][1]))*this.vec[1];
    }

    aspectAdjust() {
        this.xPx = this.x * window.innerWidth/100;
        this.yPx = this.y * (window.innerHeight - 30)/100;
        this.rPx = this.r * window.innerWidth/100;
    }

    y_bounce() {
        if (this.yPx - this.rPx <= 0) {
            this.vec[0][1] = Math.abs(this.vec[0][1]);
        }
        else if (this.yPx + this.rPx >= window.innerHeight) {
            this.vec[0][1] = -Math.abs(this.vec[0][1]);
        }
    }
};

function initializeRandomBalls(num) {
    let ballArr = [];
    for (let i=0; i < num; i++) {
        ballArr.push(new Ball(Math.random()*100, 100*Math.random(), 1+5*Math.random(), [[Math.random() - 0.5, window.innerWidth/window.innerHeight*Math.random() - 0.5], 0.2+0.2*Math.random()]));
    };
    return ballArr;
};



/* perform marching squares over area of canvas - 0-100% - given an array of balls */ 
function MarchingSquares(x_res, y_res, ballArr) {
    /*xArr = [];
    for (let i = 0; i <= x_res; i++) {
        xArr.push(i/x_res);
    }
    yArr = [];
    for (let i = 0; i <= y_res; i++) {
        yArr.push(i/y_res);
    }*/
    /*function for calculating each node*/
    function CalculateNode(ballArr, x, y) {
        let w = ballArr.reduce((prev, element) =>
            prev + element.rPx*element.rPx/(((x - element.xPx)**2) + ((y - element.yPx)**2))
            , 0);
        return w;
    }
    
    let nodeMatrix = new Array(y_res + 1).fill(0).map(() => new Array(x_res + 1).fill(0));
    for (let i = 0; i < y_res; i++) {
        for (let j = 0; j < x_res; j++) {

            nodeMatrix[i][j] = CalculateNode(ballArr, window.innerWidth*j/x_res, window.innerHeight*i/y_res);
        }
    }
    return nodeMatrix
    /*TODO: evaluate each square based on node results 
    return nodeMatrix;*/
}






/*function to perform marching squares to draw circles to canvas*/
function draw (A) {
    
    /*ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(width,height);
    ctx.stroke();*/
    let r = A.length;
    let c = A[0].length;
    let tl = 0, tr = 0, bl = 0, br = 0;
    let width = can.width;
    let height = can.height;
    ctx.strokeStyle = "#ffffff";
    for (let i = 0; i < r-1; i++) {
        for (let j = 0; j < c-1; j++) {
            tl = A[i][j];
            tr = A[i][j+1];
            bl = A[i+1][j];
            br = A[i+1][j+1];
            let x = 0, y =  0; y2 = 0; x2 = 0;
            switch(true) {
                case (tl >=1 && tr >= 1 && bl >= 1 && br >= 1):
                    /*TODO: add fill in canvas*/
                    
                    break;
                case tl < 1 && tr >= 1 && bl >= 1 && br >= 1:
                    /*TODO: add fill in canvas*/
                    /* 0111 = 7 */
                    x = j + Math.abs(tl - 1)/((Math.abs(tl - 1) + Math.abs(tr - 1)));
                    y = i + Math.abs(tl - 1)/((Math.abs(tl - 1) + Math.abs(bl - 1)))
                    ctx.beginPath();
                    ctx.moveTo(Math.round(width*x/c), Math.round(height*i/r));
                    ctx.lineTo(Math.round(width*(j)/c), Math.round(height*y/r))
                    ctx.stroke();
                    break;
                case tl < 1 && tr < 1 && bl >= 1 && br >= 1:
                    /*TODO: add fill in canvas*/
                    /* 0011 = 3 */
                    y = i + Math.abs(tl - 1)/((Math.abs(tl - 1) + Math.abs(bl - 1)))
                    y2 = i + Math.abs(tr - 1)/((Math.abs(tr - 1) + Math.abs(br - 1)))
                    ctx.beginPath();
                    ctx.moveTo(Math.round(width*j/c), Math.round(height*y/r));
                    ctx.lineTo(Math.round(width*(j+1)/c), Math.round(height*y2/r))
                    ctx.stroke();
                    break;
                case tl < 1 && tr < 1 && bl < 1 && br >= 1:
                    /*TODO: add fill in canvas*/
                    /* 0010 - 2 */
                    y = i + Math.abs(tr - 1)/((Math.abs(tr - 1) + Math.abs(br - 1)));
                    x2 = j + Math.abs(bl - 1)/((Math.abs(bl - 1) + Math.abs(br - 1)));
                    ctx.beginPath();
                    ctx.moveTo(Math.round(width*(j+1)/c), Math.round(height*y/r));
                    ctx.lineTo(Math.round(width*x2/c), Math.round(height*(i+1)/r));
                    ctx.stroke()
                    break;
                case tl >=1 && tr < 1 && bl >= 1 && br >= 1:
                    /*TODO: add fill in canvas*/
                    /* 1011 = 11 */
                    x = j + Math.abs(tl - 1)/((Math.abs(tl - 1) + Math.abs(tr - 1)));
                    y2 = i + Math.abs(tr - 1)/((Math.abs(tr - 1) + Math.abs(br - 1)));
                    ctx.beginPath();
                    ctx.moveTo(Math.round(width*(x)/c), Math.round(height*i/r));
                    ctx.lineTo(Math.round(width*(j+1)/c), Math.round(height*(y2)/r));
                    ctx.stroke()                   
                    break;
                case tl >=1 && tr < 1 && bl < 1 && br >= 1:
                    /*TODO: add fill in canvas*/
                    /* 1010 = 10 */
                    x = j + Math.abs(tl - 1)/((Math.abs(tl - 1) + Math.abs(tr - 1)));
                    x2 = j + Math.abs(bl - 1)/((Math.abs(bl - 1) + Math.abs(br - 1)));
                    y = i + Math.abs(tl - 1)/((Math.abs(tl - 1) + Math.abs(bl - 1)))
                    y2 = i + Math.abs(tr - 1)/((Math.abs(tr - 1) + Math.abs(br - 1)));
                    ctx.beginPath();
                    ctx.moveTo(Math.round(width*(x)/c), Math.round(height*i/r));
                    ctx.lineTo(Math.round(width*(j+1)/c), Math.round(height*(y2)/r));
                    ctx.stroke(); 
                    ctx.beginPath();
                    ctx.moveTo(Math.round(width*(j)/c), Math.round(height*y/r));
                    ctx.lineTo(Math.round(width*(x2)/c), Math.round(height*(i+1)/r));
                    ctx.stroke();
                    break;
                case tl >=1 && tr < 1 && bl < 1 && br < 1:
                    /*TODO: add fill in canvas*/
                    /* 1000 = 8 */
                    x = j + Math.abs(tl - 1)/((Math.abs(tl - 1) + Math.abs(tr - 1)))
                    y = i + Math.abs(tl - 1)/((Math.abs(tl - 1) + Math.abs(bl - 1)))
                    ctx.beginPath();
                    ctx.moveTo(Math.round(width*j/c), Math.round(height*y/r));
                    ctx.lineTo(Math.round(width*x/c), Math.round(height*i/r));
                    ctx.stroke();
                    break;
                case tl >=1 && tr >= 1 && bl < 1 && br >= 1:
                    /*TODO: add fill in canvas*/
                    /* 1110 = 14 */
                    y = i + Math.abs(tl - 1)/((Math.abs(tl - 1) + Math.abs(bl - 1)))
                    x2 = j + Math.abs(bl - 1)/((Math.abs(bl - 1) + Math.abs(br - 1)));
                    ctx.beginPath();
                    ctx.moveTo(Math.round(width*j/c), Math.round(height*y/r));
                    ctx.lineTo(Math.round(width*x2/c), Math.round(height*(i+1)/r));
                    ctx.stroke();
                    break;
                case tl >=1 && tr >= 1 && bl < 1 && br < 1:
                    /*TODO: add fill in canvas*/
                    /* 1100 = 12 */
                    y = i + Math.abs(tl - 1)/((Math.abs(tl - 1) + Math.abs(bl - 1)))
                    y2 = i + Math.abs(tr - 1)/((Math.abs(tr - 1) + Math.abs(br - 1)))
                    ctx.beginPath();
                    ctx.moveTo(Math.round(width*j/c), Math.round(height*y/r));
                    ctx.lineTo(Math.round(width*(j+1)/c), Math.round(height*y2/r))
                    ctx.stroke();
                    break;
                case tl >=1 && tr >= 1 && bl >= 1 && br < 1:
                    /*TODO: add fill in canvas*/
                    /* 1101 = 13 */
                    y = i + Math.abs(tr - 1)/((Math.abs(tr - 1) + Math.abs(br - 1)));
                    x2 = j + Math.abs(bl - 1)/((Math.abs(bl - 1) + Math.abs(br - 1)));
                    ctx.beginPath();
                    ctx.moveTo(Math.round(width*(j+1)/c), Math.round(height*y/r));
                    ctx.lineTo(Math.round(width*x2/c), Math.round(height*(i+1)/r));
                    ctx.stroke()
                    break;
                case tl < 1 && tr >= 1 && bl < 1 && br >= 1:
                    /*TODO: add fill in canvas*/
                    /* 0110 = 6 */
                    x = j + Math.abs(tl - 1)/((Math.abs(tl - 1) + Math.abs(tr - 1)))
                    x2 = j + Math.abs(bl - 1)/((Math.abs(bl - 1) + Math.abs(br - 1)));
                    ctx.beginPath();
                    ctx.moveTo(Math.round(width*x/c), Math.round(height*i/r));
                    ctx.lineTo(Math.round(width*x2/c), Math.round(height*(i+1)/r));
                    ctx.stroke();
                    break;
                case tl < 1 && tr >= 1 && bl >= 1 && br < 1:
                    /*TODO: add fill in canvas*/
                    /* 0101 = 5*/
                    x = j + Math.abs(tl - 1)/((Math.abs(tl - 1) + Math.abs(tr - 1)));
                    x2 = j + Math.abs(bl - 1)/((Math.abs(bl - 1) + Math.abs(br - 1)));
                    y = i + Math.abs(tl - 1)/((Math.abs(tl - 1) + Math.abs(bl - 1)))
                    y2 = i + Math.abs(tr - 1)/((Math.abs(tr - 1) + Math.abs(br - 1)));
                    ctx.beginPath();
                    ctx.moveTo(Math.round(width*(x)/c), Math.round(height*i/r));
                    ctx.lineTo(Math.round(width*(j)/c), Math.round(height*(y)/r));
                    ctx.stroke(); 
                    ctx.beginPath();
                    ctx.moveTo(Math.round(width*(j+1)/c), Math.round(height*y2/r));
                    ctx.lineTo(Math.round(width*(x2)/c), Math.round(height*(i+1)/r));
                    ctx.stroke();
                    break;
                case tl >=1 && tr < 1 && bl >= 1 && br < 1:
                    /*TODO: add fill in canvas*/
                    /* 1001 = 9 */
                    x = j + Math.abs(tl - 1)/((Math.abs(tl - 1) + Math.abs(tr - 1)))
                    x2 = j + Math.abs(bl - 1)/((Math.abs(bl - 1) + Math.abs(br - 1)));
                    ctx.beginPath();
                    ctx.moveTo(Math.round(width*x/c), Math.round(height*i/r));
                    ctx.lineTo(Math.round(width*x2/c), Math.round(height*(i+1)/r));
                    ctx.stroke();
                    break;
                case tl < 1 && tr >= 1 && bl < 1 && br < 1:
                    /*TODO: add fill in canvas*/
                    /* 0100 = 4 */
                    x = j + Math.abs(tl - 1)/((Math.abs(tl - 1) + Math.abs(tr - 1)));
                    y2 = i + Math.abs(tr - 1)/((Math.abs(tr - 1) + Math.abs(br - 1)))
                    ctx.beginPath();
                    ctx.moveTo(Math.round(width*x/c), Math.round(height*i/r));
                    ctx.lineTo(Math.round(width*(j+1)/c), Math.round(height*y2/r))
                    ctx.stroke();
                    break;
                case tl < 1 && tr < 1 && bl >= 1 && br < 1:
                    /*TODO: add fill in canvas*/
                    /* 0001 = 1 */
                    y = i + Math.abs(tl - 1)/((Math.abs(tl - 1) + Math.abs(bl - 1)))
                    x2 = j + Math.abs(bl - 1)/((Math.abs(bl - 1) + Math.abs(br - 1)));
                    ctx.beginPath();
                    ctx.moveTo(Math.round(width*j/c), Math.round(height*y/r));
                    ctx.lineTo(Math.round(width*x2/c), Math.round(height*(i+1)/r));
                    ctx.stroke();
                    break;
            }
        }
    }

}


function run() {
    
    requestAnimationFrame(run)
    can.width = window.innerWidth;
    can.height = window.innerHeight - 30;
    ctx.strokeStyle = "#ffffff"
    ctx.clearRect(0,0,can.width,can.height);
    //draw(A, width, height, ctx);
    for (let i = 0; i < ballArr.length; i++) {
        ballArr[i].x_bounce();
        ballArr[i].y_bounce();
        ballArr[i].move();
        ballArr[i].aspectAdjust();
    }
    x_res = 160;
    y_res = Math.round(x_res * (window.innerHeight - 30)/window.innerWidth)
    var A = MarchingSquares(x_res,y_res,ballArr);
    draw(A, can.width, can.height, ctx);
    
} 

var can = document.getElementById("metaballs"); 
var ctx = can.getContext('2d');
ctx.strokeStyle = "#ffffff";
/*window.onresize = function() {
    width = window.innerWidth;
    height = window.innerHeight - 160;
    can.width = width;
    can.height = height;
    ctx = can.getContext('2d');
}*/
/*window.addEventListener('resize', ()=>{
    width = window.innerWidth;
    height = window.innerHeight - 160;
    can.width = width;
    can.height = height;
    ctx = can.getContext('2d');
    run(ballArr)
})*/
var ballArr = initializeRandomBalls(15);
run(ballArr);


