<script  lang="ts" setup>
import { EditorView, basicSetup } from "codemirror"
import { javascript } from "@codemirror/lang-javascript"
// import { html } from "@codemirror/lang-html"
// import { oneDark } from "@codemirror/theme-one-dark";
import { onMounted, ref, shallowRef, watch, type ShallowRef } from "vue";

// types
import type {
  Transaction,
} from '@codemirror/state';

export interface Props {
  code: string,
}

// variables
const props = withDefaults(defineProps<Props>(), {
  code: "",
});

const emit = defineEmits<{
  (e: "change", v: string): void,
}>();

// custom editor styles
const customStyle = EditorView.theme({
  ".cm-scroller": { overflow: "visible" },
  "&.cm-editor": { height: '100%' },
  "&.cm-editor.cm-focused": { outline: 'none' }
});

// states
const doc = ref(props.code);
const editorEle = ref<HTMLElement>();
const view: ShallowRef<EditorView> = shallowRef(new EditorView());

// watchs
watch(
  () => props.code,
  value => {
    if (view.value.composing) {
      // IME fix
      return;
    }
    // Update
    view.value.dispatch({
      changes: { from: 0, to: view.value.state.doc.length, insert: value },
      selection: view.value.state.selection,
      scrollIntoView: true,
    });
  },
  { immediate: true }
);


// life cicle
onMounted(() => {
  view.value = new EditorView({
    doc: doc.value,
    extensions: [basicSetup, customStyle, javascript()],
    parent: editorEle.value,
    dispatch: (tr: Transaction) => {
      view.value.update([tr]);
      // TODO: Emit lint error event
      // console.log(view.state.doc.toString(), tr);
      if (tr.changes.empty) return;
      // child-to-parent binding
      const v = view.value.state.doc.toString();
      emit('change', v);
    },
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
  font-size: 16px;

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