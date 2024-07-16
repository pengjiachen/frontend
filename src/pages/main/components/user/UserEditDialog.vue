<template>
    <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :close-on-click-modal="false"
            >
        <el-form ref="editForm" :rules="rules" :model="editUser" label-width="80px">
            <el-form-item label="学号/工号">
                <el-input readonly v-model="editUser.sn"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="editUser.password"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="name">
                <el-input v-model="editUser.name"></el-input>
            </el-form-item>
            <el-form-item label="角色">
                <el-select v-model="editUser.roleId" style="width: 100%" placeholder="选择角色">
                    <el-option
                            v-for="item in roles"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-switch v-model="editUser.enabled"></el-switch>
            </el-form-item>
            <el-form-item label="头像">
                <el-upload
                    class="avatar-uploader"
                    action="/api/file/upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import {editUser} from '@api/user'
export default {
  name: 'UserEditDialog',
  data: function () {
    return {
      dialogVisible: false,
      editUser: {},
      roles: [],
      rules: {
        name: [
          {required: true, message: '请输入真实姓名', trigger: 'blur'}
        ]
      },
      imageUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.editUser.url = res.url
    },
    show (user, roles) {
      // user和传过来的row是同一个地址，修改会影响
      // 一般会进行克隆
      // 将对象先json字符串化，再json对象化
      this.editUser = JSON.parse(JSON.stringify(user))
      this.roles = roles
      this.imageUrl = this.editUser.url
      this.dialogVisible = true
    },
    submit () {
      // 在提交之前做表单验证，验证数据已全部通过规则
      this.$refs.editForm.validate(flag => {
        if (flag) {
          editUser(this.editUser).then(res => {
            if (res.data === true) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              // 弹框关闭
              this.dialogVisible = false
              // 刷新列表
              this.$emit('ok')
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
/deep/ .el-upload .el-upload--text{
    border: 1px dotted darkgrey;
}
</style>
