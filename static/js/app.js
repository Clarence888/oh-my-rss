function genUid() {
    /* 生成用户id，自带校验  */
    const sec_key = "bDNsU3BxNXM2b1NyRFJ0dFQwa1o="; // l3lSpq5s6oSrDRttT0kZ
    const sec_ver = 'MDA='; // 00
    const uuid_str = uuid.v4();
    const sign = md5(uuid_str + atob(sec_key)).substring(0, 10)
    return uuid_str + atob(sec_ver) + sign
}

function getUid() {
    return localStorage.getItem('UID');
}

function setUid() {
    localStorage.setItem('UID', genUid());
}

function initLayout(){

    const cntHeight = ($(window).height() - $('.page-footer').height() - $('header').height()) + 'px';

    $('.cnt-right').css({'height': cntHeight, 'maxHeight': cntHeight});
    $('.cnt-left').css({'height': cntHeight, 'maxHeight': cntHeight});

    $('#page').css({'bottom': $('.page-footer').height() + 'px'});

    const cntList = ($(window).height() - $('.page-footer').height() - $('header').height() - $('#page').height()) + 'px';
    $('#cnt-list').css({'height': cntList, 'maxHeight': cntList});

    // 隐藏 loading
    $('#omrss-loader').addClass('hide');

    $('.tooltipped').tooltip();

    // 使页面主内容区域获得焦点，这样快捷键就生效了
    $('#omrss-main').click();
}

$(document).ready(function () {
    /* 样式初始化开始 */
    initLayout();
    /* 样式初始化结束 */

    /* 登录初始化 TODO 特性支持检测 */
    if (!getUid()) {
        setUid()
    }
    /* 登录初始化结束 */


    /* 事件处理开始 */
    // 文章内容点击
    $('.ev-cnt-list').click(function () {
        // UI状态切换
        $('.ev-cnt-list.active').removeClass('active');
        $(this).addClass('active');
        $('#omrss-loader').removeClass('hide');

        // 网络请求
        $.post("/api/article", {uid: getUid(), id: this.id}, function (data) {
            $('#omrss-main').html(data);
            $('#omrss-main').scrollTop(0);
        }).always(function () {
            $('#omrss-loader').addClass('hide');
        })
    });

    // 我的订阅点击
    $('.ev-my-feed').click(function () {
        $('#omrss-loader').removeClass('hide');
        $.post("/api/feeds", {uid: getUid()}, function (data) {
            $('#omrss-main').html(data);
            $('#omrss-main').scrollTop(0);
        }).always(function () {
            $('#omrss-loader').addClass('hide');
        })
    });

    $('.ev-settings').click(function () {
        $('#omrss-loader').removeClass('hide');
        $.post("/api/settings", {uid: getUid()}, function (data) {
            $('#omrss-main').html(data);
            $('#omrss-main').scrollTop(0);
        }).always(function () {
            $('#omrss-loader').addClass('hide');
        })
    });

    $('.ev-fullscreen').click(function () {
        const el = document.documentElement;
        const rfs = el.requestFullscreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
        rfs.call(el);
        initLayout();
    })
    /* 事件处理结束 */


});