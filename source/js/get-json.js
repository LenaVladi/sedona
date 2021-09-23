var getJson = function() {
    var timeout = setTimeout(function () {
        new Error('ERROR test message:')
    }, 3000);

    return fetch('https://jsonplaceholder.typicode.com/posts/1/comment')
        .then(function (response) { return response.json() })
        .then(function (json) { console.log(json) })
        .catch(function (err) { new Error('ERROR (catch):' + err) }) ;
}

getJson();

var timeout = setTimeout(function () {
    errorFunc();
}, 2000);

function errorFunc() {
    new Error('ERROR message:' + err);
    clearTimeout(timeout);
}
