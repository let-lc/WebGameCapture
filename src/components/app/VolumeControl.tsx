import React, { useEffect, useRef, useState } from 'react';

import { SpeakerLoudIcon, SpeakerModerateIcon, SpeakerOffIcon, SpeakerQuietIcon } from '@radix-ui/react-icons';
import { useMouseWheel } from 'react-use';
import { useShallow } from 'zustand/react/shallow';

import { Slider } from '@/components/ui/slider';
import { useVolumeStore } from '@/hooks/useVolumeStore';

const VolumeControl = () => {
  const [volume, setVolume] = useVolumeStore(useShallow((s) => [s.volume, s.setVolume]));
  const wheelVal = useMouseWheel();
  const [oldWheelVal, setOldWheelVal] = useState(wheelVal);
  const [reserveVolume, setReserveVolume] = useState(volume);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (wheelVal < oldWheelVal && volume < 100) {
      setVolume(volume + 1);
    } else if (wheelVal > oldWheelVal && volume > 0) {
      setVolume(volume - 1);
    }
    setOldWheelVal(wheelVal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wheelVal]);

  const handleSliderValueChange = (value: number[]) => {
    if (value.length > 0) {
      setVolume(value[0]);
    }
  };

  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(e.currentTarget.valueAsNumber);
  };

  const handleMute = () => {
    if (volume === 0) {
      setVolume(reserveVolume || 2);
    } else {
      setReserveVolume(volume);
      setVolume(0);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        ref={inputRef}
        type="number"
        className="aspect-square w-6 rounded-sm border-border bg-foreground p-0 text-center text-xs font-medium text-background [-moz-appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:[-webkit-appearance:none] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:[-webkit-appearance:none]"
        min={0}
        max={100}
        step={1}
        value={volume}
        onChange={handleInputValueChange}
      />
      <Slider
        orientation="vertical"
        value={[volume]}
        onValueChange={handleSliderValueChange}
        min={0}
        max={100}
        step={1}
        className="h-[200px]"
      />
      <button onClick={handleMute} className="flex h-6 w-6 items-center justify-center rounded-sm hover:bg-primary/20">
        {volume > 66 ? (
          <SpeakerLoudIcon className="h-4 w-4" />
        ) : volume > 33 ? (
          <SpeakerModerateIcon className="h-4 w-4" />
        ) : volume > 0 ? (
          <SpeakerQuietIcon className="h-4 w-4" />
        ) : (
          <SpeakerOffIcon className="h-4 w-4" />
        )}
      </button>
    </div>
  );
};

export default VolumeControl;
