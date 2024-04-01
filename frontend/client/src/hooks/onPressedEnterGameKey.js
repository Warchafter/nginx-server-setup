import { useEffect } from 'react';

export const useOnPressedEnterGameKey = (ref, handler) => {
    useEffect(() => {

        const keydownListener = event => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            if (event.key === 'Enter') {
                handler(true);
            }
        };

        document.addEventListener('keydown', keydownListener);

        return () => {
            document.removeEventListener('keydown', keydownListener);
        };
    }, [ref, handler]);
};