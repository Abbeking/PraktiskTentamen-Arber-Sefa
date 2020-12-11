/* Skriv din kod här */



// URL
const URL = 'https://restcountries.eu/rest/v2/all';


fetch(URL).then(
    function(response) {
        if(response.status ===  404) {
            throw 'Inget hittat';
        }
        else {
            return response.json();
        }
    }


).then(
    function(data) {
        // Tom array
        let country = [];
        // For loop för att få fram tre random flaggor med timezone & namn
        for(let i = 0; i < 3; i++) {
            let rand = Math.floor(Math.random()* data.length);
            // Pushar in allt från constructor & prototype.
            country.push(
                new CountryTime (data[rand].name, data[rand].timezones[0], data[rand].flag)
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


/*************** CountryTime/Details etc börjar ***************/
function CountryTime(_namn, _tidsZon, _flaggaURL) {
    this.namn = _namn;
    this.tidsZon = _tidsZon;
    this.flaggaURL = _flaggaURL;

}
// Prototype
CountryTime.prototype.display = function() {

    
    const body = document.querySelector('body');
    const namn = document.querySelector('h1');
    const tidsZon = document.querySelector('h3');
    const flaggaURL = document.querySelector('img');
    const main = document.querySelector('main');
    const section = document.querySelector('section');
    // InnerHtmls
    namn.innerHTML = this.namn;
    tidsZon.innerHTML = this.tidsZon;
    flaggaURL.src = this.flaggaURL;
    // Appending
    body.appendChild(main);
    main.appendChild(section);

    let date = new Date(tidsZon);
    date.innerHTML = this.date;

    let UTC = date.getUTCHours(tidsZon);
    UTC.innerHTML = this.UTC;
    
}
/*************** CountryTime/Details etc slutar ***************/
