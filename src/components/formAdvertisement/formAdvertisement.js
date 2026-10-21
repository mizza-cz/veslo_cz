document.querySelectorAll(".formAdvertisement-upload").forEach((upload) => {
  const input = upload.querySelector(".formAdvertisement-upload__input");
  const grid = upload.querySelector(".formAdvertisement-upload__grid");
  const addButton = upload.querySelector(".formAdvertisement-upload__add");
  const count = upload.querySelector(".formAdvertisement-upload__count");

  if (!input || !grid || !addButton) return;

  let photos = [];

  function syncInput() {
    const dataTransfer = new DataTransfer();

    photos.forEach((photo) => {
      dataTransfer.items.add(photo.file);
    });

    input.files = dataTransfer.files;
  }

  function renderPhotos() {
    grid.querySelectorAll(".formAdvertisement-upload__item").forEach((item) => {
      item.remove();
    });

    photos.forEach((photo, index) => {
      const item = document.createElement("div");
      item.className = "formAdvertisement-upload__item";

      if (index === 0) {
        item.classList.add("is-main");
      }

      const image = document.createElement("img");
      image.className = "formAdvertisement-upload__image";
      image.src = photo.url;
      image.alt = photo.file.name;

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.className = "formAdvertisement-upload__remove";
      removeButton.textContent = "×";
      removeButton.setAttribute("aria-label", "Odebrat fotografii");

      removeButton.addEventListener("click", () => {
        URL.revokeObjectURL(photo.url);
        photos.splice(index, 1);

        syncInput();
        renderPhotos();
      });

      const mainButton = document.createElement("button");
      mainButton.type = "button";
      mainButton.className = "formAdvertisement-upload__main";

      if (index === 0) {
        mainButton.textContent = "Hlavní fotka";
        mainButton.classList.add("is-active");
        mainButton.disabled = true;
      } else {
        mainButton.textContent = "Nastavit jako hlavní";

        mainButton.addEventListener("click", () => {
          const selectedPhoto = photos.splice(index, 1)[0];

          photos.unshift(selectedPhoto);

          syncInput();
          renderPhotos();
        });
      }

      item.appendChild(image);
      item.appendChild(removeButton);
      item.appendChild(mainButton);

      grid.insertBefore(item, addButton);
    });

    count.textContent = `Nahráno ${photos.length} fotografií`;
  }

  input.addEventListener("change", () => {
    const selectedFiles = Array.from(input.files);

    selectedFiles.forEach((file) => {
      const exists = photos.some((photo) => {
        return (
          photo.file.name === file.name &&
          photo.file.size === file.size &&
          photo.file.lastModified === file.lastModified
        );
      });

      if (exists) return;

      photos.push({
        file: file,
        url: URL.createObjectURL(file),
      });
    });

    syncInput();
    renderPhotos();
  });

  renderPhotos();

  window.addEventListener("pagehide", () => {
    photos.forEach((photo) => {
      URL.revokeObjectURL(photo.url);
    });
  });
});
