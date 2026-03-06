(() => {
  const header = document.querySelector("[data-page-header]");
  if (!header) return;

  const titleElement = header.querySelector("[data-page-title]");
  const subtitleElement = header.querySelector("[data-page-subtitle]");

  if (titleElement) {
    titleElement.textContent = document.title || "Apostila FCC";
  }

  if (subtitleElement) {
    const customSubtitle = subtitleElement.dataset.subtitle;
    subtitleElement.textContent =
      customSubtitle ||
      "Material em formato revisional, voltado para prova de concursos da banca FCC.";
  }
})();