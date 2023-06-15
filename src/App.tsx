import React from 'react';
import { Timers } from './app/components/hud/Timers';
import { Gold } from './app/components/hud/Gold';
import { Agency } from './app/components/graphic/Agency';
import { IEmployeeState, selectEmployees } from './app/slices/employee';
import { useAppSelector } from './app/hooks/hooks';
import { Employee } from './app/components/hud/Employee';
import { clearState } from './app/utils/progressUtils';

function App(): JSX.Element {
	const employees = useAppSelector(selectEmployees);
	const handleOnClickClear = () => clearState();
	return (
		<div className="h-screen bg-slate-500 text-white p-10">
			<div className="h-full flex items-end gap-5">
				<div className="basis-1/3 z-20">
					<Timers />
				</div>
				<div className="basis-2/3 flex items-end justify-end">
					<Gold />
					<div className="flex flex-col gap-2 ml-10">
						{employees.length > 0 &&
							employees.map((employee: IEmployeeState, index: number) => (
								<Employee
									key={`employee-${index}`}
									index={index}
									{...employee}
								/>
							))}
						<button onClick={handleOnClickClear}>Clear game state</button>
					</div>
				</div>
			</div>
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 right-0 z-10">
				<Agency />
			</div>
		</div>
	);
}

export default App;
