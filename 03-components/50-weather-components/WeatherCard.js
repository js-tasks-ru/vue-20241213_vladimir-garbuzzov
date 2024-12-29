import {defineComponent, toRef, computed, onMounted} from 'vue'
import { WeatherConditionIcons } from './weather.service.ts'
import WeatherAlert from './WeatherAlert.js'
import WeatherDetailsItem from './WeatherDetailsItem.js'

function isItNight(dt, sunrise, sunset) {
  return dt < sunrise || dt > sunset
}

function convertKelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(1)
}

function converthPatommHg(hPa) {
  return (hPa * 0.75).toFixed(0)
}

export default defineComponent({
  name: 'WeatherCard',

  components: {
    WeatherAlert,
    WeatherDetailsItem,
  },

  props: {
    weatherItem: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const weatherItem = toRef(() => props.weatherItem)

    const temp = computed(() => convertKelvinToCelsius(weatherItem.value.current.temp))
    const pressure = computed(() => converthPatommHg(weatherItem.value.current.pressure))
    const isNight = computed(() => isItNight(weatherItem.value.current.dt, weatherItem.value.current.sunrise, weatherItem.value.current.sunset))

    return {
      WeatherConditionIcons,
      temp,
      pressure,
      isNight,
      weatherItem
    }
  },

  template: `
    <li class="weather-card" :class="{'weather-card--night': isNight }">
      <WeatherAlert v-if="weatherItem.alert">
        {{ weatherItem.alert.sender_name }}: {{ weatherItem.alert.description }}
      </WeatherAlert>
      <div>
        <h2 class="weather-card__name">
          {{ weatherItem.geographic_name }}
        </h2>
        <div class="weather-card__time">
          {{ weatherItem.current.dt }}
        </div>
      </div>
      <div class="weather-conditions">
        <div class="weather-conditions__icon" :title="weatherItem.current.weather.description">{{ WeatherConditionIcons[weatherItem.current.weather.id] }}</div>
        <div class="weather-conditions__temp">{{ temp }} °C</div>
      </div>

      <div class="weather-details">
        <WeatherDetailsItem title="Давление, мм рт. ст." :value="pressure" />
        <WeatherDetailsItem title="Влажность, %" :value="weatherItem.current.humidity" />
        <WeatherDetailsItem title="Облачность, %" :value="weatherItem.current.clouds" />
        <WeatherDetailsItem title="Ветер, м/с" :value="weatherItem.current.wind_speed" />
      </div>
    </li>
  `,
})
