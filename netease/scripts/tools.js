/**
 * Created by Fire on 2016/10/8.
 */
function getWindowSize() {
    var result = {width: 0, height: 0};
    // 获得窗口宽度
    if (window.innerWidth)
        result.width = window.innerWidth;
    else if ((document.body) && (document.body.clientWidth))
        result.width = document.body.clientWidth;
    // 获取窗口高度
    if (window.innerHeight)
        result.height = window.innerHeight;
    else if ((document.body) && (document.body.clientHeight))
        result.height = document.body.clientHeight;
    // 通过深入 Document 内部对 body 进行检测，获取窗口大小
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        result.height = document.documentElement.clientHeight;
        result.width = document.documentElement.clientWidth;
    }

    return result;
}