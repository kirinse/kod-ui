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

}


var instanceStep = new step($(".step-container"));
instanceStep.init();


function bgSlider(index) {
    $("#bg-box img").css({'opacity': 0})
    $("#bg-box img").eq(index).css("opacity", "1");

}
