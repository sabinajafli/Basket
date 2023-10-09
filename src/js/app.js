
if(localStorage.getItem("basket") == null) {
    localStorage.setItem("basket", JSON.stringify([]));
    document.querySelector("#count").innerHTML = 0;
} else {
    let basket = JSON.parse(localStorage.getItem("basket"));
    document.querySelector("#count").innerHTML = basket.length;
}


fetch("src/js/data.json")
.then(response => response.json())
.then(data => {
    let html = '';
    data.products.forEach(item => {
        html += 
        `
            <div class="product">
                <img src="${item.image}" class="product-img" alt="">
                <div class="product-info">
                    <div class="info">
                        <a href="" class="sort">${item.category}</a>
                    </div>
                    <h2>
                        <a href="">${item.name}</a>
                    </h2>
                    <div class="span">
                        <span class="font-small">By <a href="">${item.manufacturer}</a></span>
                    </div>
                    <div class="price-info">
                        <div class="product-price">
                            <span>$${item.price}</span>
                            <del class="old-price">$${item.oldPrice}</del>
                        </div>
                        <div class="add-cart">
                            <button class="add" href="" data-id = "${item.id}" data-price = "${item.price}"
                            data-name = "${item.name}"
                            data-img = "${item.image}">
                            <img src="./src/image/icon-cart.svg" alt="">
                            Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
    document.querySelector(".container").innerHTML = html;
    
    let addButton = document.querySelectorAll(".add");
    addButton.forEach(btn => {
        btn.addEventListener("click", function() {
            if(localStorage.getItem("basket") == null) {
                localStorage.setItem("basket", JSON.stringify([]));
            }
            
            let basket = JSON.parse(localStorage.getItem("basket"));

            let data_id = btn.getAttribute("data-id");
            let data_price = Number(btn.getAttribute("data-price")).toFixed(2);
            let data_name = btn.getAttribute("data-name");
            let data_img = btn.getAttribute("data-img");

            let element = basket.find(a => {
                return a.id == btn.getAttribute("data-id")
            })

            if( element === undefined){
                 let item = {
                    id: data_id,
                    count: 1,
                    price: data_price,
                    name: data_name,
                    img: data_img
            }
            basket.push(item)
            }else {
                element.count++;
            }

            localStorage.setItem("basket", JSON.stringify(basket));
            document.querySelector("#count").innerHTML = basket.length;
            displayCartItems(basket);
        })
    });
})

