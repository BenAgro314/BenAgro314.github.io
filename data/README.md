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
