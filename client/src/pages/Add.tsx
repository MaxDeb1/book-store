import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "../../hooks/use-debounce";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: 0,
    cover: "",
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const debounced = useDebouncedCallback(
    (e) => {
      setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    500
  );

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input
        type="text"
        placeholder="Book title"
        name="title"
        onChange={(e) => debounced(e)}
      />
      <textarea
        rows={5}
        placeholder="Book desc"
        name="desc"
        onChange={(e) => debounced(e)}
      />
      <input
        type="number"
        placeholder="Book price"
        name="price"
        onChange={(e) => debounced(e)}
      />
      <input
        type="text"
        placeholder="Book cover"
        name="cover"
        onChange={(e) => debounced(e)}
      />
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Add;
