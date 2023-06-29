import React, { FC, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
	IMessage,
	clearMessages,
	selectHud,
	toggleMessages,
} from '../../slices/hud';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const Messages: FC = () => {
	const {
		latestMessages: { messages, visible },
	} = useAppSelector(selectHud);
	const dispatch = useAppDispatch();

	const clearRef = useRef<HTMLDivElement>(null);

	const handleOnClickClear = () => dispatch(clearMessages());

	const handleOnClickToggle = () => {
		dispatch(toggleMessages());
		setTimeout(() => {
			scrollToBottom();
		}, 100);
	};

	const scrollToBottom = () => {
		clearRef?.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	return (
		<>
			<div className="messages__title">Latest messages</div>
			<ul className={`messages__list ${visible ? 'visible' : 'hidden'}`}>
				{messages.length > 0 ? (
					<>
						{messages.map((message: IMessage) => (
							<li key={`message-${message.time}`} className={message.type}>
								<b>{formatDistanceToNow(message.time)}</b>
								{message.content}
							</li>
						))}
						<div
							ref={clearRef}
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
			<div className="messages__action toggle" onClick={handleOnClickToggle}>
				{visible ? 'Shrink' : 'Expand'}
			</div>
		</>
	);
};
