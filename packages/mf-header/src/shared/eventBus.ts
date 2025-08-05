// Simple event bus for micro-frontend communication
export interface NavigationEvent {
  type: "NAVIGATION_CHANGE";
  payload: {
    page: "home" | "about" | "services" | "contact";
  };
}

export type MicroFrontendEvent = NavigationEvent;

class EventBus {
  private listeners: { [key: string]: Array<(event: MicroFrontendEvent) => void> } = {};

  // Subscribe to events
  on(eventType: string, callback: (event: MicroFrontendEvent) => void) {
    if (!this.listeners[eventType]) {
      this.listeners[eventType] = [];
    }
    this.listeners[eventType].push(callback);
  }

  // Unsubscribe from events
  off(eventType: string, callback: (event: MicroFrontendEvent) => void) {
    if (!this.listeners[eventType]) return;
    this.listeners[eventType] = this.listeners[eventType].filter((listener) => listener !== callback);
  }

  // Emit events
  emit(event: MicroFrontendEvent) {
    const eventListeners = this.listeners[event.type];
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(event));
    }
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    microFrontendEventBus: EventBus;
  }
}

// Use the global event bus if available (when loaded in host), otherwise create local one
const getEventBus = (): EventBus => {
  if (typeof window !== "undefined" && window.microFrontendEventBus) {
    return window.microFrontendEventBus;
  }
  return new EventBus();
};

export default getEventBus();
