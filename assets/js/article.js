$(function(){
   bookList()

function bookList(){
    $.ajax({
        url:'/my/article/cates',
        method:'GET',
        success:function(res){
         var htmlstr = template('tql-table',res)
         $('tbody').html(htmlstr)
        }
    })
}
})