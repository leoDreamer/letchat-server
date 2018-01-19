<template>
  <div class="login_content" v-show="loginContent">
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="用户名">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="nick_name">
            <Input type="text" v-model="formInline.nickName" placeholder="用户昵称">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="密码">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">注册或登录</Button>
        </FormItem>
    </Form>
  </div>
</template>
<script>
    export default {
      name: "Login",
      data () {
        return {
          formInline: {
              user: '',
              password: '',
              nickName: ""
          },
          ruleInline: {
            user: [
              { required: false, message: '用户名为必填', trigger: 'blur' },
              { type: 'string', min: 3, message: '用户名最小为3位', trigger: 'blur' }
            ],
            nick_name: [
              { required: false, message: '昵称为必填', trigger: 'blur' },
              { type: 'string', min: 3, message: '用户名最小为3位', trigger: 'blur' }
            ],
            password: [
              { required: true, message: '密码为必填', trigger: 'blur' },
              { type: 'string', min: 6, message: '密码最小为6位', trigger: 'blur' }
            ]
          }
        }
      },
      computed: {
        loginContent () {
          return this.$store.state.show.loginContent
        }
      },
      methods: {
        handleSubmit(name) {
          this.$refs[name].validate((valid) => {
              if (!valid) return;
              this.$store.dispatch("createUser", {
                name: this.formInline.nickName,
                passwd: this.formInline.password
              });
          })
        }
      }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
  .login_content {
    color: #333333;
    position: absolute;
    background-color: #ffffff;
    font-size: 12px;
    padding: 20px;
    z-index: 101;
    width: 300px;
    height: 250px;
    border-radius: 10px;
    text-align: center;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    .br {
      display: block;
    }
  }
</style>