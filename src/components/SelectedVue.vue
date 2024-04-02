<template>
  <div class="selected_box">
    <ul class="selec_list">
      <li @click="activeCheck" class="active">트렌딩</li>
      <li @click="activeCheck">최신</li>
    </ul>
    <select name="select_day" id="select_day" v-model="day">
      <option value="0">오늘</option>
      <option value="1">이번 주</option>
      <option value="2">이번 달</option>
      <option value="3">올해</option>
    </select>
  </div>
</template>
<script>
export default {
  name: "SelectedVue",
  data() {
    return {
      day: 0,
    };
  },
  methods: {
    activeCheck(event) {
      this.$emit("activeEvent", event);
    },
  },
  beforeUpdate() {
    this.$emit("dayEvent", this.day);
  },
};
</script>
<style lang="scss" scoped>
.selected_box {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  gap: 10px;
  margin: 20px 0;

  .selec_list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    padding: 0;
    margin: 0;

    li {
      list-style: none;
      font-size: 20px;
      letter-spacing: -1.2px;
      color: #adadad;
      cursor: pointer;

      &.active {
        color: #000;
        border-bottom: 2px solid #000;
      }
    }
  }
}
</style>