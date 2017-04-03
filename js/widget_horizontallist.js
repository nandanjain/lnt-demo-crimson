/**
 * Created by nanjain on 3/31/17.
 */
CRIMSON.HorizontalMenu = function (parent) {
    var POSTER_WIDTH = 100;
    var POSTER_HEIGHT = 100;

    var CURRENT_INDEX = 0;
    var TOTAL_SIZE = 0;

    this.setData = function (data) {
        for (var i = 0; i < data.length; i++) {
            var posterData = data[i];
            parent.appendChild(new PosterCard(posterData).getContainerEle());
            TOTAL_SIZE++;
        }
    };

    this.moveLeft = function () {
        if (CURRENT_INDEX == 0) return;
        CURRENT_INDEX--;
        parent.style.left = (CURRENT_INDEX * POSTER_WIDTH) + "px";
    };

    this.moveRight = function () {
        if (CURRENT_INDEX == TOTAL_SIZE) return;
        CURRENT_INDEX++;
        parent.style.left = (CURRENT_INDEX * POSTER_WIDTH) + "px";
    };

    this.moveUp = function () {
        parent.style.top -= POSTER_HEIGHT + "px";
    };

    this.moveDown = function () {
        parent.style.top += POSTER_HEIGHT + "px";
    };

    this.resetPosition = function () {
        parent.style.top = null;
        parent.style.left = null;
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

