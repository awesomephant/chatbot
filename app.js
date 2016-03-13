var updateScroll = function() {
    console.log('yo')
    var h = $('.messages')[0].scrollHeight;
    $('.messages').animate({scrollTop: h}, 600);
}
var push = function(msg, context) {

    if (!context) { context = data }

    var copy = answers[msg][getRandomInt(0, answers[msg].length - 1)] //random
    var template = Handlebars.compile(copy);
    var output = template(context)

    console.log(output)
    setTimeout(function() {
        $('.messages').append('<li class="message loading"><span class="spinner"></span></li>')
    }, 300)

    setTimeout(function() {
        $('.messages').append('<li class="message bot">' + output + '</li>')
        $('.loading').remove();
        updateScroll();
    }, 500 + copy.length * 5)
}

var pushImage = function(url) {
    $('.messages').append('<li class="message bot image"><img src="' + url + '"/></li>');
    updateScroll();
}

$('#send').click(function() {
    var msg = $('#in').val();
    if (msg) {
        $('.messages').append('<li class="message me">' + msg + '</li>');
        updateScroll();
        parse(msg);
        $('#in').val('')
    }
})

$("#in").keyup(function(event) {
    if (event.keyCode == 13) {
        $("#send").click();
    }
});
var actions = {};
actions.show = function(item) {
    switch (item) {
        case 'twitter':
            push('showTwitter')
            break;

        case 'instagram':
            push('showInstagram')
            break;

        case 'email':
            push('showEmail')
            break;
        case 'number':
            push('showNah')
            break;


        default:
            push('showTwitter')
            push('showInstagram')
            push('showEmail')

            break;
    }
}
actions.listProjects = function(n, mods) {
    var d = {}
    d.mods = mods;
    state = 'projectList';
    var selection = data.projects;
    if (mods.length != 0) {
        for (var i = 0; i < mods.length; i++) {
            for (var j = 0; j < selection.length; j++) {
                if (mods[i].name != selection[j].category) {
                    selection.splice(j, 1)
                }
            }
        }
    }
    console.log(selection)
    d.projects = selection;
    push('listProjects', d)
}
actions.showProject = function(n) {
    if (!isNaN(n)) {
        push('project', data.projects[n])
        pushImage(data.projects[n].images[0])
    } else {
        state = 'idle';
        search(n);
    }
}
actions.hi = function() {
    push('hi')
}

var searchProject = function(s) {
    var words = s.split(' ');
}

var search = function(s) {
    var words = s.split(' ');
    var result = {
        'object': {},
        'mods': []
    };

    for (var i = 0; i < words.length; i++) {
        lookUp(words[i], function(w) {
            //actions[w.method](w.name);
            if (w.type === 'object') {
                result.object = w;
            } else if (w.type === 'mod') {
                result.mods.push(w);
            }
        });
    }

    console.log('parsing results:\n')
    console.log(result)
    actions[result.object.method](result.object.name, result.mods);

}

var lookUp = function(word, callback) {
    word = word.toLowerCase();
    // Is word an object or a modifier?

    //look up objects
    for (var i = 0; i < objects.length; i++) {
        for (var j = 0; j < objects[i].strings.length; j++) {
            if (word === objects[i].strings[j]) {
                //found
                var result = {}
                result = objects[i];
                result.type = 'object'
                callback(result);
                return;
            }
        }
    }

    //look up modifiers
    for (var i = 0; i < modifiers.length; i++) {
        for (var j = 0; j < modifiers[i].strings.length; j++) {
            if (word === modifiers[i].strings[j]) {
                //found
                var result = modifiers[i];
                result.type = 'mod';
                callback(result);
                return;
            }
        }
    }
}

var parse = function(s) {

    //remove punctuation
    s = s.replace(/\.|,|\?|\!|&/g, '');

    switch (state) {
        case "projectList":
            actions.showProject(s);
            break;

        default:
            search(s);
            break;
    }
}
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
init();