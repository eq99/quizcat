import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import type { IQuestion } from '@/types'
import { getIQuestionsByBookId } from '@/apis/interviews';

export const useInterviewStore = defineStore('iquestions', {
  state: () => ({
    iquestions: [] as IQuestion[],
  }),

  actions: {
    loadQuestions(questions: IQuestion[]) {
      this.iquestions = questions;
    },
    getIQuestionById(id: string): IQuestion | undefined {
      return this.iquestions.find((q) => {
        return String(q.id) === id;
      })
    }
  }
})
