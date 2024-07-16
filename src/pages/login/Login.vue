<template>
    <div class="loginbody">
        <div class="logindata">
            <div class="logintext">
                <h2>Welcome</h2>
            </div>
            <div class="formdata">
                <el-form>
                    <el-form-item>
                        <el-input
                            v-model="form.sn"
                            placeholder="请输入账号"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input
                            v-model="form.password"
                            clearable
                            placeholder="请输入密码"
                            show-password
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="tool">
                <div>
                    <el-checkbox>记住密码</el-checkbox>
                </div>
                <div>
                    <span class="shou" @click="forgetpas">忘记密码？</span>
                </div>
            </div>
            <div class="butt">
                <el-button type="primary" @click.native.prevent="login('form')"
                >登录</el-button
                >
                <el-button class="shou" @click="register">注册</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import {userLogin} from '../../api/user'

export default {
  name: 'login',
  data () {
    return {
      form: {
        sn: '007',
        password: '123456'
      }
    }
  },
  methods: {
    login (form) {
      // 登陆请求还没做
      // 怎么发请求？  必须依赖于 axios
      // 引入axios
      // npm install axios --save
      // 字符串拼接方式发送get请求（不特别推荐）
      // loginName=admin&password=admin ===>  {loginName: 'admin',password: 'admin'}
      // axios.get('http://127.0.0.1:8585/login?loginName=' + this.form.username + '&password=' + this.form.password)
      // let obj = {
      //   sn: this.form.sn,
      //   password: this.form.password
      // }
      // 如果没有用我给的框架，实现第一个就行，不需要实现包装发请求
      userLogin(this.form).then(res => {
        // 封装之后的请求与没有封装的请求比较：
        // 这里的res就是后端返回的json
        // res.data就是后端真正返回的数据
        if (res.status && res.data !== null) {
          this.$message({
            message: '登陆成功',
            type: 'success'
          })
          this.$router.push({path: '/main'})
        } else if (res.status) {
          this.$message({
            message: '用户名或密码错误',
            type: 'warning'
          })
        }
      })
      // axios.get('/api/admin/login', {params: obj}).then(res => {
      //   // 这里的res是axios封装过后的返回值
      //   // res.data就是后端返回的json数据
      //   // res.data.data才是后端真正返回的数据
      //   if (res.data.data !== null) {
      //     this.$message({
      //       message: '登陆成功',
      //       type: 'success'
      //     })
      //     this.$router.push({path: '/main'})
      //   } else {
      //     this.$message({
      //       message: '用户名或密码错误',
      //       type: 'warning'
      //     })
      //   }
      // })
    },
    forgetpas () {
      this.$message({
        type: 'info',
        message: '功能尚未开发额😥',
        showClose: true
      })
    },
    register () {}
  }
}
</script>

<style scoped>
.loginbody {
    width: 100%;
    height: 100%;
    min-width: 1000px;
    background-image: url("../../assets/images/bg.jpg");
    background-size: 100% 100%;
    background-position: center center;
    overflow: auto;
    background-repeat: no-repeat;
    position: fixed;
    line-height: 100%;
    padding-top: 150px;
}

.logintext {
    margin-bottom: 20px;
    line-height: 50px;
    text-align: center;
    font-size: 30px;
    font-weight: bolder;
    color: white;
    text-shadow: 2px 2px 4px #000000;
}

.logindata {
    width: 400px;
    height: 300px;
    transform: translate(-50%);
    margin-left: 50%;
}

.tool {
    display: flex;
    justify-content: space-between;
    color: #606266;
}

.butt {
    margin-top: 10px;
    text-align: center;
}

.shou {
    cursor: pointer;
    color: #606266;
}

/*ui*/
/* /deep/ .el-form-item__label {
  font-weight: bolder;
  font-size: 15px;
  text-align: left;
}

/deep/ .el-button {
  width: 100%;
  margin-bottom: 10px;

} */
</style>
