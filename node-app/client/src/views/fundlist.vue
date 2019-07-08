<!-- 资金流水组件 -->
<template>
  <div class="fullContainer">
    <div>
      <el-form :inline="true">
        <el-form-item label="选择时间区间" :model="timeSerch">
          <el-date-picker v-model="timeSerch.sTime" type="datetime" placeholder="选择开始时间"></el-date-picker>--
          <el-date-picker v-model="timeSerch.eTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="small" icon="search" @click="search()">筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" icon="view" @click="handleAdd()"  v-if="user.identity=='manager'">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableContainer">
      <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        max-height="450"
        border
        style="width:100%,height:100%,display:flex"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
        <el-table-column prop="date" label="创建时间" align="center" width="130">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date |moment }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型" align="center" width="150"></el-table-column>
        <el-table-column prop="describe" label="收支描述" align="center" width="150"></el-table-column>
        <el-table-column prop="income" label="收入" align="center" width="150">
          <template slot-scope="scope">
            <span style="color:#00d053">{{ scope.row.income}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" align="center" width="150">
          <template slot-scope="scope">
            <span style="color:#f56767">{{ scope.row.expend}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="账户现金" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.cash}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="210"></el-table-column>
        <el-table-column label="操作" prop="operation" align="center" width="150">
          <template slot-scope="scope">
            <el-button
            v-if="user.identity=='manager'"
              size="small"
              type="success"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
             v-if="user.identity=='manager'"
              size="small"
              type="danger"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-row>
      <el-col :span="24">
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="paginations.page_index"
            :page-sizes="paginations.page_sizes"
            :page-size="paginations.page_size"
            :layout="paginations.layout"
            :total="paginations.total"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
    <Dialog :dialog="dialogs" :addForm="addForm" @update="getProfile"></Dialog>
  </div>
</template>

<script>
import Dialog from "../components/Dialog";
export default {
  name: "fundlist",
  components: {
    Dialog
  },
  data() {
    return {
      timeSerch: {
        sTime: "",
        eTime: ""
      },
      paginations: {
        page_index: 1, //当前位于哪一页
        total: 0, //总条数
        page_size: 5, //每页显示5条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total, sizes, prev, pager, next, jumper" //翻页属性
      },
      tableData: [],
      alltableData: [],
      timetableData: [],
      addForm: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: ""
      },
      dialogs: {
        show: false,
        title: "",
        option: "edit"
      }
    };
  },
  created() {
    this.getProfile();
  },
  computed:{
   user(){
     return this.$store.getters.user
   }
  },
  methods: {
    getProfile() {
      this.$axios.get("/api/profiles").then(
        res => {
          this.alltableData = res.data;
          this.timetableData = res.data;
          this.setPagination();
        },
        err => console.log(err)
      );
    },
    handleEdit(index, row) {
      this.dialogs.title = "编辑信息";
      this.dialogs.option = "edit";
      this.dialogs.show = true;
      this.addForm = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
            this.$message({
              message: "删除信息成功",
              type: "success"
            });
            this.getProfile();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleAdd() {
      //添加信息
      this.dialogs.title = "添加信息";
      this.dialogs.option = "add";
      this.dialogs.show = true;
      this.addForm = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: ""
      };
    },
    handleSizeChange(page_size) {
      // 设置一页显示几条的跳转
      this.paginations.index = 1;
      this.paginations.page_size = page_size;
      //设置一页显示几条数据
      this.tableData = this.alltableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      let index = this.paginations.page_size * (page - 1); //page当前页，index当前页下标(索引)
      let nums = this.paginations.page_size * page; //nums页面可以展示的全部数据，>=所拥有数据
      let tables = [];
      for (let i = index; i < nums; i++) {
        if (this.alltableData[i]) {
          tables.push(this.alltableData[i]);
        }
        this.tableData = tables;
      }
    },
    setPagination() {
      // 分页属性设置
      this.paginations.total = this.alltableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      //设置分页数据
      this.tableData = this.alltableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    search() {
      //时间筛选
      let time = this.timetableData;
      if (!this.timeSerch.sTime || !this.timeSerch.eTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
        this.getProfile();
        return;
      }
      const sTime = this.timeSerch.sTime.getTime();
      const eTime = this.timeSerch.eTime.getTime();

      this.alltableData = this.timetableData.filter(item => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= sTime && time <= eTime;
      });
      //调用分页数据
      this.setPagination();
    }
  }
};
</script>
<style lang='css' scoped>
.fullContainer {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 20px;
}
</style>