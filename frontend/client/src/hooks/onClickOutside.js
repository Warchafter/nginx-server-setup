import { useEffect } from 'react';

export const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
            return;
        }

        handler(event);
        };

        const escapeListener = event => {
        if (event.key === 'Escape') {
            handler(event);
        }
        };

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);
            document.addEventListener('keydown', escapeListener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
            document.removeEventListener('keydown', escapeListener);
        };
    }, [ref, handler]);
};