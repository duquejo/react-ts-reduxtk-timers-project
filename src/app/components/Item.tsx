import React, { FC } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { upgradeBroughtItem } from '../slices/gold';
import { formatGold } from '../utils/progressUtils';

interface IItemProps {
	index: number;
	name: string;
	profit: number;
	cost: number;
}

export const Item: FC<IItemProps> = ({
	index,
	name,
	profit,
	cost = 0,
}: IItemProps) => {
	const dispatch = useAppDispatch();

	const handleOnClickBuy = () => {
		dispatch(upgradeBroughtItem(index));
	};

	return (
		<div title={`Profit: ${profit}`}>
			<button onClick={handleOnClickBuy}>
				{name}
				<span className="item__span">{`($${formatGold(cost, true)})`}</span>
			</button>
		</div>
	);
};
