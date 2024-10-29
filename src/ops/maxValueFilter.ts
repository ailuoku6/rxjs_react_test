import { Observable } from "rxjs";

export function maxValueFilter(maxValue: number) {
  return (source: Observable<number>) => {
    const nextObs = new Observable<number>((obs) => {
      source.subscribe((value) => {
        if (value <= maxValue) {
            obs.next(value);
        }
      });
      
    });

    return nextObs;
  };
}