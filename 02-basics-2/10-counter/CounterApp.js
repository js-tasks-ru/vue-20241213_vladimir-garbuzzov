import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() {
    const count = ref(0)

    const increment = () => {
      count.value++
    }

    const decrement = () => {
      count.value--
    }


    return {
      count,
      increment,
      decrement
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        @click.prevent="decrement"
        :disabled="count === 0"
      >➖</button>

      <span class="count" data-testid="count">{{ count }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        @click.prevent="increment"
        :disabled="count === 5"
      >➕</button>
    </div>
  `,
})
