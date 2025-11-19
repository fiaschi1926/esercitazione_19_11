const container = document.querySelector('#container');
const calcola = document.querySelector('#calcola');
const cittaInput = document.querySelector('#citta');

const viewTemp = document.querySelector('#view-temp');
const t = document.querySelector('#temp');
const city = document.querySelector('#city');




calcola.addEventListener("click", async (event) => {
    event.preventDefault();

    const citta = cittaInput.value.trim();

    if (!citta) {
        return alert("Digitare una città prima di cercare.");
    }

    const temperatura = await calcolaMeteoByCitta(citta);

    if (temperatura === undefined) {
        viewTemp.className = "none";
        t.textContent = "Temperatura: ";
    } else {
        viewTemp.className = "block";
        t.textContent = `Temperatura: ${temperatura} °C`;
    }

    cittaInput.value = "";
});


async function calcolaMeteoByCitta(citta) {
    try {
        const urlCitta = `https://geocoding-api.open-meteo.com/v1/search?name=${citta}`;
        const geoResult = await axios.get(urlCitta);

        if (!geoResult.data.results || geoResult.data.results.length === 0) {
            alert("Nessun risultato per la città digitata");
            return undefined;
        }

        const data = geoResult.data.results[0];

        city.textContent = `Città: ${data.name} (${data.country_code})`;
        t.textContent = "Temperatura: ";

        const urlMeteo = `https://api.open-meteo.com/v1/forecast?latitude=${data.latitude}&longitude=${data.longitude}&current=temperature_2m`;
        const meteoResult = await axios.get(urlMeteo);

        return meteoResult.data.current.temperature_2m;

    } catch (err) {
        console.error(err);
        return undefined;
    }
}




/* PROVA INIZIALE
calcola.addEventListener("click", async function (event) {

    event.preventDefault();

    let citta = cittaInput.value;

    if (citta != "") {

        let meteo = await calcolaMeteoByCitta(citta);

        if (meteo === undefined || meteo === '') {
            viewTemp.className = "none";
            t.innerHTML = "Temperatura: ";
        } else {
            viewTemp.className = "block";
            t.innerHTML += meteo;
        }

    } else {
        alert("digitare prima di aggiungere una città")

    }

    cittaInput.value = "";
});



async function calcolaMeteoByCitta(citta) {

    const urlCitta = `https://geocoding-api.open-meteo.com/v1/search?name=${citta}`;


    let temperature_2m;

    await axios.get(urlCitta)
        .then(
            async (result) => {

                t.innerHTML = "";

                const data = result.data.results[0];

                if (data === undefined || data === '') {
                    alert("Nessun risultato per la città digitata");
                    throw new Error("Nessun risultato per la città digitata");
                }

                city.innerHTML = `Città: ${data.name} (${data.country_code})`;


                const latitudine = data.latitude;
                const longitudine = data.longitude;

                const urlMeteo = `https://api.open-meteo.com/v1/forecast?latitude=${latitudine}&longitude=${longitudine}&current=temperature_2m`;


                await axios.get(urlMeteo)
                    .then(
                        (result) => {
                            temperature_2m = result.data.current.temperature_2m;
                        })
                    .catch(
                        (error) => {
                            console.error(error)
                        });
            })
        .catch(
            (error) => {

                console.log(error)

                if (error.status != '') {
                    console.error(error.status)
                } else {
                    console.error(error)
                }
            });

    return temperature_2m;

}
*/
