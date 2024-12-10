<script setup lang="ts">
import { UserOutlined, UserAddOutlined, IdcardOutlined, CrownOutlined } from '@ant-design/icons-vue'
import type { MenuTheme } from 'ant-design-vue'
import { h, ref } from 'vue'

const msg = ref('欢迎来到黎业河的用户中心，你将在黎业河的用户中心看到更多的功能哦！\n')

const theme = ref<MenuTheme>('light')
const selectedKeys = ref(['1'])
const items = ref([
  {
    key: '1',
    icon: () => h(UserOutlined),
    label: '用户登录',
    title: '用户登录',
  },
  {
    key: '2',
    icon: () => h(UserAddOutlined),
    label: '用户注册',
    title: '用户注册',
  },
  {
    key: '3',
    icon: () => h(CrownOutlined),
    label: '用户管理',
    title: '用户管理',
  },
  {
    key: '4',
    icon: () => h(IdcardOutlined),
    label: '个人空间',
    title: '个人空间',
  },
])
</script>

<template>
  <div id="home-page">
    <h1>{{ msg }}</h1>
    <div>
      <h3>功能说明：</h3>
      <div style="float: left">
        <br />
        <br />
        <a-menu
          v-model:selectedKeys="selectedKeys"
          style="width: 256px; height: 500px"
          mode="inline"
          :theme="theme"
          :items="items"
        />
      </div>
      <div style="float: left; margin-left: 10px; padding-left: 10px;width: 900px">
        <br />
        <br />
        <div v-if="selectedKeys[0] === '1'" class="userLogin">
          <strong>概要：</strong>
          <p>
            用户输入自己的账号和密码然后点击登录按钮即可向后端发送登录请求，
            然后将后端获取到的数据保存到useLoginUserStore对象中，同时右上角的登录按钮变成用户名
          </p>
          <hr />
          <strong>后端接口：</strong><strong>POST</strong><br />
          <em>请求url：</em>/api/user/login<br />
          <em>请求体：</em>
          <pre>
            <code>
1         {
2            "userAccount":"esdllm",
3            "userPassword":"12345678"
4         }
            </code>
          </pre>
          <hr />
          <strong>后端响应：</strong>
          <pre>
            <code>
1      {
2          "code": 0,
3          "message": "ok",
4          "data": {
5              "id": 1861395776687697928,
6              "username": "黎业河",
7              "userAccount": "esdllm",
8              "avatarUrl": null,
9              "gender": 1,
10             "userPassword": null,
11             "phone": "123456789",
12             "email": null,
13             "userStatus": 0,
14             "createTime": "2024-12-03T10:48:07.000+00:00",
15             "updateTime": null,
16             "isDelete": null,
17             "userRole": 1,
18             "inspectionCode": "1"
19          },
20          "description": ""
21      }
            </code>
          </pre>
        </div>
        <div v-if="selectedKeys[0] === '2'" class="userRegister">
          <p>
            用户输入账号，密码，确认密码，检验编号后点击注册按钮然后向后端发送注册请求，
            随后跳转到登录页
          </p>
          <strong>特别说明：</strong>检验编号是用来防止用户恶意注册设置的限制手段，
          即需要在注册时输入一个检验编号，只有当检验编号和后端存储的检验编号一致时才可以注册成功，
          否则注册失败。 用户需要与管理员联系获取检验编号。<br /><br>
          <hr />
          <strong>后端接口：POST</strong><br />
          <em>请求url:</em>/api/user/register<br />
          <em>请求体：</em>
          <pre>
            <code>
1            {
2              "userAccount":"esdllm1",
3              "userPassword":"12345678",
4              "checkPassword":"12345678",
5              "inspectionCode":"3"
6            }
            </code>
          </pre>
          <hr />
          <strong>后端响应：</strong>
          <pre>
            <code>
1          {
2              "code":0,
3              "message":"ok",
4              "data":1861395776687697930,
5              "description":""
6          }
            </code>
          </pre>
        </div>
        <div v-if="selectedKeys[0] === '3'" class="userManager">
          <p>如果用户是管理员，则点击导航栏的用户管理时，向后端发送查询指令，然后将用户列表展示在页面中,
            管理员可以对用户进行删除操作，也可以通过左上角的搜索框输入用户名进行筛选</p>
          <hr />
          <strong>后端接口：</strong><strong>GET</strong><br />
          <em>请求url：</em>/api/user/search?username=<br />
          <strong>后端响应：</strong>一个Json数组，包含了所有的用户信息<br />
          <br> <hr />
          <p>执行删除操作时：</p>
          <strong>后端接口：</strong><strong>POST</strong><br />
          <em>请求url：</em>/api/user/delete<br />
          <em>请求体：</em>
          <pre>
            <code>
1         {
2           "id":1861395776687697928
3         }
            </code>
          </pre>
          <hr />
          <strong>后端响应：</strong>
          <pre>
            <code>
1          {
2              "code":0,
3              "message":"ok",
4              "data":false,
5              "description":"
6          }
            </code>
          </pre>
        </div>
        <div v-if="selectedKeys[0] === '4'" class="userSpace">
          <p>
            用户登录后，右上角会的登录按钮将会替换位用户名，鼠标悬浮在用户名上时，会出现一个下拉菜单，
            点击个人空间按钮后， 将会跳转到个人空间页面，
            个人空间页面展示了用户的个人信息，包括用户名，账号，头像，性别，创建时间，用户角色
          </p>
          个人数据展示：
          从useLoginUserStore对象中获取用户信息，然后展示在页面中<br /><br>
          个人简介页面：将个人简介展示在页面中<br /><br>
          关于页面：将本网站的基本信息展示在页面中<br><br>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#home-page {
}
#home-page .userLogin {
  background-image: url('/src/assets/loginBackground.webp');
  background-size: cover;
}
#home-page .userRegister {
  background-image: url('/src/assets/registerBackground.webp');
  background-size: cover;
}
#home-page .userManager {
  background-image: url('/src/assets/managerBackground.webp');
  background-size: cover;
  height: 800px;
}
#home-page .userSpace {
  background-image: url('/src/assets/spaceBackground.webp');
  background-size: cover;
  height: 750px;
}
#home-page pre{
  background-color: rgba(250, 250, 250, 0.5);
}
</style>
