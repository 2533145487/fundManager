<!-- 初始化界面 -->
<template>
  <div class="index" >
      <headNav></headNav>
      <leftNav></leftNav>
      <div class="rightContainer">
        <router-view></router-view>
      </div>
  </div>
</template>
<script>
import headNav from '../components/HeadNav'
import leftNav from '../components/leftNav'
export default{
    name:'index',
    components:{
      headNav,
      leftNav
    }
  
}
</script>
<style lang='css' scoped>
.index{
  width:100%;
  height:100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
   left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>