/**
 * Created by nanjain on 3/31/17.
 */
CRIMSON.HorizontalMenu = function (parent) {
    var POSTER_WIDTH = 195;
    var POSTER_HEIGHT = 112;

    var CURRENT_INDEX = 0;
    var TOTAL_SIZE = 0;
    var BLOCK_KEY = false;

    var computedStyle = getComputedStyle(parent, null);
    var baseLeft = parseInt(computedStyle.left);
    var baseTop = parseInt(computedStyle.top);

    var that = this;
    parent.addEventListener("webkitTransitionEnd", webkitEvent, false);

    function webkitEvent(event) {
        event.preventDefault();
        event.stopPropagation();
        switch (event.type) {
            case 'webkitTransitionEnd':
                switch (event.propertyName) {
                    case "top":
                        that.hide();
                        break;
                    case "left":
                        BLOCK_KEY = false;
                        break;
                }
                break;
        }
    }

    this.setData = function (data) {
        for (var i = 0; i < data.length; i++) {
            var posterData = data[i];
            var posterContainer = new PosterCard(posterData).getContainerEle();
            posterContainer.style.left = i * POSTER_WIDTH;
            parent.appendChild(posterContainer);
            TOTAL_SIZE++;
        }
        parent.style.width = (TOTAL_SIZE + 2) * POSTER_WIDTH + "px";
    };

    this.moveLeft = function () {
        if (CURRENT_INDEX == 0 || BLOCK_KEY) {
            return false;
        }
        CURRENT_INDEX--;
        BLOCK_KEY = true;
        parent.style.left = (baseLeft - CURRENT_INDEX * POSTER_WIDTH) + "px";
    };

    this.moveRight = function () {
        if (CURRENT_INDEX == TOTAL_SIZE || BLOCK_KEY) {
            return false;
        }
        BLOCK_KEY = true;
        CURRENT_INDEX++;
        parent.style.left = (baseLeft - CURRENT_INDEX * POSTER_WIDTH) + "px";
    };

    this.moveUp = function () {
        parent.style.opacity = 0;
        parent.style.top = baseTop + POSTER_HEIGHT + "px";
    };

    this.moveDown = function () {
        parent.style.opacity = 0;
        parent.style.top = baseTop - POSTER_HEIGHT + "px";
    };

    this.show = function () {
        parent.style.opacity = 1;
    };

    this.hide = function () {
        this.resetPosition();
    };

    this.resetPosition = function () {
        CURRENT_INDEX = 0;
        parent.style.top = null;
        parent.style.left = null;
        parent.style.opacity = null;
    };

    this.isKeyBlocked = function () {
        return BLOCK_KEY;
    };

    function PosterCard(data) {
        var basePoster = document.createElement("div");
        basePoster.className = "poster-card";
        var title = document.createElement("div");
        title.className = "poster-title";
        // TODO:
        title.innerText = data.title;

        var logo = document.createElement("img");
        logo.className = "poster-logo";
        // TODO:
        logo.src = data.url;

        basePoster.appendChild(title);
        basePoster.appendChild(logo);

        this.setTitle = function (title) {
            title.innerText = title;
        };
        this.setPosterImg = function (url) {
            logo.src = url;
        };
        this.getContainerEle = function () {
            return basePoster;
        }
    }
};