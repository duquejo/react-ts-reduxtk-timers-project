import React from 'react';
import { useAppSelector } from '../hooks/hooks';
import { selectGold } from '../slices/gold';

export const Gold = () => {
	const { total, multiplier } = useAppSelector(selectGold);
	return (
		<h2 className="gold__title">
			Gold earned
			<div className="gold__block">
				Total: <span className="gold__span">{total}</span>
				Multiplier: <span className="gold__span">{multiplier}</span>
			</div>
		</h2>
	);
};
