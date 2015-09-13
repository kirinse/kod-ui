$(function(){
    function personMove(){
        //1.人特对象
        function Person(img) {
            //颜色值选项
            this.x = 0;
            this.y = 0;
            this.vx = 0;
            this.vy = 0;
            this.img = img;

        }
        //画布方法
        Person.prototype.draw = function (context) {
            context.save();

            context.translate(this.x, this.y);

            context.beginPath();
            context.drawImage(img,0,0);
            context.closePath();

            context.fill();
            context.restore();
        };


        var canvas = document.getElementById('canvas2'),
            context = canvas.getContext('2d');
        var img = document.getElementById('man');

            personPlay();

        function personPlay() {
            var person1 = new Person();
            //速度向量
            var walk =3.9;
            //加速度
            var g = 0.5;
            person1.x = 0;
            person1.y = canvas.width - img.width;
            person1.draw(context)

            function colison(person1) {
                return person1.x >= canvas.width - img.width || person1.y <= 0;

            }


            //3.动画的无限回调
            (function drawFrame() {
                window.requestAnimationFrame(drawFrame, canvas);
                context.clearRect(0, 0, canvas.width, canvas.height);
                //对速度向量进行 加速
                walk += g;
                //如果不过界，将速度向量给坐标，移动。。还不会嘛。。。调一下位置会不会？

                if (!colison(person1)) {
                    person1.x += walk;
                    person1.y -= walk;
                }
                colison(person1);
                person1.draw(context);

            }());
        }

    }
    personMove();
})

