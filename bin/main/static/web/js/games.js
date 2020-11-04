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

    })
    .catch(function (error) {
        console.log('Looks like there was a problem: \n', error);
    });

var app = new Vue({
    el: "#app",
    data: {
        games: [],
    },
     filters: {
          formatDate: function (value) {
            if (!value) return ''
            return moment(value).format('DD/MM/YYYY, h:mm:ss A');
          }
     }
});

