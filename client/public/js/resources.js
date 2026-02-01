console.log("Resource JS loaded!");

fetch("./json/resources.json")
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector("#resources");

    data.categories.forEach(category => {
      const section = document.createElement("section");
      section.classList.add("resource-category");

      const cards = category.resources.map(resource => `
        <div class="resource-card ${category.id}">
            <img src="${resource.imageURL}" alt="${resource.name}">
            <div class="resource-card-content">
                <h3>${resource.name}</h3>
                <p>${resource.description}</p>
                <a href="${resource.url}">Learn More </a>
            </div>
        </div>`
      ).join("");

      section.innerHTML =`
      <h2>${category.title}</h2>
      <div class="resource-grid">
        ${cards}
      </div>`;

      container.appendChild(section);
    });
  })
  .catch(error => console.error("Error loading resources:", error));
