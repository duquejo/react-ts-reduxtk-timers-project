import React from 'react';
import { Timers } from './app/components/Timers';
import { Gold } from './app/components/Gold';
import { Items } from './app/components/Items';

function App(): JSX.Element {
	return (
		<div className="App bg-slate-500 h-screen flex justify-center items-center text-white px-14 gap-5">
			<div className="basis-1/3 mx-5 text-center">
				<Timers />
			</div>
			<div className="basis-2/3">
				<Gold />
				<div className="flex gap-2 mt-10 mx-10 justify-evenly">
					<Items />
				</div>
			</div>
		</div>
	);
}

export default App;
