(() => {
  const cards = [...document.querySelectorAll(".photo-card")];
  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const searchInput = document.getElementById("searchInput");
  const emptyState = document.getElementById("emptyState");
  const photoCount = document.getElementById("photoCount");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCategory = document.getElementById("lightboxCategory");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxDescription = document.getElementById("lightboxDescription");
  let currentFilter = "all";
  let visibleCards = [];
  let currentIndex = 0;

  const categoryNames = {
    stage: "STAGE · 舞台",
    live: "LIVESTREAM · 直播",
    daily: "DAILY · 日常",
    fanart: "FAN ART · 应援"
  };

  function updateGallery() {
    const query = searchInput.value.trim().toLowerCase();
    visibleCards = cards.filter(card => {
      const categoryMatch = currentFilter === "all" || card.dataset.category === currentFilter;
      const searchable = `${card.dataset.title} ${card.dataset.description} ${categoryNames[card.dataset.category]}`.toLowerCase();
      const searchMatch = !query || searchable.includes(query);
      const show = categoryMatch && searchMatch;
      card.hidden = !show;
      return show;
    });
    emptyState.hidden = visibleCards.length > 0;
    photoCount.textContent = String(visibleCards.length).padStart(2, "0");
  }

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter;
      filterButtons.forEach(item => item.classList.toggle("active", item === button));
      updateGallery();
    });
  });
  searchInput.addEventListener("input", updateGallery);

  function openLightbox(card) {
    visibleCards = cards.filter(item => !item.hidden);
    currentIndex = visibleCards.indexOf(card);
    showCurrentPhoto();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("lightboxClose").focus();
  }
  function showCurrentPhoto() {
    const card = visibleCards[currentIndex];
    if (!card) return;
    const image = card.querySelector("img");
    lightboxImage.src = card.dataset.image;
    lightboxImage.alt = image.alt;
    lightboxCategory.textContent = categoryNames[card.dataset.category];
    lightboxTitle.textContent = card.dataset.title;
    lightboxDescription.textContent = card.dataset.description;
  }
  function movePhoto(direction) {
    if (!visibleCards.length) return;
    currentIndex = (currentIndex + direction + visibleCards.length) % visibleCards.length;
    showCurrentPhoto();
  }
  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImage.src = "";
    document.body.style.overflow = "";
  }

  cards.forEach(card => card.querySelector(".photo-open").addEventListener("click", () => openLightbox(card)));
  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev").addEventListener("click", () => movePhoto(-1));
  document.getElementById("lightboxNext").addEventListener("click", () => movePhoto(1));
  lightbox.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener("keydown", event => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") movePhoto(-1);
    if (event.key === "ArrowRight") movePhoto(1);
  });

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));

  updateGallery();
})();
