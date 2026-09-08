(() => {
  const dataUrl = "../data/climbing-logbook.json";
  const list = document.querySelector("#logbook-list");
  const summary = document.querySelector("#logbook-summary");
  const status = document.querySelector("#logbook-status");
  const updated = document.querySelector("#logbook-updated");
  const search = document.querySelector("#logbook-search");
  const grade = document.querySelector("#logbook-grade");
  const location = document.querySelector("#logbook-location");
  const reset = document.querySelector("#logbook-reset");

  const gradeNumber = (value) => Number.parseInt(value.replace(/\D/g, ""), 10) || 0;
  const pluralize = (count, singular, plural = `${singular}s`) => `${count} ${count === 1 ? singular : plural}`;
  const clean = (value) => String(value || "").trim();
  const dateValue = (entry) => entry.date || "0000-00-00";

  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const formatDate = (value, includeYear = false) => {
    if (!value) return "Unknown";
    const date = new Date(`${value}T00:00:00Z`);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      ...(includeYear ? { year: "numeric" } : {}),
      timeZone: "UTC"
    }).format(date);
  };

  const option = (value, label) => {
    const node = document.createElement("option");
    node.value = value;
    node.textContent = label;
    return node;
  };

  const renderEntry = (entry) => {
    const row = element("article", "log-entry");
    const date = entry.date ? element("time", "log-entry__date", formatDate(entry.date)) : element("span", "log-entry__date", "Unknown");
    if (entry.date) date.dateTime = entry.date;

    const opinion = entry.gradeOpinion === "soft" ? " ↓" : entry.gradeOpinion === "hard" ? " ↑" : "";
    const gradeNode = element("span", "log-entry__grade", `${entry.grade}${opinion}`);
    if (entry.gradeOpinion) gradeNode.title = `Felt ${entry.gradeOpinion}`;

    const body = element("div", "log-entry__body");
    body.append(element("span", "log-entry__name", entry.name));
    const place = [clean(entry.area), clean(entry.region)].filter(Boolean).join(" · ");
    body.append(element("span", "log-entry__place", place));
    if (clean(entry.notes)) body.append(element("p", "log-entry__notes", entry.notes));

    const meta = element("div", "log-entry__meta");
    meta.append(element("span", "log-entry__style", entry.style || "send"));
    if (entry.rating > 0) {
      const rating = element("span", "log-entry__rating", `${entry.rating}/5`);
      rating.title = `${entry.rating} out of 5 stars`;
      meta.append(rating);
    }

    row.append(date, gradeNode, body, meta);
    return row;
  };

  const render = (entries) => {
    const term = search.value.trim().toLocaleLowerCase();
    const filtered = entries
      .filter((entry) => !grade.value || entry.grade === grade.value)
      .filter((entry) => !location.value || entry.region === location.value)
      .filter((entry) => {
        if (!term) return true;
        return [entry.name, entry.area, entry.region, entry.notes, entry.grade]
          .some((value) => clean(value).toLocaleLowerCase().includes(term));
      })
      .sort((a, b) => dateValue(b).localeCompare(dateValue(a)) || gradeNumber(b.grade) - gradeNumber(a.grade) || a.name.localeCompare(b.name));

    status.textContent = filtered.length === entries.length
      ? `${pluralize(entries.length, "send")} shown`
      : `${pluralize(filtered.length, "send")} shown of ${entries.length}`;
    list.replaceChildren();

    if (!filtered.length) {
      list.append(element("p", "logbook-empty", "No sends match those filters."));
      return;
    }

    const groups = new Map();
    filtered.forEach((entry) => {
      const year = entry.date ? entry.date.slice(0, 4) : "Date unknown";
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year).push(entry);
    });

    groups.forEach((yearEntries, year) => {
      const section = element("section", "log-year");
      const heading = element("h2", "log-year__heading", year);
      heading.append(element("span", "", pluralize(yearEntries.length, "send")));
      section.append(heading);
      yearEntries.forEach((entry) => section.append(renderEntry(entry)));
      list.append(section);
    });
  };

  fetch(dataUrl)
    .then((response) => {
      if (!response.ok) throw new Error(`Could not load ${dataUrl}`);
      return response.json();
    })
    .then((data) => {
      const entries = data.entries;
      const grades = [...new Set(entries.map((entry) => entry.grade))].sort((a, b) => gradeNumber(b) - gradeNumber(a));
      const locations = [...new Set(entries.map((entry) => clean(entry.region)).filter(Boolean))].sort();
      grades.forEach((value) => grade.append(option(value, value)));
      locations.forEach((value) => location.append(option(value, value)));

      const hardest = grades[0];
      const dated = entries.filter((entry) => entry.date).map((entry) => entry.date);
      const firstYear = dated.sort()[0].slice(0, 4);
      const lastYear = dated.sort().at(-1).slice(0, 4);
      summary.textContent = `${pluralize(entries.length, "send")} · ${hardest} max · ${firstYear}—${lastYear} · ${pluralize(locations.length, "location")}`;

      if (data.updated) {
        updated.dateTime = data.updated;
        updated.textContent = formatDate(data.updated, true);
      }

      [search, grade, location].forEach((control) => control.addEventListener("input", () => render(entries)));
      reset.addEventListener("click", () => {
        search.value = "";
        grade.value = "";
        location.value = "";
        render(entries);
        search.focus();
      });

      render(entries);
    })
    .catch((error) => {
      summary.textContent = "Logbook unavailable";
      status.textContent = error.message;
      list.append(element("p", "logbook-empty", "The logbook data could not be loaded."));
    });
})();
