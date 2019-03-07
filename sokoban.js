var first = document.getElementById('first');
var point = document.getElementById('point');
function map(){
    this.key = 1;
    this.mapDiv = first;
    this.mapH = parseInt(getComputedStyle(first).height);
    this.mapW = parseInt(getComputedStyle(first).width);
    this.peopleLength = 100;
    this.wellLength = 100;
    this.boxLength = 100;
    this.targetLength = 100;
    this.score = 0;
    choosePass(this.key);
}
function choosePass(code) {
    switch (code) {
        case 1:{
            this.wall = [[0,0,1,1,1,0,0,0],[1,1,1,0,1,1,1,1],[1,0,0,0,0,0,0,1],
                [1,0,0,0,0,1,0,1],[1,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1]];
            this.box = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
                [0,0,1,1,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
            this.target = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],[0,0,0,0,1,1,0,0],[0,0,0,0,0,0,0,0]];
            break;
        }
        case 2:{
            this.wall = [[0,0,1,1,1,0,0,0],[1,1,1,0,1,1,1,1],[1,0,0,0,0,0,0,1],
                [1,0,0,0,0,1,0,1],[1,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1]];
            this.box = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
                [0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
            this.target = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],[0,0,0,0,1,1,1,0],[0,0,0,0,0,0,0,0]];
            break;
        }
        case 3:{
            this.wall = [[0,0,1,1,1,0,0,0],[1,1,1,0,1,1,1,1],[1,0,0,0,0,0,0,1],
                [1,0,0,0,0,1,0,1],[1,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1]];
            this.box = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
                [0,0,1,1,0,0,1,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
            this.target = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0],[0,0,0,0,1,1,1,0],[0,0,0,0,0,0,0,0]];
            break;
        }
        default:break;
    }
}
function peoples() {
    var people = document.createElement('div');
    people.style.width = this.peopleLength + 'px';
    people.style.height = this.peopleLength + 'px';
    people.style.position = 'absolute';
    people.style.left = this.peopleLength * 3 + 'px';
    people.style.top = this.peopleLength  + 'px';
    this.mapDiv.appendChild(people).setAttribute('class','people');
}
function walls() {
    var lenY = this.wall.length; //6
    var lenX = this.wall[0].length;
    for (var i = 0; i < lenY; i ++) {
        for (var j = 0; j < lenX; j ++) {
            if (this.wall[i][j] === 1) {
                var wall = document.createElement('div');
                wall.style.width = this.wellLength + 'px';
                wall.style.height = this.wellLength + 'px';
                wall.style.position = 'absolute';
                wall.style.left = this.wellLength * j + 'px';
                wall.style.top = this.wellLength * i + 'px';
                this.mapDiv.appendChild(wall).setAttribute('class','wall');
            }
        }
    }
}
function boxes() {
    var lenY = this.box.length; //6
    var lenX = this.box[0].length;
    for (var i = 0; i < lenY; i ++) {
        for (var j = 0; j < lenX; j ++) {
            if (this.box[i][j] === 1) {
                var box = document.createElement('div');
                box.style.width = this.boxLength + 'px';
                box.style.height = this.boxLength + 'px';
                box.style.position = 'absolute';
                box.style.left = this.boxLength * j + 'px';
                box.style.top = this.boxLength * i + 'px';
                if (this.box[i][j] === this.target[i][j])
                    box.style.backgroundImage = 'url("images/finishedBox.jpg")';
                this.mapDiv.appendChild(box).setAttribute('class','box');
            }
        }
    }
}
function targets() {
    var lenY = this.target.length; //6
    var lenX = this.target[0].length;
    for (var i = 0; i < lenY; i ++) {
        for (var j = 0; j < lenX; j ++) {
            if (this.target[i][j] === 1) {
                var target = document.createElement('div');
                target.style.width = this.targetLength + 'px';
                target.style.height = this.targetLength + 'px';
                target.style.position = 'absolute';
                target.style.left = this.targetLength * j + 'px';
                target.style.top = this.targetLength * i + 'px';
                this.mapDiv.appendChild(target).setAttribute('class','target');
            }
        }
    }
}
function peopleMove() {
    var people = document.getElementsByClassName('people')[0];
    document.onkeydown = function (e) {
        var code = e.keyCode;
        direct(code, people);
        gamePass();
    };
}
function direct(code, aim) {
    var aimX = aim.offsetLeft / 100;
    var aimY = aim.offsetTop / 100 ;
    switch (code) {
        case 37:
            if (this.wall[aimY][aimX - 1] !== 1) { //判断是否撞墙
                if (this.wall[aimY][aimX - 2] && this.box[aimY][aimX - 1]) break; //判断箱子前方是否有墙
                if (this.box[aimY][aimX - 2] && this.box[aimY][aimX - 1]) break; //判断是否有个箱子
                if (this.box[aimY][aimX - 1]) { //判断箱子移动
                    if (!this.wall[aimY][aimX - 2]) {
                        this.box[aimY][aimX - 1] = 0;
                        this.box[aimY][aimX - 2] = 1;
                        removeClass('box');
                        boxes();
                    }
                }
                aim.style.left = aim.offsetLeft - this.peopleLength + 'px';
                addPoint();
            }
            break;
        case 38:
            if (this.wall[aimY - 1][aimX] !== 1) {
                if (this.wall[aimY - 2][aimX] && this.box[aimY - 1][aimX]) break;
                if (this.box[aimY - 2][aimX] && this.box[aimY - 1][aimX]) break;
                if (this.box[aimY - 1][aimX]) { //判断箱子移动
                    if (!this.wall[aimY - 2][aimX]){
                        this.box[aimY - 1][aimX] = 0;
                        this.box[aimY - 2][aimX] = 1;
                        removeClass('box');
                        boxes();
                    }
                }
                aim.style.top = aim.offsetTop - this.peopleLength + 'px';
                addPoint();
            }
            break;
        case 39:
            if (this.wall[aimY][aimX + 1] !== 1) {
                if (this.wall[aimY][aimX + 2] && this.box[aimY][aimX + 1]) break;
                if (this.box[aimY][aimX + 2] && this.box[aimY][aimX + 1]) break;
                if (this.box[aimY][aimX + 1] === 1) { //判断箱子移动
                    if (!this.wall[aimY][aimX + 2])
                    this.box[aimY][aimX + 1] = 0;
                    this.box[aimY][aimX + 2] = 1;
                    removeClass('box');
                    boxes();
                }
                aim.style.left = aim.offsetLeft + this.peopleLength + 'px';
                addPoint();
            }
            break;
        case 40:
            if (this.wall[aimY + 1][aimX] !== 1) {
                if (this.wall[aimY + 2][aimX] && this.box[aimY + 1][aimX]) break;
                if (this.box[aimY + 2][aimX] && this.box[aimY + 1][aimX]) break;
                if (this.box[aimY + 1][aimX] === 1) { //判断箱子移动
                    if (!this.wall[aimY + 2][aimX]) {
                        this.box[aimY + 1][aimX] = 0;
                        this.box[aimY + 2][aimX] = 1;
                        removeClass('box');
                        boxes();
                    }
                }
                aim.style.top = aim.offsetTop + this.peopleLength + 'px';
                addPoint();
            }
            break;
    }
}
function addPoint() {
    this.score += 1;
    point.innerText = this.score;
}
function reloadGame() {
    removeClass('people');
    removeClass('wall');
    removeClass('box');
    removeClass('target');
    this.mapDiv = first;
    this.mapH = parseInt(getComputedStyle(first).height);
    this.mapW = parseInt(getComputedStyle(first).width);
    this.peopleLength = 100;
    this.wellLength = 100;
    this.boxLength = 100;
    this.targetLength = 100;
    this.score = 0;
    choosePass(this.key);
    targets();
    peoples();
    walls();
    boxes();
    peopleMove();
}
function gamePass() {
    var nextPass = document.getElementById('nextPass');
    if(this.target.toString() === this.box.toString()) {
        setTimeout(function () {
            this.key += 1;
            if (this.key > 3) this.key = 1;
            reloadGame();
        },500);
    }
}
function removeClass(className) {
    var findOne = document.getElementsByClassName(className);
    while(findOne.length > 0) {
        findOne[0].parentNode.removeChild(findOne[0]);
    }
}
function init(){
    map();
    targets();
    peoples();
    walls();
    boxes();
    peopleMove();
}
window.onload = function () {
    init();
};