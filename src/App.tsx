import React from 'react';
import { Timers } from './app/components/hud/Timers';
import { Gold } from './app/components/hud/Gold';
import { Items } from './app/components/hud/Items';
import { Agency } from './app/components/graphic/Agency';

function App(): JSX.Element {
	return (
		<div className="h-screen bg-slate-500 text-white p-10">
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 right-0 z-10">
				<Agency />
			</div>
			<div className="h-full flex items-end gap-5">
				<div className="basis-1/3 z-20">
					<Timers />
				</div>
				<div className="basis-2/3 flex items-end justify-end z-20">
					<Gold />
					<div className="flex flex-col gap-2 ml-10">
						<Items />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
