// src/utils/eventEmitter.ts
class EventEmitter {
    private emitter = new EventTarget();
  
    emit(eventName: string, detail?: any) {
      this.emitter.dispatchEvent(new CustomEvent(eventName, { detail }));
    }
  
    on(eventName: string, callback: (event: CustomEvent) => void) {
      this.emitter.addEventListener(eventName, (event) => callback(event as CustomEvent));
    }
  
    off(eventName: string, callback: (event: CustomEvent) => void) {
      this.emitter.removeEventListener(eventName, (event) => callback(event as CustomEvent));
    }
  }
  
  export const eventEmitter = new EventEmitter();
  