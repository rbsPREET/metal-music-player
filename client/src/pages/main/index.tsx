import Section from "../../components/section";
import { playLists } from "../../data";
import PlaylistCard from "../../utils/cards/playlist";

export default function Main() {
  return (
    <div className="h-[73%] md:h-[66%] scrollbar-thin scrollbar-thumb-primary scrollbar-track-transparent overflow-y-scroll">
      <div className="flex flex-col gap-5 mr-5 mt-2">
        <Section title="Recently listened to">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {playLists.map((playlist, i) => (
              <PlaylistCard playlist={playlist} key={playlist._id} />
            ))}
          </div>
        </Section>
        <Section title="Gym">
          <div className="text-xl">
            <div>Hello World</div>
            <div>Hello World</div>
            <div>Hello World</div>
            <div>Hello World</div>
            <div>Hello World</div>
            <div>Hello World</div>
            <div>Hello World</div>
            <div>Hello World</div>
            <div>Hello World</div>
            <div>Hello World</div>
          </div>
        </Section>
      </div>
    </div>
  );
}
