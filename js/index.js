/**
 * Created by nanjain on 3/31/17.
 */
CRIMSON.KEYS = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    EXIT: 27,
    OK: 13
};

CRIMSON.initialize = function () {
    var CURRENT_ITEM = 2;

    var homeParent = document.getElementById("home");
    var homeVerticalMenuParent = homeParent.getElementsByClassName("vertical_menu")[0];
    var homeVerticalMenu = new CRIMSON.VerticalMenu(homeVerticalMenuParent);

    var horizontalMenuArray = [];
    var homeHorizontalMenuParent = homeParent.getElementsByClassName("horizontal_menu")[0];
    var homeHorizontalMenuItemParent = homeHorizontalMenuParent.getElementsByClassName("horizontal_menu_item");
    for (var i = 0; i < 5; i++) {
        var homeHorizontalMenu = new CRIMSON.HorizontalMenu(homeHorizontalMenuItemParent[i]);
        homeHorizontalMenu.setData(horizontalData[i]);
        horizontalMenuArray.push(homeHorizontalMenu);
    }

    horizontalMenuArray[CURRENT_ITEM].show();

    document.onkeydown = function (event) {
        event.preventDefault();

        switch (event.keyCode) {
            case CRIMSON.KEYS.LEFT:
                // Left
                horizontalMenuArray[CURRENT_ITEM].moveLeft();
                break;
            case CRIMSON.KEYS.UP:
                // UP
                if (CURRENT_ITEM == 0) {
                    return;
                }
                horizontalMenuArray[CURRENT_ITEM].moveUp();
//                horizontalMenuArray[CURRENT_ITEM].hide();
                CURRENT_ITEM--;
                homeVerticalMenu.moveDown();
                horizontalMenuArray[CURRENT_ITEM].show();
                break;
            case CRIMSON.KEYS.RIGHT:
                // Right
                horizontalMenuArray[CURRENT_ITEM].moveRight();
                break;
            case CRIMSON.KEYS.DOWN:
                // Down
                if (CURRENT_ITEM == horizontalMenuArray.length - 1) {
                    return;
                }
                horizontalMenuArray[CURRENT_ITEM].moveDown();
//                horizontalMenuArray[CURRENT_ITEM].hide();
                CURRENT_ITEM++;
                homeVerticalMenu.moveUp();
//                horizontalMenuArray[CURRENT_ITEM].moveDown();
                horizontalMenuArray[CURRENT_ITEM].show();
                break;
        }
    }
};

CRIMSON.hasClass = function (ele, className) {
    var r = new RegExp('\\b' + className + '\\b');
    return r.test(ele.className);
};
CRIMSON.addClass = function (ele, className) {
    if (!CRIMSON.hasClass(ele, className)) {
        ele.className += ' ' + className;
    }
};
CRIMSON.removeClass = function (ele, className) {
    ele.className = ele.className.replace(' ' + className, '').replace(className, '');
};