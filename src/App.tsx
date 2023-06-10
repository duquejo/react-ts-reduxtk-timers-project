import React from 'react';
import { Timers } from './app/components/Timers';
import { Gold } from './app/components/Gold';
import { Item } from './app/components/Item';

function App(): JSX.Element {
	return (
		<div className="App bg-slate-500 h-screen flex flex-row justify-center items-center text-white px-14 gap-5">
			<div className="basis-1/2 mx-5 text-center">
				<Timers />
			</div>
			<div className="basis-1/2">
				<Gold />
				<div className="flex flex-row gap-2 mt-10 justify-between">
					<Item name="Sword" profit={1} cost={1} />
					<Item name="Shield" profit={2} cost={5000} />
					<Item name="Dagger" profit={4} cost={50000} />
					<Item name="Axe" profit={6} cost={1000} />
					<Item name="Staff" profit={10} cost={400} />
					<Item name="Hat" profit={20} cost={800} />
				</div>
			</div>
		</div>
	);
}

export default App;
