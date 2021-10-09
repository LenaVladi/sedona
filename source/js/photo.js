var photos = document.querySelector('.media');

function getJson () {
    fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
        .then(function (response) {return response.jcon()})
        .then(function (json) {console.log(json)})
        .catch(function (err) {errorFunc(err)});
}

function errorFunc () {
    throw Error('ERROR message:' + err);
}

function getComments () {
    getJson();
}

photos.addEventListener('click', function (evt) {
    if (evt.target.closest('.media__photo-wrap')) {
        evt.preventDefault();
        getComments();
    }
})
