/**
 * Created by nanjain on 3/31/17.
 */
CRIMSON.initialize = function () {
    var homeParent = document.getElementById("home");
//    var homeVerticalMenuParent = homeParent.getElementsByClassName("vertical_menu")[0];
    var homeVerticalMenuParent = document.getElementById("home_verticalMenu");
    var homeVerticalMenu = new CRIMSON.VerticalMenu(homeVerticalMenuParent);

    document.onkeydown = function (event) {
        event.preventDefault();

        switch (event.keyCode) {
            case 37:
                // Left
                break;
            case 38:
                // UP
                homeVerticalMenu.moveDown();
                break;
            case 39:
                // Right
                break;
            case 40:
                // Down
                homeVerticalMenu.moveUp();
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