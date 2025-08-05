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

// Create a global event bus instance
const eventBus = new EventBus();

// Make it available globally for micro-frontends
declare global {
  interface Window {
    microFrontendEventBus: EventBus;
  }
}

window.microFrontendEventBus = eventBus;

export default eventBus;
