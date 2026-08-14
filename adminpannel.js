//      Login / SignUp
function showSignup() {
    document.getElementById("loginForm").classList.add("d-none");
    document.getElementById("signupForm").classList.remove("d-none");
}

// Login Form

function showLogin() {
    document.getElementById("signupForm").classList.add("d-none");
    document.getElementById("loginForm").classList.remove("d-none");
}

// Signup 

async function signupUser(event) {
    event.preventDefault();
    let name = document.getElementById("userName").value;
    let email = document.getElementById("userEmail").value;
    let password = document.getElementById("userPass").value;

    if (!email || !password) {
        Swal.fire({
            icon: "error",
            title: "Missing Data",
            text: "Email and Password required"
        });
        return;
    }

    try {
        const { data, error } = await client.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name,
                    role: "admin"
                }
            }
        });

        console.log("Signup Data:", data);
        console.log("Signup Error:", error);

        if (error) {
            Swal.fire({
                icon: "error",
                title: "Signup Failed",
                text: error.message
            });
            return;
        }
        Swal.fire({
            icon: "success",
            title: "Account Created",
            text: "Now you can login"
        });
        showLogin();
    }
    catch (error) {
        console.log(error);
    }
}

async function loginUser() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPass").value;

    if (!email || !password) {
        Swal.fire({
            icon: "warning",
            title: "Fill Fields",
            text: "Email and Password required"
        });
        return;
    }

    try {
        const { data, error } = await client.auth.signInWithPassword({
            email: email,
            password: password
        });

        console.log("Login Data:", data);
        console.log("Login Error:", error);

        if (error) {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.message
            });
            return;
        }

        console.log("Session:", data.session);

        const user = data.user;

        if (user.user_metadata.role !== "admin") {
            Swal.fire({
                icon: "error",
                title: "Access Denied",
                text: "You are not an admin!"
            });

            await client.auth.signOut();
            return;
        }

        window.location.href = "admin.html";

    } catch (error) {
        console.log(error);
    }
}