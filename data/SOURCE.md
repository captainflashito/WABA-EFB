# Airport database

- Source: OurAirports open-data exports
- Source URL: https://ourairports.com/data/
- License: Public Domain
- Generated: 2026-09-04
- Records selected: 10,055

Selection includes every open large, medium and small land airport in the source that has valid coordinates and an explicit ICAO code. GPS identifiers, national identifiers and internal OurAirports identifiers are excluded. The source currently contains 10,055 eligible ICAO-coded land airports.

The compact airport records also retain the longest reported lighted runway and
the longest reported paved lighted runway. Night suitability is used as a
conservative simulation filter. It is not a substitute for current runway-lighting
status, operating hours, PPR, AIP or NOTAM information.

Customs, immigration and curfew fields default to `unknown`. They must be enriched from current national AIP, NOTAM and competent-authority sources before being presented as verified operational information.

## World map

- Source: Natural Earth, 1:110m Land
- Source URL: https://www.naturalearthdata.com/downloads/110m-physical-vectors/
- License: Public Domain
- Local file: `world-land.geojson`

## Operator identity catalogue

- Source: Wikidata structured data
- Source URL: https://www.wikidata.org/
- License: CC0 1.0
- Local file: `operator-catalog.js`
- Records selected: 600 ICAO three-letter operator identities

The catalogue is used only to recognise an operator identity, country and broad
network family. It does not contain or reproduce real flight schedules, flight
numbers or dated rotations. The simulator creates original rotations from the
entered base, aircraft capabilities, duty window and a stable pool of plausible
airports. Hand-curated profiles in `operator-profiles.js` add representative
hubs, fleets and airport pools for selected passenger and cargo operators.

The ICAO Doc 8585 dataset remains the authoritative source for current airline
and telephony designators. It is not redistributed in this project.
