function showSignup() {
    document.getElementById("loginForm").classList.add("d-none");
    document.getElementById("signupForm").classList.remove("d-none");

    let signUpBtn = document.querySelector("#signup")

    signUpBtn.addEventListener("click", async (event) => {
        event.preventDefault()
        let userEmail = document.querySelector("#userEmail")
        let userPass = document.querySelector("#userPass")
        console.log(userEmail.value)
        console.log(userPass.value)

        try {
            const { data, error } = await client.auth.signUp({
                email: userEmail.value,
                password: userPass.value,
            })
            console.log(data)
            console.log(error)
        }
        catch (error) {
            console.log(error)
        }

    })
}

function showLogin() {
    document.getElementById("signupForm").classList.add("d-none");
    document.getElementById("loginForm").classList.remove("d-none");
}

function goToDashboard() {
    window.location.href = "dashboard.html";
}