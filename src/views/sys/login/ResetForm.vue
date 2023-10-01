<template>
  <el-form ref="loginFormRef" class="login-form" autocomplete="on">
    <div class="title-container">
      <h3>Reset Page</h3>
    </div>
    <div>
      Form
    </div>
    <el-button type="primary">Reset password</el-button>
    <div class="sub-link">
      <span class="text">Already have am account?</span>
      <el-link type="primary" :underline="false" @click.prevent="setLoginState(LoginStateEnum.LOGIN)">Back to login
      </el-link>
    </div>

  </el-form>
</template>


<script lang="ts" setup>
import { LoginStateEnum, useLoginState } from './handle';



const { setLoginState } = useLoginState();
</script>

