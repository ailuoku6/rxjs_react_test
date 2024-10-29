import { Observable, Subscriber } from "rxjs";

export const sortIndex = <T>(mapIndex: (data: T) => number) => {
  return (source: Observable<T>) => {
    let curIndex = 0;
    const valueArr: Array<T> = [];
    const emitArr = (obs: Subscriber<T>) => {
      while (valueArr[curIndex]) {
        obs.next(valueArr[curIndex]);
        curIndex++;
      }
    };
    const nextObs = new Observable<T>((obs) => {
      source.subscribe((value) => {
        const index = mapIndex(value);
        if (index === curIndex) {
          valueArr[index] = value;
          curIndex++;
          obs.next(value);
          emitArr(obs);
        } else {
          valueArr[index] = value;
        }
      });
    });
    return nextObs;
  };
};
