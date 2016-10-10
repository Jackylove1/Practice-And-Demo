/**
 * Created by Fire on 2016/10/7.
 */
(function () {
    function SliderComponent(parents, images) {
        this.images = images;

        this.width = images[0].width;
        this.height = images[0].height;
        this.imgCnt = images.length;

        var data = preData(images);

        this.sliderUl = $$('#' + parents[0]).html(data.images);
        this.sliderPointer = $$('#' + parents[1]).html(data.pointers);
    }

    SliderComponent.prototype = {
        constructor: SliderComponent,

        init: function () {
            $$('.slider').css('width', this.width + 'px').css('height', this.height + 'px');
            this.sliderUl.css('width', this.width * this.imgCnt + 'px').css('height', this.height + 'px');
            this.sliderUl.find('li').css('width', this.width + 'px').css('height', this.height + 'px');
            this.sliderPointer.css('width', this.imgCnt * 22).css('marginLeft', '-' + this.imgCnt * 22 / 2 + 'px');
            $$('#sliderPointer0').css('backgroundImage', 'url(images/slider-selected.png)');
        }
    };
    // 预处理、拼装 images、pointers
    function preData(images) {
        var result = {images: '', pointers: ''};
        for(var i = 0; i < images.length; i++) {
            result.images +=
                ('<li class="fl" id="sliderImage' + i + '">'
                + '<img src="' + images[i].url + '" alt="' + images[i].text + '"'
                + '</li>');

            result.pointers += '<i id="sliderPointer' + i + '"></i>';
        }
        return result;
    }
    window.SliderComponent = SliderComponent;
})();

function slider() {
    var slider = new SliderComponent(
        ['sliderUl', 'sliderPointer'],
        [
            {url: 'images/banner1.jpg', text: 'banner1', width: 1652, height: 460, href: 'http://open.163.com/'},
            {url: 'images/banner2.jpg', text: 'banner2', href: 'http://study.163.com/'},
            {url: 'images/banner3.jpg', text: 'banner3', href: 'http://www.icourse163.org/'}
        ]
    );
    slider.init();

    var width = slider.width;
    var imgCnt = slider.imgCnt;

    var toLeft = slider.sliderUl[0].style.left || 0;

    var sliderInter;
    function startInter() {
        return setInterval(function () {
            toLeft -= width;
            if(toLeft + width * imgCnt === 0) {
                toLeft = 0;
            }
            // 小圆点全部恢复默认样式
            slider.sliderPointer.find('i').css('backgroundImage', '');
            // 通过先前绑定的 id 后面的数值来确定对应关系
            var num = (0 - toLeft) / width;
            $$('#sliderPointer' + num).css('backgroundImage', 'url(images/slider-selected.png)');
            slider.sliderUl.css('left', toLeft + 'px');
            fadein(slider.sliderUl[0]);
        }, 5000);
    };

    sliderInter = startInter();
    // 鼠标悬停，循环停止
    slider.sliderUl.mouseoverDelegate('li', function () {
        clearInterval(sliderInter);
    });
    // 鼠标离开后，继续开始循环
    slider.sliderUl.mouseoutDelegate('li', function () {
        sliderInter = startInter();
    });
    // 绑定小圆点点击事件
    slider.sliderPointer.delegateParent('click', 'i', function () {
        slider.sliderPointer.find('i').css('backgroundImage', '');
        $$(this).css('backgroundImage', 'url(images/slider-selected.png)');
        var id = this.id.slice(13) - 0;
        slider.sliderUl.css('left', '-' + (id * width) + 'px');
    });
    // 绑定图片点击事件
    slider.sliderUl.delegateParent('click', 'li', function () {
        var id = this.id.slice(11) - 0;
        window.location.href = slider.images[id].href;
    });
    // 淡入
    function fadein(element) {
        var val = 0;
        var inter = setInterval(function () {
            element.filters ?
                element.style.filter = 'alpha(opacity=' + 100 * val + ')' :
                element.style.opacity = val;
            val += 0.1;
            if(val > 1) {
                clearInterval(inter);
            }
        }, 100);
    }
}