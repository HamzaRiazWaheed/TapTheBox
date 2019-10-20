var c = $('#container');
var controls = $("#control");
var load = $('#load');
var result = $('#result');
var again = $('#again');
var click = $('#clicked');
var res = $('#res');
var level = $('#level');
var count, clicked = 0,
    perc = 0;
var spancount = $('#count');
var i = 440,
    l, b = 900,
    arr = [],
    left = [],
    bottom = [];
var diff = $("#diff-ul");
var drop = $("#drop");
var list = $("#list");
var difficulty = 'easy', 
    time = 5000,
    limit = 200; // defualt value
var selectLevel = $("input[name='mode']");
var c_width = c.width(),
    c_height = c.height();
l = c_width - 40;
console.log(c_height);
level.html(" | " + 'Easy');
result.hide();
var bot = 0;
var gone = 0;
count = limit;
perc = 0;
clicked = 0;
var d = 800;

diff.hover(function () {
    list.slideToggle('slow');
    drop.toggleClass('rotate')
});

function shuffle(arr) {
    var shuffled = arr.slice(0),
        i = arr.length,
        temp, index;
    while (i--) {
        index = Math.floor(i * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled;
}
while (i > 40) {
    arr.push(i);
    i--;
}
console.log(arr);
arr = shuffle(arr);
while (l--) {
    left[l] = l;
}
left = shuffle(left);
while (b < 550) {
    bottom.push(b);
    b--;
}

selectLevel.on('change', function () {
    
    difficulty = $(this).data('mode');
    limit = $(this).val();
    d = $(this).data("d");
    console.log(d);
    game.load(limit);
    result.hide();
    c.css("border-bottom-color", "white");
    again.fadeOut(100);
    load.fadeIn(200);

});
res.html('');
var game = {
    load: function (l) {
        c.empty();
        click.html(limit);
        spancount.stop(false, false);
        console.log(limit);
        count = 0;
        // spancount.css("width",0);
        for (var i = 0; i < l; i++) {
            var span = $("<span></span>");
            span.attr("id", i);
            span.addClass('span');
            span.hide().appendTo(c).delay(100).fadeIn(100);
            perc++;
            count = (perc / l) * 100;
            // spancount.animate({ "width": count+'%'},0.01);
        }
    },
    start: function () {
        bot = 0;
        var spans = $("span");
        var f = c.find(spans);
        console.log(f.length);
        f.each(function (i) {
            var a = c_height + arr[i];
            var q = left[i];
            $(this).css({
                'position': 'absolute',
                'left': q,
                'bottom': a,
                'z-index': i + 1
            })
        });
        $("#container").children().on('click', function () {
            $(this).fadeOut('500');
            $(this).remove();
            clicked++;
            click.html(limit - clicked);
            if (clicked == l) {
                game.end(clicked, true)
            }
        });
        controls.fadeOut(300, function(){
            again.removeClass("hidden");
        })
        
    },
    begin: function (d) {
        /* var float = function(el){
         var x = parseInt($(el).css('bottom'));
         $(el).clearQueue()
         .stop()
         .animate({bottom: -40}, time ,function() {


         if (x = -40) {
         $(el).clearQueue().stop(false, false);
         animateoff();
         c.css("border-bottom-color", "red");
         res.html('You Failed');
         }

         if(bot > 0){window.clearTimeout(bot);}
         $("#container").children().fadeOut(1000);
         //c.empty();
         }).hover(function(){$(this).stop(true,false);
         });
         };*/
        var delay = 0;
        $("#container *").each(function () {
            var t = $(this);
            setTimeout(function () {
                t.addClass('animate');
            }, delay += d);
        });
    },
    end: function(score, passed){

        if(passed){
            res.html('You Won');
        }else {
            res.html('You Failed' + '<br>' + 'Score: ' + score);
        }
        c.children().fadeOut("slow").delay(100).remove();
        spancount.animate({
            "width": '0%'
        }, 1000);
        result.show();
        load.fadeOut()
        again.fadeIn()
        controls.fadeIn('slow');
        click.html("");
    }
};

function animatEnd() {
    $('.span').on('animationend webkitAnimationEnd mozAnimationEnd', function () {
        gone++;
        if (gone < 2) {
            game.end(clicked, false)
        }
    });
}
load.on('click', function () {
    $('#container').find('*').clearQueue().stop();
    clicked = 0;
    load.slideUp("slow").delay(300);
    load.addClass("hidden");
    game.start();
    game.begin(d);
    animatEnd();
    gone = 0;
});
again.on('click', function () {
    clearTimeout(bot);
    load.fadeOut(100);
    game.load(limit);
    game.start();
    game.begin(d);
    gone = 0;
    clicked = 0;
    animatEnd();
});

game.load(limit)