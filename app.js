// BLOG PAGE 
// import { createClient } from '@supabase/supabase-js'

var cardBg = "assets/img-1.avif";

let edited = false;
let editPostId = null;

window.onload = async function () {
    const { data, error } = await client.auth.getSession();
    if (error) {
        console.log(error);
        return;
    }

    if (!data.session) {
        window.location.href = "index.html";
        return;
    }
    const { data: { user } } = await client.auth.getUser();
    console.log("Logged User:", user);

    document.getElementById("displayData").innerHTML = user.email;
    loadPosts();
}

async function loadPosts() {
    const { data: { user } } = await client.auth.getUser();
       console.log("Current User:", user.id);
    try {
        const { data, error } = await client
            .from("blog-page")
            .select("*")
            .order("id", { ascending: false });
        if (error) {
            console.log(error);
            return;
        }

        var posts = document.getElementById("posts");
        posts.innerHTML = "";
        data.forEach(function (item) {
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
                        <button
                        onclick="editPost(event,
                        ${item.id},
                        '${item.title}',
                        '${item.description}',
                        '${item.img_url}')"
                        class="btn btn-success">
                        Edit
                        </button>

                        <button
                        onclick="deletePost(event,${item.id})"
                        class="btn btn-danger">
                        Delete
                        </button>
                    </div>
                </div>
            </div>
            `;
        });
    }

    catch (error) {
        console.log(error);
    }
}

async function post() {
    var title = document.getElementById("title");
    var description = document.getElementById("description");

    if (title.value.trim() && description.value.trim()) {
        const { data: { user }, error } = await client.auth.getUser();

        if (error) {
            console.log(error);
            return;
        }

        console.log("Current User:", user);
        
        if (edited) {
            const { data, error } = await client
                .from("blog-page")
                .update({
                    title: title.value,
                    description: description.value,
                    img_url: cardBg
                })
                .eq("id", editPostId)
                .select();
            console.log("Update Data:", data);
            console.log("Update Error:", error);


            edited = false;
            editPostId = null;
            document.getElementById("postButton").innerHTML = "Post";
        }

        else {
            const { data, error } = await client
                .from("blog-page")
                .insert([
                    {
                        title: title.value,
                        description: description.value,
                        img_url: cardBg,
                        user_id: user.id
                    }
                ])
                .select();
            console.log(data);
            console.log(error);
        }

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        cardBg = "assets/img-1.avif";
        loadPosts();
    }

    else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Title & Description can't be empty!"
        });
    }
}

function editPost(event, id, title, description, img_url) {
    edited = true;
    editPostId = id;
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    cardBg = img_url;
    document.getElementById("postButton").innerHTML = "Update Post";
    var images = document.getElementsByClassName("bgImg");
    for (var i = 0; i < images.length; i++) {
        images[i].classList.remove("selectedImg");
        if (images[i].getAttribute("src") == img_url) {
            images[i].classList.add("selectedImg");
        }
    }
    showForm();
}

async function deletePost(event, id) {
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to recover this post!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Delete it!"
    });
    if (!result.isConfirmed) {
        return;
    }
    try {
        const { error } = await client
            .from("blog-page")
            .delete()
            .eq("id", id)
            .select();
            console.log("Delete Data:", data);
           
        if (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Delete Failed",
                text: error.message
            });
            return;
    
        }
        await loadPosts();
        Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Post has been deleted successfully."
        });
    }
    catch (error) {
        console.log(error);
    }
}

function selectImg(src) {
    cardBg = src;
    var images = document.getElementsByClassName("bgImg");

    for (var i = 0; i < images.length; i++) {
        images[i].classList.remove("selectedImg");
    }
    event.target.classList.add("selectedImg");
}

async function logout() {
    const { error } = await client.auth.signOut();

    if (error) {
        console.log(error);
        return;
    }
    window.location.href = "index.html";
}

function showForm() {
    document.getElementById("formDiv").scrollIntoView({
        behavior: "smooth"
    });
    document.getElementById("title").focus();
}