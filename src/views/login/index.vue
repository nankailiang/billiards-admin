<template>
    <div class="login-container">
        <!--
            el-from 表单组件
            每个表单组件都必须使用 el-form-item 组件包裹
         -->
        <el-form
            class="login-form"
            ref="login-form"
            :model="user"
            :rules="formRules"
        >
            <div class="login-head">
                <h2>台球厅管理系统</h2>
            </div>
            <el-form-item prop="name">
                <el-input
                    v-model="user.name"
                    placeholder="请输入账号"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                    v-model="user.password"
                    placeholder="请输入密码"
                    show-password
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button
                    class="login-btn"
                    type="primary"
                    :loading="loginLoading"
                    @click="onLogin"
                >登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        name: 'admin', // 账号
        password: '111111' // 密码
      },
      loginLoading: false,
      formRules: { // 表单验证配置
        name: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onLogin () {
      // 表单验证
      this.$refs['login-form'].validate(valid => {
        // 如果表单验证失败，停止请求提交
        if (!valid) {
          return
        }

        // 验证通过，请求登录
        this.loginCheck()
      })
      // 处理后端响应结果
    },
    loginCheck () {
      // 获取表单数据
      const user = this.user

      this.loginLoading = true

      login(user).then(res => {
        // 登录成功
        if (res.data.code === 201) {
          window.localStorage.setItem('token', res.data.token)
          this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success'
          })
          // 跳转到首页
          // this.$router.push('/')
          this.$router.push({
            name: 'home'
          })
        } else {
          this.$message({
            showClose: true,
            message: '登录失败,账号或密码错误',
            type: 'error'
          })
        }

        // 关闭 loading
        this.loginLoading = false
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        // 登录失败
        this.$message({
          showClose: true,
          message: '登录失败,系统错误',
          type: 'error'
        })

        // 关闭 loading
        this.loginLoading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
    .login-container {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: url("./login_bg.jpg") no-repeat;
        background-size: cover;
        .login-form {
            background: #fff;
            padding: 20px 50px;
            min-width: 300px;
            .login-head {
                color: #409EFF;
                text-align: center;
            }
            .login-btn {
                width: 100%;
            }
        }
    }
</style>
