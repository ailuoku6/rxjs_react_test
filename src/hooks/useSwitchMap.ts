import {
  concatMap,
  filter,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  debounceTime,
  tap,
} from "rxjs";
import { useEffect, useState } from "react";

// timeout 模拟网络传输用时
const fakeData = [
  { timeout: 3000, data: "我耗时3000ms" },
  { timeout: 800, data: "我耗时800ms" },
  { timeout: 100, data: "我耗时100ms" },
];

const fetchData = (index: number): Promise<string> => {
  console.log(`请求第${index}个数据`);
  const d = fakeData[index];
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`返回第${index}个数据`, d.data);
      resolve(d.data);
    }, d.timeout);
  });
};

const subject$ = new Subject<number>();

const obs$ = subject$.pipe(
  // debounceTime(500),
  tap((v) => console.info(`第${v}个数据流入`)),
  switchMap((index) => fetchData(index))
);

export const useSwitchMap = () => {
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    const subscription = obs$.subscribe((res) => setValue(res));

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const start = () => {
    // 3000ms
    subject$.next(0);
    // 800 + 200ms
    setTimeout(() => {
      subject$.next(1);
    }, 200);
    setTimeout(() => {
      // 1000+100ms
      subject$.next(2);
    }, 1000);
  };

  return { value, start };
};
