<template>
    <div>
        <h1>{{ user.title }}</h1>
        <section>
            <h2>{{ user.content }}</h2>
            <ul>
                <li>{{ user.date }}</li>
                <li>{{ user.name }}</li>
                <li>{{ user.rate }}</li>
            </ul>
        </section>
        <router-link :to="{ name: 'index', params: { id: user.id } }"></router-link>
    </div>
</template>
<script>
export default{
    data() {
        return {
            user: {}
        }
    },
    created () {
        var id = this.$route.params.id;
        this.$axios.get(`/api/data/${id}`)
            .then((response) => {
                this.user = response.data[0]
            })
    }
}
</script>