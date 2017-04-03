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
    var homeParent = document.getElementById("home");
    var homeVerticalMenuParent = homeParent.getElementsByClassName("vertical_menu")[0];
    var homeVerticalMenu = new CRIMSON.VerticalMenu(homeVerticalMenuParent);

    var homeHorizontalMenuParent = homeParent.getElementsByClassName("horizontal_menu")[0];
    var homeHorizontalMenu = new CRIMSON.HorizontalMenu(homeHorizontalMenuParent);
    homeHorizontalMenu.setData(horizontalData[0]);

    document.onkeydown = function (event) {
        event.preventDefault();

        switch (event.keyCode) {
            case CRIMSON.KEYS.LEFT:
                // Left
                homeHorizontalMenu.moveLeft();
                break;
            case CRIMSON.KEYS.UP:
                // UP
                homeVerticalMenu.moveDown();
//                homeHorizontalMenu.moveDown();
                break;
            case CRIMSON.KEYS.RIGHT:
                // Right
                homeHorizontalMenu.moveRight();
                break;
            case CRIMSON.KEYS.DOWN:
                // Down
                homeVerticalMenu.moveUp();
//                homeHorizontalMenu.moveUp();
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