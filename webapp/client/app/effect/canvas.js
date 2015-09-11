/**
 * Created by Administrator on 2015/9/9 0009.
 */


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
//你应该准备好三个鸟儿的元素。三只 鸟儿，然后，放到数组里，批量生产。

var img =document.getElementById('birdMove');
var birdElement =[img , document.getElementById('bird2Move'), document.getElementById('bird3Move')];
img.onload = function () {
    flyBird()
}

function Bird(birderElement) {
    //如果存在传鸟儿元素进来 ，就用它，否则就找默认的。
    this.birderElement = birderElement || img;
    this.x = 0;
    this.y = 0;


}
Bird.prototype.draw = function (context) {
    context.save();
    context.translate(this.x, this.y);
    context.scale(this.scaleX, this.scaleY);
    //由于是图片对象，画图时，应该是在图的中心开始图应该是：图的中心度坐标：-img.with/2, -img.height/2
    context.drawImage(this.birderElement, -this.birderElement.width/2, -this.birderElement.height/2);
    context.restore();

}


function flyBird() {
//面向对象程序设计 。


    var birdNum = 3;

    //鸟笼
    var groupBird = [];
    //批量生产鸟儿对象，
    for (var bird, i = 0; i < birdNum; i++) {
        //传鸟儿进来
        var bird = new Bird(birdElement[i]);
        bird.centerX = canvas.width / 2;
        bird.centerY = canvas.height / 2
           // 每只鸟儿的速度是不一样的
        bird.speed =0.03;
        bird.angle = 0;
        //每只鸟儿开始位置也不一样。
        bird.RX = 350*Math.random();
        bird.RY = 50*Math.random();
        bird.centerScale = 1;
        bird.range = 0.5*Math.random();
        //把你生成的鸟儿，放到鸟笼里。
        groupBird.push(bird)
    }

    function hander(bird){
        bird.y = bird.centerY + Math.sin(bird.angle) * bird.RY;
        bird.scaleX = bird.scaleY = bird.centerScale + Math.sin(bird.angle) * bird.range;
        bird.x =bird.centerX + Math.cos(bird.angle) * bird.RX;
        bird.angle += bird.speed;
        bird.draw(context);
    }

    (function drawFrame() {
        window.requestAnimationFrame(drawFrame, canvas);
        context.clearRect(0, 0, canvas.width, canvas.height);
        //批量放逐你的鸟儿对象，这里要是不懂forEach,可以用$.each(groupBird,hander);也是完全一样的。只是这个原生方法，更牛逼
        groupBird.forEach(hander);
    }())

}