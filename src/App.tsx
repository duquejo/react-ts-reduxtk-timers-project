import React from 'react';
import { Timers } from './app/components/hud/Timers';
import { Gold } from './app/components/hud/Gold';
import { Agency } from './app/components/graphic/Agency';
import { IEmployeeState, selectEmployees } from './app/slices/employee';
import { useAppDispatch, useAppSelector } from './app/hooks/hooks';
import { Employee } from './app/components/hud/Employee';
import { clearState } from './app/utils/progressUtils';
import { activeModal, selectHud } from './app/slices/hud';
import { Backdrop } from './app/components/hud/Modal';
import { Messages } from './app/components/hud/Messages';

function App(): JSX.Element {
	const employees = useAppSelector(selectEmployees);
	const { isModalEnabled, isDebugModeEnabled } = useAppSelector(selectHud);
	const dispatch = useAppDispatch();

	const handleOnClickOutside = () => {
		dispatch(activeModal(false));
	};

	const handleOnClickClear = () => clearState();

	return (
		<div className="app">
			<div className="app__backdrop">
				<Backdrop isActive={isModalEnabled} onClick={handleOnClickOutside} />
			</div>
			<div className="app__timers">
				<Timers />
			</div>
			<div className="app__agency">
				<Agency />
			</div>
			<div className="app__hud">
				<div className="left">
					<Gold />
				</div>
				<div className="right">
					<div className="messages">
						<Messages />
					</div>
					<div className="employees">
						{employees.length > 0 &&
							employees.map((employee: IEmployeeState, index: number) => (
								<Employee
									key={`employee-${index}`}
									index={index}
									{...employee}
								/>
							))}
						{isDebugModeEnabled && (
							<button onClick={handleOnClickClear}>Clear game state</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
