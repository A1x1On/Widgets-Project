import axios from '@/plugins/axios'
import type { AxiosResponse } from 'axios'

import type { IWeather, IWeatherCity } from '@/entities/weather'

const BACKEND_END_POINT = import.meta.env.VITE_BACKEND_ENDPOINT
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const BASE_URL = BACKEND_END_POINT + '/weather'

class WeatherWidgetService {
  static fetch(city: string): Promise<AxiosResponse<IWeather>> {
    return axios.get(`${BASE_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`)
  }

  static fetchByCoordinates(lat: number, lon: number): Promise<AxiosResponse<IWeather>> {
    return axios.get(`${BASE_URL}?lat=${lat}&lon=${lon}&limit=5&appid=${WEATHER_API_KEY}&units=metric`)
  }

  static getCityList(): Promise<AxiosResponse<IWeatherCity[]>> {
    return axios.get('/data/city.list.json')
  }
}

export default WeatherWidgetService
