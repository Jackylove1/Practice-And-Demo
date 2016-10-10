/**
 * 顶部广告条
 * Created by Fire on 2016/10/5.
 */
function AdBannerComponent(htmlstr) {
    BaseCompontent.call(this, htmlstr);
}

AdBannerComponent.prototype = {
    constructor: AdBannerComponent,

    show: function () {
        $$('body').insertToBeFirstPlace(this.elem);
    },
    close: function () {
        this.elem.remove();
    }
};

var adBanner = function() {
    var adBanner = new AdBannerComponent('\
        <div class="ad-banner">\
            <div class="w">\
                <div class="fl">\
                    网易云课堂微专业，帮助你掌握专业技能，令你求职或加薪多一份独特优势！&nbsp; <a href="javascript:void(0)">立即查看&gt;</a>\
                </div>\
                <div class="ad-close fr" id="adClose"><i class="ad-close-icon"></i>不再提醒</div>\
            </div>\
        </div>'
    );
    adBanner.elem.find('#adClose').on('click', function () {
        adBanner.close();
        $$.setCookie('adBanner', 1);
    });
    return adBanner;
};

