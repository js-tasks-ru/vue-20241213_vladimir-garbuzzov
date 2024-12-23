import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstOperand = ref(10)
    const secondOperand = ref(10)

    const currentOperator = ref('sum')

    const calculateResult = computed(() => {
      switch (currentOperator.value) {
        case 'sum':
          return firstOperand.value + secondOperand.value
        case 'subtract':
          return firstOperand.value - secondOperand.value
        case 'multiply':
          return firstOperand.value * secondOperand.value
        case 'divide':
          return firstOperand.value / secondOperand.value
      }
    })


    return {
      firstOperand,
      secondOperand,
      currentOperator,
      calculateResult
    }
  },

  template: `
    <div class="calculator">
      <input v-model="firstOperand" type="number" aria-label="First operand" />

      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum" v-model="currentOperator"/>➕</label>
        <label><input type="radio" name="operator" value="subtract" v-model="currentOperator"/>➖</label>
        <label><input type="radio" name="operator" value="multiply" v-model="currentOperator"/>✖</label>
        <label><input type="radio" name="operator" value="divide" v-model="currentOperator"/>➗</label>
      </div>

      <input v-model="secondOperand" type="number" aria-label="Second operand" />

      <div>=</div>

      <output>{{ calculateResult }}</output>
    </div>
  `,
})
