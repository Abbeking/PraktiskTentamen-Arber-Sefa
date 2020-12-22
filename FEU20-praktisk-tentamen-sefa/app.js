/* Skriv din kod här */

// URL
const URL = 'https://restcountries.eu/rest/v2/all';

// Checkar ifall det finns error & vilken respons.
fetch(URL).then(
    function(response) {
        if(response.status ===  404) {
            throw 'Inget hittat';
        }
        else {
            return response.json();
        }
    }

// Hämtar data
).then(
    function(data) {
        // Tom array
        let country = [];
        // For loop för att få fram tre random flaggor med timezone & namn
        for(let i = 0; i < 3; i++) {
            let itsRandom = Math.floor(Math.random()* data.length);
            // Pushar in allt från constructor & prototype.
            country.push(
                // kallar datan från databasen, det som finns inom APIn URL.
                new CountryTime (data[itsRandom].name, data[itsRandom].timezones[0], data[itsRandom].flag)
            );
            
        }
        // Kallar på prototypen
        for (d of country) { 
            d.display();
        }
        console.log(country)

    }
    // Error
).catch(
    function(error) {
        if (error === 'Inget hittat') {
            console.log('Det hittades inte');
        }
    }
)

/*************** KONSTRUKTORN ***************/

/*************** CountryTime/Details etc börjar ***************/
function CountryTime(_namn, _tidsZon, _flaggaURL) {
    this.namn = _namn;
    this.tidsZon = _tidsZon;
    this.flaggaURL = _flaggaURL;

}



/*************** PROTOTYPE ***************/
CountryTime.prototype.display = function() {

    // Queryselectar allt från HTML
    // Istället för en vanlig for loop så kommer queryselector section hjälpa till med att skapa 3 kort pga jag kallar prototypen längre upp med for (d of country)
    const body = document.querySelector('body');
    const namn = document.querySelector('h1');
    const tid = document.querySelector('h3');
    // STYLING för tiden.
    tid.style.color = 'blue';
    tid.style.fontSize = '2rem'
    tid.style.fontFamily = 'Monospace';
    // IMG
    const flagga = document.querySelector('img');
    // MAIN
    const main = document.querySelector('main');
    // SECTION pga ett kort är inom 1 section
    const section = document.querySelector('section');


    // Appendar därefter body med main & main med section.
    body.appendChild(main);
    main.appendChild(section);

    // Tiden som passar in till varje land med timmar och minuter.
    let date = new Date();
    let mins = date.getMinutes();
    let UTC = date.getUTCHours();
    let zone = this.tidsZon.substr(5, 1);
    let number = Number(zone);
    let hour = UTC + number;
    let pairBothTime = `${hour}:${mins}`;
    this.tidsZon = pairBothTime;

    // InnerHtmls så att det ska dyka upp
    namn.innerHTML = this.namn;
    tid.innerHTML = this.tidsZon;
    flagga.src = this.flaggaURL;
}
/*************** CountryTime/Details etc slutar ***************/