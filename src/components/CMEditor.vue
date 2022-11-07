<script  lang="ts" setup>
import { EditorView, basicSetup } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { html } from "@codemirror/lang-html"
import { onMounted, ref } from "vue";

// types
export interface Props {
  code: string,
}

// variables
const props = withDefaults(defineProps<Props>(), {
  code: "",
});

// custom editor styles
const fixedHeightEditor = EditorView.theme({
  ".cm-scroller": { overflow: "visible" },
  "&.cm-editor": { height: '100%' },
  "&.cm-editor.cm-focused": { outline: 'none' }
});


const editorEle = ref<HTMLElement>()
// states
const doc = ref(props.code);


// life cicle
onMounted(() => {
  const view = new EditorView({
    doc: doc.value,
    extensions: [basicSetup, fixedHeightEditor, html(), javascript()],
    parent: editorEle.value!
  });
});
</script>

<template>
  <div ref="editorEle" class="editor-box"></div>
</template>


<style lang="scss" scoped>
.editor-box {
  height: 100%;
  overflow-x: auto;

  &::-webkit-scrollbar {
    &:horizontal {
      height: 8px;
    }

    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: #fff;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #666;
  }

  scrollbar-width: thin;
}
</style>