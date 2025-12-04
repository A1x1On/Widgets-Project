import { defineStore } from 'pinia'

import WeatherWidgetService from '@/services/WeatherWidgetService'
import {
  type IWeather,
  type IWeatherCity,
  type IWeatherSettings,
  WEATHER_SETTINGS,
  CITIES,
  WEATHER,
  SELECTED_CITY,
} from '@/entities/weather'

export const useWeatherWidgetStore = defineStore('weatherWidgetStore', () => {
  const isLoading = ref<boolean>(false)
  const data = ref<IWeather>(WEATHER)

  const showSettings = ref<boolean>(false)
  const settings = ref<IWeatherSettings>(WEATHER_SETTINGS)
  const cityList = ref<IWeatherCity[]>([])
  const selectedCity = ref<IComboboxN>(SELECTED_CITY)

  const mappedCityList = computed((): IComboboxN[] => {
    return cityList.value.map((c: IWeatherCity) => {
      const { id, name, country } = c

      return {
        title: `${name}, ${country}`,
        value: id,
      }
    })
  })

  const fetch = async () => {
    isLoading.value = true

    const { cityName, lat, lon } = getParams()

    try {
      let resp

      if (lat && lon) {
        resp = await WeatherWidgetService.fetchByCoordinates(lat, lon)
      } else {
        resp = await WeatherWidgetService.fetch(cityName)
      }

      if (resp.status !== 200 && resp?.data) throw new Error(resp.statusText)

      data.value = resp.data
    } catch (error) {
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const getParams = () => {
    let cityName = ''
    let lat = 0
    let lon = 0

    settings.value.cities = getCityListFromLocalStorage()
    if (settings.value.cities.length) {
      const { coord } = settings.value.cities[0] as IWeatherCity
      lat = coord.lat
      lon = coord.lon
    } else {
      cityName = getCurrentCityName()
    }

    return { cityName, lat, lon }
  }

  const getCurrentCityName = () => {
    const location = Intl.DateTimeFormat().resolvedOptions()
    const timeZoneParts = location.timeZone.split('/')

    if (timeZoneParts.length >= 2) {
      const cityWithUnderscores = timeZoneParts[1]
      return cityWithUnderscores.replace(/_/g, ' ')
    } else {
      console.error('Unable to determine city from timezone"')
      return 'London'
    }
  }

  const getCityList = async () => {
    try {
      const resp = await WeatherWidgetService.getCityList()

      if (resp.status !== 200 && resp?.data) throw new Error(resp.statusText)

      cityList.value = resp.data
    } catch (error) {
      throw error
    }
  }

  function getCityListFromLocalStorage() {
    const json = localStorage.getItem(CITIES)
    return json ? JSON.parse(json) : []
  }

  const saveCityListToLocalStorage = async () => {
    localStorage.setItem(CITIES, JSON.stringify(settings.value.cities))
  }

  return {
    isLoading,
    data,

    showSettings,
    settings,
    cityList,
    selectedCity,
    mappedCityList,

    fetch,
    getCityList,

    getCityListFromLocalStorage,
    saveCityListToLocalStorage,
  }
})
