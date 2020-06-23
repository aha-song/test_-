$(function () {
    bookList()
    var layer = layui.layer
    var form = layui.form

    function bookList() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function (res) {
                var htmlStr = template('tql-table', res);
                $('tbody').html(htmlStr)
            }
        })
    }
    var indexAdd = null
    $('#btnAdd').on('click', function (e) {
        e.preventDefault();
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '300px']
            , content: $('#dialog-add').html()
        });

    })
    // 通过代理的方式 为form-add 表单绑定submit事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/addcates',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增文章分类失败')
                }
                layer.msg('新增文章分类成功')
                bookList()
                layer.close(indexAdd)
            }
        })
    })

    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function (e) {
        e.preventDefault();
        indexEdit = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '300px']
            , content: $('#dialog-edit').html()
        });
        var id = $(this).attr('data-id');
        $.ajax({
            url: '/my/article/cates/' + id,
            method: 'GET',
            success: function (res) {
                form.val('form-edit', res.data)
            }

        })

    })
    // 通过代理的方式 为form-edit 表单绑定点击事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/updatecate',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新信息失败')
                }
                layer.msg('更新信息成功')
                layer.close(indexEdit)
                bookList()
            }

        })
    })
    $('tbody').on('click', '.btn-delete', function (e) {
        e.preventDefault();
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' },
            function (index) {
                $.ajax({
                    url: '/my/article/deletecate/' + id,
                    method: 'GET',
                    data: $(this).serialize(),
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg('删除文章分类失败')
                        }
                        layer.msg('删除文章分类成功')
                        layer.close(index)
                        bookList()

                    }
                })
       })   })




    })