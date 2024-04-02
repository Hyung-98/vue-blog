import { createStore } from 'vuex';
import axios from 'axios';
import router from '../router/router';

export default createStore({
  state: {
    // data
    login: {
      popup: false,
      count: 0,
      isLogin: false,
      isLoginError: false,
      valid: false,
    },
    user: {
      userid: '',
      name: '',
      password: '',
      token: '',
    },
    userInfo: null,
    modeImg: [
      { imgSrc: require('../../src/assets/moon_night_icon.svg') },
      { imgSrc: require('../../src/assets/sun_icon.svg') },
    ],
    isActive: 1,
    blogName: '',
    userMenuOn: false,
    defaultHeight: 64,
    newListState: {
      newList: false,
      title: '',
      text: '',
    },
  },
  getters: {
    // computed
  },
  mutations: {
    // setters, 동기 처리 로직
    userInit(state) {
      state.user.userid = '';
      state.user.name = '';
      state.user.password = '';
      state.user.token = '';
    },
    loginSuccess(state, payload) {
      state.login.isLogin = true;
      state.login.isLoginError = false;
      state.userInfo = payload;
    },
    loginError(state) {
      state.login.isLogin = false;
      state.login.isLoginError = true;
    },
    logout(state) {
      state.login.isLogin = false;
      state.login.isLoginError = false;
      state.userInfo = null;
    },
    loginClose(state) {
      state.login.popup = false;
    },
    loginOpen(state) {
      state.login.popup = true;
    },
    loginCount(state, payload) {
      if (payload === 0) {
        state.login.count = 0;
      } else if (payload === 1) {
        state.login.count = 1;
      }
    },
    updateUserId(state, payload) {
      state.user.userid = payload;
    },
    updateUserName(state, payload) {
      state.user.name = payload;
    },
    updateUserPwd(state, payload) {
      state.user.password = payload;
    },
    setToken(state, token) {
      state.user.token = token;
    },
    newListTit(state, payload) {
      state.newListState.title = payload;
    },
    newListTxt(state, payload) {
      state.newListState.text = payload;
    },
  },
  actions: {
    // 비동기 처리 로직
    login({ dispatch }) {
      // login => return token
      axios
        .post('/api/users/login', {
          user: this.state.user,
        })
        .then(
          res => {
            // login success!
            let accessToken = res.data.data.accessToken;
            let refreshToken = res.data.data.refreshToken;
            // add token to localStorage.
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            localStorage.setItem('access_token', accessToken);
            localStorage.setItem('refresh_token', refreshToken);
            dispatch('getMemberInfo');
          },
          err => {
            console.log(err.response.data.message);
            if (err.response.data.message === process.env.LOGIN_USER_FALSE) {
              alert('USER NOT EXIST');
            } else if (err.response.data.message === process.env.LOGIN_PWD_FALSE) {
              alert('PASSWORD IS INCORRECT!');
            }
          },
        )
        .catch(err => {
          alert(err);
        });
    },
    logout({ commit }) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      commit('logout');
      router.push({ name: 'main' });
    },
    getMemberInfo({ commit }) {
      // get a token from localStorage.
      let accessToken = localStorage.getItem('access_token');
      let refreshToken = localStorage.getItem('refresh_token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      axios.defaults.headers.common['refresh'] = refreshToken;
      let config = {
        headers: {
          'access-token': accessToken,
          'refresh-token': refreshToken,
        },
      };

      axios
        .post('/api/users/refresh', config)
        .then(res => {
          console.log(res);
          let userInfo = {
            accessToken,
            refreshToken,
          };
          commit('loginSuccess', userInfo);
        })
        .catch(err => {
          console.log(err);
        });
      commit('loginClose');
    },
    signUp({ commit }) {
      axios
        .post('/api/users/signUp', {
          userid: this.state.user.userid,
          name: this.state.user.name,
          password: this.state.user.password,
        })
        .then(res => {
          if (res.data.success === true) {
            console.log(res.data.message);
            commit('loginCount', 0);
          }
          if (res.data.success === false) {
            console.log(res.data.message);
          }
        })
        .catch(err => {
          alert(err.response.data.message);
        });
    },
    google() {
      axios.post('/api/social/google').then().catch();
    },
  },
});
