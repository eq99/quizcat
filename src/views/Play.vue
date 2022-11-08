<script  lang="ts" setup>
import Split from '@/components/Split.vue';
import CMEditor from '@/components/CMEditor.vue';
import { onMounted, onUnmounted, ref } from 'vue';

// states
const code = ref(`console.log("hello world");`);
const output = ref('');
const editor = ref<InstanceType<typeof CMEditor>>();

// methods
function evalJavaScript(code: string) {
  // https://krasimirtsonev.com/blog/article/build-your-own-interactive-javascript-playground
  try {
    (new Function(`"use strict";${code}`))();
  } catch (error) {
    console.error(error);
  }
}

function handleOutput(out: any, mtype: string = 'info') {
  let outStr = typeof out === 'string' ? out : JSON.stringify(out);
  outStr = outStr?.replace(/\n/g, "<br>").replace(/\s/g, "&nbsp;"); //line break and hold blanks

  if (mtype === "error") {
    output.value += `<div class='msg err'>${outStr}</div>`;
  } else {
    output.value += `<div class='msg'>${outStr}</div>`;
  }
}

function clearOutput() {
  output.value = "";
}

function hackOutput() {
  const originalError = console.error;
  const originalLog = console.log;
  const originalWarning = console.warn;
  const originalInfo = console.info;
  const originalClear = console.clear;

  console.error = function (...args) {
    handleOutput(args[0].toString() + (args[0]?.stack || ""), "error");
    originalError.apply(console, args);
  };
  console.log = function (...args) {
    args.forEach((val) => handleOutput(val));
    originalLog.apply(console, args);
  };
  console.warn = function (...args) {
    args.forEach((val) => handleOutput(val));
    originalWarning.apply(console, args);
  };
  console.info = function (...args) {
    args.forEach((val) => handleOutput(val));
    originalInfo.apply(console, args);
  };
  console.clear = function (...args) {
    clearOutput();
    originalClear.apply(console, args);
  };
}

function runCode() {
  clearOutput();
  evalJavaScript(code.value);
}

function handleChange(newCode: string) {
  code.value = newCode;
}

// life cicle
onMounted(async () => {
  hackOutput();
});

onUnmounted(async () => {

});
</script>

<template>
  <header>
    <div class="container">
      <div class="logo">代码喵</div>
      <div class="actions">
        <div class="btn" @click="runCode">运行</div>
        <div class="btn" @click="editor?.formatCode">美化</div>
      </div>
    </div>
  </header>
  <Split class="page">
    <template #one>
      <CMEditor :code="code" class="editor" @change="handleChange" ref="editor"></CMEditor>
    </template>

    <template #two>
      <div class="right" v-html="output"></div>
    </template>
  </Split>
</template>

<style lang="scss" scoped>
header {
  background-color: var(--purple1);
  color: var(--purple4);

  .container {
    display: flex;
    align-items: center;

    height: var(--header-height);
    box-sizing: border-box;
    border-bottom: 2px solid var(--purple4);

    .logo {
      font-size: 30px;
      margin-left: 36px;

    }

    .actions {
      margin-left: auto;
      margin-right: 40px;
      display: flex;

      .btn {
        margin-right: 20px;
        padding: 4px 16px;
        border: 1px solid var(--purple4);
        border-radius: 6px;
        font-size: 20px;
        cursor: pointer;

        transition: .3s;

        &:hover {
          background-color: var(--purple2);
        }
      }
    }
  }
}

.page {
  width: 100vw;
  height: calc(100vh - var(--header-height));

  .left {
    height: 100%;
  }

  .right {
    height: 100%;
    font-size: 12px;
    font-family: Monaco, monospace, Menlo, "Courier New";
    box-sizing: border-box;
    padding: 12px 0;

    :deep(.msg) {
      border-bottom: 1px solid #aaa;
      padding: 4px 20px;
    }

    :deep(.msg.err) {
      color: red;
    }
  }
}
</style>