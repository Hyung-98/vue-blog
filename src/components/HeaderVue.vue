<template>
  <div class="header" v-if="!$store.state.newListState.newList">
    <header>
      <h1>
        <router-link to="/" @click="postTitle">{{ blogName }}</router-link>
      </h1>
      <ul>
        <li>
          <button type="button" @click="modeChange($event)" :class="{ active: isActive === 1 }">
            <img :src="images[isActive].imgSrc" alt="mode img" />
          </button>
        </li>
        <li>
          <button type="button" class="search"><img src="../assets/search_icon.svg" alt="" /></button>
        </li>
        <li>
          <button type="button" class="login" @click="loginOpen" v-if="!$store.state.login.isLogin">로그인</button>
          <router-link to="/list/new">
            <button type="button" class="new_txt" v-if="$store.state.login.isLogin">새 글 작성</button>
          </router-link>
          <button type="button" class="user_btn" @click="userMenu">
            <svg width="42" height="42" fill="currentColor" viewBox="0 0 42 42">
              <circle cx="21" cy="15" r="5" fill="currentColor"></circle>
              <path d="M12 32 Q21,16 30,32" fill="currentColor"></path>
            </svg>
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M0 0 h24 v24z" fill="none"></path>
              <path d="M7 10 l5 5 5-5z"></path>
            </svg>
          </button>
        </li>
      </ul>
      <div class="user_menu" v-if="$store.state.userMenuOn">
        <ul class="user_menu_lists">
          <li class="user_menu_list"><button>내 블로그</button></li>
          <li class="user_menu_list"><button>임시 글</button></li>
          <li class="user_menu_list"><button>읽기 목록</button></li>
          <li class="user_menu_list"><button>설정</button></li>
          <li class="user_menu_list"><button @click="logoutFn">로그아웃</button></li>
        </ul>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: 'HeaderVue',
  props: {
    images: Array,
    isActive: Number,
    blogName: String,
  },
  methods: {
    modeChange(event) {
      this.$emit('classActive', event);
    },
    postTitle() {
      this.emitter.emit('headerTitleChange', 'Hlog');
    },
    userMenu() {
      this.$store.state.userMenuOn = !this.$store.state.userMenuOn;
    },
    logoutFn() {
      this.$store.dispatch('logout');
    },
    loginOpen() {
      this.$store.commit('loginOpen');
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  padding: 2rem 0;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  h1 {
    font-size: 2rem;
    margin: 0;
    > * {
      font-family: 'Gordita';
      color: #3c3c3c;
    }
  }
  > ul {
    display: flex;
    height: 100%;
    margin-bottom: 0;
    gap: 8px;
    justify-content: flex-end;
    align-items: center;
    > li {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 42px;
      list-style: none;
      font-size: 30px;
      font-weight: bold;
      letter-spacing: -1.2px;
      button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: auto;
        height: 100%;
        border-radius: 50%;
        &.search {
          padding: 8px;
        }
        &.login {
          padding: 0 20px;
          font-size: 20px;
          font-weight: 600;
          color: #fff;
          border-radius: 20px;
          background: #3c3c3c;
        }
        &:hover {
          background: #dbdbdb;
          color: #3c3c3c;
        }
        img {
          width: auto;
          height: 100%;
        }
        &.new_txt {
          height: auto;
          font-size: 18px;
          padding: 0 1rem;
          border: 1px solid #3c3c3c;
          border-radius: 25px;
        }
        &.user_btn {
          margin-left: 8px;

          svg {
            color: #868e96;
          }
          svg:first-child {
            background: #eee;
            border-radius: 50%;
          }
          &:hover svg:last-child {
            color: #212529;
          }
        }
        &.new_txt:hover,
        &.user_btn:hover {
          background: unset;
          color: unset;
        }
      }
    }
  }
  .user_menu {
    position: absolute;
    top: 55px;
    right: 0;
    z-index: 2;
    background: #fff;
    box-shadow: 0px 0px 10px -5px #a0a0a0;

    ul {
      display: flex;
      flex-direction: column;
      min-width: 180px;
      width: 100%;
      padding: 0;
      margin: 0;

      li {
        button {
          display: block;
          width: 100%;
          height: 100%;
          padding: 0.8rem;
          font-size: 1rem;
          font-weight: 400;
          text-align: left;
        }

        &:hover button {
          background: #f8f9fa;
          color: #1fc997;
        }
      }
    }
  }
}

@media (max-width: 1170px) {
  .header {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>