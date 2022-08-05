const initArtCateList =() => {
    $.ajax({
        type:'GET',
        url:'/my/article/cates',
        data:null,
        success:res =>{
            const {status,message,data} = res
            if (status !== 0)return layer.msg(message)
            let htmlStr = template('tpl-table',data)
$('tbody').html(htmlStr)
        }
    })
}

initArtCateList()
let layerAdd = null
$('#addBtn').click(function(){
    layerAdd = layer.open({
        type: 1,
        area: ["500px", "250px"],
        title: "添加文章分类",
        content: $('#dialog-add').html(),
    });
})
const form = layui.form
const layer = layui.layer


$('body').on('submit','#form-add',function(e){
e.preventDefault()
$.ajax({
    type:'POST',
    url:'/my/article/addcates',
    data:form.val('formAdd'),
    success:res =>{
        const {status,message} =res
        layer.msg(message)
        if (status !== 0)return 
        initArtCateList()
        layer.close(layerAdd)
    }
})
})

let layerEdit = null

$('#tb').on('click','.btn-edit',function(){
   // 弹出修改文章分类的弹窗
   layerEdit = layer.open({
    type: 1,
    area: ["500px", "250px"],
    title: "修改文章分类",
    content: $("#dialog-edit").html(),
});
let id = $(this).attr('data-id')
$.ajax({
    type:'GET',
    url:'/my/article/cates/'+id,
    success:res =>{
        const { status,message,data} =res
        if (status !== 0)return layer.msg(message)
        form.val('formEdit',data)
    }
})
})
$('body').on('submit','#form-edit',function(e){
    e.preventDefault()
    $.ajax({
        type:'POST',
        url:'/my/article/updatecate',
        data:form.val('formEdit'),
        success:res =>{
            const {status,message} =res
            if (status !== 0)return layer.msg(message)
            layer.msg(message)
                initArtCateList()
                layer.close(layerEdit)
        }
    })
})

$('#tb').on('click','.btn-del',function(){
    let id = $(this).attr('data-id')
    $.ajax({
        type:'GET',
        url:'/my/article/deletecate/'+id,
        data:null,
        success:res =>{
            const {status,message} = res 
            layer.msg(message)
            if (status !== 0)return 
            initArtCateList()
        }
    })
})