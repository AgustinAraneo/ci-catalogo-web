import useWindowSize from "@/app/src/utils/windowSize";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavItem } from "@/app/src/types/types";

interface NavProps {
  navItem: NavItem[];
}

export const Nav: React.FC<NavProps> = ({ navItem }) => {
  const pathname = usePathname();
  const [subMenuState, setSubMenuState] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [height] = useWindowSize();

  useEffect(() => {
    if (height > 768) {
      setSubMenuState({});
    }
  }, [height]);

  const toggleSubMenu = (path: string) => {
    setSubMenuState((prevState) => ({
      ...prevState,
      [path]: !prevState[path],
    }));
  };

  return (
    <ul className="header-nav">
      {navItem.map((nav) => (
        <li
          key={nav.path}
          onClick={() => {
            if (nav.subNav) {
              toggleSubMenu(nav.path);
            }
          }}
        >
          <Link href={nav.path}>
            <p className={nav.path === pathname ? "active" : ""}>{nav.name}</p>
          </Link>
          {nav.subNav && (
            <ul className={subMenuState[nav.path] ? "active" : ""}>
              {nav.subNav.map((sub) => (
                <li key={sub.path}>
                  <Link href={sub.path}>
                    <p>{sub.name}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};
