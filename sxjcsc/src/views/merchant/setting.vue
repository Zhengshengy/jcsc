<template>
    <div class="setbox">
        <div class="title w-100 pl-20 font-16 text-3">商铺设置</div>
        <div class="content pl-40 pt-30">
             <el-row>
                 <el-col :span="24">
                     <div class="mt-30 m-0-auo avata">
                         <el-avatar :size="125" :src="circleUrl"></el-avatar>
                         <div class="edit text-center  pointer">
                             <router-link :to="{name:'Set'}" class="text-white" exact>编辑</router-link>

                         </div>
                     </div>
                 </el-col>
             </el-row>
            <el-row>
                <el-col :span="24">
                    <p class="text-0 font-16 fw-blod text-center mt-25">陕西顶美管业科技有限公司</p>
                </el-col>
            </el-row>
            <el-row class="mt-30">
                <el-col :span="24">
                    <div class="float-left mr-15 font-14 mt-5 text-3">主营产品：</div>
                    <div class="wid float-left font-16">
                        PE给水管材、管件；PP-R冷热水供水管材、管件；PVC-U排水管材、管件；PVC-U电工套管、配件；PE-RT耐热聚
                        乙烯地暖管；HDPE双壁波纹管、HDPE同层/虹吸排水系统；CPVC电力管、HDPE燃气管等管材、管件产品。
                    </div>
                </el-col>
            </el-row>
            <el-row class="mt-30">
                <el-col :span="24">
                    <div class="float-left mr-15 text-3 mt-5 font-14">公司简介：</div>
                    <div class="wid float-left font-16">
                        PE给水管材、管件；PP-R冷热水供水管材、管件；PVC-U排水管材、管件；PVC-U电工套管、配件；PE-RT耐热聚
                        乙烯地暖管；HDPE双壁波纹管、HDPE同层/虹吸排水系统；CPVC电力管、HDPE燃气管等管材、管件产品。
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Setting',
        data() {
            return {
                circleUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
            };
        },
        methods: {

        }
    }
</script>
<style scoped lang="scss">
    .setbox{
        width: 1000px;
        height: 970px;
        margin: 30px 0 0 30px;
        background: #ffffff;
        .title{
            height: 50px;
            border: 1px solid #F5F5F5;
            line-height: 50px;
        }
        .avata{
            width: 125px;
            position: relative;
            overflow: hidden;
            border-radius: 50%;
        }
        .avata:hover .edit{
            transition: height .5s;
            height: 30px;
        }
        .wid{width: 800px;line-height: 33px}
        .edit{
            width:125px;
            position: absolute;
            left: 0;
            bottom: 0px;
            height: 0px;
            background:rgba(0,0,0,.5);
            line-height: 30px;
        }
    }
</style>
