import { motion } from "framer-motion";

type Props = {
  label: string;
  activeNav: string;
  setActiveNav: React.Dispatch<React.SetStateAction<string>>;
};

const NavCard = ({ label, activeNav, setActiveNav }: Props) => {
  return (
    <div
      onClick={() => setActiveNav(label)}
      className={`relative flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[13.5px] cursor-pointer transition-all mb-0.5 ${
        activeNav === label
          ? "bg-signal/10 text-text"
          : "text-text-dim hover:bg-bg-elev-2 hover:text-text"
      }`}
    >
      {activeNav === label && (
        <motion.span
          layoutId="dash-tab-highlight"
          className="absolute inset-0 rounded-lg bg-white/5"
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      <span
        className={`w-1.5 h-1.5 rounded-sm flex-shrink-0 ${activeNav === label ? "bg-signal" : "bg-text-faint"}`}
      />
      {label}
    </div>
  );
};

export default NavCard;
