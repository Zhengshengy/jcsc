<template>
    <div class="shadow" v-show="showForm">
        <div class="addBox">
            <div class="title" v-show="!isEdit">添加收货地址</div>
            <div class="title" v-show="isEdit">修改收货地址</div>
            <div class="form">
                <div class="tit">收货人：</div>
                <div class="flex"><input type="text" class="name" @blur="nameTest" v-model="formData.name"><span class="must">*</span></div>
                <div class="tit">所在地区：</div>
                <div class="flex">
                    <v-distpicker :province="select.province" :city="select.city" :area="select.area" @selected="onSelected"></v-distpicker>
                    <span class="must">*</span>
                </div>
                <div class="tit">详细地址：</div>
                <div class="flex"><input type="text" class="desc" @blur="descTest" v-model="desc"><span class="must">*</span></div>
                <div class="tit">手机号码：</div>
                <div class="flex"><input type="text" @blur="mobileTest" v-model="formData.phone"><span class="must">*</span></div>
                <div class="submit" @click="submit" v-show="!isEdit">保存收货地址</div>
                <div class="submit" @click="submitEdit" v-show="isEdit">保存收货地址</div>
            </div>
            <div class="close" @click="close()"><img src="@/assets/image/personal/addressClose.png" alt=""></div>
        </div>
    </div>
</template>

<script>
    import VDistpicker from 'v-distpicker'
    export default {
        name: "addAddress",
        data(){
            return {
                select: {
                    province: '------- 省 --------',
                    city: '--- 市 ---',
                    area: '--- 区 ---',
                },
                area:false,
                selectArea:'',
                desc:'',
                formData:{
                    name:'',
                    phone:'',
                    address:'',
                },
            }
        },
        props:['showForm','isEdit','editId'],
        components:{
            'v-distpicker':VDistpicker
        },
        watch:{
            editId(curVal){
                if(curVal != 0){
                    this.JCService.PersonalServer.Address_list({id:curVal}).then(e=>{
                        let item = e.info[0];
                        this.formData.name = item.name;
                        this.formData.phone = item.phone;
                        let address = item.address.split(',');
                        this.select.province = address[0];
                        this.select.city = address[1];
                        this.select.area = address[2];
                        this.selectArea = address[0]+address[1]+address[2];
                        this.desc = address[3];
                    });
                }
            },
        },
        methods:{
            //清空input数据
            clear(){
                this.select = {
                    province: '------- 省 --------',
                        city: '--- 市 ---',
                        area: '--- 区 ---',
                }
                this.area=false;
                this.desc='';
                this.formData={
                    name:'',
                    phone:'',
                    address:'',
                }
            },
            nameTest(){
                var person = /^[\u4e00-\u9fa5]+$/;
                if(this.formData.name == "" || !person.test(this.formData.name)){
                    this.$message({
                        message: '收货人只能为汉字且不能为空,请重新输入',
                        type: 'warning'
                    });
                    this.formData.name = ""
                }
            },
            onSelected(data) {
                this.selectArea = data.province.value +','+ data.city.value +','+ data.area.value +',';
                if(data.province.value != ''&& data.city.value != '' && data.area.value != ''){
                    this.area = true;
                }
            },
            descTest(){
                var specialKey = new RegExp("[`~@#$^&*=|{}\\[\\]<>《》/@#￥……&*|{}【】]");
                if(this.desc == "" || specialKey.test(this.desc)){
                    this.$message({
                        message: '详细地址为空或包含特殊字符,请重新输入',
                        type: 'warning'
                    });
                    this.desc = "";
                }
            },
            mobileTest(){
                var telReg = /^1(3|4|5|7|8)\d{9}$/;
                if(!telReg.test(this.formData.phone)){
                    this.$message({
                        message: '手机号码未输入或格式错误',
                        type: 'warning'
                    });
                    this.formData.phone = '';
                }
            },
            submit(){
                if(this.formData.name == '' || !this.area || this.desc == '' || this.formData.phone == ''){
                    this.$message({
                        message: '请完善收货地址信息',
                        type: 'warning'
                    });
                }else{
                    //提交
                    this.formData.address = this.selectArea + this.desc;
                    this.JCService.PersonalServer.Address_add(this.formData).then(e=>{
                        if(e.info){
                            this.$emit('success');
                        }
                    });
                }
            },
            close(){
                this.$emit('closeForm');
                this.clear();
            },
            submitEdit(){
                let address = this.selectArea.split(',');
                for(let i in address){
                    if(i==3){
                        break;
                    }
                    if(address[i] == 'undefined'){
                        this.$message({
                            message: '省市区选择失效，请重新选择',
                            type: 'warning'
                        });
                        return ;
                    }
                    if(address[i] == ''){
                        this.$message({
                            message: '省市区不能为空，请重新选择',
                            type: 'warning'
                        });
                    }
                }
                if(this.formData.name == '' || !this.area || this.desc == '' || this.formData.phone == ''){
                    this.$message({
                        message: '请完善收货地址信息',
                        type: 'warning'
                    });
                }else{
                    //提交
                    this.formData.address = this.selectArea + this.desc;
                    let formData = this.formData;
                    formData.id = this.editId;
                    this.JCService.PersonalServer.Address_edit(formData).then(e=>{
                        if(e.info){
                            this.$emit('success');
                        }
                    });
                }

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
    .addBox{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 760px;
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
        .form{
            padding:0 30px;
            .tit{
                font-size: 12px;
                color: #666;
                margin-bottom: 8px;
            }
            .flex{
                display: flex;
                align-items: center;
                margin-bottom: 15px;
                input{
                    display: block;
                    width: 304px;
                    height: 32px;
                    border:1px solid rgba(0,0,0,.15);
                    border-radius: 4px;
                    padding: 0 5px;
                }
                .name{
                    width: 227px;
                }
                .desc{
                    width: 499px;
                }
                .must{
                    display: block;
                    color: #FF0000;
                    font-weight: bold;
                    font-size: 24px;
                    margin-left: 14px;
                    margin-right: 15px;
                }
            }
            .submit{
                width:114px;
                height:30px;
                background:#F6F6F6;
                border:1px solid rgba(0,0,0,.15);
                border-radius:4px;
                text-align: center;
                font-size: 14px;
                line-height: 30px;
                cursor: pointer;
                margin-bottom: 80px;
                user-select: none;
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