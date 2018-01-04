$(document).ready(function(){
    // 小图点击
    $('.image').click(function(e) {
        $('.popup-wrap').fadeIn(250);
        $('.popup-box').removeClass('transform-out').addClass('transform-in');

        e.preventDefault();
    });

    $('.popup-close').click(function(e) {
        $('.popup-wrap').fadeOut(500);
        $('.popup-box').removeClass('transform-in').addClass('transform-out');

        e.preventDefault();
    });
    var images = document.getElementsByClassName('image');
    var carouselWrapper = document.getElementById('carousel-wrapper');
    var selected = 6;
    var i;
    var l;

    //set initial selected element
    document.location.hash = '#image-6';

    for(i = 0, l = images.length; i < l; i++) {

        images[i].addEventListener('click', function(e){

            var imageId = e.target.id;
            var imageNum = imageId.split('-')[1];
            var difference = imageNum - selected;
            var position = parseInt(document.defaultView.getComputedStyle(carouselWrapper).marginLeft);

            carouselWrapper.style.marginLeft = position - (difference * 350) + 'px';
            selected = imageNum;

        });
    }
// 鼠标拖拽滑动  有问题
//     var oDiv=document.getElementById('popup1');
//     oDiv.onmousedown=function(ev){
//         var disX=ev.clientX-oDiv.offsetLeft;
//         var disY=ev.clientY-oDiv.offsetTop;
//
//         document.onmousemove=function(ev){
//                 var l=ev.clientX-disX;
//                 oDiv.style.left=l+'px';
//         };
//         document.onmouseup=function(){
//             document.onmousemove=null;
//             document.onmouseup=null;
//         }
//     };
    // 背景动画
    var livePatern = {
    canvas: null,
    context: null,
    cols: 0,
    rows: 0,
    colors: [202, 229, 243, 248, 243, 247],
    triangleColors: [],
    destColors: [],

    init: function(){
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.cols = Math.floor(document.body.clientWidth / 24);
        this.rows = Math.floor(document.body.clientHeight / 24) + 1;

        this.canvas.width = document.body.clientWidth;
        this.canvas.height = document.body.clientHeight;

        this.drawBackground();
        this.animate();
    },

    drawTriangle: function(x, y, color, inverted){
        inverted = inverted == undefined ? false : inverted;

        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(inverted ? x - 22 : x + 22, y + 11);
        this.context.lineTo(x, y + 22);
        this.context.fillStyle = "rgb("+color+","+color+","+color+")";
        this.context.fill();
        this.context.closePath();
    },

    getColor: function(){
        return this.colors[(Math.floor(Math.random() * 6))];
    },

    drawBackground: function(){
        var eq = null;
        var x = this.cols;
        var destY = 0;
        var color, y;

        while(x--){
            eq = x % 2;
            y = this.rows;

            while(y--){
                destY = Math.round((y-0.5) * 24);

                this.drawTriangle(x * 24 + 2, eq == 1 ? destY : y * 24, this.getColor());
                this.drawTriangle(x * 24, eq == 1 ? destY  : y * 24, this.getColor(), true);
            }
        }
    },

    animate: function(){
        var me = this;

        var x = Math.floor(Math.random() * this.cols);
        var y = Math.floor(Math.random() * this.rows);
        var eq = x % 2;

        if (eq == 1) {
            me.drawTriangle(x * 24, Math.round((y-0.5) * 24) , this.getColor(), true);
        } else {
            me.drawTriangle(x * 24 + 2, y * 24, this.getColor());
        }

        setTimeout(function(){
            me.animate.call(me);
        }, 10);
    },
};

!function(){livePatern.init();}()

});