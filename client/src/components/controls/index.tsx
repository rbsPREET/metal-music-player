import { useRef, useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import FHTTS from "../../assets/bands/feed_her_to_the_sharks.jpg";
import {
  IoPlaySharp,
  IoPauseSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
} from "react-icons/io5";
import { FaRandom } from "react-icons/fa";
import { FiRepeat } from "react-icons/fi";
import { useState } from "react";
import useInterval from "../../hooks/useInterval";

export default function Controls() {
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [playerStatus, setPlayerStatus] = useState("inactive");

  return (
    <div className="absolute w-full container left-0 bottom-5 md:bottom-2 h-20 md:h-32">
      <div className="bg-white text-black h-full rounded-md">
        <div className="flex px-3.5 items-center justify-between h-full">
          {/* Band Background Image */}
          <img
            src={FHTTS}
            alt="band_name"
            className="w-14 md:w-24 h-14 md:h-24 rounded-sm shadow-md"
          />
          {/* Band name/song/controls */}
          <div className="flex flex-col flex-grow mx-3">
            <div className="flex justify-between">
              <div className="flex flex-none w-56 flex-col h-12 md:h-20 justify-start">
                <h3 className="font-semibold text-md">
                  Feed Her To The Sharks
                </h3>
                <span className="uppercase text-sm text-gray-500">
                  Savage Seas
                </span>
              </div>
              <div className="flex flex-grow justify-center items-center gap-10 w-full">
                <IoPlaySkipBackSharp className="cursor-pointer hidden md:block h-8 w-8" />
                {/* border-primary hover:bg-primary hover:text-white */}
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor:
                      playerStatus === "active"
                        ? "var(--primary)"
                        : "var(--white)",
                    color:
                      playerStatus === "active"
                        ? "var(--white)"
                        : "var(--primary)",
                  }}
                  transition={{ duration: 0.3 }}
                  onClick={() =>
                    setPlayerStatus(
                      playerStatus === "active" ? "inactive" : "active"
                    )
                  }
                  className="cursor-pointer flex items-center justify-center border rounded-full h-8 md:h-14 w-8 md:w-14"
                >
                  {playerStatus === "inactive" ? (
                    <IoPlaySharp
                      onClick={() => setPlaying(true)}
                      className="pl-1 h-5 md:h-8 w-5 md:w-8"
                    />
                  ) : (
                    <IoPauseSharp
                      onClick={() => setPlaying(false)}
                      className="h-5 md:h-8 w-5 md:w-8"
                    />
                  )}
                </motion.div>
                <IoPlaySkipForwardSharp className="cursor-pointer hidden md:block h-8 w-8" />
              </div>
              {/* Random/Repeat Icons */}
              <div className="hidden md:flex justify-center mr-2 items-center gap-10 flex-none w-56">
                <FaRandom className="cursor-pointer h-5 w-5" />
                <FiRepeat className="cursor-pointer h-5 w-5" />
              </div>
            </div>
            <ProgressBar
              playing={playing}
              currentTime={currentTime}
              setCurrentTime={setCurrentTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type ProgressBarProps = {
  playing: boolean;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
};

function ProgressBar({
  playing,
  currentTime,
  setCurrentTime,
}: ProgressBarProps) {
  const constraintsRef = useRef(null);
  const handleBarRef = useRef<HTMLInputElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  const [draggingSlider, setDraggingSlider] = useState(false);

  const barSize = 20; // the dot in the progress bar to navigate on
  const handleBarX = useSpring(0);
  const progressXWidth = useTransform(handleBarX, (v) => v + barSize / 2); // calc the width of the x progress bar by substracting it from the full width
  const progressBarBg = useMotionTemplate`linear-gradient(90deg, #374151 ${progressXWidth}px, #d1d5db 0)`;

  const SONG_TIMER_DURATION = 185;
  let minProgressBar = 0;
  let maxProgressBar = 185;

  // song duration progress
  let minutes = Math.floor(currentTime / 60);
  let seconds = `${Math.floor(currentTime % 60)}`.padStart(2, "0");
  let timecode = `${minutes}:${seconds}`;
  // song duration
  let minsRemaining = Math.floor(SONG_TIMER_DURATION / 60);
  let secsRemaining = `${SONG_TIMER_DURATION % 60}`.padStart(2, "0");
  let timecodeRemaining = `${minsRemaining}:${secsRemaining}`;

  function handleBarDrag() {
    const handleBounds = handleBarRef.current?.getBoundingClientRect();
    const middleOfHandle = handleBounds!.x + handleBounds!.width / 2;
    const progressBarBounds = progressBarRef.current?.getBoundingClientRect();
    const newProgress =
      (middleOfHandle - progressBarBounds!.x) / progressBarBounds!.width;

    setCurrentTime(newProgress * (maxProgressBar - minProgressBar));
  }

  useEffect(() => {
    const newProgress = currentTime / (maxProgressBar - minProgressBar);
    const progressBarBounds = progressBarRef.current?.getBoundingClientRect();

    handleBarX.set(newProgress * progressBarBounds!.width);
  }, [currentTime, maxProgressBar, minProgressBar, handleBarX]);

  useInterval(
    () => {
      if (currentTime < SONG_TIMER_DURATION) {
        setCurrentTime((t) => t + 1);
      }
    },
    playing ? 1000 : null
  );

  return (
    <div data-test="slider" className="relative flex flex-col justify-center">
      <div className="absolute -top-7 flex items-center justify-between w-full">
        <span>{timecode}</span>
        <span>{timecodeRemaining}</span>
      </div>
      <motion.div
        data-test="slider-background"
        className="absolute w-full rounded-full h-2.5"
        style={{
          background: progressBarBg,
        }}
      />
      {/* Slider progress */}
      <div
        ref={progressBarRef}
        data-test="slider-progress"
        className="absolute h-2"
        style={{
          left: barSize / 2,
          right: barSize / 2,
        }}
      ></div>

      {/* Player song timer bar */}
      <div ref={constraintsRef}>
        <motion.div
          ref={handleBarRef}
          data-test="slider-handle"
          className="z-10 relative cursor-grab active:cursor-grabbing bg-primary rounded-full"
          drag="x"
          dragMomentum={false}
          dragConstraints={constraintsRef}
          dragElastic={0}
          onDrag={handleBarDrag}
          onDragStart={() => setDraggingSlider(true)}
          onDragEnd={() => setDraggingSlider(false)}
          onPointerDown={() => setDraggingSlider(true)}
          onPointerUp={() => setDraggingSlider(false)}
          animate={{
            scale: draggingSlider ? 1.5 : 1,
          }}
          style={{
            width: barSize,
            height: barSize,
            x: handleBarX,
          }}
        ></motion.div>
      </div>

      <div
        data-test="slider-clickable-area"
        className="absolute w-full h-4 cursor-pointer"
        onPointerDown={(e) => {
          const { left, width } =
            progressBarRef.current!.getBoundingClientRect();
          const position = e.pageX - left;
          const newProgress = clampToProgressBar(position / width, 0, 1);
          const newSongTimer = newProgress * (maxProgressBar - minProgressBar);
          setCurrentTime(newSongTimer);
        }}
      />
    </div>
  );
}

function clampToProgressBar(number: number, min: number, max: number) {
  return Math.max(min, Math.min(number, max));
}
