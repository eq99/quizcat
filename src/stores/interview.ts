import { defineStore } from 'pinia';
import type { IQuestion, IComment } from '@/types'

export const useInterviewStore = defineStore('iquestions', {
  state: () => ({
    iquestions: [] as IQuestion[],
    comments: [] as IComment[], // 用户评论
  }),

  actions: {
    loadQuestions(questions: IQuestion[]) {
      this.iquestions = questions;
    },

    loadComments(comments: IComment[]) {
      this.comments = comments;
    },

    getIQuestionById(id: string): IQuestion | undefined {
      return this.iquestions.find((q) => {
        return String(q.id) === id;
      })
    },
    getMyComments(qid: string): IComment | undefined {
      return this.comments.find((c) => {
        return String(c.iQuestionID) === qid;
      })
    }
  }
})
