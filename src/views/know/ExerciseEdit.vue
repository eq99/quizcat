<script  lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ViditorVue from '@/components/know/Viditor.vue';

import { storeToRefs } from 'pinia';
import { useExerciseEditStore, useExerciseStore } from '@/stores/book';
import { useMessage } from 'naive-ui';
import { createExercise, updateExercise } from "@/apis/book";

import type {
  FormItemRule,
  FormValidationError,
  FormRules,
  FormInst
} from 'naive-ui';

// types
interface ModelType {
  title: string,
  content: string,
  solution: string,
  tags: string,
  hard: number
}

// vars
const route = useRoute();
const router = useRouter();
const exerciseEditStore = useExerciseEditStore();
const { storeUpdateExercise } = useExerciseStore();

const exerciseId = Number(route.params.exerciseId as string);
const bookId = Number(route.params.bookId as string);
const editType = route.query.type;
const message = useMessage();
const rules: FormRules = {
  title: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('exercise title is required')
        } else if (value.length < 1 || value.length > 255) {
          return new Error('exercise tile length should be 1~255 words.')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  content: [
    {
      required: false,
      validator(_rule: FormItemRule, value: string) {
        if (value.length < 1 || value.length > 3000) {
          return new Error('part name length should be 1~3000 words.')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  solution: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (value.length > 3000) {
          return new Error('exercise length should be 0~3000 words.')
        }
        return true
      },
    }
  ],
  hard: [
    {
      required: true,
      message: 'hard is required',
    }
  ],
  tags: [
    {
      required: true,
      message: 'tags is required',
    }
  ],
};

// states
const { title, content, solution, tags, hard } = storeToRefs(exerciseEditStore);
const form = ref<FormInst | null>(null);
const model = ref<ModelType>({
  title: title.value,
  content: content.value,
  solution: solution.value,
  tags: tags.value,
  hard: hard.value
});

// methods
function handleSubmit(e: MouseEvent) {
  form.value?.validate(
    (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        if (editType === "create") {
          createExercise({
            bookId: bookId,
            title: model.value.title,
            content: model.value.content,
            solution: model.value.solution,
            tags: model.value.tags,
            hard: model.value.hard,
          }).then(data => {
            message.info("create success, will go to exercise page.");
            setTimeout(() => {
              router.push(`/book/${bookId}/exs/${data.id}`);
            }, 2000);
          }).catch(e => {
            message.error(`error: ${e}`);
          })
        } else {
          const form = {
            id: exerciseId,
            title: title.value === model.value.title ? null : model.value.title,
            content: content.value === model.value.content ? null : model.value.content,
            solution: solution.value === model.value.solution ? null : model.value.solution,
            tags: tags.value === model.value.tags ? null : model.value.tags,
            hard: hard.value === model.value.hard ? null : model.value.hard,
          };
          updateExercise(form, bookId).then(data => {
            message.info("update success, will go back");
            storeUpdateExercise(form);
            setTimeout(() => {
              router.push(`/book/${bookId}/exs/${exerciseId}`);
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
});
</script>

<template>
  <div class="container">
    <n-form ref="form" :model="model" :rules="rules">
      <n-form-item path="title" label="Title">
        <n-input v-model:value="model.title" @keydown.enter.prevent placeholder="Please input Exercise title"
          size="large" />
      </n-form-item>
      <n-form-item label="Exercise Body">
        <ViditorVue v-model="model.content" :min-height="200"></ViditorVue>
      </n-form-item>
      <n-form-item label="Exercise Solution (Optional)">
        <ViditorVue v-model="model.solution" :min-height="200"></ViditorVue>
      </n-form-item>
      <n-form-item path="hard" label="Hard">
        <n-rate v-model:value="model.hard" allow-half />
      </n-form-item>
      <n-form-item path="tags" label="Tags, example: js:vue:mall">
        <n-input v-model:value="model.tags" type="text" placeholder="tags" />
      </n-form-item>
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
}
</style>