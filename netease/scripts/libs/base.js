/**
 * 网易微专业基础js类库
 * 部分API模仿JQ，参照JQ部分源码
 * 大部分实现都比较简陋，未考虑那么周全
 * Created by Fire on 2016/10/5.
 */

(function() {
    /**
     * 以工厂方式实现无new操作
     * @param selector 选择器名称
     * @param context 选择器上下文
     * @return Base实例化对象
     */
    var Base = function(selector, context) {
        return new Base.prototype.init(selector, context);
    };

    Base.fn = Base.prototype = {
        // 修正 constructor
        constructor: Base,
        // 模仿 jQuery 的封装方式，伪数组方式保存元素，length 表示内部元素个数
        length: 0
    };

    /**
     * 初始化
     * @param selector 选择器名称
     * @param context 选择器上下文
     */
    var init = Base.fn.init = function(selector, context) {
        var context = context || document;
        if(selector) {
            // 若传入的为函数，则在 DOM Ready 触发后执行
            if(typeof selector === 'function') {
                Base.ready(selector);
                return;
            }
            // 如果是 < 开头的，则生成节点
            if(typeof selector === 'string' && /^</.test(selector)) {
                var container = context.createElement('div');
                container.innerHTML = selector;
                this[0] = container.children[0];
                this.length = 1;
                return this;
            }
            // 如果是节点，则直接生成返回
            if(selector.nodeType === 1) {
                this[0] = selector;
                this.length =1;
                return this;
            }
            var elements = context.querySelectorAll(selector);
            for(var i = 0; i < elements.length; i++) {
                this[i] = elements[i];
            }
            this.length = elements.length;
        }
        return this;
    };

    // 将 Base.fn.init 的原型指向Base的原型
    init.prototype = Base.fn;

    /**
     * 扩展方法，仅供内部使用，直接将扩展方法附加到 Base.prototype
     * @param options 扩展方法共同组成的对象
     */
    function extend(options) {
        for(var i in options) {
            Base.fn[i] = options[i];
        }
    };

    // 工具方法合集
    // 删除前后空白
    Base.trim = function(str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    };
    // 合并对象
    Base.merge = function(first, second) {
        var	len = second.length,
            j = 0,
            i = first.length;
        for(; j < len; j++) {
            first[i++] = second[j];
        }
        first.length = i;
        return first;
    };
    // 获取节点位置
    Base.getPosition = function(elem) {
        var result = {};
        var clientReact = elem.getBoundingClientRect();
        result.top = clientReact.top;
        result.bottom = clientReact.bottom;
        result.left = clientReact.left;
        result.right = clientReact.right;
        result.height = clientReact.height;
        result.width = clientReact.width;
        return result;
    }

    // 获取具体节点
    extend({
        // 获取指定位置节点
        get: function(index) {
            return	index != null ?
                (index < 0 ? this[index + this.length] : this[num]) :
                [].slice.call(this);
        }
    });

    // 获取具体节点，不过返回的是含实际找到节点的 Base 对象
    extend({
        // 利用选择器查找 Base 对象下的指定节点
        find: function(selector) {
            var result = Base();
            // 遍历 Base 对象，以其作为上下文，生成新的 Base 对象，通过 merge 来合并
            for(var i = 0; i < this.length; i++) {
                Base.merge(result, Base(selector, this[i]));
            }
            return result;
        },
        // 获取指定位置节点，并以 Base 类型返回
        eq: function(index) {
            var index = index < 0 ? (index + this.length) : index;
            return Base.merge(Base(), {0: this[index]});
        },
        first: function() {
            return this.eq(0);
        },
        last: function() {
            return this.eq(-1);
        }
    });

    /**
     * 在 Base 对象上添加 DOM 节点
     * @param thisInstantiate Base对象
     * @param position 添加的位置（insertAdjacentHTML 的几个可取值范围）
     * @param htmlStr 添加的具体内容
     */
    function domAppend(thisInstantiate, position, htmlStr) {
        for(var i = 0; i < thisInstantiate.length; i++) {
            thisInstantiate[i].insertAdjacentHTML(position, htmlStr);
        }
    }
    // 节点添加、删除等相关操作
    extend({
        // 将 html 挂载到相应节点
        html: function(value) {
            var elem = this[ 0 ] || {};
            if(value === undefined && elem.nodeType === 1) {
                return elem.innerHTML;
            } else {
                for(var i = 0; i < this.length; i++) {
                    this[i].innerHTML = value;
                }
            }
            return this;
        },
        // 将新节点添加作为第一个子节点
        insertToBeFirstPlace: function(elem) {
            for(var i = 0; i < this.length; i++) {
                this[i].insertBefore(elem[0], this[i].childNodes[0]);
            }
        },
        append: function(htmlStr) {
            // 如果传入的是 Base 对象，则直接添加
            if(htmlStr.constructor === Base) {
                for(var i = 0; i < this.length; i++) {
                    this[i].appendChild(htmlStr[0]);
                }
            } else {
                domAppend(this, 'beforeEnd', htmlStr);
            }
            return this;
        },
        before: function(htmlStr) {
            domAppend(this, 'beforeBegin', htmlStr);
            return this;
        },
        after: function(htmlStr) {
            domAppend(this, 'afterEnd', htmlStr);
            return this;
        },
        atStart: function(htmlStr) {
            domAppend(this, 'afterBegin', htmlStr);
            return this;
        },
        // 删除节点自身
        remove: function() {
            for(var i = 0; i < this.length; i++) {
                this[i].parentNode.removeChild(this[i]);
            }
            return this;
        }
    });
    // css 相关处理方法
    extend({
        hasClass: function (cls) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            for (var i = 0; i < this.length; i++) {
                if (this[i].className.match(reg)) return true;
                return false;
            }
            return this;
        },
        addClass : function(cls) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            for (var i = 0; i < this.length; i++) {
                if(!this[i].className.match(reg))
                    this[i].className += ' ' + cls;
            }
            return this;
        },
        removeClass : function(cls) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            for (var i = 0; i < this.length; i++) {
                if (this[i].className.match(reg)) {
                    this[i].className = this[i].className.replace(' ' + cls, '');
                }
            }
            return this;
        },
        css: function (attr, val) {
            for(var i = 0;i < this.length; i++) {
                if(arguments.length == 1) {
                    return window.getComputedStyle
                        ? window.getComputedStyle(this[i],null)[attr]
                        : this[i].currentStyle[attr];
                }
                this[i].style[attr] = val;
            }
            return this;
        },
        resetCss: function () {
            for(var i = 0; i < this.length; i++) {
                this[i].removeAttribute('style');
            }
            return this;
        }
    });

    // 事件相关处理兼容性的函数
    Base.eventCompatibility = {
        addEventListener: function(element, type, fn) {
            if(element.addEventListener) {
                element.addEventListener(type, fn, false);
            } else {
                element.attachEvent('on' + type, fn);
            }
        },
        removeEventListener: function(element, type, fn) {
            if(element.removeEventListener) {
                element.removeEventListener(type, fn);
            } else {
                element.detachEvent(type, fn);
            }
        },
        dispathEvent: function(element, event) {
            if(element.dispathEvent) {
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent(event, true, true);
                return !element.dispathEvent(evt);
            } else {
                var evt = document.createEventObject();
                return element.fireEvent('on' + event, evt);
            }
        },
        getEvent: function(event) {
            return event || window.event;
        },
        getTarget: function(event) {
            var event = Base.eventCompatibility.getEvent(event);
            return event.target || event.srcElement;
        },
        fromElement: function(event) {
            var event = Base.eventCompatibility.getEvent(event);
            return event.relatedTarget || event.fromElement;
        },
        toElement: function (event) {
            var event = Base.eventCompatibility.getEvent(event);
            return event.relatedTarget || event.toElement;
        },
        // 阻止默认行为
        preventDefault: function(event) {
            var event = Base.eventCompatibility.getEvent(event);
            if(event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        // 阻止冒泡
        stopPropagation: function(event) {
            var event = Base.eventCompatibility.getEvent(event);
            if(event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        }
    };
    // 事件相关操作
    extend({
        // addEventListener 封装
        on: function(type, fn) {
            for(var i = 0; i < this.length; i++) {
                Base.eventCompatibility.addEventListener(this[i], type, fn);
            }
            return this;
        },
        // removeEventListener 封装
        off: function(type, fn) {
            for(var i = 0; i < this.length; i++) {
                Base.eventCompatibility.removeEventListener(this[i], type, fn);
            }
            return this;
        },
        // 立即触发方法
        trigger: function(event) {
            for(var i = 0; i < this.length; i++) {
                Base.eventCompatibility.dispathEvent(this[i], event);
            }
            return this;
        },
        // 事件委托封装
        delegate: function(type, selector, fn) {
            return this.on(type, function(event) {
                var target = Base.eventCompatibility.getTarget(event);
                // 事件冒泡时，遍历所有子孙后代，查找对应元素，找到则执行回调
                if(target.nodeName.toLowerCase() === selector || target.id === selector || target.className.indexOf(selector) !== -1) {
                    // 修正 fn 的 this 指向，使其指向 dom 元素自身
                    fn.call(target);
                    Base.eventCompatibility.stopPropagation(event);
                }
            });
        },
        // 将事件触发集中到指定父元素进行处理
        delegateParent: function(type, selector, fn) {
            return this.on(type, function(event) {
                var target = Base.eventCompatibility.getTarget(event);
                // 防止子元素直接截断事件，一直往上找，找到指定项为止
                while(target && target.nodeName.toLowerCase() !== 'body') {
                    if(target.nodeName.toLowerCase() === selector) {
                        // 修正 fn 的 this 指向，使其指向 dom 元素自身
                        fn.call(target);
                        Base.eventCompatibility.stopPropagation(event);
                        break;
                    }
                    target = target.parentNode;
                }
            });
        },
        // 单独进行 mouseover 委托处理
        mouseoverDelegate: function(selector, fn) {
            return this.on('mouseover', function(event) {
                var target = Base.eventCompatibility.getTarget(event);
                while(target && target.nodeName.toLowerCase() !== 'body') {
                    if(target.nodeName.toLowerCase() === selector) {
                        // 判定鼠标从何处而来，如果是从需要执行相应操作的子元素而来，则直接返回
                        var from = Base.eventCompatibility.fromElement(event);
                        while(from && from.nodeName.toLowerCase() !== 'body') {
                            if(from === target) {
                                return;
                            }
                            from = from.parentNode;
                        }
                        // 修正 fn 的 this 指向，使其指向 dom 元素自身
                        fn.call(target);
                        Base.eventCompatibility.stopPropagation(event);
                        break;
                    }
                    target = target.parentNode;
                }
            });
        },
        // 单独进行 mouseout 委托处理
        mouseoutDelegate: function(selector, fn) {
            return this.on('mouseout', function(event) {
                var target = Base.eventCompatibility.getTarget(event);
                while(target && target.nodeName.toLowerCase() !== 'body') {
                    if(target.nodeName.toLowerCase() === selector) {
                        var to = Base.eventCompatibility.toElement(event);
                        while(to && to.nodeName.toLowerCase() !== 'body') {
                            if(to === target) {
                                return;
                            }
                            to = to.parentNode;
                        }
                        // 修正 fn 的 this 指向，使其指向 dom 元素自身
                        fn.call(target);
                        Base.eventCompatibility.stopPropagation(event);
                        break;
                    }
                    target = target.parentNode;
                }
            });
        }
    });
    // cookie 相关操作
    Base.setCookie = function(name, value, expires, path, domain, secure) {
        var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
        if (expires)
            cookie += '; expires=' + expires.toGMTString();
        if (path)
            cookie += '; path=' + path;
        if (domain)
            cookie += '; domain=' + domain;
        if (secure)
            cookie += '; secure=' + secure;
        document.cookie = cookie;
    };
    Base.getCookies = function() {
        var cookies = {};
        var all = document.cookie;
        if (all === '')
            return cookies;
        var list = all.split('; ');
        for (var i = 0; i < list.length; i++) {
            var item = list[i];
            var p = item.indexOf('=');
            var name = item.substring(0, p);
            name = decodeURIComponent(name);
            var value = item.substring(p + 1);
            value = decodeURIComponent(value);
            cookies[name] = value;
        }
        return cookies;
    };
    Base.getCookie = function(name) {
        return Base.getCookies()[name];
    };
    Base.deleteCookie = function(name) {
        document.cookie = name + '=' + '; max-age=0';
    };

    // ajax 相关操作
    function formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace("."));
        return arr.join("&");
    };

    function ajax(options) {
        var defaultOptions = {
            url: null,
            type: 'GET',
            data: null,
            success: undefined,
            complete: undefined
        };
        for(var i in defaultOptions) {
            if(options[i] === undefined) {
                options[i] = defaultOptions[i];
            }
        }
        if(options.data) {
            options.data = formatParams(options.data);
        }
        var xhr;
        try {
            xhr = new XMLHttpRequest();
        } catch(e) {
            var IEXHRVers =["Msxml3.XMLHTTP","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];
            for (var i=0,len=IEXHRVers.length;i< len;i++) {
                try {
                    xhr = new ActiveXObject(IEXHRVers[i]);
                } catch(e) {continue;}
            }
        }
        if(options.type === 'GET') {
            options.url += ('?' + options.data);
            options.data = null;
        }
        var url = options.url;
        xhr.open(options.type, url);
        xhr.onreadystatechange =  onStateChange;
        if(options.type === 'POST') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhr.send(options.data);

        function onStateChange() {
            if(xhr.readyState === 4) {
                var result, status = xhr.status;
                if((status >= 200 && status < 300) || status == 304) {
                    result = xhr.responseText;
                    if(window.JSON) {
                        result = JSON.parse(result);
                    } else {
                        result = eval('(' + result + ')');
                    }
                    ajaxSuccess(result, xhr);
                } else {
                    console.log('ERR', xhr.status);
                }
            }
        }
        function ajaxSuccess(data, xhr) {
            var status = 'success';
            options.success && options.success(data, options, status, xhr);
            ajaxComplete(status);
        }
        function ajaxComplete(status) {
            options.complete && options.complete(status);
        }
    }
    Base.ajaxGet = function (url, data, sucBack, complete) {
        var options = {
            url: url,
            data: data,
            success: sucBack,
            complete: complete
        };
        ajax(options);
    };
    Base.ajaxPost = function (url, data, sucBack, complete) {
        var options = {
            url: url,
            type: 'POST',
            data: data,
            success: sucBack,
            complete: complete
        };
        ajax(options);
    };

    /**
     * 国外大牛提供的 IE 下的 DOMContentLoaded 效果
     * 来源：http://javascript.nwbox.com/IEContentLoaded/
     * @param w 一般情况下就是 window
     * @param fn 回调函数
     */
    function IEContentLoaded(w, fn) {
        var d = w.document, done = false,
            // 执行回调函数
            init = function() {
                if(!done) {
                    done = true;
                    fn();
                }
            };
        (function tmp() {
            try {
                // DOM 树创建未完成时调用 doScroll 会抛出异常
                d.documentElement.doScroll('left');
            } catch(e) {
                // 如果抛出异常，则延时，再尝试
                setTimeout(tmp, 50);
                return;
            }
            // 未抛出异常，正常走到此处证明 DOM 树创建完毕，执行回调函数
            init();
        })();
        // 监听 document 加载状态
        d.onreadystatechange = function() {
            // 如果是在 domReady 触发之后才绑定的，则立即执行
            if(d.readyState == 'complete') {
                d.onreadystatechange = null;
                init();
            }
        };
    }
    /**
     * DOM 树加载完毕后执行回调函数，正常情况下比 load 快，不必等资源全部加载完毕
     * @param fn 回调函数
     */
    Base.ready = function(fn) {
        // IE8 及以下浏览器不支持 DOMContentLoaded，同时也不支持 addEventListener，故作此判定
        if(document.addEventListener) {
            document.addEventListener('DOMContentLoaded', function() {
                fn && fn();
            }, false);
            document.removeEventListener('DOMContentLoaded', fn, true);
        } else {
            IEContentLoaded(window, fn);
        }
    }

    // 通过挂载到 window 上，将 Base 暴露出去
    window.$$ = window.Base = Base;

    return Base;
})();