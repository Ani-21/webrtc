import { useEffect, useRef, memo } from 'react';
import styles from './Video.module.scss';

interface VideoProps {
  className?: string;
  src: MediaStreamTrack | null | undefined;
}

const VideoComponent = ({ src }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  console.log('src', src);
  console.log(videoRef);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement && src) {
      streamRef.current = new MediaStream();

      streamRef.current.addTrack(src);

      videoElement.srcObject = streamRef.current;

      videoElement.play().catch((e) => {
        if (e.name !== 'AbortError') {
          console.log('Error; Video.play;', e);
        }
      });
    }

    return () => {
      if (streamRef?.current) {
        streamRef.current = null;
      }
    };
  }, []);

  return <video className={styles.video} ref={videoRef} autoPlay playsInline muted />;
};

export const Video = memo(VideoComponent);
