import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {
    const weatherData = getWeatherData()
    const weatherConditionIcons = WeatherConditionIcons

    return {
      weatherData,
      weatherConditionIcons
    }
  },


  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li v-for="weatherCard in weatherData" :key="weatherCard.geographic_name" class="weather-card"
            :class="{'weather-card--night': weatherCard.current.sunrise > weatherCard.current.dt || weatherCard.current.sunset < weatherCard.current.dt}">
          <div v-if="weatherCard.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ weatherCard.alert.sender_name }}: {{ weatherCard.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ weatherCard.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ weatherCard.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="weatherCard.current.weather.description">{{ weatherConditionIcons[weatherCard.current.weather.id] }}</div>
            <div class="weather-conditions__temp">{{ Number(weatherCard.current.temp - 273.15).toFixed(1) }} °C</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ Math.round(weatherCard.current.pressure * 0.75) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ weatherCard.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ weatherCard.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ weatherCard.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
