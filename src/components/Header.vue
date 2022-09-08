<template>
  <div class="header">
    <div class="left">
      <span class="title">{{ name }}</span>
    </div>
    <div class="right">
      <el-popover
        placement="bottom"
        :width="320"
        trigger="click"
        popper-class="popper-user-box"
      >
        <template #reference>
          <div class="author">
            <i class="icon el-icon-s-custom" />
            {{ (userInfo && userInfo.nickName) || '' }}
            <i class="el-icon-caret-bottom" />
          </div>
        </template>
        <div class="nickname">
          <p>登录名：{{ (userInfo && userInfo.loginUserName) || '' }}</p>
          <p>昵称：{{ (userInfo && userInfo.nickName) || '' }}</p>
          <el-tag size="small" effect="dark" class="logout" @click="logout"
            >退出</el-tag
          >
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus';
import { onMounted, reactive, toRefs } from 'vue';
import {
  RouteLocationNormalized,
  RouteRecordName,
  useRouter,
} from 'vue-router';
import { getProfile, userLogout } from '@/api/service/auth';
import { localRemove } from '@/utils';

interface IUserInfo {
  adminUserId: number;
  locked: number;
  loginUserName: string;
  nickName: string;
}

interface IHeaderState {
  name: string;
  userInfo: IUserInfo | null;
}

export default {
  name: 'Header',
  setup() {
    const router = useRouter();
    const pathMap: Record<RouteRecordName, string> = {
      index: '首页',
      login: '登录',
      add: '添加商品',
      swiper: '轮播图配置',
      hot: '热销商品配置',
      new: '新品上线配置',
      recommend: '为你推荐配置',
    };
    const state = reactive<IHeaderState>({
      name: 'dashboard',
      userInfo: null, // 用户信息变量
    });
    // 初始化执行方法
    onMounted(() => {
      const pathname = window.location.hash.split('/')[1] || '';
      if (!['login'].includes(pathname)) {
        getUserInfo();
      }
    });
    // 获取用户信息
    const getUserInfo = async () => {
      const result = await getProfile();
      if (result.resultCode === 200) {
        state.userInfo = result.data;
      } else {
        ElMessage(result.message);
      }
    };
    // 退出登录
    const logout = async () => {
      await userLogout();
      localRemove('token');
      router.push({ path: '/login' });
    };

    router.afterEach((to: RouteLocationNormalized) => {
      if (to.name) {
        state.name = pathMap[to.name];
      }
    });

    return {
      ...toRefs(state),
      logout,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .title {
    font-size: 20px;
  }
  .right > div > .icon {
    font-size: 18px;
    margin-right: 6px;
  }
  .author {
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>

<style>
.popper-user-box {
  background: url('https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png')
    50% 50% no-repeat !important;
  background-size: cover !important;
  border-radius: 0 !important;
}
.popper-user-box .nickname {
  position: relative;
  color: #ffffff;
}
.popper-user-box .nickname .logout {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
</style>
