# Climbing logbook data

The logbook page reads `climbing-logbook.json`. To add a send:

1. Add an entry near the top of the `entries` array. The page sorts entries by date, so the file order is not important.
2. Update the top-level `updated` date.
3. Preview the site through a local web server; browsers do not allow the page to fetch JSON when opened directly from the filesystem.

Each entry uses this shape:

```json
{
  "date": "2026-09-07",
  "name": "The Pocket Problem",
  "grade": "V11",
  "gradeOpinion": "",
  "style": "send",
  "area": "PCT Boulders",
  "region": "Tahoe",
  "rating": 0,
  "notes": ""
}
```

Use `null` for an unknown date. `gradeOpinion` can be `"soft"`, `"hard"`, or empty. `style` can be `"flash"`, `"onsight"`, `"redpoint"`, or `"send"` when the style was not recorded. Ratings run from 0 (not recorded) to 5.

## Location sources (September 28, 2026)

Only locations supported by route listings, guidebook material, or ascent reports were added. Grades, ascent dates, ratings, and notes remain the climber’s own.

| Entry | Area | Region | Source |
| --- | --- | --- | --- |
| Rolling Thunder | Rolling Thunder Boulder | Tahoe | [Location reference](https://www.mountainproject.com/area/118112304/rolling-thunder) |
| Dead Ant | Tahoe Mountain | Tahoe | [Location reference](https://www.laketahoebouldering.com/guide/uncategorized/june-2015-bouldering-update/) |
| The Beatdown | The Beavers | Tahoe | [Location reference](https://www.mountainproject.com/area/120512347/beatdown-boulder) |
| Balls of Steel stand | Erratica | Tahoe | [Location reference](https://jessebonin.blogspot.com/2010/04/) |
| Happy Days | Happy Isles | Yosemite Valley | [Location reference](https://www.8a.nu/crags/bouldering/united-states/happy-isles/routes) |
| Affogato | Highway 140 / Knobby Wall | Yosemite Valley | [Location reference](https://www.yosemitevalleybouldering.com/_files/ugd/bb895b_f1c16561deda4c099224892801c0001c.pdf) |
| Stick It | Camp 4 | Yosemite Valley | [Location reference](https://climbing-history.org/crag/2600) |
| Across the Tracks | Highway 140 / Knobby Wall | Yosemite Valley | [Location reference](https://www.yosemitevalleybouldering.com/_files/ugd/bb895b_f1c16561deda4c099224892801c0001c.pdf) |
| Bel Sorriso Stand | Highway 140 | Yosemite Valley | [Location reference](https://climbing-history.org/climb/5258/bel-sorriso) |
| Shadow Warrior | Candyland | Yosemite Valley | [Location reference](https://betabase.blogspot.com/2006/11/11-27-06-candyland.html) |
| Digital Black | Central Joshua Tree | Joshua Tree | [Location reference](https://www.madboulder.org/problems/joshua-tree/digital-black-v10) |
| Street Car Named Desire | Barker Dam | Joshua Tree | [Location reference](https://www.nps.gov/thingstodo/bouldering-near-barker-dam.htm) |

The guidebook preview identifies the Knobby Wall sector on Highway 140 (printed pages 446–447). The stand-start entries for Balls of Steel and Bel Sorriso use the location of their parent problems; those sources do not separately list each start variation.

Sub-locations remain unverified for The Gremlin, The Gremlin Left, Sideswiped, Tieranny Stand, and Snug As A Bug; their existing broad locations were retained.
