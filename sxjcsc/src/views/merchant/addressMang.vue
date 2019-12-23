<template>
    <div class="bg">
        <div class="address">
            <div class="tit">地址管理</div>
            <div class="add" @click="show('form')">
                <div class="btn">新增商铺地址</div>
                <div>您已创建<span>3</span>个收货地址，最多可创建<span>5</span>个 。</div>
            </div>
            <div class="list">
                <div class="item">
                    <div class="tag">地址1</div>
                    <div class="info"><span class="infoTit">所属市场：</span><span>大明宫陶瓷交易中心（南区）</span></div>
                    <div class="info"><span class="infoTit">联系人：</span><span>袁军磊</span></div>
                    <div class="info"><span class="infoTit">电话：</span><span>400-029-2889</span></div>
                    <div class="info"><span class="infoTit">手机：</span><span>15619381686</span></div>
                    <div class="info"><span class="infoTit">QQ：</span><span>1421768873</span></div>
                    <div class="info"><span class="infoTit">网址：</span><span>www.sxbmm.cn</span></div>
                    <div class="info"><span class="infoTit">地址：</span><span>太华北路415号华远好天地1803号</span></div>
                    <div class="operation">
                        <div class="edit" @click="showEdit">编辑</div>
                    </div>
                    <div class="del" @click="show('del')"><img src="@/assets/image/personal/close.png" alt=""></div>
                </div>
                <div class="item">
                    <div class="tag">地址2</div>
                    <div class="info"><span class="infoTit">所属市场：</span><span>大明宫陶瓷交易中心（南区）</span></div>
                    <div class="info"><span class="infoTit">联系人：</span><span>袁军磊</span></div>
                    <div class="info"><span class="infoTit">电话：</span><span>400-029-2889</span></div>
                    <div class="info"><span class="infoTit">手机：</span><span>15619381686</span></div>
                    <div class="info"><span class="infoTit">QQ：</span><span>1421768873</span></div>
                    <div class="info"><span class="infoTit">网址：</span><span>www.sxbmm.cn</span></div>
                    <div class="info"><span class="infoTit">地址：</span><span>太华北路415号华远好天地1803号</span></div>
                    <div class="operation">
                        <div class="edit" @click="showEdit">编辑</div>
                    </div>
                    <div class="del" @click="show('del')"><img src="@/assets/image/personal/close.png" alt=""></div>
                </div>
                <div class="item">
                    <div class="tag">地址3</div>
                    <div class="info"><span class="infoTit">所属市场：</span><span>大明宫陶瓷交易中心（南区）</span></div>
                    <div class="info"><span class="infoTit">联系人：</span><span>袁军磊</span></div>
                    <div class="info"><span class="infoTit">电话：</span><span>400-029-2889</span></div>
                    <div class="info"><span class="infoTit">手机：</span><span>15619381686</span></div>
                    <div class="info"><span class="infoTit">QQ：</span><span>1421768873</span></div>
                    <div class="info"><span class="infoTit">网址：</span><span>www.sxbmm.cn</span></div>
                    <div class="info"><span class="infoTit">地址：</span><span>太华北路415号华远好天地1803号</span></div>
                    <div class="operation">
                        <div class="edit" @click="showEdit">编辑</div>
                    </div>
                    <div class="del" @click="show('del')"><img src="@/assets/image/personal/close.png" alt=""></div>
                </div>
            </div>
            <div class="add" v-show="listLen>=3" @click="show('form')">
                <div to="/" class="btn">新增商铺地址</div>
                <div>您已创建<span>3</span>个收货地址，最多可创建<span>5</span>个 。</div>
            </div>
        </div>
        <Add :showForm="showForm" :isEdit="isEdit" @closeForm="closeForm"></Add>
        <Del :showDel="showDel" @closeDel="closeDel" :delTxt="delTxt" @delete="delAddress"></Del>
    </div>
</template>
<script>
    import Add from '@/components/merchant/addAddress'
    import Del from '@/components/personal/delDialog'
    export default {
        name: 'AddressMang',
        data(){
            return {
                listLen:3,
                showForm:false,
                showDel:false,
                isEdit:false,
                delTxt:'您确定要删除该商铺地址？'
            }
        },
        components:{
            'Add':Add,
            'Del':Del
        },
        methods:{
            show(txt) {
                switch (txt) {
                    case 'form':
                        this.isEdit = false;
                        this.showForm = true;
                        break;
                    case  'del':
                        this.showDel = true;
                        break;
                }
            },
            showEdit(){
                this.isEdit = true;
                this.showForm = true;
            },
            closeForm(){
                this.showForm = false;
            },
            closeDel(){
                this.showDel = false;
            },
            delAddress(){
                alert('delete address');
            }
        }
    }
</script>
<style lang='scss' scoped>
    .address{
        width: 999px;
        background: #fff;
        padding-bottom: 30px;
        margin-top: 30px;
        .tit{
            font-size: 16px;
            color: #000;
            height: 53px;
            line-height: 53px;
            border-bottom: 1px solid #f5f5f5;
            text-indent: 18px;
            margin-bottom: 20px;
        }
        .add{
            display: flex;
            padding:0 20px;
            margin-bottom: 10px;
            .btn{
                width:114px;
                height:30px;
                background:#FFD2D2;
                border:1px solid #FF7C7C;
                border-radius:2px;
                font-size: 12px;
                color: #333;
                margin-right: 14px;
                line-height: 30px;
                text-align: center;
                cursor: pointer;
            }
            div{
                font-size: 12px;
                color: #999;
                line-height: 30px;
                span{
                    color: #FF0000;
                }
            }
        }
        .list{
            padding: 0 20px;
            .item{
                padding: 16px 22px;
                border:1px solid #d2d2d2;
                margin-bottom: 10px;
                position: relative;
                .tag{
                    width:54px;
                    height:20px;
                    background:#ccc;
                    font-size: 12px;
                    color: #fff;
                    line-height: 20px;
                    text-align: center;
                    margin-bottom: 15px;
                }
                .tag.red{
                    background: #FF0000;
                }
                .info{
                    font-size: 12px;
                    color: #666;
                    margin-bottom: 8px;
                    .infoTit{
                        color: #999;
                        display: inline-block;
                        width: 60px;
                        text-align: right;
                    }
                }
                .operation{
                    position: absolute;
                    display: flex;
                    right: 38px;
                    bottom: 16px;
                    justify-content: right;
                    font-size: 12px;
                    color:#006DFF;
                    cursor: pointer;
                }
                .del{
                    position: absolute;
                    right: 15px;
                    top: 15px;
                    cursor: pointer;
                }
            }
        }
    }
</style>