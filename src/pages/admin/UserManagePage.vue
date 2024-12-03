<template>
  <div id="user-manage">
    <a-input-search
      style="max-width: 320px;margin-bottom: 20px"
      v-model:value="searchValue"
      placeholder="输入用户你搜索"
      enter-button="搜索"
      size="large"
      @search="onSearch"
    />
    <a-table :columns="columns" :data-source="data">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'avatarUrl'">
          <a-image :src="record.avatarUrl" :width="120" />
        </template>
        <template v-if="column.dataIndex === 'userRole'">
          <div v-if="record.userRole === 1">
            <a-tag color="green">管理员</a-tag>
          </div>
          <div v-else>
            <a-tag color="blue">普通用户</a-tag>
          </div>
        </template>
        <template v-if="column.dataIndex === 'createTime'">
          {{ dayjs(record.createTheme).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
        <template v-else-if="column.key === 'tags'">
          <span>
            <a-tag
              v-for="tag in record.tags"
              :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <a-button danger @click="doDelete">删除</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { deleteUser, searchUsers } from '@/api/user'
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'

const searchValue = ref('')

const onSearch = () => {
//执行搜索获取数据
  fetchData(searchValue.value)
}

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
  },
  {
    title: '性别',
    dataIndex: 'gender',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
  },
  {
    title: '操作',
    dataIndex: 'action',
  },
]

let data = ref([
  //先写一些假数据
  {
    id: 1,
    username: 'John Brown',
    userAccount: 'newyork_lin',
    avatarUrl: '123456',
    createTime: Date.now(),
    userRole: 1,
  },
  {
    id: 2,
    username: 'John Brown',
    userAccount: 'newyork_lin',
    avatarUrl: '123456',
    createTime: Date.now(),
    userRole: 0,
  },
])
//获取数据
const fetchData = async (username="") => {
  const res = await searchUsers(username)
  if (res.data.data) {
    data.value = res.data.data
  } else {
  }
  message.error('获取用户列表失败！')
  console.log(res)
}
fetchData()

const doDelete = async (id:string) => {
  if(!id){
    return
  }
  const res = await deleteUser(id);
  if(res.data.code === 0){
    message.success('删除成功！')
    await fetchData()
  }else{
    message.error('删除失败！')
  }

}
</script>
