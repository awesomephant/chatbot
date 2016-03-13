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