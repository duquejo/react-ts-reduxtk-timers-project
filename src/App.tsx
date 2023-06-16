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
		<div className="app">
			<div className="app__timers">
				<Timers />
			</div>
			<div className="app__agency">
				<Agency />
			</div>
			<div className="app__hud">
				<Gold />
				<div className="employees">
					{employees.length > 0 &&
						employees.map((employee: IEmployeeState, index: number) => (
							<Employee key={`employee-${index}`} index={index} {...employee} />
						))}
					<button onClick={handleOnClickClear}>Clear game state</button>
				</div>
			</div>
		</div>
	);
}

export default App;
