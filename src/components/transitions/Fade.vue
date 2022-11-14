<script lang="ts" setup>
// JavaScript hooks logic...
</script>

<template>
    <!-- wrap the built-in Transition component -->
    <Transition name="fade">
        <slot></slot> <!-- pass down slot content -->
    </Transition>
</template>

<style>
/*
  Necessary CSS...
  Note: avoid using <style scoped> here since it
  does not apply to slot content.
*/
/* we will explain what these classes do next! */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>