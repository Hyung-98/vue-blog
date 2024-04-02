<template>
  <router-link :to="`/list/${card.id}`">
    <div class="card" @click="postTitle">
      <img :src="`https://picsum.photos/id/${card.id}/300`" class="card-img-top" alt="" />
      <div class="card-body">
        <h5 class="card-title">{{ card.title }}</h5>
        <p class="card-text">{{ card.content }}</p>
        <p class="date">{{ card.date }}</p>
        <span class="nick">{{ card.name }}</span> <span>{{ card.rate }}</span>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  name: "CardVue",
  props: {
    card: Object,
  },
  methods: {
    postTitle() {
      this.emitter.emit('headerTitleChange', this.card.name);
    }
  }
};
</script>