import React, { useState, useEffect } from "react";
import axios from "axios";
import Movie from "./Movie";

const AddMovie = props => {
  const [editMovie, setEditMovie] = useState({
    title: "",
    director: "",
    metascore: null,
    star: []
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(respond => setEditMovie(respond.data));
  }, []);

  const handleChange = event => {
    event.preventDefault();
    setEditMovie({
      ...editMovie,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${editMovie.id}`, editMovie)
      .then(respond => {
        setEditMovie(respond.data);
        props.history.push(`/`);
      });
  };

  return (
    <div>
      <form>
        <input
          name="title"
          value={editMovie.title}
          type="text"
          placeholder="Title"
          onChange={handleChange}
        />
        <input
          name="director"
          value={editMovie.director}
          type="text"
          placeholder="Director"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Edit</button>
      </form>
    </div>
  );
};

export default AddMovie;
