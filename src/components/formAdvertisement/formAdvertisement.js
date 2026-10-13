document.querySelectorAll(".formAdvertisement-upload").forEach((upload) => {
  const fileInput = upload.querySelector(".formAdvertisement-upload__input");
  const uploadText = upload.querySelector(".formAdvertisement-upload__text");
  const previewImage = upload.querySelector(".formAdvertisement-upload__image");
  const plusIcon = upload.querySelector(".formAdvertisement-upload__plus");
  const removeButton = upload.querySelector(
    ".formAdvertisement-upload__remove"
  );

  if (!fileInput) return;

  fileInput.addEventListener("change", function () {
    if (!fileInput.files.length) return;

    const selectedFile = fileInput.files[0];

    if (!selectedFile.type.startsWith("image/")) {
      fileInput.value = "";
      return;
    }

    uploadText.textContent = selectedFile.name;

    const fileReader = new FileReader();

    fileReader.onload = function (event) {
      previewImage.src = event.target.result;
      previewImage.hidden = false;
      plusIcon.hidden = true;
      removeButton.hidden = false;
    };

    fileReader.readAsDataURL(selectedFile);
  });

  removeButton.addEventListener("click", function () {
    fileInput.value = "";

    previewImage.removeAttribute("src");
    previewImage.hidden = true;

    plusIcon.hidden = false;
    removeButton.hidden = true;

    uploadText.textContent = "Vybrat fotografii";
  });
});
