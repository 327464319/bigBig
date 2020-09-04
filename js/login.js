// window.addEventListener('DOMContentLoaded', function() {
//         alert(111)
//     })

// alert(111)
// $(document).ready(function() {
//     alert(111)
// })
// window.onload = function() {
//         alert(111)
//     }
$(function() {

    $("#link_reg").click(function() {
        $(".regit").show()
        $(".login").hide()
    })
    $("#link_login").click(function() {
            $(".regit").hide()
            $(".login").show()
        })
        //表单校验
    var form = layui.form
    var layer = layui.layer
    form.verify({

            paw: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            name: [/^.{3,8}$/s, '昵称必须3到8位'],
            repaw: function(value) {
                var password = $('.regit [type=password]').val()

                if (password != value) {
                    return "两次密码不一致！"
                }
            }
        })
        //注册
    $('.regit form').on('submit', function(e) {
        e.preventDefault()
        data = $(this).serialize()
        $.post('/api/reguser', data, function(res) {
            layer.msg(res.message)

            if (res.status == 0) {
                $('#link_login').click()
            }
        })

    })
    $('.login form').on('submit', function(e) {
        e.preventDefault()
        data = $(this).serialize()
        $.post('/api/login', data, function(res) {
            layer.msg(res.message)
            console.log(res);
            if (res.status == 0) {

                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })

    })
})