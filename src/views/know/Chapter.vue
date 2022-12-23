<script  lang="ts" setup>
import HeaderVue from '@/components/site/Header.vue';
</script>

<template>
    <HeaderVue title="章节"></HeaderVue>
    <div class="main">
        <div class="side">
            目录
        </div>
        <div class="content">
            内容
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    display: flex;

    .side {
        flex: 0 0 168px;


        background-color: #fff;
        height: 700px;
    }
}
</style>