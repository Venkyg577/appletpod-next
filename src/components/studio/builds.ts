// The public build list. Client names stay out until each client says yes.
export type BuildStatus = "LIVE" | "OWN" | "CLIENT" | "IN BUILD" | "PROTOTYPE" | "KILLED";

export type Build = {
  title: string;
  description: string;
  status: BuildStatus;
  href?: string;
};

export type BuildGroup = {
  label: string;
  builds: Build[];
};

export const buildGroups: BuildGroup[] = [
  {
    label: "Agents",
    builds: [
      {
        title: "Tender scout",
        description:
          "Reads redevelopment tender notices from sites and newspapers, runs OCR, classifies them, and puts a call list in a sheet every morning. For a Mumbai real-estate developer.",
        status: "LIVE",
      },
      {
        title: "Job board pipeline",
        description:
          "Finds companies hiring for AI and automation work, fetches and classifies the roles, publishes to joblistings.live. With thelaunch.space.",
        status: "LIVE",
        href: "https://joblistings.live",
      },
      {
        title: "Applet factory",
        description:
          "Eight agents that take a slide storyboard and return a tested interactive applet.",
        status: "LIVE",
      },
      {
        title: "Reply drafter",
        description:
          "Turns every reply to cold outreach into one ready-to-send answer. A person reviews and sends. Never auto-sends.",
        status: "OWN",
      },
      {
        title: "Personal assistant",
        description: "Runs on Telegram, IST, on open-source Hermes.",
        status: "OWN",
      },
      {
        title: "Content agents",
        description:
          "Five agents that research and draft LinkedIn posts into one dashboard. Ran in production, then retired.",
        status: "KILLED",
      },
    ],
  },
  {
    label: "Products",
    builds: [
      {
        title: "Hostel bed finder",
        description:
          "Students find beds nearby. Wardens update rooms by voice in Tamil, English, Hindi or Telugu. For a Tamil Nadu hostel network.",
        status: "IN BUILD",
      },
      {
        title: "Lead-gen for a quick-commerce warehouse",
        description:
          "Finds the operations person who actually picks up. For a Bengaluru fulfilment company.",
        status: "IN BUILD",
      },
      {
        title: "DeskFleet",
        description:
          "Multi-agent support desk on LangGraph. Designed and specced end to end.",
        status: "PROTOTYPE",
      },
    ],
  },
  {
    label: "Websites",
    builds: [
      {
        title: "Loan facilitator site",
        description:
          "Bilingual English and Telugu lead site for a multi-bank loan business.",
        status: "CLIENT",
      },
      {
        title: "appletpod.com",
        description: "This site.",
        status: "OWN",
      },
    ],
  },
  {
    label: "Learning content",
    builds: [
      {
        title: "100+ interactive applets",
        description:
          "School maths, science and English. Most are under client confidentiality. 17 are open to try.",
        status: "CLIENT",
        href: "/work",
      },
      {
        title: "Flipbooks",
        description: "Existing textbooks with an interactive layer.",
        status: "LIVE",
        href: "/flipbooks",
      },
    ],
  },
];
