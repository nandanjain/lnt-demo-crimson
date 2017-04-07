var KEYS = {
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  ok: 13
};

var char = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
"n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
"0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "spc", "clr"];

function addclass(element, classname){
  //alert("add");
  element.className = "button" + ' ' + classname;
};

function removeclass(element) {
  //alert("remove");
  element.className = "button";
};

function initialise() { 
  var container = document.getElementById("keyboard");
  for(var i = 0; i < char.length; i++) {
    if( i == 0 ) container.innerHTML += '<div id="' + char[i] + '"' + 'class="button selected">' + char[i] + '</div>';
    else container.innerHTML += '<div id="' + char[i] + '"' + 'class="button">' + char[i] + '</div>';
  }
  document.onkeydown = function  (event) {

        switch (event.keyCode) {
            case KEYS.left:
                // Left
                moveLeft();
                break;
            case KEYS.up:
                moveUp();
                break;
            case KEYS.right:
                // Right
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
var row = 0, rmax = 2;
var list = document.getElementsByClassName("button");

function moveLeft(){
    if(cur == 0 || cur == 13 || cur == 26) {
      return;
    }
    console.log(cur);
    removeclass(list[cur]);
    cur--;
    addclass(list[cur], "selected");
};

function moveRight(){
    if(cur == max || cur == 25 ||cur == 37){
      return;
    } 
    console.log(cur);
    removeclass(list[cur]);
    cur++;
    addclass(list[cur], "selected");   
};

function moveUp(){
    if(row == 0) {
      return;
    }
    row--;
    removeclass(list[cur]);
    cur = cur-max-1;
    console.log("cur ",cur);
    addclass(list[cur], "selected");

};

function moveDown(){
    if(row == rmax || cur == 25) {
      return;
    }
    row++;
    removeclass(list[cur]);
    cur = cur+max+1; 
    console.log("cur ",cur);
    addclass(list[cur], "selected");
};

function select(){
        //alert("okay");
        var text = $('#ajax');
        var prev = list[cur].id;
        console.log(prev);
        if(prev == 'spc') text.val(text.val() + ' ');
        else if(prev == 'clr') text.val(''); 
        else text.val(text.val() + prev);   
};