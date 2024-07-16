<template>
<div>
    <span class="title">白名单管理</span>
    <div class="card" id="test">
        <el-card>
            <el-row :gutter="10">
                <el-col :span="4">
                    <el-input size="small" v-model="query.sn" placeholder="请输入学号/工号"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-input size="small" v-model="query.name" placeholder="请输入姓名"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-select clearable size="small" v-model="query.roleId" placeholder="选择角色">
                        <el-option
                            v-for="item in roles"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="7">
                    <el-button size="small" @click="getUserList" type="primary">查询</el-button>
                    <el-button size="small" @click="removesBtn" type="danger">删除选中</el-button>
                    <el-button size="small" @click="exportUsers" icon="el-icon-upload2" type="primary">导出数据</el-button>
                </el-col>
            </el-row>
            <el-table
                    @selection-change="selectChange"
                :data="users"
                style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                    label="序号">
                    <template slot-scope="scope">
                        {{scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="学号/工号"
                    >
                    <template slot-scope="scope">
                        <span class="teamName">{{scope.row.sn}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    >
                </el-table-column>
                <el-table-column
                        prop="url"
                        label="头像"
                >
                    <template slot-scope="scope">
                        <img v-if="scope.row.url" height="100px" :src="scope.row.url" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                    prop="roleId"
                    label="角色">
                    <template slot-scope="scope">
                        {{formatRole(scope.row.roleId)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="enabled"
                    label="是否启用">
                    <template slot-scope="scope">
                        <el-switch
                            disabled
                            v-model="scope.row.enabled"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="操作"
                width="180">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            @click="handleEdit(scope.row)">编辑</el-button>
                        <el-dropdown>
  <span class="el-dropdown-link">
    更多<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>黄金糕</el-dropdown-item>
                                <el-dropdown-item>狮子头</el-dropdown-item>
                                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <el-button
                            size="mini"
                            type="text"
                            @click="removeBtn(scope.row.id)">删除
                        </el-button>
                        <el-button
                            size="mini"
                            type="text"
                            @click="downloadFile(scope.row.url)">下载
                        </el-button>
<!--                        <a :href="scope.row.url" download="测试头像.jpg">下载文件</a>-->
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                style="margin-top: 20px"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="query.pageNo"
                :page-sizes="[10,20,40,100]"
                :page-size="query.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
        <UserEditDialog @ok="getUserList" ref="userEdit"/>
    </div>
</div>
</template>

<script>
import {userList, removeUser, removeUsers, exportUser} from '../../../../api/user'
import UserEditDialog from '../../components/user/UserEditDialog.vue'
export default {
  name: 'UserList',
  components: {
    UserEditDialog
  },
  data: function () {
    return {
      roles: [{
        value: 1,
        label: '超级管理员'
      }, {
        value: 2,
        label: '学校用户'
      }, {
        value: 3,
        label: '学院用户'
      }, {
        value: 4,
        label: '辅导员'
      }],
      query: {
        sn: '',
        name: '',
        roleId: '',
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      users: [],
      selectUsers: []
    }
  },
  methods: {
    selectChange (value) {
      // 这里的value就是选中的数据构成的数组
      // console.info(value)
      this.selectUsers = value
    },
    handleEdit (row) {
      this.$refs.userEdit.show(row, this.roles)
    },
    downloadFile (url) {
      // 用代码构建一个a标签并点击这个a标签
      let a = document.createElement('a')
      a.href = url
      a.download = '按钮下载文件.jpg'
      a.click()
      // document.getElementById('test').appendChild(a)
    },
    exportUsers () {
      exportUser().then(res => {
        // 将流按照特定的contenttype进行装换 然后下载
        let blob = new Blob([res], {type: 'application/vnd.ms-excel'}) // 为blob设置文件类型，这里以.xlsx为例
        let url = window.URL.createObjectURL(blob) // 创建一个临时的url指向blob对象
        let a = document.createElement('a')
        a.href = url
        a.download = '白名单列表.xls'
        a.click()
        // 释放这个临时的对象url
        window.URL.revokeObjectURL(url)
      })
    },
    removesBtn () {
      // 获取选中的数据，根据数据获取要删除的id
      // let ids = []
      // for (var i = 0; i < this.selectUsers.length; i++) {
      //   ids.push(this.selectUsers[i].id)
      // }

      this.$confirm('此操作将永久删除选择的数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = this.selectUsers.map(user => user.id)
        // 要发送数组到后端 最好用post请求
        let obj = {
          ids: ids
        }
        removeUsers(obj).then(res => {
          if (res.data === true) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getUserList()
          } else {
            this.$message({
              message: '删除失败',
              type: 'warning'
            })
          }
        })
      }).catch(() => {
      })
    },
    removeBtn (id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let obj = {
          id: id
        }
        removeUser(obj).then(res => {
          if (res.data === true) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getUserList()
          } else {
            this.$message({
              message: '删除失败',
              type: 'warning'
            })
          }
        })
      }).catch(() => {
      })
    },
    getUserList () {
      userList(this.query).then(res => {
        this.users = res.data.records
        this.total = res.data.total
      })
    },
    handleSizeChange (value) {
      // 把页面大小重复赋值，然后重新获取数据
      this.query.pageSize = value
      this.getUserList()
    },
    handleCurrentChange (value) {
      this.query.pageNo = value
      this.getUserList()
    },
    formatRole (roleId) {
      switch (Number(roleId)) {
        case 1:
          return '超级管理员'
        case 2:
          return '学校用户'
        case 3:
          return '学院用户'
        case 4:
          return '辅导员'
        default:
          return '未知'
      }
    }
  },
  created () {
    this.getUserList()
  }
}
</script>

<style scoped>
.title{
    width: 140px;
    height: 28px;
    font-weight: 500;
    font-size: 20px;
    color: #000000e6;
    line-height: 28px;
    padding: 20px;
    display: block;
}
.card{
    margin-left: 20px;
    margin-right: 20px;
}

/deep/ .el-input__inner{
    font-weight: 400;
    font-size: 14px;
    color: #000000e6;
    text-align: left;
    line-height: 22px;
}
/deep/ .el-button--primary, .el-tag{
    background: #166AFF;
    border-radius: 3px;
}
/deep/ .el-button--info{
    border: 1px solid #166AFF;
    border-radius: 3px;
    background: #FFFFFF;
    color: #166AFF;
}
/deep/ .has-gutter{
    background: #F3F3F3;
    font-weight: 400;
    font-size: 14px;
    color: #00000099;
    text-align: left;
    line-height: 22px;
}
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    margin-left: 5px;
}
.el-icon-arrow-down {
    font-size: 12px;
}
/deep/ .el-dropdown{
    font-size: 12px;
}
.teamName{
    color: #166AFF;
}
</style>
