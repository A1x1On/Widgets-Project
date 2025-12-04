<template>
  <v-dialog v-model="weatherWidgetStore.showSettings" width="auto" class="weather-widget-settings">
    <v-card min-width="400" min-height="200" class="weather-widget-settings__card">
      <v-card-title class="text-center">Settings</v-card-title>

      <v-card-text class="weather-widget-settings__content pa-0 align-center">
        <v-row class="ma-0 py-1 align-center">
          <v-col cols="9" class="pt-5 pb-0">
            <v-autocomplete
              v-model="weatherWidgetStore.selectedCity"
              :items="weatherWidgetStore.mappedCityList"
              :disabled="weatherWidgetStore.isLoading"
              :loading="weatherWidgetStore.isLoading"
              :error-messages="errorMessages"
              return-object
              item-text="title"
              item-value="value"
              label="List of Cities"
              density="compact"
            />
          </v-col>

          <v-col cols="3" class="py-0">
            <v-btn variant="tonal" color="primary" :disabled="weatherWidgetStore.isLoading" @click="onAdd"> Add </v-btn>
          </v-col>
        </v-row>

        <v-row class="ma-0 py-1 align-center">
          <v-col class="pt-0">
            <draggable
              v-if="weatherWidgetStore.settings.cities.length"
              :list="weatherWidgetStore.settings.cities"
              class="drag-area weather-widget-settings__content-items"
              item-key="drag-tab"
              @change="onDragItem"
            >
              <div
                class="weather-widget-settings__content-items-item"
                v-for="item in weatherWidgetStore.settings.cities"
                :key="item.id"
              >
                <div>
                  <v-icon icon="mdi-drag" />
                </div>

                <div class="weather-widget-settings__content-items-item-title">
                  {{ item.name }}
                </div>

                <div>
                  <v-btn
                    icon="mdi-delete-outline"
                    variant="text"
                    color="red"
                    size="small"
                    @click="onDiscard(item.id)"
                  />
                </div>
              </div>
            </draggable>
            <div v-else class="text-center text-success">Add some favorite City if you wish</div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn
          v-if="isDirty"
          class="mr-2"
          variant="tonal"
          color="success"
          :disabled="weatherWidgetStore.isLoading"
          @click="onUpdate"
        >
          Save
        </v-btn>

        <v-btn variant="tonal" @click="onClose">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-btn v-bind="$attrs" @click="onShow()" />
</template>

<script lang="ts">
import { useWeatherWidgetStore } from '@/stores/WeatherWidgetStore'
import { VueDraggableNext } from 'vue-draggable-next'

import { type IWeatherCity } from '@/entities/weather'

export default defineComponent({
  inheritAttrs: false,

  components: {
    draggable: VueDraggableNext as any,
  },

  props: {},

  setup() {
    const weatherWidgetStore = useWeatherWidgetStore()

    const isDirty = ref<boolean>(false)
    const isTrySave = ref<boolean>(false)

    const errorMessages = computed(() => {
      return isTrySave.value && !weatherWidgetStore.selectedCity.value ? ['Select some City, please'] : []
    })

    const onShow = () => {
      weatherWidgetStore.showSettings = true

      if (!weatherWidgetStore.cityList.length) weatherWidgetStore.getCityList()
    }

    const onDragItem = () => {
      isDirty.value = true
    }

    const onAdd = () => {
      const id = weatherWidgetStore.selectedCity.value
      if (!id) {
        isTrySave.value = true
        return
      }

      if (weatherWidgetStore.settings.cities.some((s) => s.id === id)) return

      const found = weatherWidgetStore.cityList.find((f) => f.id === id)
      if (found) {
        weatherWidgetStore.settings.cities.unshift(found)
        isDirty.value = true
      }
    }

    const onDiscard = (id: number) => {
      isDirty.value = true
      weatherWidgetStore.settings.cities = weatherWidgetStore.settings.cities.filter((city: IWeatherCity) => {
        return city.id !== id
      })
    }

    const onUpdate = async () => {
      weatherWidgetStore.saveCityListToLocalStorage()
      weatherWidgetStore.fetch()
      onClose()
    }

    const onClose = () => {
      weatherWidgetStore.showSettings = false
    }

    onMounted(() => {})

    return {
      weatherWidgetStore,

      isDirty,
      errorMessages,

      onShow,
      onDragItem,

      onAdd,
      onDiscard,
      onUpdate,
      onClose,
    }
  },
})
</script>

<style lang="scss" scoped>
.weather-widget-settings {
  &__content {
    max-height: 550px;
    overflow: auto;

    &-items {
      border: 1px solid var(--border-color-2);
      border-radius: 5px;
      padding: 5px;

      &-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--border-color-2);
        padding: 1px;
        cursor: move;

        &:hover {
          opacity: 0.7;
          background-color: var(--bg-glass);
          font-weight: 500;
        }

        &-title {
          border-top: none !important;
          max-width: 600px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        &-checkbox:hover {
          font-weight: 500;
        }
      }

      &-item:first-of-type {
        border-top: 1px solid var(--border-color-2);
        border-radius: 5px 5px 0px 0px;
      }

      &-item:last-of-type {
        border-radius: 0px 0px 5px 5px;
      }
    }
  }
}
</style>
