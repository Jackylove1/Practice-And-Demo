/**
 * Created by Fire on 2016/10/5.
 */
$$(function(){
    // 窗体小于 1205 就把 small.css 加到最后，覆盖前面的同类css
    if(getWindowSize().width < 1205) {
        $$('head').append('<link rel="stylesheet" href="styles/small.css">');
    };
    // 窗口大小改变时，刷新页面
    $$('window').on('resize', function () {
        window.location.reload();
    })
    // 设置顶端广告栏
    if(!$$.getCookie('adBanner')){
        adBanner().show();
    }
    // 小导航
    // 已关注
    function followed() {
        $$('#follow').css('display', 'none');
        $$('#followed').css('display', 'inline');
    }
    // 如果没关注，就先登录再关注；如果已关注，直接显示关注状态
    if(!$$.getCookie('followSuc')) {
        $$('#follow').on('click', function () {
            if ($$.getCookie('loginSuc')) {
                $$.setCookie('followSuc', 1);
                followed();
            } else {
                var loginT = login();
                loginT.show();
            }
        });
    } else {
        followed();
    }
    // 轮播图
    slider();

    // 大导航
    Loop({
        el: 'product-show',
        data: {
            products: [
                {
                    icon: 'open-course',
                    title: '网易公开课',
                    content: '推出国内外名校公开课，涉及广泛的学科，名校老师认真讲解深度剖析，网易视频公开课频道搭建起强有力的网络视频教学平台。',
                    href: 'http://open.163.com/'
                },
                {
                    icon: 'cloud-class',
                    title: '云课堂',
                    content: '网易旗下大型在线学习平台，该平台面向学习者提供海量免费、优质课程,创新的个性化学习体验，自由开放的交流互动环境。',
                    href: 'http://study.163.com/'
                },
                {
                    icon: 'chinese-mooc',
                    title: '中国大学MOOC',
                    content: '是爱课程网携手云课堂打造的在线学习平台，每一个有提升愿望的人,都可以在这里学习中国最好的大学课程，学完还能获得认证证书。',
                    href: 'http://www.icourse163.org/'
                }
            ]
        }
    });
    // 视频播放
    $$('#videoPlay').on('click', function () {
        video().show();
    });
    // 课程信息
    courseDetail();

    $$.ajaxGet('http://study.163.com/webDev/hotcouresByCategory.htm', null, function (data) {
        // 多加一屏幕，保证滚动流畅性
        data = data.concat(data.slice(0, 10));
        Loop({
            el: 'scrollCourses',
            data: {
                courses: data
            }
        });
    });
    // 课程滚动
    courseFlush();
});