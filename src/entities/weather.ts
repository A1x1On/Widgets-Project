export interface IWeather {
  coord: {
    lon: number
    lat: number
  }
  weather: IWeatherItem[]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
    gust: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

export interface IWeatherItem {
  id: number
  main: string
  description: string
  icon: string
}

export interface IWeatherSettings {
  cities: IWeatherCity[]
}

export interface IWeatherCity {
  coord: { lon: number; lat: number }
  country: string
  id: number
  name: string
  state: string
}

/**
 * CONSTANTS
 */

export const CITIES: string = 'cities'

export const WEATHER: IWeather = {
  coord: {
    lon: 0,
    lat: 0,
  },
  weather: [],
  base: '',
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
    sea_level: 0,
    grnd_level: 0,
  },
  visibility: 0,
  wind: {
    speed: 0,
    deg: 0,
    gust: 0,
  },
  clouds: {
    all: 0,
  },
  dt: 0,
  sys: {
    type: 0,
    id: 0,
    country: '',
    sunrise: 0,
    sunset: 0,
  },
  timezone: 0,
  id: 0,
  name: '',
  cod: 0,
}

export const WEATHER_SETTINGS: IWeatherSettings = {
  cities: [],
}

export const SELECTED_CITY: IComboboxN = {
  title: 'Enter City',
  value: 0,
}
