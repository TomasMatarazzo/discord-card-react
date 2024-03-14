import { useState } from "react";
import AboutMeSection from "./AboutMeSection";
import BasicInfoSection from "./BasicInfoSection";
import "./DiscordCard.css";
import DiscordLink from "./DiscordLink";
import MemberSinceSection from "./MemberSinceSection";
import NoteSection from "./NoteSection";
import Role from "./Role";
import RoleSection from "./RoleSection";
import Separator from "./Separator";
import StatusSection from "./StatusSection";

const DiscordCard = () => {
  const [note, setNote] = useState("");

  function handleNoteChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setNote(event.target.value);
  }

  return (
    <div className="discord-card-border">
      <div className="discord-banner-container">
        <div className="discord-profile-picture-border">
          <img src="pfp.webp" className="discord-profile-picture" />
        </div>
        <img src="banner.png" className="discord-banner-image" />
        <div className="discord-badges-container">
          <img src="developer-badge.png" className="discord-badge" />
        </div>
      </div>
      <div className="discord-card-outer-body">
        <div className="discord-card-inner-body">
          <BasicInfoSection
            displayname="Misfit"
            username="misfitdude"
            pronouns="he/him"
          />
          <StatusSection iconUrl="raccoon.svg" status="Best HTML programmer" />
          <Separator />
          <AboutMeSection>
            <p>(25 y/o) Just a nerd who loves coding and technology</p>
            <p style={{ marginBottom: 10 }}>INTP</p>
            <DiscordLink href="https://www.youtube.com/watch?v=NN1OtIJu_Bk" />
            <p>🦝❤️🦉</p>
          </AboutMeSection>
          <MemberSinceSection discordJoinDate="20 Jul 2016" />
          <RoleSection>
            <Role role="JavaScript" color="#f7df1e" />
            <Role role="TypeScript" color="#007acc" />
            <Role role="PHP" color="#4f3e66" />
            <Role role="CSS" color="#4372c4" />
            <Role role="HTML" color="#ed731c" />
          </RoleSection>
          <NoteSection note={note} handleInput={handleNoteChange} />
          <section className="message-section">
            <textarea placeholder="Message @Misfit"></textarea>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DiscordCard;
