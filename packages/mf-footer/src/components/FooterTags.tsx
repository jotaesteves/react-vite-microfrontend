import React from "react";
import { useNavigation } from "../store/microFrontendStore";
import { FooterTag, FooterTagsProps } from "../types";
import { removePageFromHistory } from "../utils/navigationUtils";

const FooterTags: React.FC<FooterTagsProps> = ({ tags }) => {
  const { currentPage, navigateTo } = useNavigation();

  // Default tags if none provided
  const defaultTags: FooterTag[] = [
    { id: "home", label: "Home", page: "home" },
    { id: "about", label: "About", page: "about" },
    { id: "contact", label: "Contact", page: "contact" },
  ];

  const [footerTags, setFooterTags] = React.useState<FooterTag[]>(() => {
    // Use provided tags, or default tags if no tags provided or empty array
    return tags && tags.length > 0 ? tags : defaultTags;
  });

  React.useEffect(() => {
    // Update tags when props change
    if (tags && tags.length > 0) {
      setFooterTags(tags);
    } else if (!tags) {
      // If no tags provided at all, use defaults
      setFooterTags(defaultTags);
    }
    // If tags is an empty array, keep current state (likely from history)
  }, [tags]);

  const handleFooterNavClick = (page: string, event: React.MouseEvent) => {
    event.preventDefault();
    navigateTo(page);
  };

  const handleTagClose = (event: React.MouseEvent, tagId: string) => {
    event.stopPropagation();

    // Find the tag being closed
    const tagToClose = footerTags.find((tag) => tag.id === tagId);

    // If it's a history tag, remove it from the global navigation history
    // This will permanently remove the page from the navigation history
    if (tagToClose?.isFromHistory) {
      removePageFromHistory(tagToClose.page);
    }

    // Remove the tag from the local state (this will hide it from the footer)
    setFooterTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId));
  };

  return (
    <div className="footer-tags">
      {footerTags.map((tag, index) => (
        <span
          key={tag.id}
          className={`footer-tag ${currentPage === tag.page ? "active" : ""} ${tag.isFromHistory ? "history-tag" : ""}`}
          onClick={(e) => handleFooterNavClick(tag.page, e as React.MouseEvent)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",
            marginRight: index < footerTags.length - 1 ? "8px" : "0",
          }}
          title={tag.isFromHistory ? `From navigation history: ${tag.label}` : tag.label}
        >
          {tag.isFromHistory && <span style={{ marginRight: "4px", opacity: 0.7 }}>🕒</span>}
          {tag.label}
          <button
            className="footer-tag-close"
            onClick={(e) => handleTagClose(e, tag.id)}
            aria-label={`Close ${tag.label} tag`}
            type="button"
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
};

export default FooterTags;
