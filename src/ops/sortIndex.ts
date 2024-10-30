import { Observable, Subscriber } from "rxjs";

export const sortIndex = <T>(mapIndex: (data: T) => number) => {
  return (source: Observable<T>) => {
    let curIndex = 0;
    const valueArr: Array<T> = [];
    const emitArr = (obs: Subscriber<T>) => {
      while (valueArr[curIndex] !== undefined) {
        console.info("发射数据", curIndex);
        obs.next(valueArr[curIndex]);
        curIndex++;
      }
    };
    const nextObs = new Observable<T>((obs) => {
      const subscription = source.subscribe((value) => {
        const index = mapIndex(value);
        console.info("收到数据", index);
        valueArr[index] = value;
        emitArr(obs);
      });
      return () => {
        // 切记要清理订阅，防止内存泄漏
        subscription.unsubscribe();
      };
    });
    return nextObs;
  };
};
