import React, { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { IEmployeeState } from '../../slices/employee';
import { formatGold } from '../../utils/progressUtils';
import { CONSTANTS, ROLES } from '../../utils/constants';

interface ICharacterProps extends IEmployeeState {
	role: ROLES;
}

export const Character: FC<ICharacterProps> = ({
	role,
	quantity,
	name,
	cost,
	profit,
}: ICharacterProps) => {
	const { image, position } = CONSTANTS.CHARACTER_CONFIG[role];

	return (
		<>
			<div className={`character group ${position}`}>
				<div className="character__info">
					<span>{name}</span>
					<span>Quantity: {quantity}</span>
					<span>Next cost: ${formatGold(cost, true)}</span>
					<span>Profit: ${profit}</span>
				</div>
				<LazyLoadImage className="character__img" src={image} alt={name} />
			</div>
		</>
	);
};
