import React, { FC } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { upgrade } from '../slices/gold';

interface IItemProps {
	name: string;
	profit: number;
	cost: number;
}

export const Item: FC<IItemProps> = ({
	name,
	profit,
	cost = 0,
}: IItemProps) => {
	const dispatch = useAppDispatch();

	const handleOnClickBuy = () => {
		dispatch(
			upgrade({
				cost,
				multiplier: profit,
			})
		);
	};

	return (
		<div title={`Profit: ${profit}`}>
			<button onClick={handleOnClickBuy}>
				{name}
				<span className="item__span">{`($${cost})`}</span>
			</button>
		</div>
	);
};
