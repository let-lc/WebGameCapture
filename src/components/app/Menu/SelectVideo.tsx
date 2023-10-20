import { useTranslation } from 'react-i18next';
import { useMediaDevices } from 'react-use';
import { useShallow } from 'zustand/react/shallow';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDeviceStore } from '@/hooks/useDeviceStore';

const SelectVideo = () => {
  const { t } = useTranslation();
  const mediaDevices = useMediaDevices();
  const [deviceId, setDeviceId] = useDeviceStore(useShallow((s) => [s.videoDeviceId, s.setVideoDeviceId]));

  const DISABLE_VIDEO: MediaDeviceInfo = {
    label: t('disableVideo'),
    deviceId: 'disable-video',
    groupId: 'disable-video',
    kind: 'videoinput',
    toJSON: () => ({}),
  };
  // @ts-ignore
  const devices: Array<MediaDeviceInfo> = mediaDevices?.devices?.filter((device) => device.kind === 'videoinput') ?? [];

  return (
    <div>
      <Label htmlFor="video-trigger">{t('videoDevices')}</Label>
      <Select value={deviceId} onValueChange={setDeviceId}>
        <SelectTrigger id="video-trigger" className="mt-1">
          <SelectValue placeholder={devices.find((device) => device.deviceId === deviceId)?.label || '...'} />
        </SelectTrigger>
        <SelectContent>
          {[DISABLE_VIDEO, ...devices].map(({ deviceId, label }) => (
            <SelectItem key={`video-${deviceId}`} value={deviceId}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectVideo;
