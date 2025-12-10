export const saveFcmToken = async (token: string) => {
  try {
    const res = await fetch("http://localhost:5000/api/save-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();
    // console.log("Token saved:", data);
    return data;
  } catch (error) {
    console.error("Error saving token:", error);
  }
};
