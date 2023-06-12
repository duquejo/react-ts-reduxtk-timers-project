import React, { FC } from 'react';
import { Item } from './Item';
import { useAppSelector } from '../../hooks/hooks';
import { IPersonalState, selectTools } from '../../slices/tools';

export const Items: FC = () => {
	const tools = useAppSelector(selectTools);

	return (
		<>
			{tools &&
				tools.map((tool: IPersonalState, index: number) => (
					<Item key={`tool-${index}`} index={index} {...tool} />
				))}
		</>
	);
};
