import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {useTheme, makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import { InputLabel } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';


import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { getPodcastById, getTopPodcasts, getPodcastsByKeyword, getEvent, getCategories } from '../GraphQL/Queries';
import { ApolloProvider } from '@apollo/client';
// import { useQuery, gql } from '@apollo/client'
// import {getPodcast} from '../GraphQL/Queries'


const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
        marginLeft: '2em'
    },
    media: {
        height: 120,
        paddingTop: '56.25%', // 16:9
      },
    actionButtons: {
        fontFamily: 'Raleway', 
        color: theme.palette.secondary.dark,
        '&:hover': {
            backgroundColor: 'transparent'
        }
    }
}))

function Podcasts(props) {
    const classes = useStyles()
    const theme = useTheme()

    const [topPodcasts, setTopPodcasts] = useState([])
    const [podcastsByWord, setPodcastsByWord] = useState([])
    const [searchCategories, setSearchCategories] = useState([])
    const [categories, setCategories] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [noResults, setNoResults] = useState(false)
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        fetchPodcasts()
        fetchCategories()
    }, [])

    const fetchPodcasts = async () => {
     
        try {
            const podcastData = await API.graphql(graphqlOperation(getTopPodcasts))
            const topPodcastsData = podcastData.data.getTopOnePodcasts

            setTopPodcasts(topPodcastsData)
          } catch (err) { console.log(err) }

    }

    const fetchCategories = async () => {
        try {
            const categoriesData = await API.graphql(graphqlOperation(getCategories))
            const categoriesObject = categoriesData.data.getCategories
            let categories = []
            categoriesObject.map((category) => (
                categories.push(category.category_name)
            ))

            setCategories(categories)
        } catch (err) { console.log(err) }
    }

    const fetchPodcastsAdvancedSearch = async () => {
        if (searchValue.length >= 3 || (searchCategories.length >= 1 && (searchValue.length === 0 || searchValue.length >= 3))){
        try{
            setLoading(true)
            const podcastData = await API.graphql(graphqlOperation(getPodcastsByKeyword, {keyword: searchValue, category: searchCategories.toString()}))
            const podcasts = podcastData.data.getPodcastsByKeyword
            setLoading(false)
            setPodcastsByWord(podcasts)
            if (podcasts.length === 0) 
                setNoResults(true)
            else 
                setNoResults(false)
        } catch (err) { console.log(err) }
    }
    }

    const handleKeyWordChange = e => {
        setSearchValue(e.target.value)
        setNoResults(false)
        setPodcastsByWord([])
    }



    const handleCategoryChange = (e) => {
        const searchCategoriesCopy = [...searchCategories]
        if (!searchCategoriesCopy.includes(e.target.value)){
            searchCategoriesCopy.push(e.target.value)
            setSearchCategories(searchCategoriesCopy)
            if (searchCategories.length === 0)
                setPodcastsByWord([])
               
        }

    }

    const handleCategoryDelete = (e) => {
        const searchCategoriesCopy = [...searchCategories]
        const index = searchCategoriesCopy.indexOf(e.target.value)
        searchCategoriesCopy.splice(index, 1)
        setSearchCategories(searchCategoriesCopy)
    }
    

    return (
        <Grid container direction='column' style={{width: '90%', marginLeft: '10em', marginTop: '5em'}}>
            <Grid item align='center'>
                <Typography variant='h3'>Podcasts</Typography>
            </Grid>
            <Grid item container direction='column' alignItems='center'align='center'>
                <Paper style={{width: '50%', marginTop: '2em'}} elevation={3}>
                    <Grid item style={{marginTop: '1.5em'}}>
                        <Typography variant='h2'>Advanced search</Typography>
                    </Grid>
                    <Grid item container justify='center' style={{marginTop: '1em'}}>
                        <Grid item>
                            <InputLabel>Filter by Category</InputLabel>
                        </Grid>
                        <Grid item container direction='column' justify='center'>
                            <Grid item style={{marginTop: '0.4em'}}>
                            <Select
                            style={{width: 140}}
                                labelId="demo-mutiple-chip-label"
                                id="demo-mutiple-chip"
                                onChange={handleCategoryChange}
                                input={<Input id="select-multiple-chip" />}
                                >
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category} >
                                    {category}
                                    </MenuItem>
                                ))}
                            </Select>
                            </Grid>
                    
                        <Grid item style={{marginTop: '0.4em'}}>
                            {searchCategories.map((category) => (
                                <Chip
                                variant='outlined' 
                                size="medium" label={category} 
                                onDelete={handleCategoryDelete}
                                style={{fontFamily: 'Raleway', fontWeight: 700}}/>
                            ))}
                            </Grid> 
                        </Grid>
                            <Grid item container direction='column'>
                            <Grid item>
                                <TextField style={{width: 140}} label="What interests you?" onChange={handleKeyWordChange} value={searchValue} />
                            </Grid>
                            <Grid item>
                                {searchValue.length < 3 && searchValue.length > 0 && <Typography variant='body1'>Search must include at least three characters</Typography>}
                                <Button onClick={fetchPodcastsAdvancedSearch} style={{backgroundColor: theme.palette.primary.light, marginBottom: '2em', marginTop: '1em', color: 'white', height: '40px', fontFamily: 'Raleway'}} >Search</Button>
                            </Grid>
                        </Grid>
                      
                    </Grid> 
                </Paper> 
            </Grid>
            <Grid item container direction='row' style={{marginTop: '2em', marginBottom: '1em'}} spacing={3}>
                {loading && <Grid item container justify='center'> <CircularProgress color="secondary" /> </Grid>}
                {(searchValue.length === 0 && podcastsByWord.length === 0 ) && topPodcasts.map((podcast) => (
                    <Grid item lg={4}>
                        <Card className={classes.root}>
                        <CardHeader 
                        title={<Typography variant='h2' style={{fontWeight: 1000}}>{podcast.title}</Typography>} 
                        subheader={<Typography variant='body2' style={{color: theme.palette.primary.dark, fontSize: '18px'}}>{podcast.category}</Typography>} 
                        avatar={<Avatar variant="rounded" style={{backgroundColor: theme.palette.secondary.dark, fontSize: '18px'}}>#{podcast.category_rank}</Avatar>}/>
                        <Link href={podcast.website} target='_blank'>
                            <CardMedia className={classes.media} image={podcast.logo} />
                        </Link>
                        <CardContent>
                            <Box textOverflow="ellipsis" overflow="hidden" style={{height: 50}}> 
                                <Typography variant='body1' paragraph>
                                    {podcast.description}
                                </Typography>
                            </Box>
            
                            <Typography variant='body2' style={{marginTop: '1em'}}>
                                Publisher: {podcast.publisher}
                            </Typography>
                
                        </CardContent>
                        <CardActions>
                        <Button size="small" className={classes.actionButtons} href={podcast.website} target='_blank'>Go to website</Button>
                        <Button size="small" className={classes.actionButtons} href={podcast.itunes_url} target='_blank'>Listen in iTunes</Button>
                        </CardActions>
                     </Card>
                    </Grid>

                ))}
                        {(searchValue || searchCategories.length !== 0) && podcastsByWord.map((podcast) => (
                    <Grid item lg={4}>
                        <Card className={classes.root} key={`${podcast.title}${podcast.category_rank}`}>
                        <CardHeader 
                        title={<Typography variant='h2' style={{fontWeight: 1000}}>{podcast.title}</Typography>} 
                        subheader={<Typography variant='body2' style={{color: theme.palette.primary.dark, fontSize: '18px'}}>{podcast.category}</Typography>} 
                        avatar={<Avatar variant="rounded" style={{backgroundColor: theme.palette.secondary.dark}}>#{podcast.category_rank}</Avatar>}/>
                        <Link href={podcast.website} target='_blank'>
                            <CardMedia className={classes.media} image={podcast.logo} />
                        </Link>
                        <CardContent>
                            <Box textOverflow="ellipsis" overflow="hidden" style={{height: 50}}> 
                                <Typography variant='body1' paragraph>
                                    {podcast.description}
                                </Typography>
                            </Box>
            
                            <Typography variant='body2' style={{marginTop: '1em'}}>
                                Publisher: {podcast.publisher}
                            </Typography>
                
                        </CardContent>
                        <CardActions>
                        <Button size="small" className={classes.actionButtons} href={podcast.website} target='_blank'>Go to website</Button>
                        <Button size="small" className={classes.actionButtons} href={podcast.itunes_url} target='_blank'>Listen in iTunes</Button>
                        </CardActions>
                     </Card>
                    </Grid>
                ))}
                {noResults && 
                <Grid item container align='center' justify='center'>
                    <Typography variant='body2' paragraph><span style={{fontWeight: 900}}>We didn't find any results</span> <br/> Make sure everything is spelled correctly or try different keywords.</Typography>
                </Grid> }

            </Grid>


        </Grid>
    );
}

export default Podcasts;