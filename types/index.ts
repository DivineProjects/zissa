export type NavItem = {
  label: string;
  href: string;
  desc?: string;
};

export type NavGroupType = {
  label: string;
  items: NavItem[];
};