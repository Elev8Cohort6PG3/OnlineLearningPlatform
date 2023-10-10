export default function UserCredentials() {
    //returns user credentials as a user object
    let user = {
        isLoggedIn: false,
        username: "User Logged Out",
        role: ["User Logged Out"],
        token: "User Logged Out"
    }

    if (!(localStorage.username === undefined)) {
        let processedRole = localStorage.role;
        processedRole = processedRole.slice(1, -1);
        if (processedRole.length > 12) {
            processedRole = processedRole.split(',');
            for (let i = 0; i < processedRole.length; i++) {
                processedRole[i] = processedRole[i].slice(1, -1);
            }
        }

        console.log("user role: " + processedRole);

        user = {
            isLoggedIn: true,
            username: localStorage.username.slice(1, -1),
            role: processedRole,
            token: localStorage.jwtToken.slice(1, -1)
        }
        return user;
    }

    return user;
}