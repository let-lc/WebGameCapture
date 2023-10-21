import { useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { useMediaDevices } from 'react-use';
import { useShallow } from 'zustand/react/shallow';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDeviceStore } from '@/hooks/useDeviceStore';

const SelectAudio = () => {
  const { t } = useTranslation();
  const mediaDevices = useMediaDevices();
  const [deviceId, setDeviceId] = useDeviceStore(useShallow((s) => [s.audioDeviceId, s.setAudioDeviceId]));
  const devices = useMemo<Array<MediaDeviceInfo>>(() => {
    const list: Array<MediaDeviceInfo> = [
      {
        label: t('disableAudio'),
        deviceId: 'disable-audio',
        groupId: 'disable-audio',
        kind: 'audioinput',
        toJSON: () => ({}),
      },
    ];

    if ('devices' in mediaDevices) {
      for (const device of mediaDevices.devices as Array<MediaDeviceInfo>) {
        if (device.kind === 'audioinput' && device.deviceId) {
          list.push(device);
        }
      }
    }

    return list;
  }, [mediaDevices, t]);

  return (
    <div>
      <Label htmlFor="audio-trigger">{t('audioDevices')}</Label>
      <Select value={deviceId} onValueChange={setDeviceId}>
        <SelectTrigger id="audio-trigger" className="mt-1 [&>span]:truncate [&>span]:whitespace-nowrap">
          <SelectValue placeholder={devices.find((device) => device.deviceId === deviceId)?.label || '...'} />
        </SelectTrigger>
        <SelectContent>
          {devices.map(({ deviceId, label }) => (
            <SelectItem key={`audio-${deviceId}`} value={deviceId}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectAudio;
