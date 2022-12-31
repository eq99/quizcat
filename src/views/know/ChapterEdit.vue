<script  lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { storeToRefs } from 'pinia';
import { useChapterEditStore, useChapterStore } from '@/stores/book';
import { useMessage } from 'naive-ui';
import { createChapter, updateChapter } from "@/apis/book";

import type {
  FormItemRule,
  FormValidationError,
  FormRules,
  FormInst
} from 'naive-ui';
import router from '@/router';

// types
interface ModelType {
  name: string,
  part: string,
  content: string
}

// vars
const route = useRoute();
const chapterEditStore = useChapterEditStore();
const { storeUpdateChapter } = useChapterStore();

const chapterId = Number(route.params.chapterId as string);
const bookId = Number(route.params.bookId as string);
const editType = route.query.type;
const message = useMessage();
const rules: FormRules = {
  name: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('chapter name is required')
        } else if (value.length < 2 || value.length > 20) {
          return new Error('chapter name length should be 2~20 words.')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  part: [
    {
      required: false,
      validator(_rule: FormItemRule, value: string) {
        if (value.length > 20) {
          return new Error('part name length should be 0~20 words.')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  content: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (value.length<100 || value.length > 15000) {
          return new Error('chapter length should be 100~15000 words.')
        }
        return true
      },
    }
  ],
};

// states
const vditor = ref<Vditor | null>(null);
const { content, name, part } = storeToRefs(chapterEditStore);
const form = ref<FormInst | null>(null);
const model = ref<ModelType>({
  name: name.value,
  part: part.value,
  content: content.value,
});

// methods
function handleSubmit(e: MouseEvent) {
  form.value?.validate(
    (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        if (editType === "create") {
          createChapter({
            content: model.value.content,
            name: model.value.name,
            part: model.value.part,
            bookId: bookId,
            currentId: chapterId === 0 ? null : chapterId
          }).then(data => {
            message.info("create success, will go to chapter page.");
            setTimeout(() => {
              router.push(`/book/${bookId}/chapters/${data.id}`);
            }, 2000);
          }).catch(e => {
            message.error(`error: ${e}`);
          })
        } else {
          const form = {
            id: chapterId,
            name: name.value === model.value.name ? null : model.value.name,
            part: part.value === model.value.part ? null : model.value.part,
            content: content.value === model.value.content ? null : model.value.content,
          };
          updateChapter(form).then(data => {
            message.info("update success, will go back");
            storeUpdateChapter(form);
            setTimeout(() => {
              router.push(`/book/${bookId}/chapters/${chapterId}`);
            }, 2000);
          }).catch(e => {
            message.error(`error: ${e}`);
          })
        }
      } else {
        message.error('Invalid fields');
      }
    }
  )
}

// lifes
onMounted(() => {
  vditor.value = new Vditor('vditor', {
    after: () => {
      vditor.value!.setValue(content.value);
    },
    input(md) {
      model.value.content = md;
    },
  });
});
</script>

<template>
  <div class="container">
    <n-form ref="form" :model="model" :rules="rules">
      <n-form-item path="name" label="Title">
        <n-input v-model:value="model.name" @keydown.enter.prevent placeholder="Please input Chapter title"
          size="large" />
      </n-form-item>
      <n-form-item path="" label="Part name (Optional)">
        <n-input v-model:value="model.part" @keydown.enter.prevent placeholder="Please input Part name" size="large" />
      </n-form-item>
      <div id="vditor"></div>
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end">
            <n-button round type="primary" @click.prevent="handleSubmit">
              Submit
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </div>
</template>

<style lang="scss" scoped>
.container {
  padding-top: 20px;
  max-width: 960px;
  margin: auto;

  #vditor {
    margin-bottom: 16px;
    min-height: 400px;
  }
}
</style>