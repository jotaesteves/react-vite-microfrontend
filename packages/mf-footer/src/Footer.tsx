import React from "react";
import "./Footer.css";
import { useTheme } from "./store/microFrontendStore";
import { FooterTags } from "./components";
import { FooterTag } from "./types";
import { useNavigationHistory } from "./hooks";

interface FooterProps {
  customTags?: FooterTag[];
  useHistory?: boolean; // Enable history-based tags (default: true)
}

/**
 * Footer component that can display navigation tags based on:
 * 1. Custom tags provided via props
 * 2. Navigation history from the shared global store (default behavior)
 * 3. Default tags if neither custom tags nor history is available
 *
 * When running in the host environment, it automatically uses the shared
 * global store to track navigation history and display recently visited pages.
 */
const Footer: React.FC<FooterProps> = ({ customTags, useHistory = true }) => {
  const { theme } = useTheme();
  const { historyTags, excludePageFromHistory } = useNavigationHistory();

  // Determine which tags to use
  // Priority: customTags > historyTags > undefined (which will show default tags)
  const tagsToUse = customTags || (useHistory && historyTags.length > 0 ? historyTags : undefined);

  return (
    <footer className={`footer ${theme}`}>
      <FooterTags tags={tagsToUse} onTagClose={useHistory ? excludePageFromHistory : undefined} />
      <div className="footer-chat">
        <button
          className="footer-chat-button"
          onClick={() => {
            // Handle chat button click logic here
            console.log("Chat button clicked");
          }}
          aria-label="Open chat"
        >
          💬 Go<span style={{ fontWeight: "bold" }}>IZI</span>
        </button>
      </div>
    </footer>
  );
};
export default Footer;
