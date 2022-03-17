<template>
    <div class="example2-wrapper">
        <div class="inner">
            <div class="item">
                <p>我是 example2 页面。以下示例注意打开控制台观察</p>
            </div>
            <div class="item">
                <p>演示用户信息通过store获取</p>
                <p>{{$store.getters.user}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {},
        data () {
            return {
                initDateTime: new Date()
            }
        },
        created () {
        },
        methods: {
        }
    }
</script>

<style scoped>
    @import './index.css';
</style>
