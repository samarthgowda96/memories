import React,{useEffect} from 'react';
import {Container, Grow,Grid,Typography, AppBar} from '@material-ui/core';
import mem from './images/mem.jpeg'
import Posts from './components/Posts/Posts'
import Form  from './components/Form/Form'
import useStyles from './Styles'
import {useDispatch} from 'react-redux';
import {getPosts} from './actions/posts'
const App=()=>{
    const classes= useStyles();
    const dispatch= useDispatch();

    useEffect(()=>{
        dispatch(getPosts());

    },[dispatch])
    return(
        <Container maxWidth='lg'>
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h3" align="center">Memories</Typography>
                <img className={classes.image} src={mem} alt="memories" height="100"/>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify="space-between" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts/>

                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Form/>
                            
                        </Grid>

                    </Grid>
                </Container>
            </Grow>

        </Container>
    )

}

export default App;
