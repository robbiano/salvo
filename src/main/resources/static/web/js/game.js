var app = new Vue({
    el: "#app",
    data: {
        cols: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        game_view: null,
        gp: null,
        viewer: null,
        vs: null,
    },
    methods: {
        drawShips: function () {
            for (var i = 0; i < app.game_view.ships.length; i++) {
                for (var j = 0; j < app.game_view.ships[i].shipLocation.length; j++) {
                    document.getElementById(app.game_view.ships[i].shipLocation[j]).classList.add("ship");
                }
            }
        },

        isHit: function (salvoLocation) {
            var hitFound = false;
            for (var y = 0; y < app.game_view.ships.length; y++) {
                for (var q = 0; q < app.game_view.ships[y].shipLocation.length; q++) {
                    if (salvoLocation == app.game_view.ships[y].shipLocation[q]) {
                        hitFound = true;
                    }
                }
            }
            return hitFound;
        },

        drawSalvoesVs: function () {
            for (var i = 0; i < app.game_view.salvoes.length; i++) {
                for (var t = 0; t < app.game_view.salvoes[i].salvoLocations.length; t++) {
                    if (app.game_view.salvoes[i].player != app.viewer.id) {
                        if (app.isHit(app.game_view.salvoes[i].salvoLocations[t])) {
                            document.getElementById(app.game_view.salvoes[i].salvoLocations[t]).classList.add('salvoDamage');
                        }
                        else {
                            document.getElementById(app.game_view.salvoes[i].salvoLocations[t]).classList.add('salvoWater');
                        }
                    }
                    else {
                        document.getElementById(app.game_view.salvoes[i].salvoLocations[t] + 's').classList.add('salvoWater');
                    }
                }
            }
        },






        gameInformation: function () {
            for (var i = 0; i < app.game_view.gamePlayers.length; i++) {
                if (app.gp == app.game_view.gamePlayers[i].id) {
                    app.viewer = app.game_view.gamePlayers[i].player;
                }
                else {
                    app.vs = app.game_view.gamePlayers[i].player;
                }
            }
        },
    }
});

var urlParams = new URLSearchParams(window.location.search);
var gp = urlParams.get("gp");

var api = '/api/game_view/' + gp;

fetch(api)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.status);
    })
    .then(function (json) {
        app.game_view = json;
        app.drawShips();
        app.gp = gp;
        app.gameInformation();
        app.drawSalvoesVs();
    })
    .catch(function (error) {
        console.log('Looks like there was a problem: \n', error);

    });

