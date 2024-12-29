import { defineComponent, onMounted, onUnmounted, ref } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const time = ref(new Date().toLocaleTimeString(navigator.language, { timeStyle: 'medium' }))

    onMounted(() => {
      setInterval(() => {
        time.value = new Date().toLocaleTimeString(navigator.language, { timeStyle: 'medium' })
      }, 1000)
    })

    onUnmounted(() => {
      clearInterval()
    })

    return { time }
  },

  template: `<div class="clock">{{ time }}</div>`,
})
