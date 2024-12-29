import {defineComponent, toRef, computed} from 'vue'
import { WeatherConditionIcons } from './weather.service.ts'
import WeatherAlert from './WeatherAlert.js'
import WeatherDetailsItem from './WeatherDetailsItem.js'

function isNight(dt, sunrise, sunset) {
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

    const { alert, geographic_name, current } = weatherItem.value

    const currentWeatherItem = computed(() => {
      return {
        ...current,
        temp: convertKelvinToCelsius(current.temp),
        pressure: converthPatommHg(current.pressure),
        isNight: isNight(current.dt, current.sunrise, current.sunset),
      }
    })

    return {
      WeatherConditionIcons,
      alert,
      currentWeatherItem,
      geographic_name,
    }
  },

  template: `
    <li class="weather-card" :class="{'weather-card--night': currentWeatherItem.isNight }">
      <WeatherAlert v-if="alert">
        {{ alert.sender_name }}: {{ alert.description }}
      </WeatherAlert>
      <div>
        <h2 class="weather-card__name">
          {{ geographic_name }}
        </h2>
        <div class="weather-card__time">
          {{ currentWeatherItem.dt }}
        </div>
      </div>
      <div class="weather-conditions">
        <div class="weather-conditions__icon" :title="currentWeatherItem.weather.description">{{ WeatherConditionIcons[currentWeatherItem.weather.id] }}</div>
        <div class="weather-conditions__temp">{{ currentWeatherItem.temp }} °C</div>
      </div>

      <div class="weather-details">
        <WeatherDetailsItem title="Давление, мм рт. ст." :value="currentWeatherItem.pressure" />
        <WeatherDetailsItem title="Влажность, %" :value="currentWeatherItem.humidity" />
        <WeatherDetailsItem title="Облачность, %" :value="currentWeatherItem.clouds" />
        <WeatherDetailsItem title="Ветер, м/с" :value="currentWeatherItem.wind_speed" />
      </div>
    </li>
  `,
})
