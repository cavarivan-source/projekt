const FALLBACK_IMAGE = "https://placehold.co/1600x1000";
const MEMBERSHIP_URL = `${process.env.PUBLIC_URL || ""}/clanstvoikontakt`;

const pickBestImageUrl = (media) => {
  if (!media) return FALLBACK_IMAGE;

  const sizes = media?.media_details?.sizes || {};
  const preferredSizes = ["2048x2048", "1536x1536", "large", "medium_large", "medium", "thumbnail"];

  for (const size of preferredSizes) {
    if (sizes[size]?.source_url) {
      return sizes[size].source_url;
    }
  }

  return media?.source_url || FALLBACK_IMAGE;
};

export const buildFallbackMarkup = (featuredMedia, message = "Tablica nije dostupna.") => {
  const fallbackImage = pickBestImageUrl(featuredMedia);

  return `
    <div class="wp-block-columns home-primary-columns">
      <div class="wp-block-column home-main-column">
        <figure class="wp-block-image home-main-figure">
          <img src="${fallbackImage}" alt="Pocetna slika" class="home-main-image" />
        </figure>
      </div>
      <div class="wp-block-column home-side-column">
        <p>${message}</p>
      </div>
    </div>
  `;
};

const normalizeMedia = (doc) => {
  doc.querySelectorAll("img, iframe").forEach((element) => {
    element.setAttribute("loading", "lazy");
    element.removeAttribute("style");
  });

  doc.querySelectorAll("iframe").forEach((iframe) => {
    iframe.classList.add("standings-iframe");
  });
};

const markMembershipImage = (doc) => {
  const topLevelImage = [...doc.querySelectorAll("figure")].find((figure) => !figure.closest(".wp-block-columns"));

  if (!topLevelImage) {
    return;
  }

  topLevelImage.classList.add("home-top-figure");
  topLevelImage.querySelector("img")?.classList.add("home-top-image");

  const link = doc.createElement("a");
  link.href = MEMBERSHIP_URL;
  link.className = "home-membership-link";
  link.setAttribute("aria-label", "Otvori stranicu Clanstvo i kontakt");

  topLevelImage.parentNode?.insertBefore(link, topLevelImage);
  link.appendChild(topLevelImage);
};

const markPrimaryColumns = (doc) => {
  const primaryColumns = doc.querySelector(".wp-block-columns");

  if (!primaryColumns) {
    return;
  }

  primaryColumns.classList.add("home-primary-columns");

  const [mainColumn, sideColumn] = primaryColumns.querySelectorAll(":scope > .wp-block-column");

  if (mainColumn) {
    mainColumn.classList.add("home-main-column");
    mainColumn.querySelector("figure")?.classList.add("home-main-figure");
    mainColumn.querySelector("img")?.classList.add("home-main-image");
  }

  if (sideColumn) {
    sideColumn.classList.add("home-side-column");
  }
};

const markLastMapBlock = (doc) => {
  const iframes = [...doc.querySelectorAll("iframe")];

  if (iframes.length === 0) {
    return;
  }

  const lastIframe = iframes[iframes.length - 1];
  const sideColumn = lastIframe.closest(".home-side-column");
  let mapBlock = lastIframe.closest(
    ".wp-block-embed, .wp-block-group, .wp-block-cover, .wp-block-media-text, figure"
  );

  if (sideColumn) {
    let directChild = lastIframe;

    while (directChild.parentElement && directChild.parentElement !== sideColumn) {
      directChild = directChild.parentElement;
    }

    if (directChild.parentElement === sideColumn) {
      mapBlock = directChild;
    }
  }

  if (!mapBlock) {
    mapBlock = lastIframe.parentElement || lastIframe;
  }

  mapBlock.classList.add("home-last-map-block");
  lastIframe.classList.add("home-last-map-iframe");

  if (sideColumn && mapBlock.parentElement) {
    doc.body.appendChild(mapBlock);
  }
};

export const enhanceHomeMarkup = (rendered, featuredMedia) => {
  if (!rendered?.trim()) {
    return buildFallbackMarkup(featuredMedia);
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(rendered || "", "text/html");

  normalizeMedia(doc);
  markMembershipImage(doc);
  markPrimaryColumns(doc);
  markLastMapBlock(doc);

  if (!doc.querySelector("img") && featuredMedia) {
    doc.body.insertAdjacentHTML("afterbegin", buildFallbackMarkup(featuredMedia));
  }

  return doc.body.innerHTML;
};
