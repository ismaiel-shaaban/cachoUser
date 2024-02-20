import { BehaviorSubject } from "rxjs";

class PersistStorage {
  keyName;
  observer;

  constructor(keyName: string, observer: BehaviorSubject<any>) {
    this.keyName = keyName;
    this.observer = observer;
    if (typeof window !== "undefined") {
      const lastDataString = window.localStorage.getItem(this.keyName);

      if (lastDataString) {
        this.observer.next(JSON.parse(lastDataString));
      }

      this.observer.subscribe((next) =>
        window.localStorage.setItem(this.keyName, JSON.stringify(next))
      );
    }
  }

  init = async () => {};
}

export default PersistStorage;
