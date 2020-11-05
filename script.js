fetch("http://umarkx.com/WP/wp-json/wp/v2/bike?_embed")
    .then(initial => initial.json())
    .then(callback);

function callback(data) {
    //we now have the JSON
    console.log(data);

    //loop through data
    data.forEach(showProducts)
}

function showProducts(bike) {
    // clone template
    const template = document.querySelector("#myTemplate").content;
    const clone = template.cloneNode(true);

    clone.querySelector("img").setAttribute("src", bike.images.guid);
    clone.querySelector(".title").textContent = bike.title.rendered;
    clone.querySelector(".priceFrom").textContent = "$" + bike.price_from;

    if (bike.price_to.length !== 0) {
        clone.querySelector(".priceTo").textContent = "- $" + bike.price_to;
    } else {
        clone.querySelector(".priceTo").textContent = bike.price_to;
    }

    if (bike.stock == 1) {
        clone.querySelector(".stock").textContent = "Yes";
    } else {
        clone.querySelector(".stock").textContent = "No"
    }

    clone.querySelector(".colours1").style.backgroundColor = bike.color1;
    clone.querySelector(".colours2").style.backgroundColor = bike.color2;
    clone.querySelector(".colours3").style.backgroundColor = bike.color3;
    clone.querySelector(".colours4").style.backgroundColor = bike.color4;

    clone.querySelector(".brand").textContent = bike._embedded["wp:term"][0][0].name;


    //appending
    document.querySelector(".stockGrid").appendChild(clone);
}
