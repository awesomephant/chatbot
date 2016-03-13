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