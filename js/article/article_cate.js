$(function() {
    var layer = layui.layer
    var form = layui.form
        //渲染
    function rendering() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                res.data = res.data.reverse()

                var html = template('tpl-table', res)
                $('.layui-card-body tbody').html(html)

            }
        })
    }
    //关闭时layer使用的变量
    var index1;
    var index2;
    rendering()
        //类别添加显示

    $('#btnAddCate').click(function() {
            index1 = layer.open({
                area: ['500px', '300px'],
                type: 1,
                title: '在线调试',
                content: $('#dialog-add').html()
            });
        })
        //类别添加
    $('body').on('submit', '#form-add', function(e) {
            var data = $(this).serialize()
            e.preventDefault()

            $.ajax({
                method: 'post',
                url: '/my/article/addcates',
                data: data,
                success: function(res) {

                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }

                    layer.close(index1)
                    layer.msg(res.message)
                    rendering()
                }
            })


        })
        //定时添加
    $('#timesaddCate').click(function() {
            index1 = layer.open({
                area: ['500px', '300px'],
                type: 1,
                title: '在线调试',
                content: $('#dialog-add-timer').html()
            });
        })
        //定时器类别添加
    var timer = null;
    $('body').on('submit', '#form-add-timer', function(e) {
        var data = $(this).serialize()

        e.preventDefault()
            // clearInterval(timer)
        var timer = setInterval(function() {
            $.ajax({
                method: 'post',
                url: '/my/article/addcates',
                data: data,
                success: function(res) {

                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }

                    // layer.close(index1)
                    layer.msg(res.message)
                        // rendering()

                }
            })
        }, 1)

    })

    //定时停止
    $('#timestopCate').click(function() {
        layer.msg('停停停')
        clearInterval(timer)
    })

    function tijiao(data) {
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: data,
            success: function(res) {

                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                layer.close(index1)
                rendering()
            }
        })
    }
    //编辑
    $('body').on('click', '.btn-edit', function() {
            index2 = layer.open({
                area: ['500px', '300px'],
                type: 1,
                title: '提示',
                content: $('#dialog-edit').html()
            });
            var id = $(this).attr('data-id')

            $.ajax({
                method: 'get',
                url: '/my/article/cates/' + id,

                success: function(res) {

                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    form.val('form-edit', res.data)
                }
            })
        })
        //编辑提交
    $('body').on('submit', '#form-edit', function(e) {
            e.preventDefault()

            var data = $(this).serialize()

            $.ajax({
                method: 'post',
                url: '/my/article/updatecate',
                data,
                success: function(res) {
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)
                    layer.close(index2)
                    rendering()
                }
            })
        })
        //删除
    $('body').on('click', '.btn-delete', function() {

        var id = $(this).attr('data-id')
        layer.confirm('确定删除？', { icon: 3, title: '提示' }, function() {
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function(res) {

                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message)


                    rendering()
                }
            })
        })


    })

    $('#btndelCate').click(function() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function(res) {
                $.each(res.data, function(i, ele) {
                    var id = ele.Id
                    $.ajax({
                        method: 'get',
                        url: '/my/article/deletecate/' + id,
                        success: function(res) {

                            if (res.status != 0) {
                                return layer.msg(res.message)
                            }
                            layer.msg(res.message)


                            rendering()
                        }
                    })
                })
            }
        })

    })



})