$(function(){
    var i =0;
    var timer1;
    var bg;
    function lunbo(){
        if (i>=7) {
            i=0;
        };
        $(".pic a").eq(i).css({display:"block"}).siblings().css({display:"none"});
        $(".button li").eq(i).css({background:"#FF3C3C"}).siblings().css({background:"#ccc"});
        bg = 'first_bg'+(i+1);
        $("#first_bg").removeClass();
        $("#first_bg").addClass(bg);
        i++;
    };
    timer1 = setInterval(lunbo,2000);

    $(".lunbo").mouseover(function(){
        clearInterval(timer1);
        $(".qiehuan").css({display:"block"})
    });
    $(".lunbo").mouseout(function(){
        timer1 = setInterval(lunbo,2000);
        $(".qiehuan").css({display:"none"})
    });

    // 抓取小按钮
    $(".qiehuan").mouseover(function(){
        $(this).children('.bg').css({opacity:"0.5"});
    })
    $(".qiehuan").mouseout(function(){
        $(this).children('.bg').css({opacity:"0.3"});
    })

    // 点击小按钮
    $(".pre").click(function(){
        if (i<=0) {
            i=7;
        };
        i--;
        $(".pic a").eq(i).css({display:"block"}).siblings().css({display:"none"});
        $(".button li").eq(i).css({background:"#FF3C3C"}).stop().siblings().css({background:"#ccc"});
        bg = 'first_bg'+(i+1);
        $("#first_bg").removeClass();
        $("#first_bg").addClass(bg);
    })
    $(".next").click(function(){
        if (i>=6) {
            i=-1;
        };
        i++;
        $(".pic a").eq(i).css({display:"block"}).stop().siblings().css({display:"none"});
        $(".button li").eq(i).css({background:"#FF3C3C"}).siblings().css({background:"#ccc"});
        bg = 'first_bg'+(i+1);
        $("#first_bg").removeClass();
        $("#first_bg").addClass(bg);
    })




    $(".button li").mouseover(function(){
        i = $(this).index();
        $(".pic a").eq(i).css({display:"block"}).siblings().stop().css({display:"none"});
        $(this).css({background:"#FF3C3C"}).siblings().css({background:"#ccc"});
        var bg = 'first_bg'+(i+1);
        $("#first_bg").removeClass();
        $("#first_bg").addClass(bg);
    })
    //轮播小按钮










	
    var timer2 = null;
    $(".tab li").hover(function(){
        var xuhao = $(this).index()
        var left = ['100px','165px','235px'];
        timer2 = setTimeout(function(){
            $('.tab_sw').animate({left:left[xuhao]},300)
        },300)
   	},function(){
        clearTimeout(timer2);
   		})








    
    // $("#chuchuang .img").mouseover(function(){
    
    // 	$(this).animate({left:'30px'},500);
    	
    // })

    // $("#chuchuang .img").mouseout(function(){
    // 	$(this).animate({left: '40px'},500);
    // })

})



