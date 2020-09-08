$(function() {

    getUserDate()
    var layer = layui.layer
    $('#logout').click(function() {
        var con = layer.confirm('是否确定退出?', { icon: 3, title: '提示' }, function(index) {
            //do something

            localStorage.removeItem('token');
            location.href = '/login.html'


            layer.close(index);
        });
    })



})

function getUserDate() {

    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status != 0) return
            var name = res.data.nickname || res.data.username
            $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

            if (res.data.user_pic == null) {
                $('.text-avatar').html(name.substr(0, 1).toUpperCase())

            } else {

                $('.layui-nav-img').show();
                $('.layui-nav-img').attr("src", res.data.user_pic)
                $('.text-avatar').hide()
            }

        }
    })
}

function xys() {
    $('#xys1').removeClass('layui-this')
    $('#xys2').addClass('layui-this')
}