type IconName =
  | "menu"
  | "search"
  | "heart"
  | "bag"
  | "user"
  | "home"
  | "grid"
  | "arrow"
  | "arrow-left"
  | "truck"
  | "returns"
  | "shield"
  | "headset"
  | "sparkle"
  | "sort"
  | "trash"
  | "dots"
  | "check-circle"
  | "close-circle"
  | "box"
  | "bell"
  | "phone"
  | "mail"
  | "map-pin"
  | "file"
  | "info"
  | "moon"
  | "globe"
  | "currency"
  | "logout"
  | "diamond"
  | "users"
  | "award"
  | "leaf"
  | "send";

const paths: Record<IconName, React.ReactNode> = {
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  heart: <path d="M20.8 4.7a5.5 5.5 0 0 0-7.8 0L12 5.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.4 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
  bag: <><path d="M6 8h12l1 13H5L6 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  home: <path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1v-9Z" />,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  arrow: <><path d="M5 12h14" /><path d="m14 7 5 5-5 5" /></>,
  "arrow-left": <><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></>,
  truck: <><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" /><circle cx="7" cy="19" r="2" /><circle cx="18" cy="19" r="2" /></>,
  returns: <><path d="M9 7H5v-4" /><path d="M5.6 7A8 8 0 1 1 4 15" /></>,
  shield: <><path d="M12 3 4 6v5c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></>,
  headset: <><path d="M4 14v-3a8 8 0 0 1 16 0v3" /><path d="M4 14h3v6H5a1 1 0 0 1-1-1v-5ZM20 14h-3v6h2a1 1 0 0 0 1-1v-5Z" /></>,
  sparkle: <><path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3Z" /><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" /></>,
  sort: <><path d="M4 7h16M7 12h10m-7 5h4" /><circle cx="6" cy="7" r="1" /><circle cx="17" cy="12" r="1" /><circle cx="10" cy="17" r="1" /></>,
  trash: <><path d="M5 7h14M10 11v6m4-6v6M9 7V4h6v3m-9 0 1 13h10l1-13" /></>,
  dots: <><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" /></>,
  "check-circle": <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
  "close-circle": <><circle cx="12" cy="12" r="9" /><path d="m9 9 6 6m0-6-6 6" /></>,
  box: <><path d="m4 7 8-4 8 4-8 4-8-4Z" /><path d="M4 7v10l8 4 8-4V7M12 11v10" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" /><path d="M10 21h4" /></>,
  phone: <path d="M6.6 3.5 4.8 4.7c-.8.5-1.1 1.5-.8 2.4 1.7 5.5 5.4 9.2 10.9 10.9.9.3 1.9 0 2.4-.8l1.2-1.8-3.2-2.1-1.4 1.4c-2.3-1.1-4.1-2.9-5.2-5.2l1.4-1.4-2.1-3.2Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  "map-pin": <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  file: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h5M9 13h6m-6 4h6" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 10v6m0-9h.01" /></>,
  moon: <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5a8.5 8.5 0 1 0 12 12Z" />,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></>,
  currency: <><circle cx="12" cy="12" r="9" /><path d="M9 8h6m-6 4h5m-4 0 4 4m-4-8a3 3 0 0 1 0 6" /></>,
  logout: <><path d="M10 5H5v14h5M14 8l4 4-4 4m4-4H9" /></>,
  diamond: <><path d="m3 9 4-5h10l4 5-9 11L3 9Z" /><path d="m3 9h18M7 4l5 16 5-16" /></>,
  users: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20a6 6 0 0 1 12 0M15 15a5 5 0 0 1 6 5" /></>,
  award: <><circle cx="12" cy="9" r="5" /><path d="m9 14-1 7 4-2 4 2-1-7" /><path d="m12 6 .7 1.4 1.5.2-1.1 1 .3 1.5-1.4-.7-1.4.7.3-1.5-1.1-1 1.5-.2L12 6Z" /></>,
  leaf: <><path d="M20 4C10 4 5 8 5 14c0 3 2 5 5 5 6 0 10-5 10-15Z" /><path d="M4 21c3-5 7-8 12-10" /></>,
  send: <><path d="m3 11 18-8-8 18-2-7-8-3Z" /><path d="m11 13 3 3" /></>,
};

export function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`${className} fill-none stroke-current stroke-[1.7]`} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
}
