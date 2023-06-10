import { useEffect, useRef } from 'react';

export const useChatScroll = <T>(dep: T): React.RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);

  return ref;
};
