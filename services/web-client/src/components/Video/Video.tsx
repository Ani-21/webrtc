import { useEffect, useRef, memo } from 'react';

interface VideoProps {
  className: string;
  src: string;
}

const VideoComponent = ({ className, src }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      streamRef.current = new MediaStream();

      streamRef.current.addTrack(src);

      videoElement.srcObject = streamRef.current;

      videoElement.play();
    }

    return () => {
      if (streamRef?.current) {
        streamRef.current = null;
      }
    };
  }, []);

  return <video className={className} ref={videoRef} autoPlay playsInline muted />;
};

export const Video = memo(VideoComponent);
