$(function () {  
    $('.text-avater').hide()
    $('.layui-nav-img').hide()
    getUserInfo();
    var layer = layui.layer;
    $('#btnLogout').on('click',function(){
        layer.confirm('你确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //清空本地存储的token
            localStorage.removeItem('token');
            // 重新跳转到登录页面
            location.href='/login.html';
            // 关闭confirm询问框
            layer.close(index);
          });
    })




})
function  getUserInfo() {
    $.ajax({
        url:'/my/userinfo',
        method:'GET',
        // header 设置请求头配置对象
        headers:{
            Authorization:localStorage.getItem('token') || ''
        },
        success:function(res){
            if(res.status !==0){
                return  layui.layer.msg('获取用户基本信息失败')
            }
           
            renderAvatar(res.data);
        },
        // 不论成功还是失败，最终都会调用complete回调函数
    //   complete:function(res){
    //         if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!') {
    //             localStorage.removeItem('token');
    //             location.href='/login.html'
    //         }  

    //     }
        
    })
    function renderAvatar(user){
        // 获取用户名称
        var name = user.nickname || user.username
        // 设置欢迎文本
        $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
        // 渲染用户头像
       if(user.user_pic !== null) {
           $('.layui-nav-img').attr('src',user.user_pic).show()
           $('.text-avater').hide()

       }else{
        //    渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avater').html(first).show()

       }


    }
    
}