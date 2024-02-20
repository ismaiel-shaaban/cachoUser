import {Subject, Subscription} from 'rxjs';

class EventEmitterHandler {
  private eventObj: any = {};

  emit = (event: string, data: any) => {
    if (!this.eventObj[event]) {
      this.eventObj[event] = new Subject();
    }
    this.eventObj[event].next(data);
  };

  addListener = (event: string, callback: (data: any) => void) => {
    if (!this.eventObj[event]) {
      this.eventObj[event] = new Subject();
    }
    const subscription: Subscription = this.eventObj[event].subscribe(callback);

    return subscription;
  };
}

export default new EventEmitterHandler();
