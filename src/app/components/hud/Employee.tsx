import React, { FC } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { upgradeBroughtEmployee } from '../../slices/gold';
import { formatGold } from '../../utils/progressUtils';

interface IEmployeeProps {
	index: number;
	name: string;
	profit: number;
	cost: number;
	quantity: number;
}

export const Employee: FC<IEmployeeProps> = ({
	index,
	name,
	quantity,
	profit,
	cost = 0,
}: IEmployeeProps) => {
	const dispatch = useAppDispatch();

	const handleOnClickBuy = () => dispatch(upgradeBroughtEmployee(index));

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
