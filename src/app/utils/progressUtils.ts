import { ITimerState } from '../slices/timer';

export const progressBarCalculation = ({ time, base }: ITimerState): number => {
  return base > 0 ? (time * 100) / base : 0;
};

export const formatTime = (time: number): string => {
  const ms =
    Math.round(time / 100) %
    10;
  const secs =
    Math.floor(time / 1000) %
    60;
  return `${secs}.${ms}s`;
};
