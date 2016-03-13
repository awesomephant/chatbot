var data, objects, modifiers, answers, state;

state = 'idle';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var init = function () {
    $.getJSON('./data/me.json', function (d) {
        data = d;
    });
    $.getJSON('./data/dictionary.json', function (d) {
        objects = d.objects;
        modifiers = d.modifiers
    });
    $.getJSON('./data/answers.json', function (d) {
        answers = d;
        push('intro')
    });
}