// 在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) { 
    // 在发送真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net'+options.url;
    // 统一为有权限的接口设置header请求头
    if(options.url.indexOf('/my/') !== -1){
        options.headers ={
            Authorization:localStorage.getItem('token') || ''
        }
    }
    options.complete=function(res){
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href='/login.html'
        }  
    

    }
 })
 