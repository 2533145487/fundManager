<!-- 顶部导航栏 -->
<template>
  <header class="head-nav">
    <el-row>
      <el-col class="logo-container" :span="6">
        <img src="../assets/logo.png" alt class="logo" />
        <span class="title">密黄杏在线后台管理系统</span>
      </el-col>
      <el-col class="user" :span="6">
        <div class="userinfo">
          <img
            :src="user.avatar"
            class="avatar"
          />
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{user.name}}</p>
          </div>
          <span class="username">
            <!-- 下拉箭头 -->
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>
<script>
export default {
  name: "head-nav",
  computed:{
      user(){
          return this.$store.getters.user
      }
  },
  methods:{
      setDialogInfo(comItem){
          switch(comItem){
              case  "info":
                this.showInfoList();
               break;  
            case "logout":
                this.logout() ;
                break;
          }
      },
      showInfoList(){
         this.$router.push('/showInfo')      
      },
    logout(){
        localStorage.removeItem('eleToken');
      this.$store.dispatch("clearCurrentState")
        this.$router.push('/login')
    }
  }
};
</script>
<style lang='css' scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background-color: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>