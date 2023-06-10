import React, { FC } from 'react';
import { Item } from './Item';

export const Items: FC = () => {
	return (
		<>
			<Item name="Chisel" profit={1} cost={1} />
			<Item name="Flashlight" profit={2} cost={5000} />
			<Item name="Gloves" profit={4} cost={80000} />
			<Item name="Helmet" profit={6} cost={200000} />
			<Item name="Hammer" profit={10} cost={500000} />
			<Item name="Safety glasses" profit={20} cost={1000000} />
		</>
	);
};
