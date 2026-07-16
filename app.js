// BLOG PAGE 
// import { createClient } from '@supabase/supabase-js'

window.onload = async function () {

    const { data, error } = await client
        .from("blog-page")
        .select("*");


    if (error) {
        console.log(error);
        return;
    }


    console.log(data);


    var posts = document.getElementById("posts");


    data.forEach(function(item){

        posts.innerHTML += `

        <div class="col-12 col-md-6">

            <div class="blog-card">

                <div class="blog-image"
                style="background-image:url('${item.img_url}')">
                </div>


                <div class="blog-content">

                    <h5>${item.title}</h5>

                    <p>${item.description}</p>

                </div>

                <div class="blog-btns">
                    <button onclick="editPost()" 
                    class="btn btn-success">
                    Edit
                    </button>
                    <button onclick="deletePost()" 
                    class="btn btn-danger">
                    Delete
                    </button>

                </div>

            </div>

        </div>
        `;
    });
}

var cardBg = "assets/img-1.avif";
async function post() {

    var title = document.getElementById("title");
    var description = document.getElementById("description");
    var posts = document.getElementById("posts");

    if (title.value.trim() && description.value.trim()) {
     
        const { data, error } = await client
.from("blog-page")
.insert([
    {
        title: title.value,
        description: description.value,
        img_url: cardBg
    }
])
.select();

console.log(data);
console.log(error);

        posts.innerHTML += `

        <div class="col-md-6 col-lg-6">

            <div class="blog-card">

                <div class="blog-image"
                    style="background-image:url('${cardBg}')">
                </div>

                <div class="blog-content">

                    <h5>${title.value}</h5>

                    <p>${description.value}</p>

                </div>

                <div class="blog-btns">

                    <button onclick="editPost()" class="btn btn-success">
                        Edit
                    </button>

                    <button onclick="deletePost()" class="btn btn-danger">
                        Delete
                    </button>

                </div>

            </div>

        </div>

        `;

        title.value = "";
        description.value = "";

    } else {

        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Title & Description can't be empty!"
        });

    }

}

function selectImg(src) {

    cardBg = src;

    var bgImg = document.getElementsByClassName("bgImg");

    for (var i = 0; i < bgImg.length; i++) {

        bgImg[i].classList.remove("selectedImg");

    }

    event.target.classList.add("selectedImg");

}

function deletePost() {

    var card = event.target.closest(".col-md-6");

    card.remove();

}

function editPost() {

    var card = event.target.closest(".col-md-6");

    var title =
        card.querySelector("h5").innerText;

    var description =
        card.querySelector("p").innerText;

    document.getElementById("title").value = title;

    document.getElementById("description").value = description;

    card.remove();

}

function showForm() {

    document.getElementById("formDiv")
        .scrollIntoView({
            behavior: "smooth"
        });

    document.getElementById("title").focus();

}