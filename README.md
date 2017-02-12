
# Breweries en route

A tool that suggest the closest brewery to a given address

## Assignment (in Dutch)

We houden wel van een biertje op zijn tijd. We hebben een bar in ons kantoor en brouwen zelfs af en toe ons eigen bier. Natuurlijk kopen we ook wel eens een biertje. Soms een kratje Hertog Jan, maar liever nog een fustje speciaalbier. In Nederland zijn steeds meer microbrouwerijen. Als we bij een klant op bezoek gaan wil het wel eens voorkomen dat we op de terugweg even een fustje oppikken.

In deze opdracht maak je een tool die ons hiermee helpt: we willen een postcode ingeven en de tool vertelt ons dan welke microbrouwerij het dichtst bij is. Is dat alles? Ja, op zich wel...

## Solution

No interface, just a command line tool. 

Uses ES2015 syntax, so a recent version of Node.js is required.

Uses Google Maps API to get driving duration to brewery.
To avoid making too many request to Google the breweries are limited to the
closest three with regards to geographic distance. *Potential improvement:*
also limit the amount of breweries to calculate distance on by querying the
database with a bounding box centered around the input address.

Assumption: it is okay if the brewery is a bit out of the way, i.e. the brewery
is in the opposite direction from the office. *Potential improvement:*
combine distance from input address to brewery and from brewery to office;
also use Google Maps route with office as destination and brewery as waypoint. 

**Note:** create a `.env` file and store your Google Maps API key here.

## How to run

Install all dependencies
```bash
yarn
```

Import breweries from JSON file to the database

```bash
node import.js
```

Run script

```bash
node script.js "1053ZJ"
```

### APIs to enable
- Google Maps Geocoding API
- Google Maps Directions API