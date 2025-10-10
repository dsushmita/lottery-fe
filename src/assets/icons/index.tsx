import React from "react";

const IconWrapper: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <svg
    className={`w-5 h-5 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    {children}
  </svg>
);

export const Icons = {
  Logo: ({ className = "" }: { className?: string }) => (
    <svg
      className={className}
      width="42"
      height="43"
      viewBox="0 0 42 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="42" height="43" fill="url(#pattern0_13091_3558)" />
      <defs>
        <pattern
          id="pattern0_13091_3558"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <image
            href="/logo.png"
            width="1"
            height="1"
            preserveAspectRatio="xMidYMid slice"
          />
        </pattern>
      </defs>
    </svg>
  ),

  MysteryBox: ({ className = "" }: { className?: string }) => (
    <IconWrapper className={className}>
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.55834 0.793295C7.69078 0.710517 7.84382 0.666626 8 0.666626C8.15619 0.666626 8.30923 0.710517 8.44167 0.793295L14.195 4.38913L8 8.03329L1.805 4.38913L7.55834 0.793295ZM0.50667 5.55913C0.502132 5.59478 0.499905 5.63069 0.500003 5.66663V12.3333C0.500003 12.4746 0.535951 12.6136 0.604467 12.7373C0.672983 12.8609 0.771815 12.9651 0.89167 13.04L7.16667 16.9616V9.47663L0.50667 5.55913ZM8.83334 16.9616L15.1083 13.04C15.2282 12.9651 15.327 12.8609 15.3955 12.7373C15.4641 12.6136 15.5 12.4746 15.5 12.3333V5.66663C15.5 5.63052 15.4978 5.59468 15.4933 5.55913L8.83334 9.47579V16.9616Z"
          fill="#3ABEF9"
        />
      </svg>
    </IconWrapper>
  ),

  Battles: ({ className = "" }: { className?: string }) => (
    <IconWrapper className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </IconWrapper>
  ),

  Games: ({ className = "" }: { className?: string }) => (
    <IconWrapper className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </IconWrapper>
  ),

  Leaderboards: ({ className = "" }: { className?: string }) => (
    <IconWrapper className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    </IconWrapper>
  ),

  Rewards: ({ className = "" }: { className?: string }) => (
    <IconWrapper className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
      />
    </IconWrapper>
  ),

  Plus: ({ className = "" }: { className?: string }) => (
    <IconWrapper className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </IconWrapper>
  ),

  Cart: ({ className = "" }: { className?: string }) => (
    <IconWrapper className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </IconWrapper>
  ),

  Bell: ({ className = "" }: { className?: string }) => (
    <IconWrapper className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </IconWrapper>
  ),

  Chat: ({ className = "" }: { className?: string }) => (
    <IconWrapper className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </IconWrapper>
  ),

  Menu: ({ className = "" }: { className?: string }) => (
    <IconWrapper className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </IconWrapper>
  ),

  Close: ({ className = "" }: { className?: string }) => (
    <IconWrapper className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </IconWrapper>
  ),

  ChevronDown: ({ className = "" }: { className?: string }) => (
    <IconWrapper className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </IconWrapper>
  ),

  Coin: ({ className = "" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
    </svg>
  ),
};

// Named exports for convenience
export const {
  Logo,
  MysteryBox,
  Battles,
  Games,
  Leaderboards,
  Rewards,
  Plus,
  Cart,
  Bell,
  Chat,
  Menu,
  Close,
  ChevronDown,
  Coin,
} = Icons;
