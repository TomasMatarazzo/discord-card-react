import BaseSection from "./BaseSection";
import SectionTitle from "./SectionTitle";
import SeekBar from "./SeekBar";
import SpotifyLogo from "./SpotifyLogo";
/**
 * Renders a section displaying Spotify song information.
 *
 * @param {string} title - The title of the section
 * @param {string} song - The name of the song
 * @param {string} artist - The name of the artist
 * @param {string} album - The name of the album
 * @param {string} artUrl - The URL of the album art
 * @param {string} trackUrl - The URL of the track on Spotify
 * @param {number} startTimeMs - The start time of the song in milliseconds
 * @param {number} endTimeMs - The end time of the song in milliseconds
 * @return {JSX.Element} The rendered Spotify section
 */

interface ColorVariants {
  [key: string]: string;
}
const SpotifySection = ({
  title,
  song,
  artist,
  album,
  artUrl,
  trackUrl,
  startTimeMs,
  endTimeMs,
  accentColor
}: {
  title?: string;
  song: string;
  artist: string;
  album: string;
  artUrl?: string;
  trackUrl?: string;
  startTimeMs?: number;
  endTimeMs?: number;
  accentColor?:string;
}) => {

  const colors :ColorVariants = {
    "#8500d3": 'bg-[#8500d3] hover:bg-[#484848]'
  } ;


  return (
    <BaseSection>
      <div className="flex justify-between" style={{ marginBottom: 6 }}>
        {title ? (
          <SectionTitle title={title} />
        ) : (
          <SectionTitle title="Listening to Spotify" />
        )}
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 48 48"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="Icons"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="Color-"
              transform="translate(-200.000000, -460.000000)"
              fill="#00DA5A"
            >
              <path
                d="M238.16,481.36 C230.48,476.8 217.64,476.32 210.32,478.6 C209.12,478.96 207.92,478.24 207.56,477.16 C207.2,475.96 207.92,474.76 209,474.4 C217.52,471.88 231.56,472.36 240.44,477.64 C241.52,478.24 241.88,479.68 241.28,480.76 C240.68,481.6 239.24,481.96 238.16,481.36 M237.92,488.08 C237.32,488.92 236.24,489.28 235.4,488.68 C228.92,484.72 219.08,483.52 211.52,485.92 C210.56,486.16 209.48,485.68 209.24,484.72 C209,483.76 209.48,482.68 210.44,482.44 C219.2,479.8 230,481.12 237.44,485.68 C238.16,486.04 238.52,487.24 237.92,488.08 M235.04,494.68 C234.56,495.4 233.72,495.64 233,495.16 C227.36,491.68 220.28,490.96 211.88,492.88 C211.04,493.12 210.32,492.52 210.08,491.8 C209.84,490.96 210.44,490.24 211.16,490 C220.28,487.96 228.2,488.8 234.44,492.64 C235.28,493 235.4,493.96 235.04,494.68 M224,460 C210.8,460 200,470.8 200,484 C200,497.2 210.8,508 224,508 C237.2,508 248,497.2 248,484 C248,470.8 237.32,460 224,460"
                id="Spotify"
              ></path>
            </g>
          </g>
        </svg>
      </div>
      <div className="flex items-center gap-3">
        {artUrl && (
          <div className="min-w-[65px] self-start">
            {trackUrl ? (
              <a href={trackUrl} target="_blank">
                <img
                  src={artUrl}
                  className="w-[65px] h-[65px] select-none rounded-md"
                  alt={album}
                />
              </a>
            ) : (
              <img
                src={artUrl}
                className="w-[65px] h-[65px] select-none rounded-md"
                alt={album}
              />
            )}
          </div>
        )}
        <div>
          <p className="text-sm font-bold">
            {song.length <= 27 ? song : `${song.substring(0, 27)}...`}
          </p>
          <p className="text-sm font-normal">
            {artist.length <= 27 ? artist : `${artist.substring(0, 27)}...`}
          </p>
          <p className="text-sm font-normal">
            {album.length <= 27 ? album : `${album.substring(0, 27)}...`}
          </p>
        </div>
      </div>
      
      { startTimeMs && endTimeMs && (
        <SeekBar startTimeMs={startTimeMs} endTimeMs={endTimeMs} />
      )}

      {trackUrl && (
        <section className="flex relative">
        <a
          target="_blank"
          href={trackUrl}
          className={` block ${colors[accentColor]} w-[80%] text-sm py-[6px] px-[4px] text-center mt-[8px] rounded-md text-white hover:bg-[#484848] mr-2`}
          aria-label={`Play ${song} by ${artist} on Spotify`}
          
        >
          <div className="flex justify-center items-center gap-2">
          <SpotifyLogo></SpotifyLogo>
          Play on Spotify
          </div>
        </a>
                <a
          target="_blank"
          href={trackUrl}
          className={` block ${colors[accentColor]} w-[15%] text-sm py-[6px] px-[4px] text-center mt-[8px] rounded-md text-white`}
          aria-label={`Play ${song} by ${artist} on Spotify`}
        >
          <div className="flex justify-center items-center gap-2">
          <SpotifyLogo></SpotifyLogo>
          </div>
        </a>
    </section> 
      )}
    </BaseSection>
  );
};

export default SpotifySection;
