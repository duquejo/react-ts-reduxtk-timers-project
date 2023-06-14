import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import officeImg from '../../../assets/office_cubicle.png';
import { useAppSelector } from '../../hooks/hooks';
import { IPersonalState, selectTools } from '../../slices/tools';
import { activeEmployeesCheck } from '../../utils/progressUtils';
import { Character } from './Character';

export const Agency = () => {
	const ppl = useAppSelector(selectTools);

	const [showPpl, setShowPpl] = useState<boolean>(() =>
		activeEmployeesCheck(ppl)
	);

	const handleOnLoad = () => {
		console.log('Setted Placeholder');
		handleShowPpl();
	};

	const handleShowPpl = () => {
		const active = activeEmployeesCheck(ppl);
		if (active !== showPpl) {
			setShowPpl(active);
		}
	};

	useEffect(() => {
		handleShowPpl();
	}, [ppl]);

	return (
		<div className="relative w-full max-w-full h-auto flex flex-col">
			{showPpl &&
				ppl.map((p: IPersonalState, i: number) => {
					if (p.quantity == 0) return;
					return <Character key={`character-${i}`} {...p} role={p.name} />;
				})}
			<LazyLoadImage
				effect="blur"
				src={officeImg}
				alt="Office"
				afterLoad={handleOnLoad}
			/>
		</div>
	);
};
