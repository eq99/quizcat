import { ref, computed, reactive } from 'vue';
import type { Notification } from '@/types';
import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', () => {
  const notifications = reactive<Notification[]>([]);
  let timer = 0;

  // methods
  function pushNoti(noti: Notification) {
    if (notifications.length === 0) {
      timer = window.setInterval(shift, 3000);
    }
    notifications.push(noti);
  }

  function shift() {
    if (notifications.length === 1) clearInterval(timer);
    notifications.shift();
  }

  return { notifications, pushNoti };
});