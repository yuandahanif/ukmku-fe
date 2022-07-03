/* eslint-disable @typescript-eslint/no-explicit-any */
import { MutableRefObject, useEffect } from 'react';

const useClickOutside = (
  ref: MutableRefObject<any>,
  cb: (arg: MutableRefObject<any>) => void
) => {
  useEffect(() => {
    /**
     * if clicked on outside of element
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        cb(ref);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cb, ref]);
};

export default useClickOutside;
