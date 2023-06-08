import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "../../hooks/use-debounce";

const Update = () => {
  const { state } = useLocation();
  const [book, setBook] = useState({
    title: state.title,
    desc: state.desc,
    price: state.price,
    cover: state.cover,
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const bookId = state.id

  const debounced = useDebouncedCallback(
    (e) => {
      setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    500
  );

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input
        type="text"
        defaultValue={state.title}
        name="title"
        onChange={(e) => debounced(e)}
      />
      <textarea
        rows={5}
        defaultValue={state.desc}
        name="desc"
        onChange={(e) => debounced(e)}
      />
      <input
        type="number"
        defaultValue={state.price}
        name="price"
        onChange={(e) => debounced(e)}
      />
      <input
        type="text"
        defaultValue={state.cover}
        name="cover"
        onChange={(e) => debounced(e)}
      />
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>
    </div>
  );
};

export default Update;
