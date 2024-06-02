document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const preview = document.getElementById("preview");
        preview.src = e.target.result;
        preview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });

document
  .getElementById("uploadForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // Here you can handle the form submission, e.g., sending the file to a server
    alert("Form submitted!");
  });
