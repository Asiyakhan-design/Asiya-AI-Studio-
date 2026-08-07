type IconProps = {
  name: string;
  className?: string;
};

const paths: Record<string, JSX.Element> = {
  alert: (
    <>
      <path d="M12 9v4M12 17h.01" />
      <path d="M10.3 3.6L2.5 17a2 2 0 001.7 3h15.6a2 2 0 001.7-3L13.7 3.6a2 2 0 00-3.4 0z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0112 2a7 7 0 017 7.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4M8 8l4-4 4 4" />
      <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
    </>
  ),
  chevronDown: <path d="M6 9l6 6 6-6" />,
  pen: (
    <>
      <path d="M4 20l3.2-.6a2 2 0 001.06-.55L19 8.1a2 2 0 000-2.83l-1.27-1.27a2 2 0 00-2.83 0L4.15 14.74a2 2 0 00-.55 1.06L3 21z" />
      <path d="M13.5 5.5l3 3" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="4" width="18" height="15" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="M21 15l-5.2-5.2a2 2 0 00-2.83 0L5 18" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6" width="12" height="11" rx="1.5" />
      <path d="M15 10l5-3v9l-5-3" />
    </>
  ),
  share: (
    <>
      <circle cx="6" cy="12" r="2.3" />
      <circle cx="17" cy="5.5" r="2.3" />
      <circle cx="17" cy="18.5" r="2.3" />
      <path d="M8 10.7L15 6.6M8 13.3L15 17.4" />
    </>
  ),
  presentation: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20l4-4 4 4M12 16v4" />
    </>
  ),
  bot: (
    <>
      <rect x="5" y="8" width="14" height="10" rx="2.5" />
      <path d="M12 8V4M9.5 4h5" />
      <circle cx="9.5" cy="13" r="1.1" />
      <circle cx="14.5" cy="13" r="1.1" />
      <path d="M3 12h2M19 12h2" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.8-4.8" />
    </>
  ),
  check: <path d="M5 13l4 4L19 7" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  spark: (
    <path d="M12 2l1.6 5.6L19 9.2l-5.4 1.6L12 16.4l-1.6-5.6L5 9.2l5.4-1.6L12 2z" />
  ),
  whatsapp: (
    <path d="M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3zm4.8 12.7c-.2.6-1.2 1.1-1.7 1.2-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.7.8 1.8.1.2.1.3 0 .5-.1.2-.2.3-.3.5-.2.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.4.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.7.8.2.1.4.2.4.3.1.2.1.6-.1 1.1z" />
  ),
};

export default function Icon({ name, className = "h-6 w-6" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? paths.spark}
    </svg>
  );
}
