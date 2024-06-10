<!-- Notification.vue -->
<template>
  <div v-if="notifications.length" class="notifications">
    <div v-for="(notification, index) in notifications" :key="index" :class="['notification', notification.type]">
      <div class="notification-content">
        <h3>{{ notification.title }}</h3>
        <p>{{ notification.message }}</p>
      </div>
      <button @click="removeNotification(index)" class="close-btn">&times;</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useNotifications } from './notificationStore';

export default defineComponent({
  setup() {
    const { notifications, removeNotification } = useNotifications();

    return {
      notifications,
      removeNotification
    };
  }
});
</script>

<style scoped>
.notifications {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}

.notification {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.error {
  border-color: #ff6347;
}

.success {
  border-color: #32cd32;
}

.notification-content h3 {
  margin-top: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #666;
  font-size: 18px;
  cursor: pointer;
}
</style>
