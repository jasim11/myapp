import React, { useState, useEffect } from 'react';
import { Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost } from '../../actions/posts';


const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      
    } else {
    
   
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to save the CSV file
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth onChange={handleSubmit}>Save File</Button>
   
    </Paper>
  );
};

export default Form;
