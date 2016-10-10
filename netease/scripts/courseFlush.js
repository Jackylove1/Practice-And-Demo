/**
 * Created by Fire on 2016/10/8.
 */
// 课程滚动
function courseFlush() {
    var toTop = $$('#scrollCourses')[0].style.top || 0;
    var height = 70;
    var totalHeight = 70 * 20;
    // 5s 滚动一次
    setInterval(function () {
        toTop -= height;
        if(toTop + totalHeight < 0) {
            toTop = 0;
            $$('#scrollCourses').css('top', toTop + 'px');
        } else {
            $$('#scrollCourses').css('top', toTop + 'px');
            var timer = 0;
            // 1s 时间滚动
            var inter = setInterval(function () {
                if(timer === 1000) {
                    clearInterval(inter);
                }
                toTop -= 0.07;
                $$('#scrollCourses').css('top', toTop + 'px');
                timer++;
            }, 1000);

            // 调整小数计算造成的偏移
            toTop = Math.floor(toTop / 70) * 70;
        }
    }, 5000);
}