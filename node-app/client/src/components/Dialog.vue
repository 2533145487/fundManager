<!-- 添加信息对话框 -->
<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
  <el-form :model="addForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
   
  <el-form-item label="收支类型" prop="type">
     <el-select v-model="addForm.type" placeholder="请选择收支类型">
    <el-option
      v-for="items  in  typeList"
      :key="items"
      :label="items" :value="items">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="收支描述" prop="describe">
    <el-input type="text" v-model="addForm.describe"></el-input>
  </el-form-item>
  <el-form-item label="收入" prop="income">
    <el-input type="text" v-model="addForm.income"></el-input>
  </el-form-item>
  <el-form-item label="支出" prop="expend">
    <el-input type="text" v-model="addForm.expend"></el-input>
  </el-form-item>
  <el-form-item label="现金" prop="cash">
    <el-input type="text" v-model="addForm.cash"></el-input>
  </el-form-item>
  <el-form-item label="备注" prop="remark">
    <el-input type="text" v-model="addForm.remark"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="addProfile('ruleForm')">添加</el-button>
    <el-button @click="dialog.show=false">取消</el-button>
  </el-form-item>
</el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'dialogs',
   props: {
    dialog: Object,
    addForm:Object
  },
  data(){
    return{
      typeList:[
       "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账"
      ],
      rules:{
       describe: [
         {required:true,message:'收支描述不能为空'}
        ],
       income: [
         {required:true,message:'收入不能为空'}
        ],
       expend: [
         {required:true,message:'支出不能为空'}
        ],
       cash: [
         {required:true,message:'现金不能为空'}
        ],
       remark: [
         {required:true,message:'备注不能为空'}
        ]
      }     
    }
  },
    methods:{
       addProfile(formName){
         this.dialog.title = '添加信息'
          this.$refs[formName].validate((valid) => {
            if(valid){
              //向后台提交表单
              const url =this.dialog.option=='add' ? 'add' :`edit/${this.addForm.id}`
              this.$axios.post(`/api/profiles/${url}`,this.addForm).then(res=>{
                this.$message({
                  type:"success",
                  message:'保存信息成功'
                })
                this.dialog.show=false;
                this.$emit("update")
              })
            }
          })
       }
    }
};
</script>
<style lang='css' scoped>
</style>