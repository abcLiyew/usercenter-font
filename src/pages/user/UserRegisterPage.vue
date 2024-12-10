<template>
  <div id="user-register">
    <h2 class="title">用户注册</h2>
    <a-form
      style="max-width: 400px; margin: 0 auto"
      :model="formState"
      name="basic"
      label-align="left"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 20 }"
      autocomplete="off"
      @finish="handleSubmit"
    >
      <a-form-item
        label="账号"
        name="userAccount"
        :rules="[
          { required: true, message: '请输入账号！' },
          { min: 4, message: '账号长度不小于4位！' },
        ]"
      >
        <a-input
          v-model:value="formState.userAccount"
          placeholder="请输入账号！" />
      </a-form-item>

      <a-form-item
        label="密码"
        name="userPassword"
        :rules="[
          { required: true, message: '请输入密码！' },
          { min: 8, message: '密码不能小于8位！' },
        ]"
      >
        <a-input-password
          v-model:value="formState.userPassword"
          placeholder="请输入密码！" />
      </a-form-item>

      <a-form-item
        label="确认密码："
        name="checkPassword"
        :rules="[
          { required: true, message: '请输入确认密码！' },
          { min: 8, message: '确认密码不能小于8位！' },
        ]"
      >
        <a-input-password
          v-model:value="formState.checkPassword"
          placeholder="请输入确认密码！" />
      </a-form-item>
      <a-form-item
        label="检验编号："
        name="inspectionCode"
        :rules="[
          { required: true, message: '请输入校验编号！' },
          { max: 5, message: '检验编号不能大于5位！' },
        ]"
      >
        <a-input
          v-model:value="formState.inspectionCode"
          placeholder="请输入检验编号！" />
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 4, span: 20 }">
        <a-button type="primary" html-type="submit">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { userRegister } from '@/api/user'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface FormState {
  userAccount: string
  userPassword: string
  checkPassword: string
  inspectionCode: string
}

const formState = reactive<FormState>({
  userAccount: '',
  userPassword: '',
  checkPassword: '',
  inspectionCode: '',
})

/**
 * 表单提交
 * @param values
 */
const handleSubmit = async (values: any) => {
  //增加一个确认密码的校验
  if (values.userPassword!== values.checkPassword) {
    message.error("两次密码不一致！")
    return
  }
  const res = await  userRegister(values)
  //注册成功后跳转到登录页面
  if (res.data.code === 0&&res.data.data) {
    message.success("注册成功！")
    await router.push({
      path: "/user/login",
      replace: true,
    })
  }else {
    message.error("注册失败！"+res.data.description);
  }
}
</script>
<style scoped>
#user-register .title {
  text-align: center;
  margin-bottom: 20px;
}
</style>
