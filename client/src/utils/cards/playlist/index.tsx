import { PlayList } from "../../../types";

type PlaylistCardProps = {
  playlist: PlayList;
};

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
  const { songs, title, playlistImage } = playlist;
  return (
    <div className="flex items-center w-full h-full cursor-pointer transition-all hover:ring-2 hover:ring-white rounded-md bg-[#2c2929]">
      <img
        src={playlistImage}
        alt="playlist"
        className="w-24 h-24 rounded-l-md"
      />
      <h2 className="flex justify-center w-full">{title}</h2>
    </div>
  );
}
