window.onload = function() {
    // 获取导航栏元素
    var navLi = document.getElementsByClassName("top-nav-li");
    // 封装tab栏切换函数
    var navFunc = function(i, width, left) {
        navLi[i].onmouseover = function() {
            var navUl = navLi[i].lastElementChild;
            navUl.style.display = "inline";
            var navline = document.getElementById("navline");
            navline.style.width = width;
            navline.style.left = left;
        };
        navLi[i].onmouseout = function() {
            var navUl = navLi[i].lastElementChild;
            if (i !== 0 && i !== 5) {
                navUl.style.display = "none";
            }
            navLi[i].style.borderTop = "";
            navline.style.width = 0;
        };
    };
    navFunc(0, "69px", "255px");
    navFunc(1, "120px", "325px");
    navFunc(2, "120px", "445px");
    navFunc(3, "120px", "565px");
    navFunc(4, "120px", "685px");
    navFunc(5, "69px", "804px");

    // 动画函数
    function animate(obj, target, callback) {
        // 初始化定时器
        obj.timer ? clearInterval(obj.timer) : obj.timer;
        // 开启定时器
        obj.timer = setInterval(function() {
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer);
                // 回调函数写在定时器结束时
                callback ? callback() : callback;
            }
            // 给对象左距离赋值
            obj.style.left = target + "px";
        }, 15);
    }

    // 获取元素
    var banner = document.querySelector(".banner");
    var ul = document.querySelector("#publish-copy");
    var dot = document.querySelector("#b_dot");

    // 设置ul
    ul.style.width = banner.offsetWidth * 6 + "px";
    ul.style.position = "absolute";
    banner.style.overflow = "hidden";

    // 克隆第一个li,并添加到ul
    var newLi = ul.children[0].cloneNode(true);
    ul.appendChild(newLi);

    // 获取li
    var lis = ul.querySelectorAll("li");
    // 设置li的位置,添加index属性
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.left = banner.offsetWidth * i + "px";
        lis[i].style.width = banner.offsetWidth + "px";
        lis[i].setAttribute("index", i);
    }

    var num = 0;
    var check = 0;
    var t;
    // 封装自动播放函数
    function timer() {
        t = setInterval(function() {
            if (num == lis.length - 1) {
                ul.style.left = 0;
                num = 0;
                ul.style.transition = "";
            }
            num++;
            animate(ul, -num * banner.offsetWidth);
            // 小圆点跟随
            check++;
            if (check == dot.children.length) {
                check = 0;
            }
            for (var i = 0; i < dot.children.length; i++) {
                dot.children[i].className = "";
            }
            dot.children[check].className = "on";
        }, 2000);
    }
    timer();

    // 鼠标移动事件
    for (var i = 0; i < lis.length; i++) {
        lis[i].onmouseover = function() {
            clearInterval(t);
        };
        lis[i].onmouseout = function() {
            timer();
        };
    }
};