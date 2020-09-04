$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        name: [/^.{3,8}$/s, '昵称必须3到8位！']
    })

    getUserInfo()
    $('#btn-set').click(function(e) {
        e.preventDefault()
        getUserInfo()


    })
    $('[lay-filter=userInfoFilter]').submit(function(e) {
        e.preventDefault()

        var data = $(this).serialize()
        console.log(data);
        $.ajax({
            method: 'post',
            data: data,
            url: '/my/userinfo',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                window.parent.getUserDate()
            }
        })

    })

    function getUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                form.val('userInfoFilter', res.data)

            }
        })
    }
})