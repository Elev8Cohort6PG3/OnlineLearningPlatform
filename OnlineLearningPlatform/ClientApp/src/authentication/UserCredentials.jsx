export default function UserCredentials() {
    //returns user credentials as a user object
    let user = {
        isLoggedIn: false,
        username: "User Logged Out",
        role: "User Logged Out",
        token: "User Logged Out"
    }

    if (!(localStorage.username === undefined)) {
        user = {
            isLoggedIn: true,
            username: localStorage.username.slice(1, -1),
            role: localStorage.role.slice(1, -1),
            token: localStorage.jwtToken.slice(1, -1)
        }
        return user;
    }

    return user;
}