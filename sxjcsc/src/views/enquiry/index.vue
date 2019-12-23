<template>
    <div class="bigbox w-100">
        <SearchTop></SearchTop>
        <div class="w-100 ebox">
            <div class="box m-0-auo">
                <div class="top">
                    <el-breadcrumb class="float-left" separator-class="el-icon-arrow-right" style="line-height: 55px">
                        <span class="float-left text-6">当前位置：</span>
                        <el-breadcrumb-item :to="{ path: '/' }">陕西建材商城</el-breadcrumb-item>
                        <el-breadcrumb-item >提交询价单</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="bg-white content w-100 p-30">
                    <p class="font-18 fw-blod">轻松填写询价单，陕西建材商城帮你全网找商家</p>
                    <el-form :inline="true" :model="data" class="mt-25" ref="data" labelPosition="top" size="small" >
                        <div class="info">
                            <el-form-item label="联系人" prop="contacts" :rules="rules.contacts">
                                <el-input v-model="data.contacts" placeholder="请填写您的姓名"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号" prop="phone" :rules="rules.phone">
                                <el-input v-model="data.phone" placeholder="请填写手机号"></el-input>
                            </el-form-item>
                            <el-form-item label="公司名称" >
                                <el-input v-model="data.corporate_name" placeholder="请填写公司名称"></el-input>
                            </el-form-item>
                            <el-form-item label="地址" >
                                <el-input v-model="data.corporate_address" placeholder="请填写地址"></el-input>
                            </el-form-item>
                            <el-form-item label="报价截止时间">
                                <el-date-picker type="date" placeholder="选择时间" v-model="data.end_time" format="yyyy 年 MM 月 dd 日" value-format="timestamp"></el-date-picker>
                            </el-form-item>
                            <el-upload
                                    ref="file"
                                    class="upload-demo"
                                    action=""
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    :limit="1"
                                    :on-exceed="handleExceed"
                                    :file-list="data.file"
                                    :on-change="organizeFile"
                                    :http-request="upload"
                                    :auto-upload="false">
                                <p class="pointer font-14 text">+ 添加附件</p>
                            </el-upload>
                        </div>
                        <div class="info">
                            <div v-for="(item,index) in data.formData" :key="item.key" >
                                <el-form-item label="商品名称" :prop="'formData.'+ index+ '.name'" :rules="rules.name">
                                    <el-input v-model="item.name" placeholder="商品名称"></el-input>
                                </el-form-item>
                                <el-form-item label="数量" :prop="'formData.'+ index + '.number'" :rules="rules.number" style="width: 105px">
                                    <el-input v-model.number="item.number" placeholder="数量"></el-input>
                                </el-form-item>
                                <el-form-item label="单位" :prop="'formData.' + index + '.unit'" :rules="rules.unit" style="width: 75px">
                                    <el-input v-model="item.unit" placeholder="单位"></el-input>
                                </el-form-item>
                                <el-form-item label="品牌" :prop="'formData.' + index + '.make'" style="width: 160px">
                                    <el-input v-model="item.make" placeholder="无需求可不填"></el-input>
                                </el-form-item>
                                <el-form-item label="备注" :prop="'formData.'+ index + '.remarks'">
                                    <el-input v-model="item.remarks" placeholder="如：型号、性能、用途等"></el-input>
                                </el-form-item>
                                <el-button size="small" v-if="index != 0" class="del" @click.prevent="removeDomain(item)">删除</el-button>
                            </div>
                            <p class="pointer font-14 text" @click="addRow">+ 添加一项</p>
                        </div>
                        <el-form-item class="w-100">
                            <div class="btn" @click="submit">提交询价单</div>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import SearchTop  from '@/components/search/top'
    export default {
        name:'Enquiry',
        components:{
            'SearchTop': SearchTop,
        },
        data(){
            var checkPhone = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('手机号不能为空'));
                } else {
                    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的手机号'));
                    }
                }
            };
            return {
                form:new FormData(),
                data: {
                    file: [],
                    contacts:'',
                    phone:'',
                    corporate_name:'',
                    corporate_address:'',
                    end_time: '',
                    formData: [
                        {
                            name: '',
                            number: null,
                            unit: '件',
                            make: '',
                            remarks: ''
                        },
                    ]
                },
                rules:{
                    name:[
                        { required: true, message: '商品名称不能为空',trigger: "blur"}
                    ],
                    number:[
                        { required: true, message: '商品数量不能为空',trigger: "blur"},
                        { type: 'number', message: '数量必须为数字',trigger: "blur"}
                    ],
                    unit:[
                        { required: true, message: '单位不能为空',trigger: "blur" }
                    ],
                    contacts:[
                        { required: true, message: '联系人不能为空',trigger: "blur" }
                    ],
                    phone:[
                        { required: true, message: '手机号不能为空',trigger: "blur" },
                        { validator: checkPhone, trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            addRow(){
                this.data.formData.push({
                    name: '',
                    number: null,
                    unit: '件',
                    make: '',
                    remarks: ''
                })
            },
            removeDomain(item) {
                var index = this.data.formData.indexOf(item)
                if (index !== -1) {
                    this.data.formData.splice(index, 1)
                }
            },
            organizeFile(file,fileList){
                this.data.file = fileList;
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            upload(params) {
                this.form.append('file',params.file)
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed() {
                this.$message.warning(`最多上传一个文件`);
            },
            beforeRemove(file) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            submit(){
                this.$refs['data'].validate((valid) => {
                    if (valid) {
                        this.$refs.file.submit()
                        let obj = {}
                        obj.contacts = this.data.contacts
                        obj.phone = this.data.phone
                        obj.corporate_name = this.data.corporate_name
                        obj.corporate_address = this.data.corporate_address
                        obj.end_time = this.data.end_time / 1000
                        this.form.append('user_info',JSON.stringify(obj))
                        this.form.append('data',JSON.stringify(this.data.formData))
                        this.JCService.indexService.Inquiry(this.form).then(e=>{
                            if (e.status == 1){
                                this.$message.success('询价成功')
                                this.$router.push('/personal/enquiry')
                            }
                        })
                    } else {
                        return false;
                    }
                });

            }
        }
    }
</script>
<style lang="scss" scoped>
    .ebox{background: #f5f5f5;min-height: 500px;padding-bottom: 100px}
    .box{
        width: 1200px;
        .top{height: 55px;line-height: 55px}
        .content{
            min-height: 360px;
        }
        .text{color: #3388FF;width: 70px}
        .info{border-bottom: 1px solid #EEEEEE;padding-bottom: 24px;margin-bottom: 25px}
        .btn{background:rgba(51,136,255,1);height: 34px;width: 155px;color: #ffffff;text-align: center;line-height: 34px;margin: 0 auto}
        .del{margin: 32px 20px}
    }
</style>
<style scoped>
    /deep/ .el-form--label-top .el-form-item__label{padding: 0}
</style>