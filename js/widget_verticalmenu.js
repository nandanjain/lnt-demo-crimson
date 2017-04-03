/**
 * Created by nanjain on 3/31/17.
 */
CRIMSON.VerticalMenu = function (parent) {
    var VERTICAL_MOVE = 70;
    var TOTAL_SIZE = 4;
    var CURRENT_INDEX = 2;
    var baseTop = parseInt(getComputedStyle(parent, null).top);
    var items = parent.getElementsByClassName("vertical_menu_item");

    this.setData = function (data) {

    };
    this.moveUp = function () {
        if (CURRENT_INDEX == TOTAL_SIZE) {
            return;
        }
        CRIMSON.removeClass(items[CURRENT_INDEX], "selected");
        CURRENT_INDEX++;
        this.updatePosition();
    };
    this.moveDown = function () {
        if (CURRENT_INDEX == 0) {
            return;
        }
        CRIMSON.removeClass(items[CURRENT_INDEX], "selected");
        CURRENT_INDEX--;
        this.updatePosition();
    };
    this.updatePosition = function () {
        CRIMSON.removeClass(items[CURRENT_INDEX], "selected");
        parent.style.top = (baseTop - CURRENT_INDEX * VERTICAL_MOVE) + "px";
        CRIMSON.addClass(items[CURRENT_INDEX], "selected");
    };

    this.updatePosition();

};
