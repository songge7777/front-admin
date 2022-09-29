<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/img/logo.png" />
        <span class="title">{{ systemName }}</span>
      </div>
    </div>
    <div class="login">
      <a-form @submit="onSubmit" :form="form">
        <a-tabs size="large" @change="onchange" :tabBarStyle="{ textAlign: 'center' }" style="padding: 0 2px;">
          <a-tab-pane tab="账户密码登录" key="1">
            <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon
              style="margin-bottom: 24px;" />
            <a-form-item>
              <a-input autocomplete="autocomplete" size="large" placeholder="请输入账户名" key="name"
                v-decorator="['name', { rules: [{ required: true, message: '请输入账户名', whitespace: true }] }]">
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input size="large" placeholder="请输入密码" autocomplete="autocomplete" type="password" key="password"
                v-decorator="['password', { rules: [{ required: true, message: '请输入密码', whitespace: true }] }]">
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane tab="注册" key="2">
            <a-form-item>
              <a-input autocomplete="autocomplete" size="large" placeholder="请输入账号" key="zc_name"
                v-decorator="['zc_name', { rules: [{ required: true, message: '请输入账户名', whitespace: true }] }]">
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input size="large" placeholder="请输入密码" autocomplete="autocomplete" type="password" key="zc_password"
                v-decorator="['zc_password', { rules: [{ required: true, message: '请输入密码', whitespace: true }] }]">
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input size="large" placeholder="请确认密码" autocomplete="autocomplete" type="password"
                v-decorator="['confirmPassword', { rules: [{ required: true, message: '请输入密码', whitespace: true }] }]">
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input size="large" placeholder="请输入手机号码"
                v-decorator="['mobie', { rules: [{ required: true, message: '请输入手机号码', whitespace: true }] }]">
                >
                <a-icon slot="prefix" type="mobile" />
              </a-input>
            </a-form-item>

          </a-tab-pane>
        </a-tabs>
        <a-form-item>
          <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit"
            type="primary">{{ Number(currentTab) === 1 ? '登录' : '注册' }}</a-button>
        </a-form-item>
      </a-form>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from '@/layouts/CommonLayout'
import { login } from '@/services/user'
import {setAuthorization} from '@/utils/request'
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  components: { CommonLayout },
  data() {
    return {
      logging: false,
      error: '',
      currentTab: 1,
      form: this.$form.createForm(this)
    }
  },
  computed: {
    systemName() {
      return this.$store.state.setting.systemName
    }
  },
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles']),
    onchange(e) {
      this.currentTab = e
    },
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields(['name', 'password'], async (err) => {
        if (!err) {
          this.logging = true
          const name = this.form.getFieldValue('name')
          const password = this.form.getFieldValue('password')
          login(name, password).then(this.afterLogin)
        }
      })
    },
    afterLogin(res) {
      this.logging = false
      const loginRes = res.data
      if (loginRes.code === 0) {
        const { result } = loginRes
        this.setUser(result)
        var d = new Date();
        sessionStorage.setItem('token', loginRes.result.token)
        setAuthorization({ token: loginRes.result.token, expireAt: new Date(d.getTime() + 1000 * 24 * 60 * 60) })
        this.$router.push('/analysis/data')

        // // 获取路由配置
        // getRoutesConfig().then(result => {
        //   const routesConfig = result.data.data
        //   loadRoutes(routesConfig)
        //   this.$message.success(loginRes.message, 3)
        // })
      } else {
        this.error = loginRes.message
      }
    }
  }
}
</script>

<style lang="less" scoped>
.common-layout {
  .top {
    text-align: center;

    .header {
      height: 44px;
      line-height: 44px;

      a {
        text-decoration: none;
      }

      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
      }

      .title {
        font-size: 33px;
        color: @title-color;
        font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }

    .desc {
      font-size: 14px;
      color: @text-color-second;
      margin-top: 12px;
      margin-bottom: 40px;
    }
  }

  .login {
    width: 368px;
    margin: 0 auto;

    @media screen and (max-width: 576px) {
      width: 95%;
    }

    @media screen and (max-width: 320px) {
      .captcha-button {
        font-size: 14px;
      }
    }

    .icon {
      font-size: 24px;
      color: @text-color-second;
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: @primary-color;
      }
    }
  }
}
</style>
