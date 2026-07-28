import type { Metadata } from "next";
import { CopyButton } from "./copy-button";

const START_LINE =
  "Look in this folder for skills/amplifi-onboarding/SKILL.md, then run it start to finish. My name is ___.";

const DRIVE_URL =
  "https://drive.google.com/drive/folders/0AN2kR-z80lGjUk9PVA";

export const metadata: Metadata = {
  title: "Amplifi Brain — Onboard",
  description:
    "About half an hour, once, on your own machine. Connect to the Amplifi knowledge base and set up your assistants.",
  // Public to anyone with the link, but never in search results. This page is
  // outside the password gate on purpose (friction here means nobody
  // onboards), which also means it's the one route a crawler could reach —
  // and it carries Amplifi's Drive link and internal process. Vercel adds a
  // noindex header on preview deployments but NOT on the production domain,
  // so without this the live page would be indexable.
  robots: { index: false, follow: false, nocache: true },
};

export default function OnboardPage() {
  return (
    <div className="ob">
      <div className="ob-band">
        <span className="ob-mark">AMPLIFI &times; CHIIBITSU LABS</span>
        <span className="ob-conf">Onboard</span>
      </div>

      <div className="ob-wrap">
        <div className="ob-eyebrow">Amplifi Brain</div>
        <h1 className="ob-h1">
          Half an hour, and your AI knows how Amplifi{" "}
          <em>actually works</em>.
        </h1>
        <p className="ob-dek">
          Once, on your own machine, whenever suits you. No meeting, no waiting
          on anyone else.
        </p>
        <div className="ob-stamp">For the Amplifi analyst team &middot; July 2026</div>

        <div className="ob-live">
          <span className="ob-dot" />
          <p>
            <b>Your knowledge base is already live in the shared Drive</b> — the
            standards, the client folders, the assistants. Nothing to create,
            nothing to upload. You&rsquo;re just connecting to it.{" "}
            <a href={DRIVE_URL} target="_blank" rel="noopener noreferrer">
              Open the folder &rarr;
            </a>
          </p>
        </div>

        <section className="ob-sec">
          <h2 className="ob-h2">The one line that starts it</h2>
          <div className="ob-launch">
            <div className="ob-cap">Copy this, then paste it into Claude</div>
            <div className="ob-cmd">{START_LINE}</div>
            <CopyButton text={START_LINE} />
            <p className="ob-after">
              Put your own name where the blank is. &ldquo;This folder&rdquo;
              means the shared knowledge base folder you opened Claude in — step
              3 below. Everything after that is guided, and you answer in plain
              English. Once, then never again.
            </p>
          </div>

          <div className="ob-first">
            <p>
              <b>Going first? Set aside about 90 minutes, not 30.</b> Whoever
              runs this before anyone else also builds the team&rsquo;s quality
              standard from scratch, with the setup asking the questions —
              roughly an hour on what makes a good report, another half hour on
              the template and brand rules. Everyone after you inherits that and
              is done in 20&ndash;30.
            </p>
            <p>
              <b>Have these open before you start:</b> two or three of your best
              recent reports, and the current Canva template plus brand kit.
              They&rsquo;re deliberately different sources and it&rsquo;ll ask
              for both.
            </p>
            <p className="ob-faint">
              Not sure whether you&rsquo;re first? It checks and tells you
              before that part begins — if the standards are already filled in,
              it skips straight past them.
            </p>
          </div>
        </section>

        <section className="ob-sec">
          <h2 className="ob-h2">If you&rsquo;ve never opened it this way before</h2>
          <ol className="ob-steps">
            <li>
              <span>
                <b>Google Drive for desktop</b>
                <p>
                  Makes the shared knowledge base show up as a normal folder on
                  your computer instead of only in a browser tab. Look for it
                  under <i>Shared drives</i> once it&rsquo;s syncing.{" "}
                  <span className="ob-faint">
                    Check first — you may already have it.
                  </span>
                </p>
              </span>
            </li>
            <li>
              <span>
                <b>Claude Code — not Claude in the browser</b>
                <p>
                  It has to both read that folder and <i>save back into it</i>,
                  and that write is what lets the system remember what it learns
                  from you. <b>Claude Enterprise with the Google Drive connector
                  can only read</b>, so the setup gets partway and then fails
                  the first time it tries to write. You need the version with
                  real access to files on your machine.
                </p>
              </span>
            </li>
            <li>
              <span>
                <b>Open Claude inside that folder, then paste the line</b>
                <p>
                  This is the step that matters: open Claude <i>in</i> the
                  knowledge base folder, so &ldquo;this folder&rdquo; means the
                  right one. Then just answer what it asks.
                </p>
              </span>
            </li>
          </ol>
        </section>

        <section className="ob-sec">
          <h2 className="ob-h2">What it does while you watch</h2>
          <div className="ob-cards">
            <div className="ob-card">
              <h3>Sets you up</h3>
              <p>
                Installs your assistants and checks each one can genuinely read
                the knowledge base back to you — not just that a file landed.
              </p>
            </div>
            <div className="ob-card">
              <h3>Learns the standard</h3>
              <p>
                Asks for two or three of your best reports and writes down what
                makes them good: voice, structure, what a real recommendation
                looks like.
              </p>
            </div>
            <div className="ob-card">
              <h3>Flags what needs Rica</h3>
              <p>
                If you&rsquo;re not Rica, what it drafts about team-wide
                standards stays a proposal until she approves it. It&rsquo;ll
                tell you at the end — <b>send it to her the same day</b>, or
                the team stays blocked on it.
              </p>
            </div>
            <div className="ob-card">
              <h3>Tells you the truth</h3>
              <p>
                Ends with what&rsquo;s done, what&rsquo;s still open, and
                who&rsquo;s got it. It won&rsquo;t claim finished when it
                isn&rsquo;t.
              </p>
            </div>
          </div>
        </section>

        <section className="ob-sec">
          <h2 className="ob-h2">Already built your own during the sprint?</h2>
          <div className="ob-rail">
            <p>
              <b>It will not be overwritten.</b> Several of you built your own
              assistant on the in-person day and have been using it since.
              Whatever you called it, the setup looks at what your assistants
              actually <i>do</i> — not just their names — so yours gets found
              either way.
            </p>
            <p>
              When it finds yours, it stops and shows you the difference in
              plain terms, then asks: <b>combine both</b> (usually the right
              answer), replace, or leave yours alone. You decide. It never picks
              for you.
            </p>
            <p>
              And if yours does something better than the shared one, it offers
              to push that back so the whole team gets it. Weeks of your own
              practice should compound, not reset.
            </p>
          </div>
        </section>

        <section className="ob-sec">
          <h2 className="ob-h2">What you&rsquo;ll have afterward</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Assistant</th>
                  <th>What you use it for</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>Draft</b>
                  </td>
                  <td>
                    Writes insights and recommendations from that client&rsquo;s
                    own data and history — not generic filler.
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Check</b>
                  </td>
                  <td>
                    Catches AI tells, off-brand language, and claims the data
                    doesn&rsquo;t support — before internal review, not after.
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Capture</b>
                  </td>
                  <td>
                    At the end of a session, records what got corrected, so the
                    same fix never has to be made twice.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div className="ob-close">
          <h2 className="ob-h2">This is the starting kit, not the finished thing</h2>
          <p>
            What you set up today is version one — deliberately. It gets better
            by being used: as you work, correct it, tell it what you&rsquo;d
            rather it did, and let the capture step record that. Your own
            preferences and the way you actually work become part of it.
          </p>
          <p>
            More pieces are coming. The point isn&rsquo;t a tool you&rsquo;re
            handed once — it&rsquo;s a system that keeps learning how Amplifi
            works, from the people doing the work.
          </p>
          <p className="ob-when">
            Aim to have this done by <b>Monday, August 3</b> so the first full
            reporting cycle runs on it.
          </p>
        </div>

        <footer className="ob-foot">
          <span>
            Angeline &ldquo;Chii&rdquo; Viray &middot; Chiibitsu Labs &middot;{" "}
            <a href="mailto:labs@chiibitsu.com">labs@chiibitsu.com</a>
          </span>
          <span className="ob-tag">more human, by design</span>
        </footer>
      </div>
    </div>
  );
}
