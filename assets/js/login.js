$(function(){
   // 点击'去注册账号的链接
   $('#link_reg').on('click', function() {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击去登录的链接
  $('#link_login').on('click', function() {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  var form = layui.form
  form.verify({
    pwd: [
      /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'
    ] 
  })
})