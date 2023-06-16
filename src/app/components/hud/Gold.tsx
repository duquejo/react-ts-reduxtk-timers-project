import React, { FC } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { selectGold } from '../../slices/gold';
import { formatGold } from '../../utils/progressUtils';

export const Gold: FC = () => {
	const { total, multiplier } = useAppSelector(selectGold);
	return (
		<div className="gold">
			<h1>Gold earned</h1>
			<div className="gold__block">
				Total: <div className="gold__span">{formatGold(total)}</div>
				Multiplier: <div className="gold__span">{multiplier}</div>
			</div>
		</div>
	);
};
