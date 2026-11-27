import Link from "next/link";
import { HeroParallax } from "./hero-parallax";
import { HeroScene } from "./hero-scene";
import type { Vars } from "./parts";

/* The top of the page: the way home, the key art, the title lockup with its
   year seal, and four stubs for what is in this Wrapped. */

const STUBS = [
  {
    href: "#queue",
    day: "01",
    title: "The queue",
    what: "3,800 tries to get in",
    ink: "var(--pink)",
  },
  {
    href: "#founder",
    day: "02",
    title: "New class: Founder",
    what: "9 achievements unlocked",
    ink: "var(--amber)",
  },
  {
    href: "#grind",
    day: "03",
    title: "The grind",
    what: "6,019 contributions",
    ink: "var(--lime)",
  },
  {
    href: "#drops",
    day: "04",
    title: "Item drops",
    what: "Ryu, and 72 apps inside it",
    ink: "var(--cyan)",
  },
] as const;

const delay = (ms: number): Vars => ({ "--delay": `${ms}ms` });

export function Hero() {
  return (
    <header className="u26-hero" data-u26-hero="">
      <HeroParallax />
      <div className="u26-poster">
        <HeroScene />
        <div className="u26-top">
          <div className="u26-wrap u26-top-row">
            <Link className="u26-home" href="/">
              <span aria-hidden="true">←</span> jiaweing.com
            </Link>
          </div>
        </div>
        <div className="u26-wrap u26-hero-inner">
          <div className="u26-lockup">
            <p className="u26-tag u26-tag--foil">Jia Wei Ng</p>
            <h1 className="u26-display u26-title">
              <span className="u26-title-line" style={delay(80)}>
                2026
              </span>
              <span
                className="u26-title-line u26-title-line--b"
                style={delay(200)}
              >
                Wrapped
              </span>
            </h1>
            <div className="u26-billing">
              <p className="u26-seal">
                <span aria-hidden="true" className="u26-seal-shape" />
                <span className="u26-seal-text">
                  <small>A Major</small>
                  <b>Year</b>
                </span>
              </p>
              <div className="u26-billtext">
                <p className="u26-hand u26-tagline">
                  The year I stopped waiting for permission.
                </p>
                <p className="u26-hook">
                  I applied to 3,800 jobs and got 0 interviews. So I started my
                  own company.
                </p>
              </div>
            </div>
            <div className="u26-ctas">
              <a className="u26-btn u26-btn--foil" href="#queue">
                Unwrap it <span aria-hidden="true">↓</span>
              </a>
              <a className="u26-btn u26-btn--room" href="#room">
                <span aria-hidden="true" className="u26-btn-gem" />
                Enter my room
              </a>
              <a className="u26-btn" href="#recap">
                Skip to the recap
              </a>
            </div>
          </div>
        </div>
      </div>
      <nav aria-label="In this Wrapped" className="u26-wrap u26-stubs">
        <p className="u26-hand u26-stubs-label">In this Wrapped</p>
        <ol className="u26-stub-grid">
          {STUBS.map((stub) => {
            const vars: Vars = { "--stub": stub.ink };
            return (
              <li key={stub.href}>
                <a className="u26-stub" href={stub.href} style={vars}>
                  <span aria-hidden="true" className="u26-stub-num">
                    {stub.day}
                  </span>
                  <b>{stub.title}</b>
                  <span>{stub.what}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </header>
  );
}
