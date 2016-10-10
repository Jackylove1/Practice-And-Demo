/**
 * 登录框
 * Created by Fire on 2016/10/6.
 */
(function() {
    function LoginCompoent(htmlStr) {
        BaseCompontent.call(this, htmlStr);

        this.username = this.elem.find('#username');
        this.password = this.elem.find('#password');
        this.loginClose = this.elem.find('#loginClose');
        this.loginBtn = this.elem.find('#loginBtn');

        this.loginBtn[0].disabled = true;
    }

    var btnCheck = {
        usernameCheck: false,
        passwordCheck: false
    }

    var username = null;
    var password = null;

    function init(elem, value, color) {
        elem.value = value;
        elem.style['color'] = color;
    }

    function checkInit(loginBtn, elem, value, color, check) {
        loginBtn.disabled = true;
        if(!/^[\s\S]*[\S]+[\s\S]*$/.test(elem.value)) {
            elem.type = 'text';
            elem.value = value;
            elem.style['color'] = color;
            btnCheck[check] = false;
        } else {
            btnCheck[check] = true;
        }
        btnCheck.usernameCheck && btnCheck.passwordCheck && (loginBtn.disabled = false);
    }

    LoginCompoent.prototype = {
        constructor: LoginCompoent,
        // 初始化检验
        init: function () {
            this.username.on('focus', function() {
                init(this, '', '#000');
            });
            this.password.on('focus', function () {
                init(this, '', '#000');
                this.type = 'password';
            });
        },
        // 输入检验
        checkInit: function () {
            var loginBtn = this.loginBtn[0];
            this.username.on('blur', function () {
                checkInit(loginBtn, this, '用户名不能为空', 'red', 'usernameCheck');
                username = this.value;
            });
            this.password.on('blur', function () {
                checkInit(loginBtn, this, '密码不能为空', 'red', 'passwordCheck');
                password = this.value;
            });
        },
        show: function () {
            $$('body').append(this.elem);
        },
        close: function () {
            this.elem.remove();
        },
        // 验证
        post: function() {
            this.loginBtn.on('click', function () {
                username = md5(username);
                password = md5(password);
                var data = {userName: username,  password: password};
                $$.ajaxPost('http://study.163.com/webDev/login.htm', data, function(result, sucOp) {
                    if(result == 0) {
                        alert('用户名或密码错误，请重新输入！');
                    }
                    if(result == 1) {
                        $$.setCookie('loginSuc', 1);
                        $$.setCookie('followSuc', 1);
                        window.location.reload();
                    }
                });
            });
        }
    }
    window.LoginCompoent = LoginCompoent;
})();

var login = function() {
    var login = new LoginCompoent('\
        <div>\
            <div class="mask"></div>\
            <div class="login">\
                <i class="login-close" id="loginClose"></i>\
                <div class="login-content">\
                    <h1>登录网易云课堂</h1>\
                    <input id="username"  type="text" name="" value="账号">\
                    <input id="password" type="text" name="" value="密码">\
                    <button id="loginBtn">登录</button>\
                </div>\
            </div>\
        </div>'
    );

    login.init();
    login.checkInit();
    login.loginClose.on('click', function() {
        login.close();
    });
    login.post();

    return login;
};