// Cart event system for real-time updates
type CartEventType = 'cart-updated' | 'item-added' | 'item-removed' | 'item-updated';

class CartEventEmitter {
  private listeners: Map<CartEventType, Set<(data?: any) => void>> = new Map();

  on(event: CartEventType, callback: (data?: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  off(event: CartEventType, callback: (data?: any) => void) {
    if (this.listeners.has(event)) {
      this.listeners.get(event)!.delete(callback);
    }
  }

  emit(event: CartEventType, data?: any) {
    if (this.listeners.has(event)) {
      this.listeners.get(event)!.forEach(callback => callback(data));
    }
  }
}

export const cartEvents = new CartEventEmitter();
