import { Party } from "../interfaces/Party";
import BaseSection from "./BaseSection";
import SectionTitle from "./SectionTitle";
import { useEffect, useState } from "react";

export type TIME_ALIGNMENT = 'left' | 'right'

/**
 * Renders a section for displaying game activity information.
 *
 * @param {string} title - The title of the game activity
 * @param {string} name - The name of the game
 * @param {string} state - The state of the game activity
 * @param {string} details - Additional details about the game activity
 * @param {string} largeImage - URL for the large image related to the game activity
 * @param {string} smallImage - URL for the small image related to the game activity
 * @param {Party} party - Object containing information about the party related to the game activity
 * @param {number} startTime - The start time of the game activity
 * @return {JSX.Element} The rendered game section component
 */
const GameSection = ({
  title,
  name,
  state,
  details,
  largeImage,
  smallImage,
  party,
  elapsedText = 'elapsed',
  timeAlignment = 'left',
  startTime = 0,
}: {
  title?: string;
  applicationId?: string;
  name?: string;
  state?: string;
  details?: string;
  largeImage?: string;
  smallImage?: string;
  party?: Party;
  elapsedText?: string;
  timeAlignment?: TIME_ALIGNMENT;
  startTime?: number;
}) => {
  // Adapted from: https://github.com/kyranet/kyra.dev/blob/main/components/user/card-activity.vue
  const secondAsMilliseconds = 1000
  const minuteAsMilliseconds = secondAsMilliseconds * 60
  const hourAsMilliseconds = minuteAsMilliseconds * 60

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Update to current time every second
  useEffect(() => {
    const interval = setInterval(() => setCurrentDateTime(new Date()), secondAsMilliseconds)
    return () => clearInterval(interval)
  }, [startTime])

  const formatTime = () => {
    const distance = currentDateTime.getTime() - startTime
    const seconds = Math.floor((distance / secondAsMilliseconds) % 60).toString().padStart(2, '0')
    const minutes = Math.floor((distance / minuteAsMilliseconds) % 60).toString().padStart(2, '0')
    if (distance < hourAsMilliseconds) return `${minutes}:${seconds}`

    const hours = Math.floor((distance / hourAsMilliseconds)).toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }
  return (
    <BaseSection>
      <div className="flex justify-between">
        {title ? (
          <SectionTitle title={title} marginBottom={4}></SectionTitle>
        ) : (
          <SectionTitle title="Playing a game" marginBottom={4}></SectionTitle>
        )}
      </div>
      <div className="flex items-center gap-3">
        {largeImage ? (
          <div className="flex gap-1 min-w-[65px]">
            <div className="relative justify-center items-center">
              <img
                src={largeImage}
                alt=""
                className="w-[65px] h-[65px] select-none object-cover rounded-md"
              />
              {smallImage && (
                <img
                  src={smallImage}
                  alt=""
                  className="absolute bottom-[-3px] right-[-6px] w-[20px] h-[20px] rounded-full select-none object-cover"
                />
              )}
            </div>
          </div>
        ) : (
          <>
            {smallImage && (
              <div className="min-w-[65px]">
                <img
                  src={smallImage}
                  alt=""
                  className="w-[65px] h-[65px] select-none object-cover"
                />
              </div>
            )}
          </>
        )}
        <div className="text-sm font-normal">
          {name && <p className="font-bold">{name}</p>}
          {details && (
            <p>
              {details.length <= 30
                ? details
                : `${details.substring(0, 30)}...`}
            </p>
          )}
          {state && (
            <>
              {party && party.currentSize && party.maxSize ? (
                <div>
                  <p>
                    {state.length <= 30
                      ? `${state} (${party.currentSize}/${party.maxSize})`
                      : `${state.substring(0, 30)}... (${party.currentSize}/${
                          party.maxSize
                        })`}
                  </p>
                </div>
              ) : (
                <p>
                  {state.length <= 30 ? state : `${state.substring(0, 30)}...`}
                </p>
              )}
              {}
            </>
          )}
          {startTime && (
            <p>{timeAlignment === 'left' ? `${formatTime()} ${elapsedText}` : `${elapsedText} ${formatTime()}`}</p>
          )}
        </div>
      </div>
    </BaseSection>
  );
};

export default GameSection;
