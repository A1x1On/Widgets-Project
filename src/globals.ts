export const initGlobalData = (app: any) => {
  // app.provide(<TKeys>'NOT_FOUND', KEYS.NOT_FOUND)
  return app
}

/**
 * TYPES & INTERFACES
 */
declare global {
  type ObjectRaw = Record<string, unknown> | Record<string, unknown>[]

  interface IResponse<T> {
    count: number
    data: T
    success: true
    error: string
  }

  interface IComboboxN {
    title: string
    value: number
  }
}
