import React, { FC } from 'react';

interface IBackdropProps {
	isActive: boolean;
	onClick: () => void;
}

export const Backdrop: FC<IBackdropProps> = ({ isActive, onClick }) => {
	return (
		isActive && (
			<div
				className={`backdrop ${
					isActive
						? 'visible delay-300 opacity-100'
						: 'invisible opacity-0 delay-0'
				}`}
				tabIndex={-1}
			>
				<div className="backdrop__container">
					<h4>Welcome to Idle Agency</h4>
					<p>Buy an employee and the game will start!</p>
					<button tabIndex={-1} onClick={onClick}>
						Understood
					</button>
				</div>
			</div>
		)
	);
};
