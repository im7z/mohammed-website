const morningB = document.querySelector("#morning");
const nightB = document.querySelector("#night");

const h1 = document.querySelector('h1');
const hr1 = document.querySelector('#hr1');
const hr2 = document.querySelector('#hr2');
const counter = document.querySelector('#counter');
const counterProgress = document.querySelector('#counter-progress');
const counterTotal = document.querySelector('#counter-total');
const cardStage = document.querySelector('#card-stage');
const previousDhikr = document.querySelector('#previous-dhikr');
const nextDhikr = document.querySelector('#next-dhikr');
const resetB = document.querySelector('#reset');
const retur = document.querySelector('#return');
const thkr = document.querySelector('.thkr');
const bs = document.querySelector('.bs');
const con = document.querySelector('.con');
const dhikrCopy = document.querySelector('.dhikr-copy');
const dhikrPosition = document.querySelector('#dhikr-position');
const completion = document.querySelector('#completion');
const completionHome = document.querySelector('#completion-home');
const homeScreen = document.querySelector('#home-screen');


let flag = 0;
let count = 0;
let check = 0;
let currentAthkar = [];
let advanceTimer = null;
let progressCounts = [];
let touchStartX = 0;
let touchStartY = 0;
let touchStartTime = 0;
let touchDirection = null;

const progressStorageKey = "athkarV2Progress";

const athkarMorning = [
    {
        b: "أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ",
        text: "اللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ.",
        quran: { surah: 2, surahName: "البقرة", ayahs: [255], openingIsQuran: false },
        count: 1
    },
    {
        b: 'بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم',
        text: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ، ٱللَّهُ ٱلصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌ.',
        quran: { surah: 112, surahName: "الإخلاص", ayahs: [1, 2, 3, 4], openingIsQuran: true },
        count: 3
    },
    {
        b: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم",
        text: "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ.",
        quran: { surah: 113, surahName: "الفلق", ayahs: [1, 2, 3, 4, 5], openingIsQuran: true },
        count: 3
    },
    {
        b: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم",
        text: "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ، مَلِكِ ٱلنَّاسِ، إِلَٰهِ ٱلنَّاسِ، مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ، ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ، مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ.",
        quran: { surah: 114, surahName: "الناس", ayahs: [1, 2, 3, 4, 5, 6], openingIsQuran: true },
        count: 3
    },
    {
        b: "",
        text: "أَصْـبَحْنا وَأَصْـبَحَ المُـلْكُ لله وَالحَمدُ لله ، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُـلكُ ولهُ الحَمْـد، وهُوَ على كلّ شَيءٍ قدير ، رَبِّ أسْـأَلُـكَ خَـيرَ ما في هـذا اليوم وَخَـيرَ ما بَعْـدَه ، وَأَعـوذُ بِكَ مِنْ شَـرِّ ما في هـذا اليوم وَشَرِّ ما بَعْـدَه، رَبِّ أَعـوذُبِكَ مِنَ الْكَسَـلِ وَسـوءِ الْكِـبَر ، رَبِّ أَعـوذُ بِكَ مِنْ عَـذابٍ في النّـارِ وَعَـذابٍ في القَـبْر.",
        count: 1
    },
    {
        b: "",
        text: "اللّهـمَّ أَنْتَ رَبِّـي لا إلهَ إلاّ أَنْتَ ، خَلَقْتَنـي وَأَنا عَبْـدُك ، وَأَنا عَلـى عَهْـدِكَ وَوَعْـدِكَ ما اسْتَـطَعْـت ، أَعـوذُبِكَ مِنْ شَـرِّ ما صَنَـعْت ، أَبـوءُ لَـكَ بِنِعْـمَتِـكَ عَلَـيَّ وَأَبـوءُ بِذَنْـبي فَاغْفـِرْ لي فَإِنَّـهُ لا يَغْـفِرُ الذُّنـوبَ إِلاّ أَنْتَ . ",
        count: 1
    },
    {
        b: "",
        text: "رَضيـتُ بِاللهِ رَبَّـاً وَبِالإسْلامِ ديـناً وَبِمُحَـمَّدٍ صلى الله عليه وسلم نَبِيّـاً. ",
        count: 3
    },
    {
        b: "",
        text: "اللّهُـمَّ إِنِّـي أَصْبَـحْتُ أُشْـهِدُك ، وَأُشْـهِدُ حَمَلَـةَ عَـرْشِـك ، وَمَلَائِكَتَكَ ، وَجَمـيعَ خَلْـقِك ، أَنَّـكَ أَنْـتَ اللهُ لا إلهَ إلاّ أَنْـتَ وَحْـدَكَ لا شَريكَ لَـك ، وَأَنَّ ُ مُحَمّـداً عَبْـدُكَ وَرَسـولُـك.",
        count: 4
    },
    {
        b: "",
        text: "اللّهُـمَّ ما أَصْبَـَحَ بي مِـنْ نِعْـمَةٍ أَو بِأَحَـدٍ مِـنْ خَلْـقِك ، فَمِـنْكَ وَحْـدَكَ لا شريكَ لَـك ، فَلَـكَ الْحَمْـدُ وَلَـكَ الشُّكْـر.",
        count: 1
    },
    {
        b: "",
        text: "حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم.",
        count: 7
    },
    {
        b: "",
        text: "بِسـمِ اللهِ الذي لا يَضُـرُّ مَعَ اسمِـهِ شَيءٌ في الأرْضِ وَلا في السّمـاءِ وَهـوَ السّمـيعُ العَلـيم.",
        count: 3
    },
    {
        b: "",
        text: "أَعـوذُ بِكَلِمـاتِ اللّهِ التّـامّـاتِ مِنْ شَـرِّ ما خَلَـق.",
        count: 3
    },
    {
        b: "",
        text: "سُبْحـانَ اللهِ وَبِحَمْـدِهِ عَدَدَ خَلْـقِه ، وَرِضـا نَفْسِـه ، وَزِنَـةَ عَـرْشِـه ، وَمِـدادَ كَلِمـاتِـه.",
        count: 3
    },


];
const athkarNight = [
    {
        b: "أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ",
        text: "اللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ.",
        quran: { surah: 2, surahName: "البقرة", ayahs: [255], openingIsQuran: false },
        count: 1
    },
    {
        b: 'بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم',
        text: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ، ٱللَّهُ ٱلصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌ.',
        quran: { surah: 112, surahName: "الإخلاص", ayahs: [1, 2, 3, 4], openingIsQuran: true },
        count: 3
    },
    {
        b: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم",
        text: "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ.",
        quran: { surah: 113, surahName: "الفلق", ayahs: [1, 2, 3, 4, 5], openingIsQuran: true },
        count: 3
    },
    {
        b: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم",
        text: "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ، مَلِكِ ٱلنَّاسِ، إِلَٰهِ ٱلنَّاسِ، مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ، ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ، مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ.",
        quran: { surah: 114, surahName: "الناس", ayahs: [1, 2, 3, 4, 5, 6], openingIsQuran: true },
        count: 3
    },
    {
        b: "",
        text: "أَمْسَيْـنا وَأَمْسـى المـلكُ لله وَالحَمدُ لله ، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُـلكُ ولهُ الحَمْـد، وهُوَ على كلّ شَيءٍ قدير ، رَبِّ أسْـأَلُـكَ خَـيرَ ما في هـذهِ اللَّـيْلَةِ وَخَـيرَ ما بَعْـدَهـا ، وَأَعـوذُ بِكَ مِنْ شَـرِّ ما في هـذهِ اللَّـيْلةِ وَشَرِّ ما بَعْـدَهـا ، رَبِّ أَعـوذُبِكَ مِنَ الْكَسَـلِ وَسـوءِ الْكِـبَر ، رَبِّ أَعـوذُ بِكَ مِنْ عَـذابٍ في النّـارِ وَعَـذابٍ في القَـبْر.",
        count: 1
    },
    {
        b: "",
        text: "اللّهـمَّ أَنْتَ رَبِّـي لا إلهَ إلاّ أَنْتَ ، خَلَقْتَنـي وَأَنا عَبْـدُك ، وَأَنا عَلـى عَهْـدِكَ وَوَعْـدِكَ ما اسْتَـطَعْـت ، أَعـوذُبِكَ مِنْ شَـرِّ ما صَنَـعْت ، أَبـوءُ لَـكَ بِنِعْـمَتِـكَ عَلَـيَّ وَأَبـوءُ بِذَنْـبي فَاغْفـِرْ لي فَإِنَّـهُ لا يَغْـفِرُ الذُّنـوبَ إِلاّ أَنْتَ . ",
        count: 1
    },
    {
        b: "",
        text: "رَضيـتُ بِاللهِ رَبَّـاً وَبِالإسْلامِ ديـناً وَبِمُحَـمَّدٍ صلى الله عليه وسلم نَبِيّـاً. ",
        count: 3
    },
    {
        b: "",
        text: "اللّهُـمَّ إِنِّـي أَمسيتُ أُشْـهِدُك ، وَأُشْـهِدُ حَمَلَـةَ عَـرْشِـك ، وَمَلَائِكَتَكَ ، وَجَمـيعَ خَلْـقِك ، أَنَّـكَ أَنْـتَ اللهُ لا إلهَ إلاّ أَنْـتَ وَحْـدَكَ لا شَريكَ لَـك ، وَأَنَّ ُ مُحَمّـداً عَبْـدُكَ وَرَسـولُـك.",
        count: 4
    },
    {
        b: "",
        text: "اللّهُـمَّ ما أَمسى بي مِـنْ نِعْـمَةٍ أَو بِأَحَـدٍ مِـنْ خَلْـقِك ، فَمِـنْكَ وَحْـدَكَ لا شريكَ لَـك ، فَلَـكَ الْحَمْـدُ وَلَـكَ الشُّكْـر.",
        count: 1
    },
    {
        b: "",
        text: "حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم.",
        count: 7
    },
    {
        b: "",
        text: "بِسـمِ اللهِ الذي لا يَضُـرُّ مَعَ اسمِـهِ شَيءٌ في الأرْضِ وَلا في السّمـاءِ وَهـوَ السّمـيعُ العَلـيم.",
        count: 3
    },
    {
        b: "",
        text: "أَعـوذُ بِكَلِمـاتِ اللّهِ التّـامّـاتِ مِنْ شَـرِّ ما خَلَـق.",
        count: 3
    },
    {
        b: "",
        text: "سُبْحـانَ اللهِ وَبِحَمْـدِهِ عَدَدَ خَلْـقِه ، وَرِضـا نَفْسِـه ، وَزِنَـةَ عَـرْشِـه ، وَمِـدادَ كَلِمـاتِـه.",
        count: 3
    },


];


counter.addEventListener("click", () => {
    Counter();
});

resetB.addEventListener("click", resetf)

morningB.addEventListener("click", () => {
    check = 1;
    currentAthkar = athkarMorning;
    flag = 0;
    progressCounts = Array(currentAthkar.length).fill(0);
    h1.textContent = "اذكار الصباح";
    showReader();
    athkar();
})

nightB.addEventListener("click", () => {
    check = 2;
    currentAthkar = athkarNight;
    flag = 0;
    progressCounts = Array(currentAthkar.length).fill(0);
    h1.textContent = "اذكار المساء";
    showReader();
    athkar();
})

retur.addEventListener("click", () => {
    showHome();
    flag = 0;
    h1.textContent = "";
    resetf();
    clearSavedProgress();
})

completionHome.addEventListener("click", () => {
    showHome();
    flag = 0;
    h1.textContent = "";
    clearSavedProgress();
})

previousDhikr.addEventListener("click", () => {
    navigateDhikr(-1, "previous");
})

nextDhikr.addEventListener("click", () => {
    navigateDhikr(1, "next");
})

con.addEventListener("touchstart", event => {
    const touch = event.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
    touchStartTime = Date.now();
    touchDirection = null;
}, { passive: true })

con.addEventListener("touchmove", event => {
    const touch = event.touches[0];
    const distanceX = touch.clientX - touchStartX;
    const distanceY = touch.clientY - touchStartY;
    const elapsedTime = Math.max(Date.now() - touchStartTime, 1);
    const verticalSpeed = Math.abs(distanceY) / elapsedTime;

    if (!touchDirection && (Math.abs(distanceX) > 10 || Math.abs(distanceY) > 10)) {
        const isVertical = Math.abs(distanceY) > Math.abs(distanceX) * 1.25;
        const pageBottom = window.scrollY + window.innerHeight;
        const canScrollPage = distanceY < 0
            ? pageBottom < document.documentElement.scrollHeight - 2
            : window.scrollY > 2;
        const canScrollText = distanceY < 0
            ? dhikrCopy.scrollTop + dhikrCopy.clientHeight < dhikrCopy.scrollHeight - 2
            : dhikrCopy.scrollTop > 2;
        const canScrollInGestureDirection = canScrollText || canScrollPage;

        if (isVertical && canScrollInGestureDirection) {
            touchDirection = "scroll";
        } else if (isVertical && Math.abs(distanceY) >= 30 && verticalSpeed >= 0.65) {
            touchDirection = "navigation";
        } else if (!isVertical || elapsedTime > 180) {
            touchDirection = "scroll";
        }
    }

    if (touchDirection === "navigation") {
        event.preventDefault();
    }
}, { passive: false })

con.addEventListener("touchend", event => {
    if (touchDirection !== "navigation") {
        return;
    }

    const distanceY = event.changedTouches[0].clientY - touchStartY;
    if (Math.abs(distanceY) >= 70) {
        navigateDhikr(distanceY < 0 ? 1 : -1, distanceY < 0 ? "next" : "previous");
    }
})



function Counter() {
    if (counter.classList.contains("notactive")) {
        counter.classList.remove("notactive");
    }

    if (count < currentAthkar[flag].count) {
        count += 1;
        progressCounts[flag] = count;
        updateCounterDisplay();
        saveProgress();
    }

    if (count === currentAthkar[flag].count) {
        counter.disabled = true;
        advanceTimer = setTimeout(() => {
            advanceTimer = null;
            const hasNextDhikr = flag < currentAthkar.length - 1;
            flag += 1;
            athkar();
            if (hasNextDhikr) {
                animateCard("next");
            }
            counter.blur();
            counter.disabled = false;
        }, 300)

    }
}

function showReader() {
    document.body.classList.add("reader-active");
    homeScreen.classList.add("none");
    h1.classList.remove("none");
    hr1.classList.remove("none");
    hr2.classList.remove("none");
    counter.classList.remove("none");
    cardStage.classList.remove("none");
    resetB.classList.remove("none");
    retur.classList.remove("none");
    con.classList.remove("none");
    morningB.classList.add("none");
    nightB.classList.add("none");
    completion.classList.add("none");
}

function showHome() {
    document.body.classList.remove("reader-active");
    homeScreen.classList.remove("none");
    h1.classList.add("none");
    hr1.classList.add("none");
    hr2.classList.add("none");
    counter.classList.add("none");
    cardStage.classList.add("none");
    resetB.classList.add("none");
    retur.classList.add("none");
    con.classList.add("none");
    completion.classList.add("none");
    morningB.classList.remove("none");
    nightB.classList.remove("none");
}

function showCompletion() {
    document.body.classList.add("reader-active");
    homeScreen.classList.add("none");
    h1.classList.add("none");
    hr1.classList.add("none");
    hr2.classList.add("none");
    counter.classList.add("none");
    cardStage.classList.add("none");
    resetB.classList.add("none");
    retur.classList.add("none");
    con.classList.add("none");
    morningB.classList.add("none");
    nightB.classList.add("none");
    completion.classList.remove("none");
    completionHome.focus();
    clearSavedProgress();
}

function resetf() {
    cancelAutomaticAdvance();

    if (!counter.classList.contains("notactive")) {
        counter.classList.add("notactive");
    }
    count = 0;
    if (progressCounts.length > flag) {
        progressCounts[flag] = 0;
    }
    updateCounterDisplay();
    saveProgress();
}

function navigateDhikr(step, direction) {
    const nextIndex = flag + step;

    if (nextIndex < 0 || nextIndex >= currentAthkar.length) {
        return;
    }

    cancelAutomaticAdvance();
    flag = nextIndex;
    athkar();
    animateCard(direction);
}

function animateCard(direction) {
    const animationClass = direction === "next" ? "slide-from-bottom" : "slide-from-top";
    con.classList.remove("slide-from-bottom", "slide-from-top");
    void con.offsetWidth;
    con.classList.add(animationClass);
    con.addEventListener("animationend", () => con.classList.remove(animationClass), { once: true });
}

function cancelAutomaticAdvance() {
    if (advanceTimer !== null) {
        clearTimeout(advanceTimer);
        advanceTimer = null;
        counter.disabled = false;
    }
}

function saveProgress() {
    if (!currentAthkar.length || flag >= currentAthkar.length) {
        return;
    }

    const savedProgress = {
        version: 1,
        collection: check === 1 ? "morning" : "evening",
        index: flag,
        counts: progressCounts
    };

    try {
        localStorage.setItem(progressStorageKey, JSON.stringify(savedProgress));
    } catch (error) {
        // The application still works when browser storage is unavailable.
    }
}

function clearSavedProgress() {
    try {
        localStorage.removeItem(progressStorageKey);
    } catch (error) {
        // Nothing else is required when browser storage is unavailable.
    }
}

function restoreProgress() {
    let savedProgress;

    try {
        savedProgress = JSON.parse(localStorage.getItem(progressStorageKey));
    } catch (error) {
        clearSavedProgress();
        return;
    }

    const isMorning = savedProgress?.collection === "morning";
    const isEvening = savedProgress?.collection === "evening";
    const selectedCollection = isMorning ? athkarMorning : athkarNight;

    if (
        savedProgress?.version !== 1 ||
        (!isMorning && !isEvening) ||
        !Number.isInteger(savedProgress.index) ||
        savedProgress.index < 0 ||
        savedProgress.index >= selectedCollection.length ||
        !Array.isArray(savedProgress.counts)
    ) {
        clearSavedProgress();
        return;
    }

    check = isMorning ? 1 : 2;
    currentAthkar = selectedCollection;
    flag = savedProgress.index;
    progressCounts = currentAthkar.map((entry, index) => {
        const savedCount = savedProgress.counts[index];
        return Number.isInteger(savedCount)
            ? Math.min(Math.max(savedCount, 0), entry.count)
            : 0;
    });

    h1.textContent = isMorning ? "اذكار الصباح" : "اذكار المساء";
    showReader();
    athkar();
}

function updateCounterDisplay() {
    const requiredCount = currentAthkar[flag].count;
    const segments = counterProgress.querySelectorAll(".counter-segment");

    segments.forEach((segment, index) => {
        segment.classList.toggle("filled", index < count);
    });

    counter.setAttribute("aria-label", `تم ${count} من ${requiredCount}`);
}

function renderCounter() {
    const requiredCount = currentAthkar[flag].count;
    const segments = Array.from({ length: requiredCount }, () => {
        const segment = document.createElement("span");
        segment.classList.add("counter-segment");
        return segment;
    });

    counterProgress.replaceChildren(...segments);
    counterProgress.style.setProperty("--segment-count", requiredCount);
    counterTotal.textContent = requiredCount;
    updateCounterDisplay();
}

function updateNavigationButtons() {
    previousDhikr.disabled = flag === 0;
    nextDhikr.disabled = flag === currentAthkar.length - 1;
    cardStage.classList.toggle("is-last", flag === currentAthkar.length - 1);
}

function toArabicIndic(number) {
    return String(number).replace(/\d/g, digit => "٠١٢٣٤٥٦٧٨٩"[digit]);
}

function createAyahOrnament(number, accessibleLabel) {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const ornament = document.createElement("span");
    const svg = document.createElementNS(svgNamespace, "svg");
    const floralShape = document.createElementNS(svgNamespace, "path");
    const innerBorder = document.createElementNS(svgNamespace, "circle");
    const details = document.createElementNS(svgNamespace, "g");
    const numberText = document.createElementNS(svgNamespace, "text");

    ornament.className = "ayah-number";
    ornament.setAttribute("aria-label", accessibleLabel);

    svg.classList.add("ayah-ornament");
    svg.setAttribute("viewBox", "0 0 64 64");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");

    floralShape.setAttribute(
        "d",
        "M32 3C36 8 41 9 47 6C47 13 51 17 58 18C54 24 55 28 61 32C55 36 54 40 58 46C51 47 47 51 47 58C41 55 36 56 32 61C28 56 23 55 17 58C17 51 13 47 6 46C10 40 9 36 3 32C9 28 10 24 6 18C13 17 17 13 17 6C23 9 28 8 32 3Z"
    );
    floralShape.setAttribute("class", "ayah-ornament-shape");

    innerBorder.setAttribute("cx", "32");
    innerBorder.setAttribute("cy", "32");
    innerBorder.setAttribute("r", "20");
    innerBorder.setAttribute("class", "ayah-ornament-border");

    details.setAttribute("class", "ayah-ornament-details");
    details.innerHTML = `
        <circle cx="32" cy="8" r="2" />
        <circle cx="56" cy="32" r="2" />
        <circle cx="32" cy="56" r="2" />
        <circle cx="8" cy="32" r="2" />
        <path d="M22 13Q32 18 42 13M51 22Q46 32 51 42M42 51Q32 46 22 51M13 42Q18 32 13 22" />
    `;

    numberText.setAttribute("x", "32");
    numberText.setAttribute("y", "38");
    numberText.setAttribute("text-anchor", "middle");
    numberText.setAttribute("class", "ayah-ornament-number");
    numberText.textContent = toArabicIndic(number);

    svg.append(floralShape, innerBorder, details, numberText);
    ornament.append(svg);
    return ornament;
}

function renderDhikrText(entry) {
    con.classList.toggle("quran-entry", Boolean(entry.quran));
    bs.classList.toggle("quran-opening", Boolean(entry.quran?.openingIsQuran));

    if (!entry.quran) {
        thkr.textContent = entry.text;
        return;
    }

    const verses = entry.text.replace(/\.$/, "").split("،").map(verse => verse.trim());

    if (verses.length !== entry.quran.ayahs.length) {
        thkr.textContent = entry.text;
        return;
    }

    const content = document.createDocumentFragment();
    verses.forEach((verse, index) => {
        const ayahNumber = entry.quran.ayahs[index];
        const ornament = createAyahOrnament(
            ayahNumber,
            `سورة ${entry.quran.surahName}، الآية ${ayahNumber}`
        );

        content.append(document.createTextNode(`${verse} `), ornament, document.createTextNode(" "));
    });

    thkr.replaceChildren(content);
}

function athkar() {
    if (flag < currentAthkar.length) {
        count = progressCounts[flag] || 0;
    }
    counter.classList.add("notactive");

    if (check == 1) {
        if (flag >= athkarMorning.length) {
            showCompletion();
            flag = 0;
            return;
        }
        bs.textContent = athkarMorning[flag].b;
        renderDhikrText(athkarMorning[flag]);
        dhikrCopy.scrollTop = 0;
        dhikrPosition.textContent = `الذكر ${flag + 1} من ${athkarMorning.length}`;
        renderCounter();
        updateNavigationButtons();
        saveProgress();
    } else {
        if (flag >= athkarNight.length) {
            showCompletion();
            flag = 0;
            return;
        }
        bs.textContent = athkarNight[flag].b;
        renderDhikrText(athkarNight[flag]);
        dhikrCopy.scrollTop = 0;
        dhikrPosition.textContent = `الذكر ${flag + 1} من ${athkarNight.length}`;
        renderCounter();
        updateNavigationButtons();
        saveProgress();
    }
}

restoreProgress();
