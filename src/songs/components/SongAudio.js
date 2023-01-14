import { useSelector } from "react-redux";

function SongAudio() {
  const media = useSelector((state) => state.songMedia);

  return (
    <>
      {media?.audioUrl && (
        <audio controls>
          <source src={media.audioUrl} type="audio/mpeg" />
        </audio>
      )}
    </>
  );
}

export default SongAudio;