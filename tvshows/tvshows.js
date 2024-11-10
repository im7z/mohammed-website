const form = document.querySelector("#sForm")
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = form.elements.query.value;

    try {
        const res = await axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${name}&embed=episodes`);
        makeImage(res.data);
    } catch (e) {
        const error = document.createElement('h2');
        error.textContent = `Show not found or an error occurred ${e}`;
        document.body.append(error);
    }
    form.elements.query.value = '';
})


const makeImage = (shows) => {
    const existing = document.querySelector('.con');
    if (existing) {
        existing.remove();
    }

    const con = document.createElement("div");
    con.classList.add('con');

    if (shows.image) {
        const img = document.createElement("img");
        img.src = shows.image.original;
        con.append(img);
    } else {
        const img = document.createElement('h2');
        img.textContent = "Image not available for this show";
        con.append(img);
    }

    const name = document.createElement("h2");
    name.textContent = shows.name;

    const summary = document.createElement('h3');
    summary.innerHTML = shows.summary;

    const seasons = document.createElement('h4');
    seasons.textContent = `${count(shows)} Seasons, ${shows._embedded.episodes.length} Episodes`;

    con.append(name);
    con.append(summary);
    con.append(seasons);

    document.body.append(con);

}

const count = (shows) => {
    let season = 0;
    for (const ep of shows._embedded.episodes) {

        if (ep.season > season) {
            season = ep.season
        }
    }
    return season;
}