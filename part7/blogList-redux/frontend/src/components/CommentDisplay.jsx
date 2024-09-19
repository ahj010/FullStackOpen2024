import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { initializeComments } from '../reducers/commentReducer';
import AddComment from './AddComment';

function CommentDisplay({id}) {
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeComments(id));
  }, [dispatch, id]);

  const comments = useSelector((state) => state.comments);
  console.log(comments);


  if (!comments) {
    return null;
  }

  return (
    <div>
<AddComment id={id} />

<ul>
  {comments.map((c) => (
    <li key={c.id}> {c.content} </li>
  ))}
  </ul>
 </div>
  )
}

export default CommentDisplay
