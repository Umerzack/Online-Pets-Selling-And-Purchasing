export async function getUser() {
  const userData = localStorage.getItem("user");

  const parsedUserData = userData ? JSON.parse(userData) : null;

  try {
    const response = await fetch(
      "https://pet-selling-server.vercel.app/auth/userExist",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedUserData),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      const { isAuthenticated } = data;
      console.log("response not ok in getUser function", data);
      return { isAuthenticated };
    }

    const data = await response.json();
    const { isAuthenticated } = data;
    return { isAuthenticated };
  } catch (e) {
    return { isAuthenticated: false };
  }
}
