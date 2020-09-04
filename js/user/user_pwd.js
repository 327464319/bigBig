$(function() {
    var layer = layui.layer
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function(value) {
            var oldPwd = $('[name=oldPwd]').val()

            if (value == oldPwd) {
                return '新旧密码不能一致！'
            }


        },
        rePwd: function(value) {
            var newPwd = $('[name=newPwd]').val()
            if (value != newPwd) {
                return '两次密码输入不一致！'
            }
        }

    })
    $('form').submit(function(e) {
        e.preventDefault()
        var data = $(this).serialize()

        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: data,
            success: function(res) {
                layer.msg(res.message)
                console.log(res);
                $('form')[0].reset()
            }
        })

    })
})