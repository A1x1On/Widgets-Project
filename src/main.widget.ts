// // src/main.widget.ts
import { registerPlugins, vuetify, pinia, router } from '@/plugins'
import { initGlobalData } from './globals'
import { createApp, h, provide } from 'vue'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import './styles/styles.scss'

import WeatherWidgetComponent from './components/weatherWidget.vue'

const WeatherWidgetWithPlugins = {
  name: 'WeatherWidgetWithPlugins',

  setup() {
    provide('pinia', pinia)
    provide('vuetify', vuetify)

    return () => h(WeatherWidgetComponent)
  },
}

const app = createApp(WeatherWidgetWithPlugins)
initGlobalData(app)
registerPlugins(app)

class WeatherWidgetElement extends HTMLElement {
  private _app: any = null

  constructor() {
    super()
    console.log('WeatherWidgetElement constructor')
  }

  connectedCallback() {
    console.log('WeatherWidgetElement connected to DOM')

    const container = document.createElement('div')
    container.style.display = 'block'
    this.appendChild(container)

    this._app = app
    this._app.mount(container)
  }

  disconnectedCallback() {
    console.log('WeatherWidgetElement disconnected from DOM')

    if (this._app) {
      this._app.unmount()
      this._app = null
    }

    this.innerHTML = ''
  }
}

customElements.define('weather-widget', WeatherWidgetElement)

export { WeatherWidgetElement }
