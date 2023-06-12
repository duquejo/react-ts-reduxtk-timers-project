import React, { FC } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { upgradeBroughtItem } from '../../slices/gold';
import { formatGold } from '../../utils/progressUtils';

interface IItemProps {
	index: number;
	name: string;
	profit: number;
	cost: number;
	quantity: number;
}

export const Item: FC<IItemProps> = ({
	index,
	name,
	quantity,
	profit,
	cost = 0,
}: IItemProps) => {
	const dispatch = useAppDispatch();

	const handleOnClickBuy = () => {
		dispatch(upgradeBroughtItem(index));
	};

	return (
		<div className="single-item" title={`Profit: ${profit}`}>
			<div className="single-item__quantity">{quantity}</div>
			<button className="single-item__button" onClick={handleOnClickBuy}>
				{name}
				<span>{`($${formatGold(cost, true)})`}</span>
			</button>
		</div>
	);
};
