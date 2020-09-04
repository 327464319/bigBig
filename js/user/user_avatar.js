$(function() {
    var layer = layui.layer

    var option = {
        aspectRatio: 1,
        preview: '.img-preview'
    }

    $('#image').cropper(option)
    $('#btnChooseImage').click(function() {


        $('#file').click()

    })
    $('#file').change(function() {
        var files = $('#file')[0].files

        if (files.length < 1) {
            return layer.msg('请添加你的图片！')
        }
        var str = URL.createObjectURL(files[0])

        $('#image').cropper('destroy').attr('src', str).cropper(option)



    })
    $('#btnUpload').click(function() {

        var dataURL = $('#image')
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')



        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: { avatar: dataURL },
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg('上传头像失败！')
                }
                layer.msg('上传头像成功！')
                window.parent.getUserDate();
            }
        })

    })
})