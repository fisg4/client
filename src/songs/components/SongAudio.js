function SongAudio({ audioUrl }) {
  return (
    <audio controls>
      <source
        src={audioUrl}
        type="audio/mpeg"
      />
    </audio>
  );
}

export default SongAudio;