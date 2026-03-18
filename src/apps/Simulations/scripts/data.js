// All applet text lives here (EN + ID)
const appData = {
  en: {
    lines: [
      "A {pill0} is",
      "a shape that is",
      "{pill1}",
      "made up of {pill2}",
      "meeting at {pill3}.",
    ],
    pills: [
      "Hexagon",
      "flat and closed",
      "6 straight sides",
      "6 sharp corners",
    ],
    ui: { instruction: "Tap each colored text and observe the visual." },
  },
  id: {
    lines: [
      "Sebuah {pill0} adalah",
      "bangun datar yang",
      "{pill1}",
      "terdiri dari {pill2}",
      "bertemu di {pill3}.",
    ],
    pills: [
      "heksagon",
      "datar dan tertutup",
      "6 sisi lurus",
      "6 sudut runcing",
    ],
    ui: { instruction: "Ketuk setiap teks berwarna dan amati visualnya." },
  },
};


const scenes = [
  {
    frameStart: 0,
    frameEnd: 60,
    holdFrame: 60,
    isLoop: true
  },
  {
    frameStart: 60,
    frameEnd: 120,
    holdFrame: 120
  },
  {
    frameStart: 120,
    frameEnd: 180,
    holdFrame: 180
  },
  {
    frameStart: 180,
    frameEnd: 240,
    holdFrame: 240
  },
  {
    frameStart: 240,
    frameEnd: 305,
    holdFrame: 305
  }
];


