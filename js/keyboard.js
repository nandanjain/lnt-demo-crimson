var KEYS = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  ok: 13
}

function addclass(element, classname){
  element.className += ' ' + className;
};

function removeclass(element, classname) {
  element.className = element.className.replace(' ' + className, '').replace(className, '');
};

function initialise() { 
  document.onkeydown = function  (event) {

        switch (event.keyCode) {
            case KEYS.left:
                // Left
                alert("left");
                moveLeft();
                break;
            case KEYS.up:
                moveUp();
                break;
            case KEYS.right:
                // Right
                alert("right")
                moveRight();
                break;
            case KEYS.down:
                // Down
                moveDown();
                break;
            case KEYS.ok:
                //alert("okay")
                select();
                break;
        }
  }
};

var cur = 0;
var max = 12;
var vertical = 2;
var hor = 2;
var list = document.getElementByClass("button");

function moveLeft(){
    
};

function moveRight(){
        
};

function moveUp(){

};

function moveDown(){

};

function select(){
        alert("okay");
        var text = $('#ajax');
        text.val(text.val() + 'a');    
    
};