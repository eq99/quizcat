<script  lang="ts" setup>
import { ref } from 'vue';

import type {
  FormItemRule,
  FormValidationError,
  FormRules,
  FormInst
} from 'naive-ui';

import { useMessage } from 'naive-ui';
import { updateBook } from "@/apis/book";
import { useBookStore } from '@/stores/book';
import { storeToRefs } from 'pinia';

// types
interface ModelType {
  name: string,
  about: string,
  category: string,
  subcategory: string,
  hard: number,
  cover: string,
}

// vars
const message = useMessage();
const bookStore = useBookStore();
const { storeUpdateBook } = bookStore;

const options = [
  {
    label: "数学",
    value: 'math',
  },
  {
    label: '外语',
    value: 'lang'
  },
  {
    label: '电脑',
    value: 'cs'
  },
];

const rules: FormRules = {
  name: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('book name is required')
        } else if (value.length < 2 || value.length > 20) {
          return new Error('book name length should be 2~20 words.')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  about: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('introduction is required')
        } else if (value.length < 10 || value.length > 3000) {
          return new Error('introduction length should be 100~3000 words.')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  category: [
    {
      required: true,
      message: 'category is required',
    }
  ],
  subcategory: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        if (!value) {
          return new Error('sub category is required')
        } else if (value.length < 2 || value.length > 20) {
          return new Error('subcategory length should be 2~20 words.')
        }
        return true
      },
      trigger: ['input', 'blur']
    }
  ],
  hard: [
    {
      required: true,
      message: 'hard is required',
    }
  ],
  cover: [
    {
      required: true,
      message: 'cover link is required',
    }
  ],
};

// states
const { book } = storeToRefs(bookStore);
const form = ref<FormInst | null>(null);
const [category, subcategory] = book.value!.category.split(":");
const model = ref<ModelType>({
  name: book.value!.name,
  about: book.value!.about,
  category: category,
  subcategory: subcategory,
  hard: book.value!.hard / 2,
  cover: book.value!.cover,
});

const hasSubmited = ref(false);


// methods
function handleSubmit(e: MouseEvent) {
  form.value?.validate(
    (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        const form = {
          id: book.value!.id,
          name: model.value.name === book.value!.name ? null : model.value.name,
          about: model.value.about === book.value!.about ? null : model.value.about,
          hard: model.value.hard === book.value!.hard ? null : model.value.hard*2,
          cover: model.value.cover === book.value!.cover ? null : model.value.cover,
          category: model.value.category === category && model.value.subcategory === subcategory ? null : `${model.value.category}:${model.value.subcategory}`
        }

        updateBook(form).then(() => {
          storeUpdateBook(form);
          message.info("Update success");
          hasSubmited.value = true;
        }).catch(err => {
          message.error(`Update failed: ${err}, please try later`);
          hasSubmited.value = true;
        });
      } else {
        message.error('Invalid fields');
      }
    }
  )
}
</script>

<template>
  <div class="book">
    <n-form ref="form" :model="model" :rules="rules">
      <n-form-item path="name" label="Book Name">
        <n-input v-model:value="model.name" @keydown.enter.prevent />
      </n-form-item>
      <n-form-item path="about" label="Book Introdution">
        <n-input v-model:value="model.about" type="textarea" placeholder="支持 markdown 语法" @keydown.enter.prevent />
      </n-form-item>
      <n-form-item path="categoy" label="Category">
        <n-select v-model:value="model.category" :options="options" />
      </n-form-item>
      <n-form-item path="subcategoy" label="Sub Category">
        <n-input v-model:value="model.subcategory" type="text" />
      </n-form-item>
      <n-form-item path="hard" label="Hard">
        <n-rate v-model:value="model.hard" allow-half />
      </n-form-item>
      <n-form-item path="hard" label="Cover Link">
        <n-input v-model:value="model.cover" type="text" placeholder="封面链接" />
      </n-form-item>
      <n-image width="100" :src="model.cover" />
      <n-row :gutter="[0, 24]">
        <n-col :span="24">
          <div style="display: flex; justify-content: flex-end">
            <n-button round type="primary" @click.prevent="handleSubmit" :disabled="hasSubmited">
              Submit
            </n-button>
          </div>
        </n-col>
      </n-row>
    </n-form>
  </div>
</template>

<style lang="scss" scoped>
.book {
  background-color: #fff;
  padding: 12px 24px;
  width: 720px;
  margin-left: 12px;
  margin-top: 32px;
}
</style>