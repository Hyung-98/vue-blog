<template>
    <div class="newList">
        <div class="left">
            <textarea
                id="title"
                placeholder="제목을 입력하세요"
                @input="titAutoHeight($event)"
            ></textarea>
            <textarea
                id="text"
                placeholder="원하는 이야기를 적어보세요.."
                @input="textUpdate($event)"
            ></textarea>

            <div class="submitArea">
                <button type="button" class="back">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
                    나가기
                </button>
                <div class="btn_box">
                    <button type="button" class="add">임시저장</button>
                    <button type="button" class="submit">출간하기</button>
                </div>
            </div>
        </div>
        <div class="right">
            <h1 id="title_sub">{{ this.$store.state.newListState.title }}</h1>
            <div id="text_sub">{{ this.$store.state.newListState.text }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NewList',
    methods: {
        titAutoHeight(event) {
            const $target = event.target;

            $target.style.height = 0;
            $target.style.height = $target.scrollHeight + 'px';
            this.$store.commit('newListTit', $target.value);
        },
        textUpdate(event) {
            const $target = event.target;

            $target.style.height = 0;
            $target.style.height = $target.scrollHeight + 'px';
            this.$store.commit('newListTxt', $target.value);
        }
    },
    mounted() {
        const title = document.querySelector('#title');
        title.style.height = this.$store.state.defaultHeight + 'px';
    }
}
</script>
<style lang="scss" scoped>
.newList {
    display: flex;
    height: calc(100% - 106px);

    > div {
        width: 50%;
    }

    .left {
        position: relative;

        #title {
            width: 100%;
            font-size: 40px;
            border: none;
            outline: none;
            resize: none;
            overflow-y: hidden;
        }
        #text {
            width: 100%;
            font-size: 18px;
            border: none;
            outline: none;
            resize: none;
        }
        .submitArea {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 20px;
            box-shadow: 5px -5px 16px #ededed;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .back {
                display: flex;
                align-items: center;
                gap: 10px;
                font-size: 22px;
                padding: 5px 20px;
                border-radius: 5px;

                &:hover {
                    background: #f0f0f0;
                }
            }

            .add {
                font-size: 22px;
                font-weight: bold;
                background: #fff;
                color: #1fc997;
                border-radius: 5px;
                padding: 5px 20px;
            }
            .submit {
                font-size: 22px;
                font-weight: bold;
                background: #1fc997;
                color: #fff;
                border-radius: 5px;
                padding: 5px 20px;
                margin-left: 15px;
            }

            .add:hover {
                background: #f0f0f0;
            }
            .submit:hover {
                background: #24e6ab;
            }
        }
    }
    .right {
        #title_sub {
            width: 100%;
            font-size: 40px;
            word-break: break-all;
        }
        #text_sub {
            width: 100%;
            font-size: 18px;
            word-break: break-all;
            white-space: pre;
        }
    }
}
</style>