import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const userId = ref('')

  // 清空用户ID
  function clearId() {
    userId.value = ''
  }

  // 清空搜索记录
  function clearSearchHistory() {
    searchHistory.value = []
  }

  // 存储搜索记录
  const searchHistory = ref([])

  return { userId, searchHistory, clearSearchHistory, clearId }
},

  {
    persist: true
  }
)
