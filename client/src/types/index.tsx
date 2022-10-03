export type Song = {
  title: string;
  band: string;
  songUrl: string;
};

export type PlayList = {
  _id: string;
  title: string;
  playlistImage: string;
  songs: Song[];
};
