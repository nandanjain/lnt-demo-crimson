/**
 * Created by nanjain on 3/31/17.
 */
var CRIMSON = CRIMSON || {};

CRIMSON.KEYS = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    EXIT: 27,
    OK: 13
};

CRIMSON.fetchData = function () {
    CRIMSON.DataLayer.fetchVOD(function (vodData) {
        horizontalData[2] = CRIMSON.DATA.VOD_LIST;
        CRIMSON.DataLayer.fetchChannels(function (whatsOn) {
            horizontalData[1] = CRIMSON.DATA.WHATS_ON;
            CRIMSON.initialize();
        });
    });
};

CRIMSON.SCREENS = {
    HOME: {
        TYPE: "HOME",
        hMenu: {},
        vMenu: {}
    },
    CHANNELS: {
        TYPE: "CHANNELS",
        hMenu: {},
        vMenu: {}
    }
};

CRIMSON.initialize = function () {
    var CURRENT_V_ITEM = 0;
    var CURRENT_V_ITEM = 2;
    var CURRENT_SCREEN;

    var homeParent = document.getElementById("home");
    var homeVerticalMenuParent = homeParent.getElementsByClassName("vertical_menu")[0];
    var homeVerticalMenu = new CRIMSON.VerticalMenu(homeVerticalMenuParent);
    homeVerticalMenu.setData(homeVerticalData);

    var homeHorizontalMenuArray = [];
    var homeHorizontalMenuParent = homeParent.getElementsByClassName("horizontal_menu")[0];
    for (var i = 0; i < homeVerticalData.length; i++) {
        var homeHorizontalMenuItemParent = document.createElement("div");
        homeHorizontalMenuItemParent.className = "horizontal_menu_item item_" + i;
        homeHorizontalMenuParent.appendChild(homeHorizontalMenuItemParent);
        var homeHorizontalMenu = new CRIMSON.HorizontalMenu(homeHorizontalMenuItemParent);
        homeHorizontalMenu.setData(horizontalData[i]);
        homeHorizontalMenuArray.push(homeHorizontalMenu);
    }

    var channelsParent = document.getElementById("channels");
    var channelsVerticalMenuParent = channelsParent.getElementsByClassName("vertical_menu")[0];
    var channelsVerticalMenu = new CRIMSON.VerticalMenu(channelsVerticalMenuParent);
    channelsVerticalMenu.setData(CRIMSON.DATA.CHANNEL_LIST);

    var channelsHorizontalMenuArray = [];
    var channelsHorizontalMenuParent = channelsParent.getElementsByClassName("horizontal_menu")[0];
    for (var i = 0; i < CRIMSON.DATA.CHANNEL_LIST.length; i++) {
        var channel = CRIMSON.DATA.CHANNEL_LIST[i];
        var progamlist = CRIMSON.DATA.PROGRAM_LIST[channel.id];

        var channelsHorizontalMenuItemParent = document.createElement("div");
        channelsHorizontalMenuItemParent.className = "horizontal_menu_item item_" + i;
        channelsHorizontalMenuParent.appendChild(channelsHorizontalMenuItemParent);

        var channelsHorizontalMenu = new CRIMSON.HorizontalMenu(channelsHorizontalMenuItemParent);
        channelsHorizontalMenu.setData(progamlist);
        channelsHorizontalMenuArray.push(channelsHorizontalMenu);
    }

    CRIMSON.SCREENS.HOME.hMenu = homeHorizontalMenuArray;
    CRIMSON.SCREENS.HOME.vMenu = homeVerticalMenu;
    CRIMSON.SCREENS.CHANNELS.hMenu = channelsHorizontalMenuArray;
    CRIMSON.SCREENS.CHANNELS.vMenu = channelsVerticalMenu;

    CURRENT_SCREEN = CRIMSON.SCREENS.HOME.TYPE;
    CRIMSON.SCREENS[CURRENT_SCREEN].hMenu[CURRENT_V_ITEM].show();

    document.onkeydown = function (event) {
        event.preventDefault();

        switch (event.keyCode) {
            case CRIMSON.KEYS.LEFT:
                // Left
                CRIMSON.SCREENS[CURRENT_SCREEN].hMenu[CURRENT_V_ITEM].moveLeft();
                break;
            case CRIMSON.KEYS.UP:
                // UP
                if (CURRENT_V_ITEM == 0) {
                    CRIMSON.DataLayer.fetchSearch("a", function (data) {
                        for (var i = 0; i < data.length; i++) {
                            var dataa = data[i];
                            console.log("Search Results : " + dataa.title);
                        }
                    });
                    return;
                }
                CRIMSON.SCREENS[CURRENT_SCREEN].hMenu[CURRENT_V_ITEM].moveUp();
                CURRENT_V_ITEM--;
                CRIMSON.SCREENS[CURRENT_SCREEN].vMenu.moveDown();
                CRIMSON.SCREENS[CURRENT_SCREEN].hMenu[CURRENT_V_ITEM].show();
                break;
            case CRIMSON.KEYS.RIGHT:
                // Right
                CRIMSON.SCREENS[CURRENT_SCREEN].hMenu[CURRENT_V_ITEM].moveRight();
                break;
            case CRIMSON.KEYS.DOWN:
                // Down
                if (CURRENT_V_ITEM == CRIMSON.SCREENS[CURRENT_SCREEN].hMenu.length - 1) {
                    return;
                }
                CRIMSON.SCREENS[CURRENT_SCREEN].hMenu[CURRENT_V_ITEM].moveDown();
                CURRENT_V_ITEM++;
                CRIMSON.SCREENS[CURRENT_SCREEN].vMenu.moveUp();
                CRIMSON.SCREENS[CURRENT_SCREEN].hMenu[CURRENT_V_ITEM].show();
                break;
            case CRIMSON.KEYS.EXIT:
                if (CURRENT_SCREEN == CRIMSON.SCREENS.CHANNELS.TYPE) {
                    CURRENT_SCREEN = CRIMSON.SCREENS.HOME.TYPE;
                    CRIMSON.addClass(channelsParent, "displayNone");
                    CRIMSON.removeClass(homeParent, "displayNone");
                } else {
                    CRIMSON.addClass(homeParent, "displayNone");
                }
                break;
            case CRIMSON.KEYS.OK:
                var itemId = CRIMSON.SCREENS[CURRENT_SCREEN].hMenu[CURRENT_V_ITEM].select();
                switch (CURRENT_SCREEN) {
                    case CRIMSON.SCREENS.HOME.TYPE:
                        if (CURRENT_V_ITEM == 0) {

                        } else if (CURRENT_V_ITEM == 1) {
                            // Switch View to All channels
                            CURRENT_V_ITEM = 2;
                            CURRENT_SCREEN = CRIMSON.SCREENS.CHANNELS.TYPE;
                            // Add Animation
                            CRIMSON.addClass(homeParent, "displayNone");
                            CRIMSON.removeClass(channelsParent, "displayNone");
                        } else if (CURRENT_V_ITEM == 2) {
                            CRIMSON.DataLayer.fetchVODItemPlaybackURL(itemId, function (jsonObj) {
                                document.getElementById("title").innerText = jsonObj._links.playUrl.href;
                                document.getElementsByTagName("video")[0].src = jsonObj._links.playUrl.href;
                                // Initiate Playback
                            });
                        } else if (CURRENT_V_ITEM == 3) {

                        } else if (CURRENT_V_ITEM == 4) {

                        }
                        break;
                    case CRIMSON.SCREENS.CHANNELS.TYPE:
                        // Open Long Info Screen.
                        break;
                }
                break;
        }
    };
    document.getElementsByTagName("video")[0].play();
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