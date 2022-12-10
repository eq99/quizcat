<script  lang="ts" setup>
import { is } from '@babel/types';
import { ref } from 'vue';


// states
const isFocus = ref(false);

// methods
function handleFocus() {
  isFocus.value = true;
}

function handleBlur() {
  isFocus.value = false;
}
</script>

<template>
  <div class="search-box" :class="{ focus: isFocus }">
    <input type="text" @focus="handleFocus" @blur="handleBlur" placeholder="搜索">
    <i class="iconfont icon-add"></i>
  </div>
</template>

<style lang="scss" scoped>
.search-box {
  --border-color: #67c23a;
  --caret-color: #18a058;
  --out-line-color: rgba(112, 199, 69, 0.5);

  border: 1px solid var(--border-color);
  border-radius: 100px;
  padding: 4px 12px;
  line-height: 1.5;
  box-sizing: border-box;
  margin: 12px 8px;

  display: flex;
  align-items: center;

  &.focus {
    outline: 1px solid var(--out-line-color);
    caret-color: var(--caret-color);
  }

  input {
    flex: 1;
  }

  .iconfont {
    font-size: 20px;
    cursor: pointer;
    color: #999;
    margin: 0 8px;
  }
}
</style>