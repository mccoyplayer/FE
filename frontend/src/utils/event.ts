export type EventCallback = (value: any) => void

export function EventEmitter<T extends string>() {
  const list = new Map<T, EventCallback[]>()

  const on = (eventName: T, callback: EventCallback) => {
    list.has(eventName) || list.set(eventName, []);
    list.get(eventName)!.push(callback);
  }

  const off = (eventName: T, callback: EventCallback) => {
    if (!list.has(eventName)) return
    const callbacks = list.get(eventName)!
    const foundCallbackIndex = callbacks.findIndex((f) => f === callback)
    if (foundCallbackIndex !== -1) {
      callbacks.splice(foundCallbackIndex, 1)
      if (callbacks.length === 0) {
        list.delete(eventName)
      }
    }
  }

  const emit = (eventType: T, value: any) => {
    if (list.has(eventType)) {
      list.get(eventType)!.forEach((cb: EventCallback) => {
        cb(value);
      });
    }
  }

  const clear = () => {
    list.clear();
  }

  return {
    on,
    off,
    clear,
    emit
  }
}