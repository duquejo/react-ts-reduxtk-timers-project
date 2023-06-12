import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import officeImg from '../../../assets/office_cubicle.png';
import guyImg from '../../../assets/guy.gif';
import guyImg2 from '../../../assets/guy2.gif';
import { useAppSelector } from '../../hooks/hooks';
import { IPersonalState, selectTools } from '../../slices/tools';

export const Agency = () => {
	const ppl = useAppSelector(selectTools);
	const [showPpl, setShowPpl] = useState<Array<boolean>>(() => {
		return new Array(ppl.length).fill(false);
	});

	const handleOnLoad = () => {
		console.log('Setted Placeholder');
		const active = activePersonalIndexes();
		if (active !== showPpl) {
			setShowPpl(active);
		}
	};

	/**
	 * @TODO refactorizar de modo que no utilice un array de mostrar sino que sea integrado con el state.
	 * @TODO Cambiar nombre de tools por personal.
	 */

	const images = [
		{
			img: guyImg,
			position: 'right-0',
		},
		{
			img: guyImg2,
			position: 'right-[35rem]',
		},
	];

	useEffect(() => {
		const active = activePersonalIndexes();
		if (active !== showPpl) {
			setShowPpl(active);
		}
	}, [ppl]);

	const activePersonalIndexes = (): Array<boolean> =>
		ppl.map((p: IPersonalState) => p.quantity > 0);

	return (
		<div className="relative">
			<LazyLoadImage
				effect="blur"
				src={officeImg}
				alt="Office"
				afterLoad={handleOnLoad}
			/>
			{showPpl.length &&
				showPpl.map((p: boolean, i: number) => {
					if (p === true) {
						return (
							<LazyLoadImage
								key={i}
								className={`absolute top-1/2 transform -translate-x-1/2 ${images[i].position}`}
								src={images[i].img}
								alt="Guy"
								width={100}
							/>
						);
					}
					return;
				})}
		</div>
	);
};
