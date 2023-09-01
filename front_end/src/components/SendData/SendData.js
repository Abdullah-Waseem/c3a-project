import React from "react";

export default function SendData(data) {
  const PostData = () => {
    // Make an API call to the backend to send the user data
    axios
      .post("http:localhost:5000/api/users", data)
      .then((response) => {
        console.log("Data successfully sent to the backend:", response.data);
        // Handle any response if needed
      })
      .catch((error) => {
        console.error("Error sending data to the backend:", error);
        // Handle errors if needed
      });
  };

  return <div>{data}</div>;
}
