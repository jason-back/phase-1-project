document.addEventListener("DOMContentLoaded", () => {
    function searchByName() {
        const inputForm = document.querySelector(".search");
        inputForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const input = document.querySelector("input");
            const searchType = document.querySelector(".search-items");
            const option = searchType.value;
            if (option === "name") {
                fetch(
                    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input.value}`
                )
                    .then((res) => res.json())
                    .then((data) => {
                        const content = document.querySelector(".content");
                        data.drinks.forEach((drink) => {
                            console.log(drink);
                            const image = document.createElement("img");
                            image.src = `${drink.strDrinkThumb}`;
                            image.classList.add(".images");
                            content.append(image);
                            const list = document.createElement("ul");
                            const item = document.createElement("div");
                            content.appendChild(list);
                            item.className = "item";
                            item.innerText =
                                drink.strDrink + ": " + drink.strInstructions;
                            list.appendChild(item);
                        });
                    });
            } else {
                fetch(
                    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input.value}`
                )
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        const content = document.querySelector(".content");
                        data.drinks.forEach((drink) => {
                            console.log(drink);
                            const list = document.createElement("ul");
                            const item = document.createElement("div");
                            content.appendChild(list);
                            item.className = "item";
                            item.innerText =
                                drink.strDrink + ": " + drink.strInstructions;
                            list.appendChild(item);
                        });
                    });
            }
        });
    }
    searchByName();
    const random = document.querySelector(".random");
    random.addEventListener("click", () => {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
            .then((res) => res.json())
            .then((data) => {
                const content = document.querySelector(".content");
                data.drinks.forEach((drink) => {
                    console.log(drink);
                    const list = document.createElement("ul");
                    const item = document.createElement("div");
                    content.appendChild(list);
                    item.className = "item";
                    item.innerText =
                        drink.strDrink + ": " + drink.strInstructions;
                    list.appendChild(item);
                });
            });
    });
});
