/**
 * Created by Fire on 2016/10/8.
 */
(function() {
    function VideoCompoent(htmlStr) {
        BaseCompontent.call(this, htmlStr);

        this.videoClose = this.elem.find('#videoAlertClose');
    }

    VideoCompoent.prototype = {
        constructor: VideoCompoent,

        show: function () {
            $$('body').append(this.elem);
        },
        close: function () {
            this.elem.remove();
        }
    }
    window.VideoCompoent = VideoCompoent;
})();

var video = function() {
    var video = new VideoCompoent('\
        <div>\
            <div class="mask"></div>\
            <div class="video-alert">\
                <i class="video-alert-close" id="videoAlertClose"></i>\
                <div class="video-alert-content">\
                    <h1>请观看下面的视频</h1>\
                    <video src="http://mov.bn.netease.com/open-movie/nos/mp4/2014/12/30/SADQ86F5S_shd.mp4"  controls="controls"></video>\
                </div>\
            </div>\
        </div>'
    );

    video.videoClose.on('click', function() {
        video.close();
    });

    return video;
};