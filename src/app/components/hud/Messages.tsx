import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { IMessage, clearMessages, selectHud } from '../../slices/hud';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const Messages: FC = () => {
	const {
		latestMessages: { messages, visible },
	} = useAppSelector(selectHud);
	const dispatch = useAppDispatch();

	const handleOnClickClear = () => dispatch(clearMessages());

	useEffect(() => {}, [messages]);

	return (
		<>
			<div className="messages__title">Latest messages</div>
			<ul className="messages__list">
				{messages.length > 0 ? (
					<>
						{messages.map((message: IMessage) => (
							<li key={`message-${message.time}`} className={message.type}>
								<b>{formatDistanceToNow(message.time)}</b>
								{message.content}
							</li>
						))}
						<div
							className="messages__action clear"
							onClick={handleOnClickClear}
						>
							Clear
						</div>
					</>
				) : (
					<p className="text-center">No messages</p>
				)}
			</ul>

			<div className="messages__action toggle">
				{visible ? 'Shrink' : 'Expand'}
			</div>
		</>
	);
};
