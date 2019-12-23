<template>
    <div class="bg">
        <div class="address">
            <div class="tit">收货地址</div>
            <div class="add" @click="show('form')">
                <div class="btn">新增收货地址</div>
                <div>您已创建<span>{{listLen}}</span>个收货地址，最多可创建<span>5</span>个 。</div>
            </div>
            <div class="list">
                <div class="item" v-for="(item,index) in list">
                    <div class="tag red" v-if="item.status == 1">默认地址</div>
                    <div class="tag" v-if="item.status == 0">地址{{index+1}}</div>
                    <div class="info"><span class="infoTit">收货人：</span><span>{{item.name}}</span></div>
                    <div class="info"><span class="infoTit">所在地区：</span><span>{{item.area}}</span></div>
                    <div class="info"><span class="infoTit">地址：</span><span>{{item.spec}}</span></div>
                    <div class="info"><span class="infoTit">手机：</span><span>{{item.phone}}</span></div>
                    <div class="operation">
                        <div class="default" v-if="item.status == 0" @click="setDefault(item.id)">设为默认</div>
                        <div class="edit" @click="showEdit(item.id)">编辑</div>
                    </div>
                    <div class="del" @click="show('del',item.id)"><img src="@/assets/image/personal/close.png" alt=""></div>
                </div>
            </div>
            <div class="add" v-show="listLen>=3" @click="show('form')">
                <div to="/" class="btn">新增收货地址</div>
                <div>您已创建<span>{{listLen}}</span>个收货地址，最多可创建<span>5</span>个 。</div>
            </div>
        </div>
        <Add :showForm="showForm" :isEdit="isEdit" :editId="editId" @closeForm="closeForm" @success="success"></Add>
        <Del :showDel="showDel" @closeDel="closeDel" :delTxt="'您确定要删除该收货地址？'" @delete="delAddress"></Del>
    </div>
</template>

<script>
    import Add from '@/components/personal/addAddress'
    import Del from '@/components/personal/delDialog'
    export default {
        name: "Address",
        data(){
            return {
                list:[],
                listLen:3,
                showForm:false,
                showDel:false,
                isEdit:false,
                delId:0,
                editId:0
            }
        },
        components:{
            'Add':Add,
            'Del':Del
        },
        created(){
            this.dataOperation();
        },
        methods:{
            dataOperation(){
                this.JCService.PersonalServer.Address_list().then(e=>{
                    e.info.forEach(item=>{
                        item.area = item.address.split(',')[0]+item.address.split(',')[1]+item.address.split(',')[2];
                        item.spec = item.address.split(',')[3];
                    })
                    e.info.sort((a,b)=>{return b.status - a.status})
                    this.list = e.info;
                    this.listLen = e.info.length;
                });
            },
            show(txt,id) {
                switch (txt) {
                    case 'form':
                        this.isEdit = false;
                        if(this.listLen >= 5){
                            this.$message({
                                message: '您已经添加了5个收货地址，不能添加了',
                                type: 'warning'
                            });
                            return false;
                        }
                        this.showForm = true;
                        break;
                    case  'del':
                        this.showDel = true;
                        this.delId = id;
                        break;
                }
            },
            showEdit(id){
                this.isEdit = true;
                this.showForm = true;
                this.editId = id;
            },
            closeForm(){
                this.showForm = false;
            },
            closeDel(){
                this.showDel = false;
            },
            //设置默认地址
            setDefault(id){
                this.JCService.PersonalServer.Address_del({address_id:id,type:1}).then(e=>{
                    if(e.status == 1){
                        this.$message({
                            message: '设置默认地址成功',
                            type: 'success'
                        });
                        this.dataOperation();
                    }
                })
            },
            //删除收货地址
            delAddress(){
                this.JCService.PersonalServer.Address_del({address_id:this.delId,type:2}).then(e=>{
                    if(e.status == 1){
                        this.$message({
                            message: '删除收货地址成功',
                            type: 'success'
                        });
                        this.showDel = false;
                        this.dataOperation();
                    }
                })
            },
            //新增、编辑成功
            success(){
                this.showForm = false;
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
                this.dataOperation();
            },
        }
    }
</script>

<style lang='scss' scoped>
    .address{
            width: 999px;
            background: #fff;
            padding-bottom: 30px;
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
                        .default{
                            margin-right: 15px;
                        }
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