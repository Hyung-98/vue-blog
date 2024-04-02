<template>
  <!-- 헤더 -->
  <MainHeader
    :images="this.$store.state.modeImg"
    :isActive="this.$store.state.isActive"
    :blogName="blogName"
    @classActive="classActive"
  />
  <!-- // 헤더 -->
  <router-view :dt="dt" :scrollState="scrollState"></router-view>

  <router-link :to="{ name: 'index' }">data button</router-link>
  <span>{{ users }}</span>

  <LoginCom></LoginCom>
</template>

<script>
import HeaderVue from './components/HeaderVue.vue';
import LoginCom from './components/LoginCom.vue';
import data from '@/data.js';

export default {
  name: 'App',
  data() {
    return {
      dt: [...data],
      blogName: 'Hlog',
      scrollState: false,
      users: [],
    };
  },
  methods: {
    classActive(e) {
      if (e.target.parentNode.classList.contains('active')) {
        document.querySelector('html').dataset.themes = 'dark';
        this.$store.state.isActive--;
      } else {
        document.querySelector('html').dataset.themes = '';
        this.$store.state.isActive++;
      }
    },
    loginPopupOpen() {
      this.loginState.login.popup = true;
    },
    scrollStates() {
      var rect = document.documentElement.getBoundingClientRect();

      if (rect.top < -200) {
        this.scrollState = true;
      } else if (rect.top > -200) {
        this.scrollState = false;
      }
    },
  },
  created() {
    window.addEventListener('scroll', this.scrollStates);
  },
  unmounted() {
    window.removeEventListener('scroll', this.scrollStates);
  },
  mounted() {
    this.emitter.on('headerTitleChange', v => {
      if (v === 'Hlog') {
        this.blogName = v;
      } else {
        this.blogName = v + '.log';
      }
    });

    this.emitter.on('loginIdValid', v => {
      this.loginState.userID = v;
    });

    // 좋아요 이벤트
    this.emitter.on('rateStatePlus', v => {
      this.dt[v].rate++;
    });

    this.emitter.on('rateStateMinus', v => {
      this.dt[v].rate--;
    });
    // 좋아요 이벤트
  },
  components: {
    MainHeader: HeaderVue,
    LoginCom: LoginCom,
  },
};
</script>

<style>
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css');

ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none !important;
}
img {
  width: 100%;
  height: auto;
}
button {
  background: unset;
  border: 0;
  outline: 0;
  padding: 0;
}
* {
  font-family: 'Pretendard';
}

#app {
  max-width: 1920px;
  margin: 0 auto;
  height: 100vh;
}
main {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  gap: 40px;
}
main .card {
  width: 22rem;
}

/* 다크모드 설정 */
html[data-themes='dark'] .header header ul li button.new_txt,
html[data-themes='dark'] .header header ul li button.user_btn {
  background: unset !important;
}
html[data-themes='dark'] .header header ul li button.new_txt {
  color: #fff !important;
}
html[data-themes='dark'] .header header ul li button.new_txt:hover {
  background: #fff !important;
  color: #000 !important;
}
html[data-themes='dark'] .header header ul li button.user_btn svg:first-child {
  background: #868e96 !important;
}
html[data-themes='dark'] .header header ul li button.user_btn svg:last-child path:last-child {
  color: #868e96 !important;
}
html[data-themes='dark'] .header header ul li button.user_btn:hover svg:last-child path:last-child {
  color: #fff !important;
}

html[data-themes='dark'],
html[data-themes='dark'] body,
html[data-themes='dark'] * {
  background: #3c3c3c !important;
  border-color: #8a8a8a !important;
  color: #eeeeee !important;
}
html[data-themes='dark'] ul li button:hover {
  background: #dddddd !important;
}
html[data-themes='dark'] .user_menu ul li button:hover {
  background: #dddddd !important;
  color: #000 !important;
}
html[data-themes='dark'] button img {
  background: none !important;
}
html[data-themes='dark'] .listed .list_text .list_dash,
html[data-themes='dark'] .listed .list_text .list_dash *,
html[data-themes='dark'] .listed .list_con .quote,
html[data-themes='dark'] .listed .list_con .quote * {
  background: #474747 !important;
}

html[data-themes='dark'] .login_popup .popup_con .login,
html[data-themes='dark'] .login_popup .popup_con .login * {
  background: #262626 !important;
}
html[data-themes='dark'] .login_popup .popup_con .login input {
  background: #1f1f1f !important;
  color: #fff !important;
}
html[data-themes='dark'] .login_popup .popup_con .login button.email_btn {
  background: #75c8b0 !important;
  color: #000 !important;
}
html[data-themes='dark'] .login_popup .popup_con .login .social .github {
  background: #272e33 !important;
}
html[data-themes='dark'] .login_popup .popup_con .login .social .google {
  background: #fff !important;
  border: 0;
}
html[data-themes='dark'] .login_popup .popup_con .login .social .google svg {
  background: #fff !important;
}
html[data-themes='dark'] .login_popup .popup_con .login .social .facebook {
  background: #3b5998 !important;
}
html[data-themes='dark'] .login_popup .popup_con .login .social .facebook svg {
  background: #3b5998 !important;
}

/* 로그인 팝업 설정 */
.login_popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
}
html[data-themes='dark'] .login_popup {
  background: rgba(0, 0, 0, 0.8) !important;
}
.login_popup .popup_con {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 600px;
  height: 500px;
  background: #fff;
  box-shadow: 3px 3px 9px 0px #dadada;
}
html[data-themes='dark'] .login_popup .popup_con {
  box-shadow: 3px 3px 9px 0px #000;
}
.login_popup .popup_con .welcome {
  width: 210px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  background: #f8f9fa;
}
.login_popup .popup_con .welcome p {
  font-size: 1.8rem;
  margin: 1rem 0 0;
  font-weight: bold;
  letter-spacing: 0.1rem;
  color: #495057;
}
.login_popup .popup_con .login {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1 1 0;
  padding: 1.5rem;
}
.login_popup .popup_con .login button.close_btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
}
.login_popup .popup_con .login button.close_btn svg {
  color: #868e96;
}
.login_popup .popup_con .login .tit {
  font-size: 1.5rem;
  font-weight: bold;
  color: #212529;
  margin-bottom: 1.2rem;
}
.login_popup .popup_con .login .sub {
  font-size: 1.125rem;
  font-weight: 500;
  color: #868e96;
  margin-bottom: 1.2rem;
}
.login_popup .popup_con .login form {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 1.2rem;
}
.login_popup .popup_con .login input {
  flex: 1 1 0%;
  border: 2px solid #ededed;
  padding: 0.4rem 0.2rem 0.4rem 1rem;
}
.login_popup .popup_con .login form > div {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
}
.login_popup .popup_con .login form > div div {
  position: absolute;
  top: 50%;
  left: 10px;
  transform-origin: 0 50%;
  transform: translateY(-50%);
  padding: 0 5px;
  line-height: 1;
  background: #fff;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
  color: #868e96;
}
.login_popup .popup_con .login form > div.focus div {
  color: #1fc997;
  transform: scale(0.7) translateY(-235%);
}
.login_popup .popup_con .login form > div.focus input {
  border: 2px solid #1fc997;
  outline-color: #1fc997;
}
.login_popup .popup_con .login button.email_btn {
  display: block;
  width: 100%;
  padding: 10px 0;
  color: #fff;
  background: #1fc997;
}
.login_popup .popup_con .login .social {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.5rem;
  padding: 0;
  margin: 0;
}
.login_popup .popup_con .login .social li {
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
}
.login_popup .popup_con .login .social li.github {
  background: #000;
}
.login_popup .popup_con .login .social li.github svg {
  color: #fff;
}
.login_popup .popup_con .login .social li.google {
  border: 1px solid #dadada;
}
.login_popup .popup_con .login .social li.facebook {
  background: #3b5998;
}
.login_popup .popup_con .login .social li button {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.login_popup .popup_con .login .signup {
  display: flex;
  justify-content: flex-end;
  gap: 0.3rem;
}
.login_popup .popup_con .login .signup strong {
  color: #1fc997 !important;
  cursor: pointer;
}

@media (max-width: 1920px) {
  #app {
    width: 1532px;
    padding: 0;
  }
  main {
    gap: 20px;
  }
  main .card {
    width: 23rem;
  }
}
@media (max-width: 1630px) {
  #app {
    width: 1144px;
    padding: 0;
  }
}
@media (max-width: 1170px) {
  #app {
    width: 100%;
    padding: 0;
  }

  main .card {
    width: 48vw;
  }
}
@media (max-width: 953px) {
  main .card {
    width: 100vw;
    padding: 0;
  }
}
</style>
