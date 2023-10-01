document.addEventListener("DOMContentLoaded", () => {
    function clearSearchResults(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    function getDrinkInfo(data) {
        const content = document.querySelector(".content");
        clearSearchResults(content);
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
            item.innerText = drink.strDrink + ": " + drink.strInstructions;
            list.appendChild(item);
        });
    }
    const inputForm = document.querySelector(".search");
    inputForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = document.querySelector("input");
        const searchType = document.querySelector(".search-items");
        const option = searchType.value;

        // name option

        if (option === "name") {
            fetch(
                `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input.value}`
            )
                .then((res) => res.json())
                .then((data) => {
                    getDrinkInfo(data);
                });
        }

        // alcohol option
        else {
            fetch(
                `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input.value}`
            )
                .then((res) => res.json())
                .then((data) => {
                    data.drinks.forEach((drink) => {
                        fetch(
                            `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink.strDrink}`
                        )
                            .then((res) => res.json())
                            .then((data) => {
                                getDrinkInfo(data);
                            });
                    });
                });
        }
    });

    // random option
    const random = document.querySelector(".random");
    random.addEventListener("click", () => {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
            .then((res) => res.json())
            .then((data) => {
                getDrinkInfo(data);
            });
    });
});
