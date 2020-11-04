var app = new Vue({
    el: "#app",
    data: {
        games: [],
        names:[],
        scores:[],
        total:[],
        won:[],
        lost:[],
        tied:[],
    },

     filters: {
          formatDate: function (value) {
            if (!value) return ''
            return moment(value).format('DD/MM/YYYY, h:mm:ss A');
          }
     },

     methods:{
          getNames: function(){
          var myArr = [];

               for(var i = 0; i < app.games.length; i++){
                     for(var j = 0; j < app.games[i].gamePlayers.length; j++){
                         myArr.push(app.games[i].gamePlayers[j].player.email);
                     }
               }
               const newArr = myArr.reduce((newTempArr, el) => (newTempArr.includes(el) ? newTempArr : [...newTempArr, el]), [])
                app.names = newArr;
               return newArr;
          },

          getTotal: function(){
          var totalArr = [];

              for(var i = 0; i < app.names.length; i++){
                totalArr.push(0);
                 for(var j = 0; j < app.games.length; j++){

                    for(var q = 0; q < app.games[j].gamePlayers.length; q++){

                        if(app.names[i] == app.games[j].gamePlayers[q].player.email){
                            totalArr[i] +=  (app.games[j].gamePlayers[q].score || 0 )
                        }
                    }

                 }

              }
              app.total = totalArr;
              return totalArr;
          },

          getWon: function(){
          var wonArr = [];

            for(var i = 0; i <app.names.length; i++){
            wonArr.push(0);

               for(var j = 0; j < app.games.length; j++){

                  for(var q = 0; q < app.games[j].gamePlayers.length; q++){

                      if(app.names[i] == app.games[j].gamePlayers[q].player.email){
                          if(app.games[j].gamePlayers[q].score == 1 ){
                            wonArr[i] ++;
                          }
                      }

                  }

               }

            }
            app.won = wonArr;
            return wonArr;

          },

          getLost: function(){
          var lostArr = [];

              for(var i = 0; i < app.names.length; i++){
                lostArr.push(0);
                 for(var j = 0; j < app.games.length; j++){
                    for(var q = 0; q < app.games[j].gamePlayers.length; q++){
                        if(app.names[i] == app.games[j].gamePlayers[q].player.email){
                            if(app.games[j].gamePlayers[q].score == 0 ){
                              lostArr[i] ++;
                            }
                        }

                    }

                 }

              }
             app.lost = lostArr;
             return lostArr;
          },

          getTied: function(){
          var tiedArr = [];

               for(var i = 0; i < app.names.length; i++){
                 tiedArr.push(0);
                  for(var j = 0; j < app.games.length; j++){
                     for(var q = 0; q < app.games[j].gamePlayers.length; q++){
                         if(app.names[i] == app.games[j].gamePlayers[q].player.email){
                             if(app.games[j].gamePlayers[q].score == 0.5 ){
                               tiedArr[i] ++;
                             }
                         }

                     }

                  }

               }
               app.tied = tiedArr;
               return  tiedArr;
          },

          getLeaderboard: function(){

                for(var i = 0; i < app.names.length; i++ ){

                    var playerScore = {
                            names: app.getNames()[i],
                            total: app.getTotal()[i],
                            won:   app.getWon()[i],
                            lost:  app.getLost()[i],
                            tied:  app.getTied()[i],
                    }
                    app.scores.push(playerScore);
                }
          }

     }
});

var api = '/api/games';

fetch(api, {
        method: 'GET',
        headers: {
        }
    }).then(function (response) {
    console.log(response)
        if (response.ok) {
            return response.json();
        }
        else{
            throw new Error(response.status)
        }
    })
    .then(function (data) {
        app.games = data;
        app.getNames();
        app.getTotal();
        app.getWon();
        app.getLost();
        app.getTied();
        app.getLeaderboard();



    })
    .catch(function (error) {
        console.log('Looks like there was a problem: \n', error);
    });
