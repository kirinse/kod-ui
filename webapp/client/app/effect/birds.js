/**
 * Created by Win-PC on 2015/9/7.
 */
function BirdFlyGroup(birdsContainer,bounce){
    var BirdGroup=[];
    function Bird(bird){
        this.x=bird.position().left;
        this.y=bird.position().top;
        this.width=bird.width();
        this.height=bird.height();
        this.bird=bird;
        this.vx=0;
        this.vy=0;
        this.bounce=-(bounce || 1);



    }

    Bird.prototype.Fly=function(){

        this.bird.css({'left':this.x,'top':this.y});
    }

    function checkWalls(bird,birdsContainer){
        //right
        if(bird.x>birdsContainer.width()){

            bird.x=birdsContainer.width();
            bird.vx*=bird.bounce;
            //left
        }else if(bird.x+bird.width<0){

            bird.x=bird.width;
            bird.vx*=bird.bounce;

        }

       //top
        if(bird.y>birdsContainer.height()){

            bird.y=birdsContainer.height();
            bird.vy*=bird.bounce ;
            //bottom
        }else if(bird.y+bird.height<0){

            bird.y=bird.height;
            bird.vy*=bird.bounce ;


        }



    }

    birdsContainer.find('img').each(function(){
        var birdInt = new Bird($(this),Math.random());
        birdInt.vx=-Math.random();
        birdInt.vy=-Math.random();
        BirdGroup.push(birdInt);
    });
    //计时开始运行
    setInterval(function(){

        for(i in BirdGroup){  //开始遍历
            BirdGroup[i].x+=BirdGroup[i].vx;
            BirdGroup[i].y+=BirdGroup[i].vy;
            checkWalls(BirdGroup[i],birdsContainer);
            BirdGroup[i].Fly();

        }

    },30)





}
new BirdFlyGroup($("#birds-container2"));
new BirdFlyGroup($("#birds-container3"));
new BirdFlyGroup($("#birds-container4"));