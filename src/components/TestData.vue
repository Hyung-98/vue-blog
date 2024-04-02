<template>
    <div>
        <h1>회원 게시물 데이터 목록</h1>
        <ul>
            <li v-for="data in datas" :key="data.id">
                <span>{{ data.id }}</span>
                <router-link :to="{ name: 'show', params: { id: data.id } }">
                    {{ data.title }}
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data () {
        return {
            datas: []
        }
    },
    created () {
        this.$axios.get('/api/data')
            .then((response) => {
                this.datas = response.data
            }).catch(err => {
                alert(err);
                console.log(err);
            })
    }
}
</script>
