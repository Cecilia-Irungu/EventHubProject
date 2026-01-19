import { useEffect, useState } from "react";
import API from "../api/api";

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");

  const fetchTags = async () => {
    const res = await API.get("/tags");
    setTags(res.data);
  };

  const addTag = async e => {
    e.preventDefault();
    try {
      await API.post("/tags", { name });
      setName("");
      fetchTags();
    } catch {
      alert("Failed to add tag");
    }
  };

  useEffect(() => { fetchTags(); }, []);

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Tags</h1>
      <form onSubmit={addTag} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="New tag"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button className="bg-green-500 text-white p-2 rounded">Add</button>
      </form>
      <ul>
        {tags.map(tag => (
          <li key={tag.id} className="border p-2 rounded my-1">{tag.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tags;
