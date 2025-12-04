<template>
  <v-card
    class="weather-widget"
    :max-width="MAX_WIDTH"
    :min-height="MIN_HEIGHT"
    :class="padding"
    :style="{ backgroundColor, border, borderRadius, color, boxShadow }"
    :loading="weatherWidgetStore.isLoading"
  >
    <v-card-title :class="paddingTitle">
      <v-row>
        <v-col cols="9" class="weather-widget__title d-flex align-center fs-title" :class="paddingCol">
          {{ mappedWeather.name }}
        </v-col>

        <v-col cols="3" class="d-flex justify-end" :class="paddingCol">
          <weather-settings-btn icon="mdi-cog-outline" variant="text" color="default" />
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text class="text-center" :class="paddingText">
      <v-progress-circular v-if="weatherWidgetStore.isLoading" class="mr-2" indeterminate />
      <v-container v-else class="pa-0">
        <v-row>
          <v-col class="d-flex align-center justify-center" :class="paddingCol">
            <img :src="mappedWeather.url" class="weather-widget__img" />

            <span class="text-h4">{{ mappedWeather.temperature }}</span>
          </v-col>
        </v-row>

        <v-row class="pt-2 px-2">
          <v-col class="text-left" :class="paddingCol"> {{ mappedWeather.subtext }}</v-col>
        </v-row>

        <v-row class="pt-2 px-2">
          <v-col class="text-left" :class="paddingCol">
            <v-icon icon="mdi-navigation-variant" />

            {{ mappedWeather.wind.text }}
          </v-col>

          <v-col class="text-left" :class="paddingCol">
            <v-icon icon="mdi-speedometer-slow" />

            {{ mappedWeather.pressure }}
          </v-col>
        </v-row>

        <v-row class="pt-2 px-2">
          <v-col class="text-left" :class="paddingCol"> {{ mappedWeather.humidity }}</v-col>

          <v-col class="text-left" :class="paddingCol"> {{ mappedWeather.dewPoint }}</v-col>
        </v-row>

        <v-row class="py-2 px-2">
          <v-col class="text-left" :class="paddingCol"> {{ mappedWeather.visibility }}</v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { useWeatherWidgetStore } from '@/stores/WeatherWidgetStore'

const MAX_WIDTH = 290
const MIN_HEIGHT = 140
const BASE_URL = 'http://openweathermap.org'
const DIRECTIONS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']

export default {
  name: 'weatherWidget',
  props: {
    backgroundColor: {
      type: String as PropType<string>,
      default: () => 'white',
    },

    border: {
      type: String as PropType<string>,
      default: () => '1px solid #CCC',
    },

    borderRadius: {
      type: String as PropType<string>,
      default: () => '5px',
    },

    boxShadow: {
      type: String as PropType<string>,
      default: () => '1px 1px 1px #DDD',
    },

    color: {
      type: String as PropType<string>,
      default: () => '#444',
    },

    padding: {
      type: Number as PropType<number>,
      default: () => 2,
    },

    paddingTitleY: {
      type: Number as PropType<number>,
      default: () => 0,
    },

    paddingTitleX: {
      type: Number as PropType<number>,
      default: () => 2,
    },

    paddingTextY: {
      type: Number as PropType<number>,
      default: () => 1,
    },

    paddingTextX: {
      type: Number as PropType<number>,
      default: () => 2,
    },

    paddingColY: {
      type: Number as PropType<number>,
      default: () => 1,
    },

    paddingColX: {
      type: Number as PropType<number>,
      default: () => 1,
    },
  },
  setup(props) {
    const weatherWidgetStore = useWeatherWidgetStore()

    const mappedWeather = computed(() => {
      const { name, sys, weather, visibility, main, wind } = weatherWidgetStore.data

      const temperature = mapTemperature(main.temp)
      let subtext = `Feels like ${mapTemperature(main.feels_like)}`

      let url = ''
      if (weather.length > 0) {
        const { icon, description, main } = weather[0]
        url = `${BASE_URL}/img/wn/${icon}.png`
        subtext = `${subtext}. ${main}. ${description}`
      }

      const textWind = `${wind.speed.toFixed(1)}m/s ${getWindTextDirection(wind.deg)}`
      const dewPoint = main.temp - (100 - main.humidity) / 5
      const visibilityValue = (visibility / 1000).toFixed(1)

      return {
        temperature,
        name: `${name}, ${sys.country}`,
        subtext,
        url,
        wind: {
          text: textWind,
          deg: wind.deg,
        },
        pressure: `${main.pressure}hPa`,
        humidity: `Humidity: ${main.humidity} %`,
        dewPoint: `Dew Point: ${dewPoint.toFixed(1)} °C`,
        visibility: `Visibility: ${visibilityValue}km`,
      }
    })

    const padding = computed(() => 'pa-' + props.padding)
    const paddingTitle = computed(() => 'py-' + props.paddingTitleY + ' py-' + props.paddingTitleX)
    const paddingText = computed(() => 'py-' + props.paddingTextY + ' px-' + props.paddingTextX)
    const paddingCol = computed(() => 'py-' + props.paddingColY + ' px-' + props.paddingColX)

    const mapTemperature = (temp: number) => {
      const sign = temp === 1 ? '+' : ''
      return sign + Math.round(temp) + '°C'
    }

    const getWindTextDirection = (deg: number) => {
      const directions: string[] = DIRECTIONS

      const index = Math.floor((deg + 11.25) / 22.5)

      return directions[index % 16]
    }

    onMounted(() => {
      weatherWidgetStore.fetch()
    })

    return {
      MAX_WIDTH,
      MIN_HEIGHT,

      weatherWidgetStore,

      padding,
      paddingTitle,
      paddingText,
      paddingCol,
      mappedWeather,
    }
  },
}
</script>

<style lang="scss" scoped>
.weather-widget {
  margin: auto;

  &__title {
    font-size: 14px;
    font-weight: 600;
  }

  &__img {
    width: 80px;
  }
}
</style>
