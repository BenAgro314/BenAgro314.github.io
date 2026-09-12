(() => {
  const page = document.querySelector(".collage-page");
  if (!page) return;

  const sections = [...page.querySelectorAll(":scope > .collage-set")];
  if (!sections.length) return;

  const grids = sections.flatMap((section) =>
    [...section.querySelectorAll(".photo-grid")].map((grid) => ({
      grid,
      photos: [...grid.querySelectorAll(":scope > .photo")]
    }))
  );
  const ranges = sections.map((section) => {
    const label = section.querySelector(".collage-set__header > span");
    return { label, original: label?.textContent };
  });
  let newestFirst = true;
  const controls = document.createElement("div");
  controls.className = "collage-sort";
  const button = document.createElement("button");
  button.type = "button";
  const updateLabel = () => {
    button.textContent = newestFirst ? "Newest first ↕" : "Oldest first ↕";
    button.title = newestFirst ? "Show oldest first" : "Show newest first";
    button.setAttribute("aria-label", `${newestFirst ? "Newest" : "Oldest"} first. ${button.title}.`);
  };
  controls.append(button);
  sections[0].before(controls);

  const renderOrder = () => {
    const ordered = (items) => newestFirst ? [...items].reverse() : items;
    let previous = controls;
    ordered(sections).forEach((section) => {
      previous.after(section);
      previous = section;
    });
    grids.forEach(({ grid, photos }) => {
      grid.append(...ordered(photos));
    });
    ranges.forEach(({ label, original }) => {
      if (label) label.textContent = newestFirst ? original.split("—").reverse().join("—") : original;
    });
    updateLabel();
  };

  button.addEventListener("click", () => {
    newestFirst = !newestFirst;
    renderOrder();
  });
  renderOrder();
})();
