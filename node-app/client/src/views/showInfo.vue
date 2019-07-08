<!-- 个人信息路由组件 -->
<template>
  <div class="showInfo">
     <el-row type="flex" justify="center" class="row-bg">
         <el-col :span="8">
             <div class="user">
                 <img :src="user.avatar" alt="" class="avatar">
             </div>
         </el-col>
         <el-col :span="16">
             <div class="userInfo">
                 <div class="userItem">
                     <i class="fa fa-user"></i>
                     <span>{{user.name}}</span>
                 </div>
                 <div class="userItem">
                     <i class="fa fa-cog"></i>
                     <span>{{user.identity=='manager' ? '总裁' : '长工'}}</span>
                 </div> 
             </div>
         </el-col>
     </el-row>
  </div>
</template>
<script>
export default{
    name:'showInfo',
    components:{},
    computed:{
        user(){
            return this.$store.getters.user
        }
    }
}
</script>
<style lang='css' scoped>
.showInfo {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* padding: 16px; */
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 30%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.userInfo {
  height: 100%;
  background-color: #eee;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userItem {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}
</style>