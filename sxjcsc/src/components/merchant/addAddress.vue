<template>
    <div class="shadow" v-show="showForm">
        <div class="addBox">
            <div class="title" v-show="!isEdit">添加商铺地址</div>
            <div class="title" v-show="isEdit">修改商铺地址</div>
            <div class="form">
                <div class="tit">所属市场：</div>
                <div class="flex">
                    <el-select v-model="ruleForm.region" placeholder="-请选择-" ref="sel" @change="chooseMarket" class="select">
                        <el-option label="北三环大明宫" value="1"></el-option>
                        <el-option label="吉祥水暖" value="2"></el-option>
                    </el-select>
                    <span class="must">*</span>
                </div>
                <div class="tit">联系人：</div>
                <div class="flex"><input type="text" class="name" @blur="nameTest" v-model="formData.name"><span class="must">*</span></div>
                <div class="tit">电话号码：</div>
                <div class="flex"><input type="text" v-model="formData.tel"></div>
                <div class="tit">手机号码：</div>
                <div class="flex"><input type="text" @blur="mobileTest" v-model="formData.mobile"><span class="must">*</span></div>
                <div class="tit">QQ号码：</div>
                <div class="flex"><input type="text" v-model="formData.qq"></div>
                <div class="tit">企业网址：</div>
                <div class="flex"><input type="text" v-model="formData.url"></div>
                <div class="tit">详细地址：</div>
                <div class="flex"><input type="text" class="desc" @blur="descTest" v-model="formData.desc"><span class="must">*</span></div>
                <div class="submit" @click="submit" v-show="!isEdit">保存商铺地址</div>
                <div class="submit" @click="submitEdit" v-show="isEdit">保存商铺地址</div>
            </div>
            <div class="close" @click="close()"><img src="@/assets/image/personal/addressClose.png" alt=""></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "addAddress",
        data(){
            return {
                ruleForm: {
                    region: '',
                },
                rules: {
                    region: [
                        { required: true, message: '-请选择-', trigger: 'change' }
                    ]
                },
                formData:{
                    name:'',
                    selectArea:'',
                    tel:'',
                    desc:'',
                    mobile:'',
                    url:'',
                    qq:'',
                },
            }
        },
        props:['showForm','isEdit'],
        methods:{
            chooseMarket(){
                console.log(this.ruleForm.region);
            },
            nameTest(){
                var person = /^[\u4e00-\u9fa5]+$/;
                if(this.formData.name == "" || !person.test(this.formData.name)){
                    this.$message({
                        message: '联系人只能为汉字且不能为空,请重新输入',
                        type: 'warning'
                    });
                }
            },
            descTest(){
                var specialKey = new RegExp("[`~@#$^&*=|{}\\[\\]<>《》/@#￥……&*——|{}【】]");
                if(this.formData.desc == "" || specialKey.test(this.formData.desc)){
                    this.$message({
                        message: '详细地址为空或包含特殊字符,请重新输入',
                        type: 'warning'
                    });
                }
            },
            mobileTest(){
                var telReg = /^1(3|4|5|7|8)\d{9}$/;
                if(!telReg.test(this.formData.mobile)){
                    this.$message({
                        message: '手机号码未输入或格式错误',
                        type: 'warning'
                    });
                }
            },
            submit(){
                if(this.ruleForm.region == ''){
                    this.$message({
                        message: '请选择所属市场',
                        type: 'warning'
                    });
                    return;
                }
                if(this.formData.name == '' | this.formData.selectArea == '' | this.formData.desc == '' | this.formData.mobile == ''){
                    this.$message({
                        message: '请完善商铺地址信息',
                        type: 'warning'
                    });
                }else{
                    //提交
                    alert('新增地址保存');
                }
            },
            close(){
                this.$emit('closeForm');
            },
            submitEdit(){
                alert('地址修改保存')
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
                    border:1px solid #ccc;
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
<style lang="scss">
    .flex{
        .el-input__inner{
            border: 1px solid #ccc;
            height: 32px;
            border-radius: 4px;
        }
        .el-input__inner::placeholder{
            color: #666;
        }
        .el-input__icon{
            line-height: 32px;
        }
    }
</style>