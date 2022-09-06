<template>
  <div class="login-body">
    <!--登录框div-->
    <div class="login-container">
      <!--登录框头部logo部分-->
      <div class="head">
        <img
          class="logo"
          src="https://s.weituibao.com/1582958061265/mlogo.png"
        />
        <div class="name">
          <div class="title">新蜂商城</div>
          <div class="tips">Vue3.0 后台管理系统</div>
        </div>
      </div>
      <el-form
        ref="loginForm"
        label-position="top"
        :rules="rules"
        :model="ruleForm"
        class="login-form"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            v-model.trim="ruleForm.username"
            type="text"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model.trim="ruleForm.password"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color: #333">登录表示您已同意<a>《服务条款》</a></div>
          <el-button style="width: 100%" type="primary" @click="submitForm"
            >立即登录</el-button
          >
          <el-checkbox v-model="checked" @change="!checked"
            >下次自动登录</el-checkbox
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { ElMessage, FormInstance } from 'element-plus';
import md5 from 'md5';
import { reactive, ref, toRefs } from 'vue';
import { login } from '@/api/service/login';
import { localSet } from '@/utils';

export default {
  name: 'Login',
  setup() {
    // el-form 组件接收一个 ref 属性，Vue 3.0 需要这样声明
    const loginForm = ref<FormInstance | null>(null);
    const state = reactive({
      ruleForm: {
        username: '', // 账号
        password: '', // 密码
      },
      checked: true,
      // 表单验证判断。
      rules: {
        username: [
          { required: 'true', message: '账户不能为空', trigger: 'blur' },
        ],
        password: [
          { required: 'true', message: '密码不能为空', trigger: 'blur' },
        ],
      },
    });
    // 表单提交方法
    const submitForm = async () => {
      loginForm.value?.validate(async (valid) => {
        if (valid) {
          const result = await login(
            state.ruleForm.username || '',
            md5(state.ruleForm.password)
          );
          if (result.resultCode === 200) {
            localSet('token', result.data);
            window.location.href = '/';
          } else {
            ElMessage(result.message);
          }
        } else {
          console.error('error submit!!');
          return false;
        }
      });
    };
    // 重制方法
    const resetForm = () => {
      // loginForm能拿到 el-form 的重制方法
      loginForm.value?.resetFields();
    };
    return {
      ...toRefs(state),
      loginForm, // 注意，一定要返回 loginForm
      submitForm,
      resetForm,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
  .login-container {
    width: 420px;
    height: 500px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
    .head {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 40px 0 20px 0;
      img {
        width: 100px;
        height: 100px;
        margin-right: 20px;
      }
      .title {
        font-size: 28px;
        color: #1baeae;
        font-weight: bold;
      }
      .tips {
        font-size: 12px;
        color: #999;
      }
    }
  }
  .login-form {
    width: 70%;
    margin: 0 auto;
    :deep(.el-form--label-top .el-form-item__label) {
      padding: 0;
    }
    :deep(.login-form .el-form-item) {
      margin-bottom: 0;
    }
  }
}
</style>
