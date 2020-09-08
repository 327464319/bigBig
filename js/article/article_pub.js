$(function() {

    var layer = layui.layer
    var form = layui.form
    initEditor()
        //cropper
    var options = {
            aspectRatio: 200 / 140,
            preview: '.img-preview'

        }
        //获取文章类别
    $.ajax({
        method: 'get',
        url: '/my/article/cates',
        success: function(res) {

            if (res.status != 0) {
                return
            }

            var html = template('tpl-cate', res)

            $('[name=cate_id]').html(html)
            form.render()
        }
    })
    $('#image').cropper(options)
        //选择封面
    $('#btnChooseImage').click(function() {
            $('#coverFile').click()

        })
        //file change事件
    $('#coverFile').change(function() {
            var files = $(this)[0].files
            if (files.length == 0) {
                return layer.msg('请上传图片！')
            }
            var str = URL.createObjectURL(files[0])

            $('#image').cropper('destroy').attr('src', str).cropper(options)

        })
        //表单提交
    var state = '已发布'
    $('#btnSave2').click(function() {
        state = '草稿'
    })
    $('#form-pub').submit(function(e) {
            e.preventDefault()

            var formdata = new FormData($(this)[0])
            formdata.append('state', state)
            var ddd = $('#image').cropper('getCroppedCanvas', {
                    // 创建一个 Canvas 画布
                    width: 400,
                    height: 280
                })
                .toBlob(function(blob) {
                    formdata.append('cover_img', blob)
                        // console.log([...formdata]);
                    publish(formdata)
                })
        })
        //上传
    function publish(formdata) {
        $.ajax({
            method: 'post',
            url: '/my/article/add',
            data: formdata,
            processData: false,
            contentType: false,

            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                window.parent.xys()
                location.href = 'art_list.html'

            }
        })
    }
})