const clear = () => {
  setName("");
  setCmsID("");
  setEmail("");
};

const [name, setName] = useState("");
const [cmsID, setCmsID] = useState("");
const [email, setEmail] = useState("");

const updateData = (id) => {
  const url = `https://localhost:7013/api/Users/${id}`;
  const data = {
    anger_Score: totalScore,
  };
  axios
    .put(url, data)
    .then((response) => {
      // getData();
      clear();
      toast.success("Data updated successfully");
    })
    .catch((error) => {
      toast.error(error);
    });
};
