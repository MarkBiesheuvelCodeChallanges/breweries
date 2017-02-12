
# Breweries en route

A tool that suggests a brewery that is en route when driving from point A to point B

## Assignment (in Dutch)

We houden wel van een biertje op zijn tijd. We hebben een bar in ons kantoor en brouwen zelfs af en toe ons eigen bier. Natuurlijk kopen we ook wel eens een biertje. Soms een kratje Hertog Jan, maar liever nog een fustje speciaalbier. In Nederland zijn steeds meer microbrouwerijen. Als we bij een klant op bezoek gaan wil het wel eens voorkomen dat we op de terugweg even een fustje oppikken.

In deze opdracht maak je een tool die ons hiermee helpt: we willen een postcode ingeven en de tool vertelt ons dan welke microbrouwerij het dichtst bij is. Is dat alles? Ja, op zich wel...

## Solution

Note: create a `.env` file and store your Google Maps API key here

## How to run

Install all dependencies
```bash
yarn
```

Import breweries from JSON file to the database

```bash
node script.js "1053ZJ"
```

Run script

```bash
node script.js "1053ZJ"
```

### APIs to enable
- Google Maps Geocoding API
- Google Maps Directions API