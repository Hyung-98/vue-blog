<template>
  <div class="main">
    <!-- 셀렉 -->
    <Selected @activeEvent="activeEvent" @dayEvent="dayEvent($event)" />
    <!-- // 셀렉 -->
    <!-- 메인 -->
    <main>
      <Card v-for="(item, i) in data" :key="i" :card="item" @headerTitleChange="headerTitleChange($event)" />
    </main>
    <!-- // 메인 -->
  </div>
</template>
<script>
import SelectedVue from "@/components/SelectedVue.vue";
import CardVue from "@/components/CardVue.vue";

export default {
  name: "MainPage",
  props: {
    dt: Array,
  },
  data() {
    return {
      backup: [...this.dt],
      data: [...this.dt],
      year: 0,
      mon: 0,
      date: 0,
    };
  },
  methods: {
    activeEvent(event) {
      event.target.parentNode.childNodes.forEach((e) => {
        e.classList.remove("active");
      });
      event.target.classList.add("active");

      this.initData();

      if (event.target.innerText === "트렌딩") {
        this.trendEvent();
      } else if (event.target.innerText === "최신") {
        this.newEvent();
      }
    },
    initData() {
      this.data = [...this.backup];
    },
    trendEvent() {
      this.data.sort((a, b) => {
        return b.rate - a.rate;
      });
    },
    newEvent() {
      this.data.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
    },
    dayEvent(event) {
      this.initData();

      var today = new Date();
      this.year = today.getFullYear();
      this.mon = today.getMonth() + 1;
      this.date = today.getDate();

      if (event === "0") {
        this.data = this.data.filter((card) => {
          return (
            new Date(card.date).getFullYear() === this.year &&
            new Date(card.date).getMonth() + 1 === this.mon &&
            new Date(card.date).getDate() === this.date
          );
        });
      } else if (event === "1") {
        this.data = this.data.filter((card) => {
          return (
            new Date(card.date).getTime() / (1000 * 60 * 60 * 24) >=
            new Date().getTime() / (1000 * 60 * 60 * 24) - 7
          );
        });
      } else if (event === "2") {
        this.data = this.data.filter((card) => {
          return (
            new Date(card.date).getTime() / (1000 * 60 * 60 * 24) >=
            new Date().getTime() / (1000 * 60 * 60 * 24) - 31
          );
        });
      } else if (event === "3") {
        this.data = this.data.filter((card) => {
          return (
            new Date(card.date).getTime() / (1000 * 60 * 60 * 24) >=
            new Date().getTime() / (1000 * 60 * 60 * 24) - 365
          );
        });
      }
    },
    headerTitleChange(event) {
      console.log(event);
    }
  },
  components: {
    Selected: SelectedVue,
    Card: CardVue,
  },
};
</script>
<style>
.main {max-width: 1920px; margin: 0 auto;}
</style>