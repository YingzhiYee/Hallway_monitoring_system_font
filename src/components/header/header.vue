<template>
  <header class="header">
    <div class="top">
        <div class="bottom">
            <h1 class="Logo">
                <a class="logo" title="OWL" href="###" target="_blank">
                    <img src="./images/logo2.png"
                    alt=""
                    width="100"
                    height="100">
                </a>
            </h1>
        </div>
        <div class="container">
            <h1>OWL——居民楼监测系统</h1>
        </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped >
.header> .top{
    background: linear-gradient(to right, #f6f6f6, #646464);
    height: 150px;
    display: flex;
}
.header> .top .container{
    float:left;
        }
.header> .top .container h1{
  padding-left: 80px;
    font-size: 60px;
    font-weight:900;
    font-family: YouYuan;
    display: block;
    width: 1000px;
    height: 100px;
    /*渐变背景*/
    /*background-image: -webkit-linear-gradient(left, #3498db, #064da4 10%, #5d08e6 20%, #1b2083 30%,*/
    /*    #ffffff 40%, #3498db 50%, #064da4 60%, #5d08e6 70%, #1b2083 80%, #ffffff 90%, #3498db);*/
    background-image: -webkit-linear-gradient(left, #8c939d, #666666 10%, #606060 20%, #e6e6e6 30%, #363636 40%,
          #f6f6f6 50%, #646464 60%, #666666 70%, #606060 80%, #e6e6e6 90%, #8c939d);
    color: transparent; /*文字填充色为透明*/
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;          /*背景剪裁为文字，只将文字显示为背景*/
    background-size: 200% 100%;            /*背景图片向水平方向扩大一倍，这样background-position才有移动与变化的空间*/
            /* 动画 */
    animation: masked-animation 10s infinite linear;
    }
    @keyframes masked-animation {
        0% {
            background-position: 0 0;   /*background-position 属性设置背景图像的起始位置。*/
        }
        100% {
            background-position: -100% 0;
        }
        }
.header> .top .bottom{
    float:left;
}
</style>
