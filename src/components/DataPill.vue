<script lang="ts">
export default {
    name: 'DataPill',
    props: ["text", "data"],
}
</script>

<template>
    <span class="data-pill">
        <span class="text">{{ text }}</span>
        <span class="data">{{ data }}</span>
    </span>
</template>

<style scoped>
.data-pill {
    display: inline-block;
    font-size: 12px;
    align-items: center;
    border: 1px solid var(--fg-primary);
    border-radius: 4px;
    margin: 4px;
}

.data-pill .text {
    display: inline-flex;
    padding: 2px 4px;
    border-right: 1px solid var(--fg-primary);
}

.data-pill .data {
    display: inline-block;
    padding: 2px 4px;
}
</style>