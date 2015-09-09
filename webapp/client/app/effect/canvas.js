/**
 * Created by Administrator on 2015/9/9 0009.
 */
function Bird(){

    this.x=0;
    this.y=0;


}

Bird.prototype.draw=function(context){
    context.save();
    context.translate(this.x,this.y);
    context.scale(this.scaleX,this.scaleY);
    context.drawImage(img,0,0);
    context.restore();


}

var canvas=document.getElementById('canvas');
var context=canvas.getContext('2d');
var img = document.getElementById('birdMove');

 img.onload=function(){
     flyBird()

}



function flyBird(){

    var birds=[];
    var birdNum=3;
    for (var bird, i = 0; i < birdNum; i++){



    bird=new Bird();

    var centerX=canvas.width/2;
    var centerY=canvas.height/2;
    var speed=0.05;
    var angle=0;
    var RX=350;
    var RY=50;
    var centerScale=1;
    var range=0.5;

    (function drawFrame(){
        window.requestAnimationFrame(drawFrame,canvas);
        context.clearRect(0,0,canvas.width,canvas.height);
        bird.x=centerX+Math.cos(angle)*RX;
        bird.y=centerY+Math.sin(angle)*RY;
        bird.scaleX=bird.scaleY=centerScale+Math.sin(angle)*range;
        angle+=speed;
        bird.draw(context);



    }())}



}