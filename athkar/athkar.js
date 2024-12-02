const counter = document.querySelector(".counter");
const reset = document.querySelector(".reset");
const start = document.querySelector(".start");
const text = document.querySelector(".text");
const bs = document.querySelector(".bs");
const head = document.querySelector(".head");
const h1 = document.querySelector(".h1");
const h2 = document.querySelector(".h2");
const container = document.querySelector(".container");
const undo = document.querySelector(".undo");

let flag = 0;
let count = 0;


const athkar = [
    {
        b: "أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ",
        text: "اللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ.",
        count: 1
    },
    {
        b: 'بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم',
        text: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ، ٱللَّهُ ٱلصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ.',
        count: 3
    },
    {
        b: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم",
        text: "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ.",
        count: 3
    },
    {
        b: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم",
        text: "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ، مَلِكِ ٱلنَّاسِ، إِلَٰهِ ٱلنَّاسِ، مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ، ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ، مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ.",
        count: 3
    },
    {
        b: "",
        text: "اللّهـمَّ أَنْتَ رَبِّـي لا إلهَ إلاّ أَنْتَ ، خَلَقْتَنـي وَأَنا عَبْـدُك ، وَأَنا عَلـى عَهْـدِكَ وَوَعْـدِكَ ما اسْتَـطَعْـت ، أَعـوذُبِكَ مِنْ شَـرِّ ما صَنَـعْت ، أَبـوءُ لَـكَ بِنِعْـمَتِـكَ عَلَـيَّ وَأَبـوءُ بِذَنْـبي فَاغْفـِرْ لي فَإِنَّـهُ لا يَغْـفِرُ الذُّنـوبَ إِلاّ أَنْتَ . ",
        count: 1
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
    {
        b: "",
        text: "رَضيـتُ بِاللهِ رَبَّـاً وَبِالإسْلامِ ديـناً وَبِمُحَـمَّدٍ صلى الله عليه وسلم نَبِيّـاً. ",
        count: 3
    },

];


function Counter() {
    if (counter.classList.contains("btn-outline-success")) {
        counter.classList.remove("btn-outline-success");
        counter.classList.add("btn-success");
    }

    if (counter.textContent == athkar[flag].count) {
        counter.textContent = count;
    }
    if (counter.textContent < athkar[flag].count) {
        counter.textContent = ++count;
    }

    if (count == athkar[flag].count) {
        flag += 1;
        athkarr();
        resett();
    }
}


counter.addEventListener("click", Counter);
counter.addEventListener("touchstart", (event) => {
    event.preventDefault(); 
    Counter();
});


reset.addEventListener("click", resett)

start.addEventListener("click", () => {
    View();
    athkarr();
})

undo.addEventListener("click", () => {
    View();
    flag = 0;
    resett();
})



function View() {
    head.classList.toggle("d-none");
    h1.classList.toggle("d-none");
    h2.classList.toggle("d-none");
    counter.classList.toggle("d-none");
    reset.classList.toggle("d-none");
    container.classList.toggle("d-none");
    undo.classList.toggle("d-none");
    start.classList.toggle("d-none");
}


function resett() {
    if (counter.classList.contains("btn-success")) {
        counter.classList.remove("btn-success");
        counter.classList.add("btn-outline-success");
    }
    count = 0;
    counter.textContent = athkar[flag].count;
}


function athkarr() {
    if (flag >= athkar.length) {
        View();
        flag = 0;
        resett();
    }
    bs.textContent = athkar[flag].b;
    text.textContent = athkar[flag].text;
    counter.textContent = athkar[flag].count;
}