import "@vidstack/react/player/styles/base.css";

import { useEffect, useRef, useState } from "react";

import {
  isHLSProvider,
  MediaPlayer,
  MediaProvider,
  Poster,
  type MediaPlayerInstance,
  type MediaProviderAdapter,
} from "@vidstack/react";

import { VideoLayout } from "./components/layouts/video-layout";
import { completeLesson } from "@/services/videoPlayer";
import useApiUrl from "@/hooks/useApiUrl";

interface PlayerProps {
  src: string;
  title: string;
  isEnding?: (lessonId: number, isEnding: boolean) => void;
  lessonId: number;
  onTimeUpdate?: (currentTime: number) => void;
  onPlay?: () => void;
  timeElapsed: number;
}

export function Player({
  src,
  title,
  isEnding,
  lessonId,
  onTimeUpdate,
  onPlay,
  timeElapsed,
}: PlayerProps) {
  const [lastElapsedTimeSaved, setLastElapsedTimeSaved] = useState(timeElapsed);
  const [isEndingTriggered, setIsEndingTriggered] = useState(false);

  let player = useRef<MediaPlayerInstance>(null);

  const { apiUrl } = useApiUrl();

  const handlePlay = () => {
    if (onPlay) {
      onPlay();
    }
  };

  useEffect(() => {
    if (player.current) {
      return player.current.subscribe(({ currentTime }) => {
        const currentSecondsElapsed = Math.floor(currentTime);
        const lastedSavedSeconds = Math.floor(lastElapsedTimeSaved);
        if (
          onTimeUpdate &&
          currentSecondsElapsed % 10 == 0 &&
          currentTime > 10 &&
          currentSecondsElapsed != lastedSavedSeconds
        ) {
          onTimeUpdate(Math.floor(currentTime));
          setLastElapsedTimeSaved(Math.floor(currentTime));
        }
      });
    }
  }, [lastElapsedTimeSaved]);

  useEffect(() => {
    if (player.current) {
      return player.current.subscribe(({ currentTime, duration }) => {
        let timeSub = duration - currentTime;
        if (timeSub <= 10 && !isEndingTriggered && currentTime > 10) {
          setIsEndingTriggered(true);
          if (isEnding) {
            completeLesson(apiUrl, lessonId);
          }
        } else if (timeSub > 10) {
          setIsEndingTriggered(false);
        }
      });
    }
  }, [isEnding, isEndingTriggered, lessonId]);

  function onProviderChange(
    provider: MediaProviderAdapter | null
    // nativeEvent: MediaProviderChangeEvent,
  ) {
    // We can configure provider's here.
    if (isHLSProvider(provider)) {
      provider.config = {};
    }
  }

  // We can listen for the `can-play` event to be notified when the player is ready.
  function onCanPlay() {
    // ...
  }

  return (
    <>
      <MediaPlayer
        className="w-full aspect-video bg-slate-900 text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4 border-pink-600"
        title="Sprite Fight"
        src={src}
        crossorigin
        playsinline
        onProviderChange={onProviderChange}
        onCanPlay={onCanPlay}
        ref={player}
        onPlay={handlePlay}
        currentTime={timeElapsed}
        autoPlay
      >
        <MediaProvider>
          <Poster
            className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
            src=""
            alt=""
          />
        </MediaProvider>

        <VideoLayout thumbnails="" title={title} />
      </MediaPlayer>
    </>
  );
}
