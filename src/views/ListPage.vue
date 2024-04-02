<template>
  <div>
    <div class="listed">
      <div class="like_share" :class="{'scroll': scrollState}">
        <div class="icon liked" :class="{'on': likeState}" @click="rateUpdate">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"></path>
          </svg>
        </div>
        <div class="rate">{{ dt[$route.params.id].rate }}</div>
        <div class="icon shared">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M5 7c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm11.122 12.065c-.073.301-.122.611-.122.935 0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4c-1.165 0-2.204.506-2.935 1.301l-5.488-2.927c-.23.636-.549 1.229-.943 1.764l5.488 2.927zm7.878-15.065c0-2.209-1.791-4-4-4s-4 1.791-4 4c0 .324.049.634.122.935l-5.488 2.927c.395.535.713 1.127.943 1.764l5.488-2.927c.731.795 1.77 1.301 2.935 1.301 2.209 0 4-1.791 4-4z"></path>
          </svg>
        </div>
      </div>
      <div class="list_text">
        <div class="tit">{{ dt[$route.params.id].title }}</div>
        <div class="nick"><strong>{{ dt[$route.params.id].name }}</strong> · {{ dt[$route.params.id].date }}</div>
        <div class="list_dash">
          <svg width="32" height="48" fill="currentColor" viewBox="0 0 32 48">
            <path fill="currentColor" d="M32 0H0v48h.163l16-16L32 47.836V0z"></path>
          </svg>
          <div class="dash_tit">엔지니어링 노트</div>
          <ul class="dash_sub">
            <!-- 링크연결 필요 -->
            <li><span>1.</span>블로그 제작기</li>
            <li><span>2.</span>서버 연결 테스트</li>
            <!-- // 링크연결 필요 -->
          </ul>
        </div>
      </div>
      <div class="side_list" :class="{'scroll': scrollState}" v-if="dt[$route.params.id].lists">
        <ul>
          <li :data-title="k" v-for="(v, k, i) in dt[$route.params.id].lists" :key="k" @click="moveToScroll">{{ v[`tit${i+1}`] }}
            <ul>
              <li :data-title="key" v-for="(val, key) in v[`sub${i+1}`]" :key="key">{{ val }}</li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="list_con">
        <div class="list_area" v-for="(v, k, i) in dt[$route.params.id].lists" :key="k">
          <div class="tit" :ref="k"><h2>{{ v[`tit${i+1}`] }}</h2></div>
          <div class="sub_tit" :ref="key" v-for="(val, key) in v[`sub${i+1}`]" :key="key"><h2>{{ val }}</h2></div>
          <p><img :src="`https://picsum.photos/id/${dt[$route.params.id].id}/768`" alt=""></p>
          <p>{{ dt[$route.params.id].content }}</p>
          <blockquote class="quote">
            <p>
              <strong>제목</strong><br>
              1. 하하하하하하하하하하하하하하하하하<br>
              2. 하하하하하하하하하하하하하하하하하<br>
              3. 하하하하하하하하하하하하하하하하하
            </p>
          </blockquote>
        </div>
      </div>
    </div>

    <button type="button" @click="$router.push(`/list/${$route.params.id}/author`)">작가</button>
    <button type="button" @click="$router.push(`/list/${$route.params.id}/comment`)">댓글</button>

    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "ListVue",
  props: {
    dt: Array,
    scrollState: Boolean,
  },
  data() {
    return {
      likeState: false,
    }
  },
  methods: {
    moveToScroll(el) {
      let tg = el.target.dataset.title

      this.$refs[tg][0].scrollIntoView({behavior: 'smooth'});
    },
    rateUpdate() {
      let tg = document.querySelector('.like_share .icon.liked');

      if (tg.classList.contains('on')) {
        this.likeState = false;
        this.emitter.emit('rateStateMinus', this.$route.params.id);
      } else {
        this.likeState = true;
        this.emitter.emit('rateStatePlus', this.$route.params.id);
      }
    }
  },
  mounted() {
    if (this.dt[this.$route.params.id].lists === true) {
      document.querySelector('.side_list ul').addEventListener('click', this.moveToScroll);
    }
  },
};
</script>
<style>
.listed {width: 768px; margin: 0 auto; position: relative; margin-top: 5rem;}
.like_share {position: absolute; top: 11rem; left: -7rem; padding: 0.4rem; background: #f8f9fa; border: 1px solid #ededed; border-radius: 10rem; z-index: 1; text-align: center;}
.like_share.scroll {position: fixed; top: 7rem; left: unset; margin-left: -7rem;}
.like_share > .icon:hover {cursor: pointer; border: 1px solid #000;}
.like_share > .icon:hover svg {color: #000;}
.like_share .liked {display: flex; justify-content: center; align-items: center; width: 3rem; height: 3rem; background: #fff; border: 1px solid #ededed; border-radius: 50%;}
.like_share .icon.liked.on {background: #20c997; border-color: #20c997;}
.like_share .icon.liked.on:hover {background: #38d9a9; border-color: #38d9a9;}
.like_share .icon.liked.on svg {color: #fff;}
html[data-themes="dark"] .like_share > .icon:hover {border: 1px solid #fff !important;}
html[data-themes="dark"] .like_share > .icon:hover svg {color: #fff !important;}
html[data-themes="dark"] .like_share > .icon:hover svg path {color: #fff !important;}
html[data-themes="dark"] .like_share .icon.liked.on {background: #20c997 !important; border-color: #20c997 !important;}
html[data-themes="dark"] .like_share .icon.liked.on:hover {background: #38d9a9 !important; border-color: #38d9a9 !important;}
html[data-themes="dark"] .like_share .icon.liked.on svg {color: #000 !important; background: unset !important;}
html[data-themes="dark"] .like_share .icon.liked.on svg path {color: #000 !important;}
.like_share .rate {margin: 0.5rem 0 1rem;}
.like_share .liked svg {color: #868E96;}
.like_share .shared {display: flex; justify-content: center; align-items: center; width: 3rem; height: 3rem; background: #fff; border: 1px solid #ededed; border-radius: 50%;}
.like_share .shared svg {color: #868E96;}
.list_text .tit {font-size: 50px; font-weight: bold; font-family: 'Pretendard'; margin-bottom: 30px;}
.list_text .nick {font-size: 1rem;}
.list_text .list_dash {background: #f8f9fa; border-radius: 20px; padding: 2rem 1.5rem; margin-top: 2rem; position: relative;}
.list_text .list_dash svg {color: #12B886; position: absolute; top: 0; right: 1.5rem;}
.list_text .list_dash .dash_tit {font-size: 1.6rem; font-weight: bold; margin-bottom: 1.5rem;}
.list_text .list_dash .dash_sub li {font-size: 1rem; margin-bottom: 0.5rem; position: relative; padding-left: 1.2rem;}
.list_text .list_dash .dash_sub li span {position: absolute; top: 0; left: 0; font-style: italic;}
.side_list {position: absolute; top: 10rem; right: -15rem; border-left: 1px solid #f1f3f5;}
.side_list.scroll {position: fixed; top: 6rem; right: unset; margin-left: 52.3rem;}
.side_list ul {padding: 0.5rem 1rem; margin: 0;}
.side_list ul li {color: #868E96; margin-bottom: 0.2rem; font-size: 0.875rem; cursor: pointer;}
.side_list ul li:hover {color: #212529;}
html[data-themes="dark"] .side_list ul li:hover {color: #aab0b6 !important;}
.side_list ul li:last-child {margin-bottom: 0;}
.side_list ul li ul {padding: 0;}
.side_list ul li ul li {padding-left: 1rem;}

.list_con {margin-top: 3rem;}
.list_con .quote {background: #f8f9fa; border-left: 4px solid #20c997; border-top-right-radius: 4px; border-bottom-right-radius: 4px; padding: 1.5rem 1rem 1.5rem 2rem; margin: 2rem 0; font-size: 1.125rem;}
.list_con .quote p {margin: 0;}
</style>