<template>
  <div class="black-area" @click="backRoute()" v-if="isValid === false">
    <div class="white-area">작가소개</div>
  </div>
</template>
<script>
export default {
  name: "AuthorVue",
  data() {
    return {
      isValid: false,
    };
  },
  methods: {
    backRoute() {
      this.isValid = true;
      this.$router.push('/list/' + this.$route.params.id);
    }
  }
};
</script>
<style lang="scss" scoped>
.black-area {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);

  .white-area {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 60vw;
    height: 30vh;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 20px;
    padding: 10px 15px;
  }
}
</style>