import { useEffect, useState } from "react";
import "./Navbar.scss";

export default function Navbar() {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => window.removeEventListener("scroll", () => {}); //Error type script
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png"
        alt="Netflix logo"
      />
    </div>
  );
}
