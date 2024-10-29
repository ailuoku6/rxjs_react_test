import {
  concatMap,
  filter,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from "rxjs";
import { sortIndex } from "../ops/sortIndex";
import { useEffect, useState } from "react";

type DataType = {
  index: number;
  content: string;
};

const fakeData = [
  // 模拟服务端推送数据到前端时间
  { timeout: 100, data: { index: 0, content: "hello " } },
  { timeout: 8000, data: { index: 1, content: "world" } },
  { timeout: 200, data: { index: 2, content: "!" } },
];

const subject = new Subject<DataType>();

const sortIndexObs = subject.pipe(
  tap((v) => {
    console.info("-----------useSortIndex", v);
  }),
  sortIndex((data) => {
    return data.index;
  })
);

export const useSortIndex = () => {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    const subscription = sortIndexObs.subscribe((res) =>
      setValue((prev) => prev + res.content)
    );

    fakeData.forEach(({ data, timeout }) => {
      setTimeout(() => {
        // 数据依次到达
        subject.next(data);
      }, timeout);
    });

    return () => {
      setValue("");
      subscription.unsubscribe();
    };
  }, []);

  return { value };
};
