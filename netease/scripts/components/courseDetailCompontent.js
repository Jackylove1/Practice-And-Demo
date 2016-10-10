/**
 * Created by Fire on 2016/10/7.
 */
(function() {
    function CourseDetailCompontent(parent, data) {
        this.parent = $$(parent);
        this.totalCount = data.totalCount;
        this.totalPage = data.totalPage;
        this.pageIndex = data.pagination.pageIndex;
        this.list = preList(data.list);
    }
    CourseDetailCompontent.prototype = {
        constructor: CourseDetailCompontent,
        // 实现悬浮效果
        hover : function () {
            var expand = undefined;
            var list = this.list;
            this.parent.mouseoverDelegate('li', function(){
                var firstChild = this.getElementsByTagName('div')[0];
                expand = createExpand(list, firstChild.id);
                expand && expand.css('bottom', '0').css('left', '0');
                expand && firstChild.appendChild(expand[0]);
            }).mouseoutDelegate('li', function(){
                expand && expand.remove();
            });
        },
        // 初始化显示主体部分
        showCourse: function (parent) {
            return Loop({
                el: parent,
                data: {
                    courses: this.list
                }
            });
        },
        // 显示页码
        showPageNo: function (parent) {
            var ret =  Loop({
                el: parent,
                data: {
                   pages: opPageNo(this.pageIndex, 8)
                }
            });
            // 给页码附加样式
            var pageNumNodes = $$('#pageNum li');
            pageNumNodes.removeClass('page-selected');
            $$(pageNumNodes[0]).addClass('page-first');
            $$(pageNumNodes[pageNumNodes.length - 1]).addClass('page-last');
            // 考虑到以 5 为单位，超过其倍数，码数就会变化，原来的码数不在原位，所以需要重新找寻其位置，给正确的元素样式
            for(var i = 1; i < pageNumNodes.length; i++) {
                if(pageNumNodes[i].innerText == this.pageIndex) {;
                    $$(pageNumNodes[i]).addClass('page-selected')
                    break;
                }
            }
            return ret;
        }
    };
    // 以 ID 为唯一标识，创建弹出框
    function createExpand(list, id) {
        for(var i = 0; i < list.length; i++) {
            // 弱匹配
            if(id == list[i].id) {
                return $$($$.trim(htmlStr(list[i])));
            }
        }
    }
    // 拼接弹出框字符串
    function htmlStr(course) {
        return '\
            <div class="expand">\
                <div class="expand-top clearfix">\
                    <img class="fl" src="' + course.smallPhotoUrl + '" alt="' + course.name + '">\
                    <div class="fl">\
                        <h2>' + course.name + '</h2>\
                        <div class="learn-count"><i><span>' +  course.learnerCount + '人在学</span></i></div>\
                        <div class="provider">发布者：' + course.provider + ' </div>\
                        <div class="category">分类： ' + course.categoryName + '</div>\
                    </div>\
                </div>\
                <div class="expand-description">\
                    ' +  course.description +'\
                </div>\
            </div>\
        ';
    }
    // list 处理，把没有单价的替换为免费，没有图的替换为读取失败的图，没有的都改成无
    function preList(list) {
        for(var i = 0; i < list.length; i++) {
            list[i].price = list[i].price ? '￥' + list[i].price : '免费';
            list[i].smallPhotoUrl = list[i].smallPhotoUrl  || 'http://img1.ph.126.net/eg62.png';
            list[i].categoryName = list[i].categoryName || '无';
        }
        return list;
    }
    // 将页码处理为 Loop 能识别的对象
    function opPageNo(pageIndex, maxPage) {
        var pages = [];
        pages.push({num: '&lt;'});
        // 以 5 为单位，大于 5，或者其倍数，页码起始就要变化
        var tmp = Math.floor(pageIndex / 5);
        for(var i = 1; i <= maxPage; i++) {
            var page = {};
            page.num = i + tmp * 5;
            pages.push(page);
        }
        pages.push({num: '&gt'});
        return pages;
    }

    window.CourseDetailCompontent = CourseDetailCompontent;
})();

function  courseDetail() {
    // 筛选类型
    var cate = '10';
    // 当前页码
    var pageIndex = 1;
    // 原先存在的模板
    var template = undefined;
    // 页码模板
    var pageTemplate = undefined;

    getData(pageIndex, 20, cate);

    // 给 Tab 绑定点击事件
    $$('#courseCategory li').on('click', function() {
        $$('#courseCategory li').removeClass('selected');
        $$(this).addClass('selected');
        cate = this.value;
        pageIndex = 1;
        getData(pageIndex, 20, cate);
    });
    // 给页码绑定点击事件
    $$('#pageNum').delegateParent('click', 'li', function() {
        if(this.innerText == '<') {
            pageIndex -= 1;
            if(pageIndex < 1) pageIndex = 1;
        } else if(this.innerText == '>') {
            pageIndex += 1;
        } else {
            pageIndex = this.innerText - 0;
        }
        getData(pageIndex, 20, cate);
    });
    // 处理 URL 附加数据
    function urlData(pageNo, psize, type) {
        return {pageNo: pageNo, psize: psize, type: type};
    }
    // 通过 ajax 获取数据
    function getData(pageIndex, psize, type) {
        $$.ajaxGet('http://study.163.com/webDev/couresByCategory.htm', urlData(pageIndex, psize, type), function(data) {
            if(!data) return;
            // 获取数据之前先恢复模板，不然数据找不到家
            template && $$('#courseDetail').html('').append($$(template));
            pageTemplate && $$('#pageNum').html('').append($$(pageTemplate));
            var courses = new CourseDetailCompontent('#courseDetail', data);
            template = courses.showCourse('courseDetail');
            pageTemplate = courses.showPageNo('pageNum');
            courses.hover();
        });
    }
}