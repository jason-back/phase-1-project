document.addEventListener("DOMContentLoaded", () => {
    function searchByName() {
        fetch(
            "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"
        )
            .then((res) => res.json())
            .then((data) => {
                const list = document.createElement("ul");
                const content = document.querySelector(".content");
                content.appendChild(list);
                data.drinks.forEach((drink) => {
                    console.log(drink);
                    const item = document.createElement("li");
                    item.innerText = drink.strDrink;
                    list.appendChild(item);
                });
            });
    }
    searchByName();
});
