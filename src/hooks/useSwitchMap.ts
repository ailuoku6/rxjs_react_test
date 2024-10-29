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
  { timeout: 3000, data: 1 },
  { timeout: 800, data: 2 },
  { timeout: 100, data: 3 },
];

const fetchData = (index: number): Promise<number> => {
  console.log(`请求第${index}个数据`);
  const d = fakeData[index];
  return new Promise((res) => {
    setTimeout(() => {
      console.log(`返回第${index}个数据`, d.data);
      res(d.data);
    }, d.timeout);
  });
};

const subject = new Subject();

export const useSwitchMap = () => {
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    const subscription = subject
      .pipe(switchMap((index) => fetchData(index)))
      .subscribe((res) => setValue(res));
    // 3000ms
    subject.next(0);
    // 800ms
    subject.next(1);

    setTimeout(() => {
      // 1000+100ms
      subject.next(2);
    }, 1000);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { value };
};
