import { useCallback, useEffect, useState } from 'react';

export function useDebounce(value, timeout, callback) {
	const [timer, setTimer] = useState(null);

	const clearTimer = useCallback(() => {
		if (timer) clearTimeout(timer);
	}, [timer]);

	useEffect(() => {
		clearTimer();

		if (value && callback) {
			const newTimer = setTimeout(callback, timeout);
			setTimer(newTimer);
		}
	}, [value, clearTimer, callback, timeout]);
}