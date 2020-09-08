$(function() {

    var form = layui.form
    var layer = layui.layer
    window.parent.xys()
    var obj = {
            pagenum: 1,
            pagesize: 2,
            cate_id: '',
            state: ''
        }
        // 定义处理时间的过滤器
    template.defaults.imports.dataFormat = function(date) {

            var dd = new Date(date);
            var y = dd.getFullYear()
            var mm = dd.getMonth() + 1
            var d = dd.getDate()
            var h = dd.getHours()
            var m = dd.getMinutes()
            var s = dd.getSeconds()


            return y + '-' + mm + '-' + d + ' ' + h + ':' + m + ':' + s
        }
        //

    function showOptions() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            data: obj,
            success: function(res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }

                var html = template('tpl-cate', res)
                $('[name=cate_id]').html(html)
                form.render()



            }
        })
    }
    showOptions()

    function show() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: obj,
            success: function(res) {

                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                var page = res.total
                var html = template('tpl-table', res)
                $('tbody').html(html)

                showPage(page)
            }
        })
    }
    show()
        //筛选

    $('#form-search').on('submit', function(e) {
        e.preventDefault()

        obj.cate_id = $("[name=cate_id]").val()
        obj.state = $("[name=state]").val()
        show()

    })

    function showPage(page) {
        layui.use('laypage', function() {
            var laypage = layui.laypage;

            //执行一个laypage实例
            laypage.render({
                elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
                    ,
                count: page //数据总数，从服务端得到
                    ,
                limit: obj.pagesize,
                curr: obj.pagenum,
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                limits: [2, 5, 10],
                jump: function(objj, first) {
                    //obj包含了当前分页的所有参数，比如：
                    // console.log(objj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    // console.log(objj.limit); //得到每页显示的条数
                    // var obj = {
                    //     pagenum: 1,
                    //     pagesize: 8,
                    //     cate_id: '',
                    //     state: ''
                    // }
                    // console.log(first);

                    //首次不执行
                    if (!first) {
                        obj.pagesize = objj.limit
                        obj.pagenum = objj.curr
                            //do something
                        show()
                    }
                }
            });
        });
    }
    //删除
    $('body').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'get',
            url: '/my/article/delete/' + id,

            success: function(res) {

                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                var len = $('.btn-delete').length
                if (len == 1) {
                    //如果长度为1，删除时当前页应减一
                    if (obj.pagenum > 1)
                        obj.pagenum = obj.pagenum - 1
                }
                show()
            }
        })
    })
    $('body').on('click', '#edit', function(e) {

        var id = $(e.target).attr('data-id')
        location.href = "/article/art_edit.html?id=" + id
    })

})