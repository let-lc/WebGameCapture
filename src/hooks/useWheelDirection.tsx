import { useEffect, useState } from 'react';

import { useMouseWheel } from 'react-use';

export const useWheelDirection = () => {
  const value = useMouseWheel();
  const [oldValue, setOldValue] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    if (value > oldValue) {
      setChanging(true);
      setDirection('up');
    } else if (value < oldValue) {
      setChanging(true);
      setDirection('down');
    } else {
      setChanging(false);
    }
    setOldValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return { direction, changing };
};
