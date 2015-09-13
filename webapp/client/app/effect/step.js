/**
 * Created by Administrator on 2015/8/30 0030.
 */
 var isInit = true;
$(function() {

    function initAnimate(index) {
        var banner = $.Deferred(); // 新建一个deferred对象
        var title = $.Deferred(); // 新建一个deferred对象2
        var pic = $.Deferred(); // 新建一个deferred对象3
        var per = $.Deferred();

        var wait = function(def) {
            var tasks = function() {
                $(".bg,header").css({
                    "height": "53px"
                });
                banner.resolve(); // 改变deferred对象的执行状态
            };
            setTimeout(tasks, 800);
            return banner;
        };
        var wait2 = function(def) {
            var tasks = function() {

                $(".title").eq(index).css("opacity", "1").slideDown(1000);
                title.resolve(); // 改变deferred对象的执行状态
            };
            setTimeout(tasks, 1800);
            return title;
        };
        var wait3 = function(def) {
            var tasks = function() {
                $(".wheel .items").css("display", "block");
                pic.resolve(); // 改变deferred对象的执行状态
            };
            setTimeout(tasks, 3000);
            return pic;
        };
        var wait4 = function(def) {
            var tasks = function() {
               isInit && $(".step-container .item").eq(index).trigger('click');
               isInit = false;
                per.resolve(); // 改变deferred对象的执行状态
                setTimeout(function(){
                    $('.list2').show();
                },1000)
            };
            setTimeout(tasks, 8000);
            return per;
        };
        $.when(wait(banner), wait2(title), wait3(pic), wait4(per));
    }

    var aminate = {
        inAimation0: function(index) {
            $(".bg,header").css({
                "height": "0px"
            });
            this.restOpacity();
            initAnimate(index);

        },
        inAimation1: function(index) {
            $(".wheel .list2").find('.list04,.list05').remove();
            $(".wheel .list2").append("<div class='list04'>" + "</div>" + "<div class='list05'>" + "</div>");

            $(".bg,header").css({
                "height": "0px"
            });
            this.restOpacity();
            initAnimate(index);
        },
        inAimation2: function(index) {

            this.restOpacity();
            initAnimate(index);
        },
        sportPerson: null,
        sportdrawFrame: null,
        sportPersonInit: false,
        personMove: function() {
            var self = this;
            var canvas = document.getElementById('canvas2'),
                context = can = canvas.getContext('2d');
            var img = document.getElementById('man');

            function Person(img) {
                //颜色值选项
                this.x = 0;
                this.y = 0;
                this.vx = 0;
                this.vy = 0;
                this.img = img;
                this.walk = 0.2;
                this.g = 0.5;

            }
            //画布方法
            Person.prototype.draw = function(con) {
                var context = con || can;
                context.save();

                context.translate(this.x, this.y);

                context.beginPath();
                context.drawImage(img, 0, 0);
                context.closePath();

                context.fill();
                context.restore();
            };

            var person1 = self.sportPerson = new Person(img);
            person1.x = 0;
            person1.oldY = person1.y = canvas.height;

            function colison(person1) {

                return person1.x >= canvas.width - img.width || person1.y <= 0;

            }

            //3.动画的无限回调
            function drawFrame() {
                !self.sportPersonInit && window.requestAnimationFrame(drawFrame, canvas);
                context.clearRect(0, 0, canvas.width, canvas.height);
                if (!colison(person1)) {
                    person1.walk += person1.g;
                    person1.x += person1.walk;
                    person1.y -= person1.walk;
                }
                colison(person1);
                person1.draw(context);

            };

            this.sportdrawFrame = drawFrame;
            drawFrame();

        },
        inAimation3: function(index) {
            this.restOpacity();
            var self = this;
            initAnimate(index);

            this.sportPersonInit = true;


            if (this.sportPerson) {
                this.sportPerson.walk = 0.2;
                this.sportPerson.x = 0;
                this.sportPerson.y = this.sportPerson.oldY;
                this.sportPerson.draw()
            }
            setTimeout(function() {
                if (self.sportPerson) {
                    self.sportPerson.walk = 0.2;
                    self.sportPersonInit = false;
                    self.sportdrawFrame();
                } else {
                    self.sportPersonInit = false;
                    self.personMove();
                }
            }, 1000)
        },
        inAimation4: function(index) {

            this.restOpacity();
            initAnimate(index);

        },
        restOpacity: function() {
            $(".title").css("opacity", "0");
        }
    }

    function step(container) {
        this.container = container;
        this.classArr = ['step-orange', 'step-purple', 'step-purple', 'step-lightBlue', 'step-Blue'];
        this.itemLengh = this.classArr.length;
        this.index = 0;
    }

    step.prototype.init = function() {
        this.bindEvent();
        initAnimate(0);
    }
    step.prototype.bindEvent = function() {
        //桥接模式
        var self = this;
        this.container.find('.item').click(function(e) {
            self.itemHander.call(this, e, self);

            /* self.slider(s);*/

        });
    }
    step.prototype.itemHander = function(e, context) {
        context.index = $(this).index();
        !context.detachBoundar(context.index).isSame && context.doAminate();
        context.preIndex = context.index;

    }

    step.prototype.changeStyle = function() {
        this.container.removeClass(this.classArr.join(' ')); //转化字符串
        this.container.addClass(this.classArr[this.index]);
        this.container.find("i").removeClass("steps-active");
        this.container.find("i").eq(this.index).addClass(" steps-active");

    }
    step.prototype.detachBoundar = function() {
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
    step.prototype.doAminate = function(iswheel) {
        this.detachBoundar(this.index);
        var i = this.index;
        bgSlider(i);
        wheelRostate(i);
        chooseTitle(i);
        aminate['inAimation' + i](i);
        this.changeStyle();
        colorBg(i);
    }

    function wheelRostate(i) {
        $('.wheel').rotate(i * 72);
    }
    

    var instanceStep = new step($(".step-container"));
    instanceStep.init();

    function debounce(time, callback) {
        var last;
        return function() {
            var ctx = this,
                args = arguments;
            clearTimeout(last);
            last = setTimeout(function() {
                callback.apply(ctx, args);
            }, time);
        };
    };


    var wheelUp = debounce(800, function(event) {
        var i = instanceStep.index - 1;
        instanceStep.index = i
        instanceStep.doAminate();
    });
    var wheelDown = debounce(800, function(event) {
        instanceStep.index += 1;
        instanceStep.doAminate();
    });

    $('body').mousewheel(function(event) {
        if (event.deltaY < 0) {
            wheelDown(event);
        } else {
            wheelUp(event);
        }
    });


    function bgSlider(index) {
        var bg = $("#bg-box img");
        var head = $(".bg,header");
        bg.css({
            'opacity': '0'
        })
        bg.eq(index).css("opacity", "1");
        head.css({
            "height": "0"
        });
        head.eq(index).css({
            "height": "53px"
        });
    }

    function chooseTitle(index2) {
        var title = $(".title");
        title.css({
            "display": "none",
            "bottom": "-10px"
        });
        title.eq(index2).css({
            "display": "block",
            "bottom": "0px"
        });

    }

    function colorBg(cur) {
        var logo = $(".logo");
        var fr = $(".fr-box");
        var classColor = ['a1', 'a2', 'a2', 'a3', 'a2'],
            classBox = ['box1', 'box2', 'box2', 'box3', 'box2'];
        logo.removeClass(classColor.join(' ')); //转化字符串

        logo.addClass(classColor[cur]);
        fr.removeClass(classBox.join(' '));
        fr.addClass(classBox[cur]);

    }

    $(window).resize(function() {
        resetCircleStyle();

    });
    resetCircleStyle(true);

    function resetCircleStyle(init) {
        var widthPage = $(window).width();
        widthPage *= 5;
        var wheel = $(".wheel");
        wheel.css({
            "width": widthPage,
            "height": widthPage,
            "margin-left": -widthPage / 2
        });
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
        items.css({
            'width': li_width * 2,
            'margin-left': -li_width,
            'height': li_height,
            'margin-top': -li_height
        });
        for (var i = 0; i < pn; i++) {
            items.eq(i).css('transform', 'rotate(' + pa * i + 'deg)');
        }
        init && wheel.rotate(72);
    }


    function brightBg() {
        var angle = 0;
        var count = 0;
        setInterval(function() {
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
    }

    function canvasBird(container) {
        var canvas = container.find("canvas").get(0);
        var context = canvas.getContext('2d');
        var birdElement = [];
        container.find('.bird-item').each(function() {
            birdElement.push(this);
        })

        function Bird(birderElement) {
            this.birderElement = birderElement;
            this.x = 0;
            this.y = 0;
        }

        Bird.prototype.draw = function(context) {
            context.save();
            context.translate(this.x, this.y);
            context.scale(this.scaleX, this.scaleY);
            context.drawImage(this.birderElement, 0, 0);
            context.restore();

        }

        function flyBird() {
            var birdNum = birdElement.length;
            //鸟笼
            var groupBird = [];
            //批量生产鸟儿对象，
            for (var bird, i = 0; i < birdNum; i++) {
                //传鸟儿进来
                var bird = new Bird(birdElement[i]);
                bird.centerX = canvas.width / 2;
                bird.centerY = canvas.height / 2
                bird.speed = Math.random() * 0.01;
                bird.angle = 0;
                bird.RX = bird.centerX * Math.random();
                bird.RY = bird.centerY * Math.random();
                bird.centerScale = 1;
                bird.range = 0.5 * Math.random();
                groupBird.push(bird)
            }

            function hander(bird) {
                //对小鸟飞到房子后面时,进行缓冲处理一下;
                if (!(Math.sin(bird.angle) >= 0.99 && Math.sin(bird.angle) <= 1)) {
                    bird.angle += Math.random() * 0.01;
                } else {
                    bird.angle += Math.random() * 0.001;
                }
                bird.y = bird.centerY + Math.sin(bird.angle) * bird.RY;

                bird.scaleX = bird.scaleY = bird.centerScale + Math.sin(bird.angle) * bird.range;
                bird.x = bird.centerX + Math.cos(bird.angle) * bird.RX;
                bird.draw(context);
            }


            (function drawFrame() {
                window.requestAnimationFrame(drawFrame, canvas);
                context.clearRect(0, 0, canvas.width, canvas.height);
                groupBird.forEach(hander);
            }())

        }

        flyBird()
    }

    new canvasBird($("#birds-container2"));
    new canvasBird($("#birds-container3"));
    new canvasBird($("#birds-container4"));
    brightBg();


});