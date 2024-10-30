import {
  concatMap,
  filter,
  map,
  Observable,
  of,
  Subject,
  Subscription,
  switchMap,
  tap,
} from "rxjs";
import { sortIndex } from "../ops/sortIndex";
import { useCallback, useEffect, useRef, useState } from "react";

type DataType = {
  index: number;
  content: string;
};

const fakeData = [
  // 模拟服务端推送数据到前端时间
  { timeout: 100, data: { index: 0, content: "hello " } },
  { timeout: 5000, data: { index: 1, content: "world" } },
  { timeout: 2000, data: { index: 2, content: "!" } },
];

const subject$ = new Subject<DataType>();

const genSortIndexObs = () => {
  return subject$.pipe(
    tap((v) => {
      console.info("收到信息", v);
    }),
    sortIndex((data) => {
      return data.index;
    })
  );
};

const obs$ = genSortIndexObs();

export const useSortIndex = () => {
  const [value, setValue] = useState<string | null>(null);

  const subscriptionRef = useRef<Subscription>();

  useEffect(() => {
    subscriptionRef.current = obs$.subscribe((res) => {
      setValue((prev) => prev + res.content);
    });

    return () => {
      setValue("");
      subscriptionRef.current?.unsubscribe();
    };
  }, []);

  const start = useCallback(() => {
    setValue("");
    subscriptionRef.current?.unsubscribe();
    subscriptionRef.current = genSortIndexObs().subscribe((res) => {
      setValue((prev) => prev + res.content);
    });

    fakeData.forEach(({ data, timeout }) => {
      setTimeout(() => {
        // 数据依次到达
        subject$.next(data);
      }, timeout);
    });
  }, []);

  return { value, start };
};
