import React from "react";
import { useParams } from "react-router-dom";

const LessonPresence = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Lesson Presence</h1>
      <p>Lesson ID: {id}</p>
    </div>
  );
};

export default LessonPresence;