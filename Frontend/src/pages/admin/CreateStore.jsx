import { useState } from "react";
import { createStore } from "../../services/api";
import { useNavigate } from "react-router-dom";

function CreateStore() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createStore({ name });
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Store creation Failed");
    }
  };

  return (
    <div>
      <h1>Create Store</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter store Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Create Store</button>
      </form>
    </div>
  );
}

export default CreateStore;
