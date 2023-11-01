import React, { CSSProperties, useRef } from 'react';

import { SunIcon } from '@radix-ui/react-icons';
import { useShallow } from 'zustand/react/shallow';

import { Slider } from '@/components/ui/slider';
import { useBrightnessStore } from '@/hooks/useBrightnessStore';

const BrightnessControl = () => {
  const [brightness, setBrightness] = useBrightnessStore(useShallow((s) => [s.brightness, s.setBrightness]));
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSliderValueChange = (value: number[]) => {
    if (value.length > 0) {
      setBrightness(value[0] / 100);
    }
  };

  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrightness(e.currentTarget.valueAsNumber / 100);
  };

  const value = Math.floor(brightness * 100);

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        ref={inputRef}
        type="number"
        className="aspect-square w-6 rounded-sm border-border bg-foreground p-0 text-center text-xs font-medium text-background [-moz-appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:[-webkit-appearance:none] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:[-webkit-appearance:none]"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={handleInputValueChange}
      />
      <Slider
        orientation="vertical"
        value={[value]}
        onValueChange={handleSliderValueChange}
        min={0}
        max={100}
        step={1}
        className="h-[200px]"
      />
      <SunIcon
        className="h-4 w-4 opacity-[var(--brightness)] brightness-100 dark:opacity-100 dark:brightness-[var(--brightness)]"
        style={{ '--brightness': brightness } as CSSProperties}
      />
    </div>
  );
};

export default BrightnessControl;
