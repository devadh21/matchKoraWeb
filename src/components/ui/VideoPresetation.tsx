export function VideoPresetation() {
  return (
    <video   preload="auto" autoPlay muted playsInline controls>
      <source src="/videos/MatchKora_video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}