/**
 * Created by Administrator on 2015/8/30 0030.
 */
function step(container) {
    this.container = container;
    this.classArr = ['step-orange', 'step-purple', 'step-purple', 'step-lightBlue', 'step-Blue'];
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
step.prototype.itemHander = function (e, context) {
    var i = $(this).index();
    context.container.removeClass(context.classArr.join(' '));//转化字符串
    context.container.addClass(context.classArr[i]);
    context.container.find("i").removeClass("steps-active");

    $(this).find("i").addClass(" steps-active");
    bgSlider(i);
    wheelRostate(i);

}


var instanceStep = new step($(".step-container"));
instanceStep.init();


function bgSlider(index) {
    $("#bg-box img").css({'opacity': 0})
    $("#bg-box img").eq(index).css("opacity", "1");

}
$(window).resize(function() {
    resetCircleStyle();

});
resetCircleStyle();

function resetCircleStyle(){
    var widthPage = $(window).width();
    widthPage *=5;
    $(".wheel").css({"width":widthPage,"height":widthPage,"margin-left":-widthPage/2});


    var items = $('#wheel').find('.items');
    var pn =items.length
    var pa = 360 / pn;
    //三角函数:sin(Q) = a/c;
    //1弧度=PI/180;
    //于是就有:
    var windowWith = widthPage/2;
    var li_width = Math.sin(Math.PI/180 * pa/2) * windowWith;
    //勾股定理 c*c  = a*a + b*b;
    //于是就有
    var li_height = Math.sqrt(Math.abs(windowWith*windowWith-li_width*li_width));
    items.css({'width':li_width*2,'margin-left':-li_width,'height':li_height,'margin-top':-li_height});
    for (var i = 0; i < pn; i++) {
        items.eq(i).css('transform', 'rotate(' + pa * i + 'deg)');
    }

}

function wheelRostate(i){
   $('.wheel').rotate(i*72);
}

