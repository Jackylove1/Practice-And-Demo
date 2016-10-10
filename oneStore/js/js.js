$(function(){
    // 顶部鼠标划入显示、划出隐藏效果，
    $(".fix_list").hover(function(){
        $(this).find(".menu_list").css({display:"block"});
        $(this).find('.fix_list_info')
    },function(){
        $(this).find(".menu_list").css({display:"none"});
        $(this).find('.fix_list_info')
    })
    // 顶部送货区域效果,hover效果就是有两种方法，进入第一种，离开第二种方法
    $(".songhuo").hover(function(){
        $(this).find(".sheng").css({display:"block"});
    },function(){
        $(this).find(".sheng").css({display:"none"});
    })
    // 菜单列表效果
    // 移入向右侧滑动，阴影显示
    $(".lunboliebiao .list li").hover(function(){
        $(this).find('h3').stop().animate({paddingLeft:"5px"},100);
        $(this).css({background:"#872222"});
        $(this).find(".show").css({display:"block"})
    },function(){
        $(this).find('h3').stop().animate({paddingLeft:"0px"},100);//stop清除动画防止动画积累
        $(this).css({background:"#C23131"});
        $(this).find(".show").css({display:"none"})
    })

    // 搜索框左侧商家店铺选择
    $(".search .so_box .so_tab").hover(function(){
        $(this).find("i").css({"background-position": "-235px -70px"});
        $(this).find('.dianpu').css({display:"block"})
    },function(){
        $(this).find("i").css({"background-position": "-235px -60px"})
        $(this).find('.dianpu').css({display:"none"})
    })



    // 声明轮播通用变量
    var num = 0;
    var timer = null;
    // 背景颜色切换
    // 定义个颜色数组
    var color = ["#E82802","#078BD5","#E6CC93","#3C3CD8","#0068FD","#CC0009","#5036B5"];
    // 自动轮播
    // 执行函数
    function dalunbo(){
        num++;
        if (num==7) {
            num = 0;
        };
        // 图片自动轮播
        $(".dalunbo .pic a").eq(num).fadeIn(300).siblings().fadeOut(300);
        // 小滑块同步轮播
        $(".dalunbo .button li").eq(num).css({background:"#FF3C3C"}).siblings().css({background:"#ccc"});
        // 同步切换背景颜色
        $("#first_bg").css({background:color[num]});
    }
    // 设置定时器
    timer = setInterval(dalunbo,5000);
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // 鼠标移入停止轮播
    $(".dalunbo").mouseover(function(){
        // 清除定时器
        clearInterval(timer);
        // 左右切换按钮出现
        $(".dalunbo .qiehuan").fadeIn(300);
    });
    // 鼠标移除开始轮播
    $(".dalunbo").mouseout(function(){
        // 执行轮播定时器
        timer = setInterval(dalunbo,5000);
        //左右切换按钮消失
        $(".dalunbo .qiehuan").stop().fadeOut(300);
    })
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // 手动小滑块切换
    $(".dalunbo .button li").mouseover(function(){
        num = $(this).index();
        // 图片切换
        //两个成对元素在后一个元素钱加.stop防止多次触发
        $(".dalunbo .pic a").eq(num).fadeIn(300).siblings().stop()/*防止重复触发*/.fadeOut(300);
        // 小滑块切换
        $(".dalunbo .button li").eq(num).css({background:"#FF3C3C"}).siblings().stop()/*防止重复触发*/.css({background:"#ccc"});
        // 同步切换背景颜色
        $("#first_bg").css({background:color[num]});
    })
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // 手动按钮切换
    // 左按钮
    // 引入防叠加点击
    var c = 0;
    $(".dalunbo .pre").click(function(){
        // 让用户点击切换按钮有0.5秒间隔，其他的多余点击无效
        if (c==0) {
            c=1;
            setTimeout(function(){
                c=0;
            },500)
        }else{
            return;
        };
        num--;
        if (num==-1) {
            num=6;
        };
        // 图片自动轮播
        $(".dalunbo .pic a").eq(num).fadeIn(300).siblings().fadeOut(300);
        // 小滑块同步轮播
        $(".dalunbo .button li").eq(num).css({background:"#FF3C3C"}).siblings().css({background:"#ccc"});
        // 同步切换背景颜色
        $("#first_bg").css({background:color[num]});
    })
    // 右按钮
    $(".dalunbo .next").click(function(){
        // 让用户点击切换按钮有0.5秒间隔，其他的多余点击无效
        if (c==0) {
            c=1;
            setTimeout(function(){
                c=0;
            },500)
        }else{
            return;
        };
        num++;
        if (num==7) {
            num=0;
        };
        // 图片自动轮播
        $(".dalunbo .pic a").eq(num).fadeIn(300).siblings().fadeOut(300);
        // 小滑块同步轮播
        $(".dalunbo .button li").eq(num).css({background:"#FF3C3C"}).siblings().css({background:"#ccc"});
        // 同步切换背景颜色
        $("#first_bg").css({background:color[num]});
    })


    // 橱窗区域图片小滑动效果
    $("#chuchuang .cc .img").hover(function(){
        $(this).stop().animate({marginLeft:"-5px"},300)
    },function(){
        $(this).stop().animate({marginLeft:"0px"},300)
    })

    // 楼层轮播开始++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    $(".b").each(function(){
        var jq_this = $(this);
        var js_this = this;
        js_this.num2 = 0;
        // 对象轮播函数
        js_this.run = function(){
            
            if (js_this.num2 == 4) {
                jq_this.find(".lunbo").css({left:"0px"});
                js_this.num2 = 1;
            };
            var t = js_this.num2 * -330;
            jq_this.find('.lunbo').animate({left:t+"px"},500)
            if (js_this.num2==3) {
                jq_this.find('.trig_box').find('a').eq(0).animate({width:"30px"},3000,function(){
                    jq_this.find('.trig_box').find('a').css({width:"0px"})
                });
            }else{
                jq_this.find('.trig_box').find('a').eq(js_this.num2).animate({width:"30px"},3000,function(){
                    jq_this.find('.trig_box').find('a').css({width:"0px"})
                });
            };
            js_this.num2++;
        }
        // 设置对象定时器
        js_this.timer2 = setInterval(js_this.run,3000);
        // 鼠标移入停止轮播
        jq_this.hover(function() {
            clearInterval(js_this.timer2);
        }, function() {
            js_this.timer2 = setInterval(js_this.run,3000);
        });

        // 下滑块移入跳转
        jq_this.find('.trig_box').find('li').mouseover(function(){
            js_this.num2 = $(this).index();
            t = js_this.num2 * -330;
            jq_this.find('.lunbo').stop().animate({left:t+"px"},500);
        })
    })


    // 流行百货左侧轮播
    var lx_num=0;
    function lx(){
        lx_num++;
        if (lx_num==3) {
            lx_num=1;
            $(".a_down .lunbo .box").css({left:"0px"});
        };
        var lx_l = lx_num * -100;
        $(".a_down .lunbo .box").animate({left:lx_l+"px"},500);
    }
    var timer3 = setInterval(lx,3000);
    $(".a_down .lunbo .box").hover(function(){
        clearInterval(timer3);
    },function(){
        timer3 = setInterval(lx,3000);
    })
    $(".a_down .pre").click(function(){
        lx_num--;
        if (lx_num==-1) {
            lx_num = 1;
            $(".a_down .lunbo .box").css({left:"-200px"});
        };
        var lx_l = lx_num * -100;
        $(".a_down .lunbo .box").animate({left:lx_l+"px"},500);
    })
    $(".a_down .next").click(function(){
        lx_num++;
        if (lx_num==3) {
            lx_num = 0;
            $(".a_down .lunbo .box").css({left:"0px"});
        };
        var lx_l = lx_num * -100;
        $(".a_down .lunbo .box").animate({left:lx_l+"px"},500);
    })




    // 闪团小滑块效果，100，165，235
    var sl = ["100px","165px","235px"];
    $("#shan .tab li").hover(function(){
        var tab_num = $(this).index();
        $(this).parents('.head').siblings('.body').find('.tabs').eq(tab_num).css({display:"block"}).siblings().css({display:"none"});
        $(".tab_sw").stop().animate({left:sl[tab_num]},500);
    })

    // 电梯楼层
    $(window).scroll(function(){
        var top = $(window).scrollTop();
        var f = -1;
        // 滚动一定距离显示侧边电梯，返回电梯消失。
        if (top>=50) {

            $("#dianti").fadeIn(500);
        }else{

            $("#dianti").fadeOut(500);
        };
        // 定义楼层高度数组
        var floor = ["1150px","1565px","1980px","2395px","2990px","3400px","3815px","4400px","5000px","5390px","0px"];
        // 点击跳转
        $("#dianti a").click(function(){
            dt = $(this).index();
            $('html,body').stop().animate({scrollTop: floor[dt]}, 500);
            // 延后显示，防止闪烁
            setTimeout(function(){
                $(this).addClass("cur").siblings().removeClass("cur");
            },100)
            
        })
        var f = -1;
        if (top>=5390) {
            f=9;
        }else if(top>=5000){
            f=8;
        }else if(top>=4400){
            f=7;
        }else if(top>=3815){
            f=6;
        }else if(top>=3400){
            f=5;
        }else if(top>=2990){
            f=4;
        }else if(top>=2395){
            f=3;
        }else if(top>=1980){
            f=2;
        }else if(top>=1565){
            f=1;
        }else if(top>=1000){
            f=0;
        }else{
            f=-1;
        };
        if (f==-1) {
            $("#dianti a").removeClass("cur");
        }else{
            $("#dianti a").eq(f).addClass("cur").siblings().removeClass("cur");
        };
    })
})