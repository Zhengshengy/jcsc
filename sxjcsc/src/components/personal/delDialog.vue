<template>
    <div class="shadow" v-show="showDel">
        <div class="addBox delBox">
            <div class="title">删除</div>
            <div class="del">
                <img class="warning" src="@/assets/image/personal/warning.png" alt="">
                <div class="txt">{{delTxt}}</div>
                <div class="btns">
                    <div class="confirm" @click="confirm">确定</div>
                    <div class="cancel" @click="close">取消</div>
                </div>
            </div>
            <div class="close" @click="close()"><img src="@/assets/image/personal/addressClose.png" alt=""></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "delDialog",
        props:['showDel','delTxt'],
        methods:{
            confirm(){
                this.$emit('delete');
            },
            close(){
                this.$emit('closeDel');
            }
        }
    }
</script>

<style lang='scss' scoped>
    .shadow{
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.3);
    }
    .delBox{
        width: 320px;
        position: absolute;
        top: 50%;
        left: 50%;
        background:#fff;
        transform: translate(-50%,-50%);
        border-radius: 5px;
        box-shadow:0 0 5px rgba(0,0,0,.3);
        .title{
            height: 28px;
            background: #F3F3F3;
            border-bottom: 1px solid #C4C4C4;
            padding-left: 12px;
            font-size: 14px;
            color: #333;
            line-height: 28px;
            border-radius: 5px 5px 0 0;
            margin-bottom: 25px;
        }
        .warning{
            display: block;
            margin: 15px auto;
        }
        .txt{
            font-size: 18px;
            color: #FE0000;
            text-align: center;
        }
        .btns{
            display: flex;
            justify-content: center;
            margin: 15px 0;
            div{
                width:54px;
                height:25px;
                background:#F7F7F7;
                border:1px solid #ddd;
                border-radius:2px;
                text-align: center;
                font-size: 12px;
                line-height: 25px;
                cursor: pointer;
            }
            .confirm{
                margin-right: 14px;
            }
        }
        .close{
            position: absolute;
            top:11px;
            right: 11px;
            cursor: pointer;
        }
    }
</style>