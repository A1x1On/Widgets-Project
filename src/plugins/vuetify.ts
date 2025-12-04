/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { VDateInput } from 'vuetify/labs/VDateInput'
import { VFileUpload } from 'vuetify/labs/VFileUpload'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VDateInput,
    VFileUpload,
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      dark: {
        dark: true,
        colors: {
          // background: "red",
          surface: '#454545',
          // "surface-bright": "#FFFFFF",
          // "surface-light": "#EEEEEE",
          // "surface-variant": "#424242",
          // "on-surface-variant": "#EEEEEE",
          // primary: "green",
          // "primary-darken-1": "#1F5592",
          // secondary: "#48A9A6",
          // "secondary-darken-1": "#018786",
          // error: "#B00020",
          // info: "#2196F3",
          // success: "#4CAF50",
          // warning: "#84494",
        },
      },
    },
  },
  defaults: {
    VBadge: {
      color: 'primary',
    },
    VBtn: {
      color: 'primary',
      variant: 'tonal',
    },
    VTextField: {
      density: 'compact',
      variant: 'solo',
      hideDetails: 'auto',
    },
    VTextarea: {
      variant: 'solo',
    },
    VDateInput: {
      variant: 'solo',
    },
  },
  // display: {
  //   mobileBreakpoint: 'xs', // | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl',
  //   // mobile: true, //boolean
  //   thresholds: {
  //     xs: 500,
  //     sm: 750,
  //     //   md: 1000,
  //     //   lg: 1500,
  //     //   xl: 2000,
  //   },
  // },
})
