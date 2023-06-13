import React, { FC } from 'react';
import { ITimerState } from '../../slices/timer';
import { formatTime, progressBarCalculation } from '../../utils/progressUtils';

type IBarProps = ITimerState;

export const Bar: FC<IBarProps> = (timer) => {
	return (
		<div className="bar__block-outer">
			<div
				className="bar__block-inner"
				style={{ width: `${progressBarCalculation(timer)}%` }}
			>
				{formatTime(timer.time)}
			</div>
		</div>
	);
};
