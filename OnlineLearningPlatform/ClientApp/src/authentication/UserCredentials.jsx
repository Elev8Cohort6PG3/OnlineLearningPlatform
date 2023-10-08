
export default function UserCredentials() {
    //returns user credentials as a user object
    let user = {
        isLoggedIn: false,
        username: "User Logged Out",
        role: "User Logged Out",
        token: "User Logged Out"
    }


        if(!(localStorage.username === undefined)) {
            user = {
                isLoggedIn: true,
                username: localStorage.unique_name,
                role: localStorage.role,
                token: localStorage.jwtToken
            }
            return user;
        }


    return user;
}