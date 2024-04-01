import { useEffect } from 'react';

export const useOnPressedAlphabetKey = (ref, handler) => {
    useEffect(() => {
        const alphabetRegExp = /^[a-zA-Z]$/; // Regular expression to match alphabet letters

        const keydownListener = event => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            if (event.key === 'Backspace') {
                handler(event);
            }
            if (alphabetRegExp.test(event.key)) {
                handler(event);
            }
        };

        document.addEventListener('keydown', keydownListener);

        return () => {
            document.removeEventListener('keydown', keydownListener);
        };
    }, [ref, handler]);
};