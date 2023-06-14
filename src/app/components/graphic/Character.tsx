import React, { FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import guyImg from '../../../assets/guy.gif';
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
		position: 'top-2/3 -translate-y-2/3 left-3/4 -translate-x-3/4',
	},
	[ROLES.DESIGNER]: {
		image: guyImg,
		position: 'top-3/4 -translate-y-3/4 left-1/4 -translate-x-3/4',
	},
	[ROLES.TESTER]: {
		image: guyImg,
		position: 'top-1/2 -translate-y-1/2 right-0 -translate-x-1/2',
	},
	[ROLES.MARKETER]: {
		image: guyImg,
		position: 'top-3/4 -translate-y-3/4 left-1/4 -translate-x-3/4',
	},
	[ROLES.SCRUM_MASTER]: {
		image: guyImg,
		position: 'top-2/4 -translate-y-1/2 left-1/4 -translate-x-1/2',
	},
	[ROLES.PRODUCTION_MANAGER]: {
		image: guyImg,
		position: 'top-1/2 translate-y-3/4 right-1/2 translate-x-3/4',
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
			<LazyLoadImage className="peer" src={image} alt={name} />
			<div className="character__info">
				<span>{name}</span>
				<span>Quantity: {quantity}</span>
				<span>Cost: ${formatGold(cost, true)}</span>
				<span>Profit: ${profit}</span>
			</div>
		</div>
	);
};
