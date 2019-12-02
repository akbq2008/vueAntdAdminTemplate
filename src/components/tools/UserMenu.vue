<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a-dropdown>
        <div class="user-action">
          <div class="user-info">
            <img
              src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4280818391,516628045&fm=26&gp=0.jpg"
              alt="avatar"
              class="avatar"
            >
            <span class="user-name">
              {{
              nickname ? nickname : "逃亡乐队"
              }}
            </span>
          </div>
        </div>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="0">
            <router-link :to="{ name: 'center' }">
              <a-icon type="user"/>
              <span>个人中心</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting"/>
              <span>账户设置</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2" disabled>
            <a-icon type="setting"/>
            <span>测试</span>
          </a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'UserMenu',
  components: {},
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
<style scoped lang="less">
.user-wrapper {
  .user-action {
    .user-info {
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 4px 12px 4px 4px;
      height: 32px;
      border-radius: 16px;
      vertical-align: middle;
      &:hover {
        background-color: #f2f2f4;
      }
    }
    .user-name {
      white-space: nowrap;
      color: #393939;
      vertical-align: middle;
      font-size: 14px;
      font-weight: 500;
      color: rgba(57, 57, 57, 1);
      line-height: 20px;
    }
  }
  .avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }
}
</style>
