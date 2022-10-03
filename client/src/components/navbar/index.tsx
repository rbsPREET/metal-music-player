import { motion } from "framer-motion";
import WebsiteLogo from "../../assets/metal_logo_no_bg.png";

export function Navbar() {
  return (
    <div className="flex items-center justify-between w-full h-28">
      <div className="relative">
        <motion.div
          animate={{}}
          whileHover={{
            border: "1px solid red",
            opacity: 1,
            transition: { duration: 1 },
          }}
          className="absolute inset-0 rounded-full"
        ></motion.div>
        <img
          src={WebsiteLogo}
          alt="web_logo"
          className="relative cursor-pointer rounded-full w-24 h-24"
        />
      </div>
      <ul className="flex gap-10 uppercase tracking-wider text-xl">
        <li className="active cursor-pointer link link-underline link-underline-black">
          Playlists
        </li>
        <li className="cursor-pointer link link-underline link-underline-black">
          Bands
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
