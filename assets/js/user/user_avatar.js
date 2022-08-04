// 1.1 获取裁剪区域的 DOM 元素
const $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

const layer = layui.layer;
$('#uploadBtn').click(function(){
    $('#file').click()
})

$('#file').change(function(e){
    console.log(1);

    let files1 = e.target.files
    if (files1.length === 0)return layer.msg('请上传文件')

    let file = files1[0] 
let imgUrl = URL.createObjectURL(file)

$image
        .cropper("destroy") // 销毁旧的裁剪区域
        .attr("src",imgUrl) // 重新设置图片路径
        .cropper(options); // 重新初始化裁剪区域
})

$('#sendBtn').click(function(e){
// 1、拿到用户裁切之后的头像
    const dataURL = $image.cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
    })
    .toDataURL("image/png");
        // 2、发送 ajax 请求，发送到服务器
        $.ajax({
            type:'POST',
            url:'/my/update/avatar',
            data:{
                avatar:dataURL
            },
            success:res =>{
                console.log(res);
            }
        })
})

