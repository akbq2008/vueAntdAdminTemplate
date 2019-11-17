<template>
  <div class="user-wrapper">
    <div class="content-box">
      <!-- <a href="https://pro.loacg.com/docs/getting-started" target="_blank">
        <span class="action">
          <a-icon type="question-circle-o"></a-icon>
        </span>
      </a>-->
      <!-- <notice-icon class="action"/> -->
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <span class="user-wrap">
            <a-avatar
              class="avatar"
              size="small"
              :src="avatar ? avatar : require('@/assets/images/logo.png')"
            />
            <span>{{ nickname ? nickname : "逃亡乐队" }}</span>
          </span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="0">
            <router-link :to="{ name: 'center' }">
              <a-icon type="user" />
              <span>个人中心</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting" />
              <span>账户设置</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2" disabled>
            <a-icon type="setting" />
            <span>测试</span>
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout" />
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
// import NoticeIcon from '@/components/NoticeIcon';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'UserMenu',
  components: {
    // NoticeIcon
  },
  computed: {
    ...mapGetters(['nickname', 'avatar'])
  },
  methods: {
    ...mapActions(['Logout']),
    handleLogout() {
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk: () => {
          return this.Logout({})
            .then(() => {
              setTimeout(() => {
                window.location.reload();
              }, 16);
            })
            .catch(err => {
              this.$message.error({
                title: '错误',
                description: err.message
              });
            });
        },
        onCancel() {}
      });
    }
  }
};
</script>
<style scoped lang="scss">
.user-wrapper {
  .action {
    span {
      color: #393939 !important;
    }
  }
  .avatar {
    margin-right: 8px;
  }
  .user-wrap {
    padding: 6px 12px 6px 4px;
    &:hover {
      box-sizing: border-box;
      background-color: #f2f2f4;
      border-radius: 16px;
    }
  }
}
</style>
