/**
 * Page-based math applet – data and window-exposed getters
 * Use getPage(), getData(key), setPage(n), etc. from window.
 * Text fields are arrays of objects: [{ text, font?, color?, size? }, ...] for custom styling per segment.
 * Language switching: setLanguage('en'|'id'), getLanguage(), listens to html lang attribute on init.
 */

(function () {
  var DEFAULT_TEXT_STYLE = {
    font: "Arial, Helvetica, sans-serif",
    color: "#ffffff",
    size: "1em"
  };
  window.DEFAULT_TEXT_STYLE = DEFAULT_TEXT_STYLE;

  var translations = {
    en: {
      markers: ["Night", "Morning", "Afternoon", "Evening", "Night"],
      upperContext: "Activities we do during each part of the day.",
      footerHint: "Tap and drag the slider to change the part of the day.",
      morning: "Morning",
      morningDesc: "Sun comes up",
      afternoon: "Afternoon",
      afternoonDesc: "Sun is high in the sky",
      evening: "Evening",
      eveningDesc: "Sun starts to go down",
      night: "Night",
      nightDesc: "Moon and stars comes up",
      thingsIn: "Things we do in the ",
      thingsAt: "Things we do at ",
      brushTeeth: "Brush Teeth",
      breakfast: "Breakfast",
      lunch: "Lunch",
      napHour: "Nap Hour",
      snacks: "Snacks",
      playTime: "Play Time",
      dinner: "Dinner",
      sleeping: "Sleeping",
      restart: "Restart"
    },
    id: {
      markers: ["Malam", "Pagi", "Siang", "Sore", "Malam"],
      upperContext: "Kegiatan yang kita lakukan pada setiap bagian hari.",
      footerHint: "Sentuh dan geser slider untuk mengubah bagian hari.",
      morning: "Pagi",
      morningDesc: "Matahari terbit",
      afternoon: "Siang",
      afternoonDesc: "Matahari tepat di atas langit",
      evening: "Sore",
      eveningDesc: "Matahari mulai terbenam",
      night: "Malam",
      nightDesc: "Bulan dan bintang muncul",
      thingsIn: "Hal yang kita lakukan di waktu ",
      thingsAt: "Hal yang kita lakukan di waktu ",
      brushTeeth: "Sikat Gigi",
      breakfast: "Sarapan",
      lunch: "Makan Siang",
      napHour: "Tidur Siang",
      snacks: "Cemilan",
      playTime: "Waktu Bermain",
      dinner: "Makan Malam",
      sleeping: "Tidur",
      restart: "Mulai Ulang"
    }
  };

  var currentLang = "en";
  var htmlLang = (document.documentElement.getAttribute("lang") || "en").toLowerCase().slice(0, 2);
  if (htmlLang === "id") currentLang = "id";

  function tr() {
    return translations[currentLang] || translations.en;
  }

  function rebuildData() {
    var t = tr();
    window.LEFT_CONTAINER = {
      controlType: "slider",
      lottie: "animationData",
      frameStart: 0,
      frameEnd: 100,
      sliderLabel: [{ text: "", font: DEFAULT_TEXT_STYLE.font, color: DEFAULT_TEXT_STYLE.color, size: "0.6em" }],
      markers: [
        { markerName: t.markers[0], percentage: 0 },
        { markerName: t.markers[1], percentage: 25 },
        { markerName: t.markers[2], percentage: 50 },
        { markerName: t.markers[3], percentage: 75 },
        { markerName: t.markers[4], percentage: 100 }
      ]
    };

    window.PAGES = [
      {
        id: 1,
        upperContext: [{ text: t.upperContext, font: DEFAULT_TEXT_STYLE.font, color: "#ffffff", size: "1em" }],
        leftTopText: [{ text: " ", font: DEFAULT_TEXT_STYLE.font, color: DEFAULT_TEXT_STYLE.color, size: "0.9em" }],
        right: { text: [{ text: "", font: DEFAULT_TEXT_STYLE.font, color: DEFAULT_TEXT_STYLE.color, size: "0.9em" }] },
        footerText: [{ text: t.footerHint, font: DEFAULT_TEXT_STYLE.font, color: DEFAULT_TEXT_STYLE.color, size: "0.95em" }],
        isNavigationDisabled: true
      },
      {
        id: 2,
        upperContext: [{ text: t.upperContext, font: DEFAULT_TEXT_STYLE.font, color: "#ffffff", size: "1em" }],
        leftTopText: [{ text: t.morning + ": ", font: DEFAULT_TEXT_STYLE.font, color: "#ffb84d", size: "0.9em" }, { text: t.morningDesc, font: DEFAULT_TEXT_STYLE.font, color: "#ffffff", size: "0.9em" }],
        right: {
          image: [{ label: [{ text: t.brushTeeth, font: DEFAULT_TEXT_STYLE.font, color: DEFAULT_TEXT_STYLE.color, size: "0.8em" }], image: "assets/BrushTeeth.png" }, { label: [{ text: t.breakfast, font: DEFAULT_TEXT_STYLE.font, color: DEFAULT_TEXT_STYLE.color, size: "0.8em" }], image: "assets/Breakfast.png" }],
          text: [{ text: t.thingsIn, font: DEFAULT_TEXT_STYLE.font, color: DEFAULT_TEXT_STYLE.color, size: "0.9em" }, { text: t.morning, font: DEFAULT_TEXT_STYLE.font, color: "#ffb84d", size: "0.9em" }]
        },
        footerText: [{ text: t.footerHint, font: DEFAULT_TEXT_STYLE.font, color: DEFAULT_TEXT_STYLE.color, size: "0.95em" }],
        isNavigationDisabled: true
      },
      {
        id: 3,
        upperContext: [{ text: t.upperContext, font: DEFAULT_TEXT_STYLE.font, color: "#ffffff", size: "1em" }],
        leftTopText: [{ text: t.afternoon + ": ", font: DEFAULT_TEXT_STYLE.font, color: "#00ffbb", size: "0.9em" }, { text: t.afternoonDesc, font: DEFAULT_TEXT_STYLE.font, color: "#ffffff", size: "0.9em" }],
        right: {
          image: [{ label: [{ text: t.lunch, font: DEFAULT_TEXT_STYLE.font, color: DEFAULT_TEXT_STYLE.color, size: "0.8em" }], image: "assets/Lunch.png" }, { label: [{ text: t.napHour, font: DEFAULT_TEXT_STYLE.font, color: DEFAULT_TEXT_STYLE.color, size: "0.8em" }], image: "assets/NapHour.png" }],
          text: [{ text: t.thingsIn, font: DEFAULT_TEXT_STYLE.font, color: DEFAULT_TEXT_STYLE.color, size: "0.9em" }, { text: (currentLang === "id" ? t.afternoon : t.afternoon.toLowerCase()), font: DEFAULT_TEXT_STYLE.font, color: "#00ffbb", size: "0.9em" }]
        },
        footerText: [{ text: t.footerHint, font: DEFAULT_TEXT_STYLE.font, color: DEFAULT_TEXT_STYLE.color, size: "0.95em" }],
        isNavigationDisabled: true
      },
      {
        id: 4,
        upperContext: [{ text: t.upperContext, font: DEFAULT_TEXT_STYLE.font, color: "#ffffff", size: "1em" }],
        leftTopText: [{ text: t.evening + ": ", font: DEFAULT_TEXT_STYLE.font, color: "#ff8000", size: "0.9em" }, { text: t.eveningDesc, font: DEFAULT_TEXT_STYLE.font, color: "#ffffff", size: "0.9em" }],
        right: {
          image: [{ label: [{ text: t.snacks, font: DEFAULT_TEXT_STYLE.font, color: DEFAULT_TEXT_STYLE.color, size: "0.8em" }], image: "assets/Snachs.png" }, { label: [{ text: t.playTime, font: DEFAULT_TEXT_STYLE.font, color: DEFAULT_TEXT_STYLE.color, size: "0.8em" }], image: "assets/PlayTime.png" }],
          text: [{ text: t.thingsIn, font: DEFAULT_TEXT_STYLE.font, color: DEFAULT_TEXT_STYLE.color, size: "0.9em" }, { text: (currentLang === "id" ? t.evening : t.evening.toLowerCase()), font: DEFAULT_TEXT_STYLE.font, color: "#ff8000", size: "0.9em" }]
        },
        footerText: [{ text: t.footerHint, font: DEFAULT_TEXT_STYLE.font, color: DEFAULT_TEXT_STYLE.color, size: "0.95em" }],
        isNavigationDisabled: true
      },
      {
        id: 5,
        upperContext: [{ text: t.upperContext, font: DEFAULT_TEXT_STYLE.font, color: "#ffffff", size: "1em" }],
        leftTopText: [{ text: t.night + ": ", font: DEFAULT_TEXT_STYLE.font, color: "#0095ff", size: "0.9em" }, { text: t.nightDesc, font: DEFAULT_TEXT_STYLE.font, color: "#ffffff", size: "0.9em" }],
        right: {
          image: [{ label: [{ text: t.dinner, font: DEFAULT_TEXT_STYLE.font, color: DEFAULT_TEXT_STYLE.color, size: "0.8em" }], image: "assets/Dinner.png" }, { label: [{ text: t.sleeping, font: DEFAULT_TEXT_STYLE.font, color: DEFAULT_TEXT_STYLE.color, size: "0.8em" }], image: "assets/Sleeping.png" }],
          text: [{ text: t.thingsAt, font: DEFAULT_TEXT_STYLE.font, color: DEFAULT_TEXT_STYLE.color, size: "0.9em" }, { text: t.night + " ", font: DEFAULT_TEXT_STYLE.font, color: "#0095ff", size: "0.9em" }]
        },
        footerText: [{ text: "", font: DEFAULT_TEXT_STYLE.font, color: DEFAULT_TEXT_STYLE.color, size: "0.95em" }],
        isFooterButton: true,
        footerButtonName: [{ text: t.restart, font: DEFAULT_TEXT_STYLE.font, color: "#000000", size: "1em" }]
      }
    ];
  }

  rebuildData();

  var currentPageIndex = 1;

  function getPage() {
    var list = window.PAGES;
    if (!Array.isArray(list) || list.length === 0) return null;
    var idx = Math.max(1, Math.min(currentPageIndex, list.length));
    return list[idx - 1] || null;
  }

  function getTotalPages() {
    var list = window.PAGES;
    return Array.isArray(list) ? list.length : 0;
  }

  window.getPage = getPage;
  window.getPageIndex = function () { return currentPageIndex; };
  window.getTotalPages = getTotalPages;
  window.getLeftConfig = function () { return window.LEFT_CONTAINER || null; };
  window.setPage = function (n) {
    var total = getTotalPages();
    if (total === 0) return;
    currentPageIndex = Math.max(1, Math.min(Number(n) || 1, total));
  };
  window.goNext = function () {
    if (currentPageIndex < getTotalPages()) {
      currentPageIndex += 1;
      return true;
    }
    return false;
  };
  window.goPrev = function () {
    if (currentPageIndex > 1) {
      currentPageIndex -= 1;
      return true;
    }
    return false;
  };

  window.getLanguage = function () {
    return currentLang;
  };

  window.setLanguage = function (lang) {
    var next = (lang || "en").toLowerCase().slice(0, 2);
    if (next !== "en" && next !== "id") next = "en";
    if (currentLang === next) return;
    currentLang = next;
    document.documentElement.setAttribute("lang", currentLang);
    rebuildData();
    try {
      window.dispatchEvent(new CustomEvent("languageChange", { detail: { lang: currentLang } }));
    } catch (e) {}
  };


  function getData(key) {
    if (key === "page" || key === "currentPage") return getPage();
    if (key === "pageIndex" || key === "currentPageIndex") return currentPageIndex;
    if (key === "totalPages") return getTotalPages();
    if (key === "pages") return window.PAGES;

    var page = getPage();
    if (!page) return undefined;

    if (key === "upperContext") return page.upperContext;
    if (key === "leftTopText") return page.leftTopText || "";
    if (key === "footerText") return page.footerText;
    if (key === "isFooterButton") return !!page.isFooterButton;
    if (key === "footerButtonName") return page.footerButtonName || "";
    if (key === "left") return window.LEFT_CONTAINER;
    if (key === "right") return page.right;

    const parts = key.split(".");
    let value = page;
    for (let i = 0; i < parts.length; i++) {
      if (value == null) return undefined;
      value = value[parts[i]];
    }
    return value;
  }  
  window.getData = getData;
})();
