export interface FooterTag {
  id: string;
  label: string;
  page: string;
  isFromHistory?: boolean; // New property to indicate if tag is from navigation history
}

export interface FooterTagsProps {
  tags?: FooterTag[];
}
