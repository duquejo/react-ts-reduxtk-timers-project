import React, { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import guyImg from '../../../assets/guy.gif';
import guyImg2 from '../../../assets/guy2.gif';
import { IPersonalState, ROLES } from '../../slices/tools';
import { formatGold } from '../../utils/progressUtils';

interface ICharacterProps extends IPersonalState {
	role: ROLES;
}

interface ICharacterConfig {
	image: string;
	position: string;
}

type characterImgType = Record<string, ICharacterConfig>;

const characterImgMapping: characterImgType = {
	[ROLES.DEVELOPER]: {
		image: guyImg,
		position: 'top-64 right-4',
	},
	[ROLES.DESIGNER]: {
		image: guyImg2,
		position: 'top-52 left-40',
	},
};

export const Character: FC<ICharacterProps> = ({
	role,
	quantity,
	name,
	cost,
	profit,
}: ICharacterProps) => {
	const { image, position } = characterImgMapping[role];

	return (
		<div className={`character ${position}`}>
			<LazyLoadImage className="peer" src={image} alt={name} width={100} />
			<div className="character__info">
				<span>Role: {name}</span>
				<span>Quantity: {quantity}</span>
				<span>Cost: ${formatGold(cost, true)}</span>
				<span>Profit: ${profit}</span>
			</div>
		</div>
	);
};
