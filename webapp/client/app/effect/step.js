/**
 * Created by Administrator on 2015/8/30 0030.
 */
function step(container) {
    this.container = container;
    this.classArr = ['step-orange', 'step-purple', 'step-purple', 'step-lightBlue', 'step-Blue'];


    this.itemLengh = this.classArr.length;
    this.index = 0;

}
step.prototype.init = function () {
    this.bindEvent();
}
step.prototype.bindEvent = function () {
    //桥接模式
    var self = this;
    this.container.find('.item').click(function (e) {
        self.itemHander.call(this, e, self);
        /* self.slider(s);*/

    });
}

var aminate = {
    inAimation0: function () {
        console.log(000000000000000000000000000000000000)
    },
    inAimation1: function () {
        $(".wheel .list2").find('.list04,.list05').remove();
        $(".wheel .list2").append("<div class='list04'>" + "</div>" + "<div class='list05'>" + "</div>")
    },
    inAimation2: function () {
    },
    inAimation3: function () {
        /**
         * Created by Administrator on 2015/9/7 0007.
         */
        function FootBall(container) {
            var right = container.width();
            var top = 0;
            var item = container.find('img');
            var imgtop = item.position().top;

            function PersonMove(person, g) {
                this.oldx = this.x = person.position().left;
                this.oldy = this.y = person.position().top;
                this.width = person.width();
                this.height = person.height();
                this.person = person;
                this.oldvx = this.vx = 0;
                this.oldvy = this.vy = 0;
                this.g = g
            }

            PersonMove.prototype.jumpMove = function () {
                this.person.css({'left': this.x - 100, 'top': this.y});
            };
            PersonMove.prototype.rest = function () {
                this.x = this.oldx;
                this.y = this.oldy;
                this.vx = this.oldvx;
                this.vy = this.oldvy;
                this.person.css({'left': this.oldx, 'top': this.oldy});
            };

            var instP = new PersonMove(item, 1);
            instP.oldvx = instP.vx = 2;
            instP.oldvy = vy = 1;
            instP.rest();
            var set = setInterval(function () {
                instP.x += instP.vx;
                instP.vx += instP.g;
                instP.y -= instP.vy;
                instP.vy += instP.g;
                if (instP.y < 0 || (instP.x - instP.width) > right) {
                    clearInterval(set);

                }
                instP.jumpMove();

            }, 200);

        }

        FootBall($('#birds-container'));
    },
    inAimation4: function () {
    }
}


//aaa
step.prototype.itemHander = function (e, context) {
    context.index = $(this).index();
    context.detachBoundar(context.index).isSame && context.doAminate();
    context.preIndex = context.index;
}

step.prototype.changeStyle = function () {
    this.container.removeClass(this.classArr.join(' '));//转化字符串
    this.container.addClass(this.classArr[this.index]);
    this.container.find("i").removeClass("steps-active");
    this.container.find("i").eq(this.index).addClass(" steps-active");
}
step.prototype.detachBoundar = function () {
    var moreLeft = this.index < 0
    var moreright = this.index >= (this.itemLengh - 1);
    if (moreLeft) {
        this.index = 0;
    }
    if (moreright) {
        this.index = (this.itemLengh - 1);
    }
    return {
        isSame: this.preIndex == this.index,
        isBoundar: moreLeft || moreright
    }
}

step.prototype.doAminate = function (iswheel) {
    this.detachBoundar(this.index);
    var i = this.index;
    bgSlider(i);
    wheelRostate(i);
    chooseTitle(i);
    aminate['inAimation' + i]();
    this.changeStyle();
    colorBg(i);
}

//aaa
var instanceStep = new step($(".step-container"));

instanceStep.init();

function debounce(time, callback) {
    var last;
    return function () {
        var ctx = this, args = arguments;
        clearTimeout(last);
        last = setTimeout(function () {
            callback.apply(ctx, args);
        }, time);
    };
};


var wheelUp = debounce(800, function (event) {
    var i = instanceStep.index - 1;
    instanceStep.index = i
    instanceStep.doAminate();
});
var wheelDown = debounce(800, function (event) {
    instanceStep.index += 1;
    instanceStep.doAminate();
});

$('body').mousewheel(function (event) {
    //right
    if (event.deltaY < 0) {
        wheelDown(event);
    } else {
        wheelUp(event);
    }
});


function bgSlider(index) {
    $("#bg-box img").css({'opacity': 0})
    $("#bg-box img").eq(index).css("opacity", "1");

}
function chooseTitle(index2) {
    $(".title").css("display", "none");
    $(".title").eq(index2).css("display", "block");

}
function colorBg(cur) {
    var classColor = ['a1', 'a2', 'a2', 'a3', 'a2'],
        classBox = ['box1', 'box2', 'box2', 'box3', 'box2'];
    $(".logo").removeClass(classColor.join(' '));//转化字符串

    $(".logo").addClass(classColor[cur]);
    $(".fr-box").removeClass(classBox.join(' '));
    $(".fr-box").addClass(classBox[cur]);

}
$(window).resize(function () {
    resetCircleStyle();

});
resetCircleStyle();

function resetCircleStyle() {
    var widthPage = $(window).width();
    widthPage *= 5;
    $(".wheel").css({"width": widthPage, "height": widthPage, "margin-left": -widthPage / 2});


    var items = $('#wheel').find('.items');
    var pn = items.length
    var pa = 360 / pn;
    //三角函数:sin(Q) = a/c;
    //1弧度=PI/180;
    //于是就有:
    var windowWith = widthPage / 2;
    var li_width = Math.sin(Math.PI / 180 * pa / 2) * windowWith;
    //勾股定理 c*c  = a*a + b*b;
    //于是就有
    var li_height = Math.sqrt(Math.abs(windowWith * windowWith - li_width * li_width));
    items.css({'width': li_width * 2, 'margin-left': -li_width, 'height': li_height, 'margin-top': -li_height});
    for (var i = 0; i < pn; i++) {
        items.eq(i).css('transform', 'rotate(' + pa * i + 'deg)');
    }

}

function wheelRostate(i) {
    $('.wheel').rotate(i * 72);
}


var angle = 0;
var count = 0;
setInterval(function () {
    if (count % 360 == 0) {
        sum = Math.ceil(Math.random() * 10);
    }
    if (sum % 2 == 0) {
        angle += -(Math.random() * 100);

    } else {

        angle += (Math.random() * 100);
    }

    count++;
    if (count > 36000) {
        count = 0;
    }
    /*  angle-=-30;*/


    $('.bright-Box').rotate(angle);
}, 200);
