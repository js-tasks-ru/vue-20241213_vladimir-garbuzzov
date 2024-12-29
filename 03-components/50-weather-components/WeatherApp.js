import { defineComponent } from 'vue'
import { getWeatherData } from './weather.service.ts'
import './WeatherApp.css'

import WeatherList from './WeatherList.js'

const weatherData = getWeatherData()

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherList,
  },

  setup() {
    return {
      weatherData,
    }
  },


  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <WeatherList :weather="weatherData" />
    </div>
  `,
})
