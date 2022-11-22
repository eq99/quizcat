import { defineStore } from 'pinia';
import type { IQuestion, IComment, InterviewBook } from '@/types'

export const useInterviewStore = defineStore('iquestions', {
  state: () => ({
    books: [] as InterviewBook[],
    iquestions: [] as IQuestion[],
    comments: [] as IComment[],
  }),

  actions: {
    loadQuestions(questions: IQuestion[]) {
      this.iquestions = questions;
    },

    loadComments(comments: IComment[]) {
      this.comments = comments;
    },

    loadBooks(books: InterviewBook[]) {
      this.books = books;
    },

    getIBookById(bookid: string): InterviewBook | undefined {
      return this.books.find(b => String(b.id) === bookid)
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
