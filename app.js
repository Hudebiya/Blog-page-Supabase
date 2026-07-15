//                       BLOG  PAGE



window.onload = async function(){
  const { data, error } = await supabase
  .from('Post App Table')
  .select("*")
  console.log(data);
}
var cardBg 
function deletePost(){
  var card = event.target.parentNode.parentNode
  card.remove()
}
function editPost(){
    var card = event.target.parentNode.parentNode
    var title = card.querySelector("h4").innerText
    var description = card.querySelector("p").innerText
    document.getElementById("title").value = title
    document.getElementById("description").value = description
    card.remove()
  console.log(title, description);
}
function post(){
    var title = document.getElementById("title")
    var description = document.getElementById("description")
    console.log(title.value , description.value);
    var posts = document.getElementById("posts")
   if(title.value.trim() && description.value.trim()){
    posts.innerHTML += `
<div class="card mb-3">

    <div class="card-header text-center">
         Post
    </div>

    <div
        style="
            background-image:url(${cardBg});
            height:220px;
            background-size:cover;
            background-position:center;
        ">
    </div>

    <div class="card-body">

        <h4 class="fw-bold">
            ${title.value}
        </h4>

        <p class="text-muted">
            ${description.value}
        </p>

    </div>

    <div class="d-flex justify-content-center gap-2 mb-3">

        <button onclick="editPost()" class="btn btn-success">
            Edit
        </button>

        <button onclick="deletePost()" class="btn btn-danger">
            Delete
        </button>

    </div>

</div>
`

   }else{
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Title & description can't be empty!",
});
   }
    title.value = ""
    description.value = ""
}
function selectImg(src){
    cardBg = src
    console.log(src, event.target.classList);
    // event.target.className += " selectedImg"
    var bgImg = document.getElementsByClassName("bgImg")
    for(var i = 0; i<bgImg.length; i++){
        console.log(bgImg[i].className);
        bgImg[i].className = "bgImg"
    }
    event.target.classList.add("selectedImg")
}