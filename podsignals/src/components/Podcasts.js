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
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 120,
        paddingTop: '56.25%', // 16:9
      },
}))

function Podcasts(props) {
    const classes = useStyles()
    const theme = useTheme()
    const podcasts = [
        {category: 'Art', rank: 1, title: 'Fresh Air', link: `https://chartable.com/podcasts/fresh-air`, publisher: 'NPR', description: "Fresh Air from WHYY, the Peabody Award-winning weekday magazine of contemporary arts and issues, is one of public radio's most popular", website: 'http://www.npr.org/programs/fresh-air/', itunes_url: 'https://itunes.apple.com/us/podcast/id214089682?at=1001lMGa&ct=podcast%3ApJk0P8W1', logo: 'https://media.npr.org/assets/img/2018/08/03/npr_freshair_podcasttile_sq-bb34139df91f7a48120ddce9865817ea11baaf32.jpg?s=1400'}
    ]
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
     const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
      };

    const [searchCategories, setSearchCategories] = useState([])

    const [categories, setCategories] = useState(['Art', 'Business', 'Comedy', 'Education', 'Family and Kids', 'Government', 'Health and fitness', 'History', 'Leisure', 'Music', 'News', 'Religion and Spirituality', 'Science', 'Society and Culture', 'Sports', 'Technology', 'TV and Films'])

    const handleCategoryChange = (e) => {
        const searchCategoriesCopy = [...searchCategories]
        if (!searchCategoriesCopy.includes(e.target.value)){
            searchCategoriesCopy.push(e.target.value)
            setSearchCategories(searchCategoriesCopy)
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
            <Grid item container direction='column' align='center'>
                <Grid item>
                    <Typography variant='body1'>Advanced search</Typography>
                </Grid>
                <Grid item>
                    <Select
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
                <Grid item>
                    {searchCategories.map((category) => (
                        <Chip size="small" label={category} onDelete={handleCategoryDelete}/>
                    ))}
                </Grid>  
            </Grid>
            <Grid item>
                <Card className={classes.root}>
                    <CardHeader 
                    title={<Typography variant='h2' style={{fontWeight: 1000}}>{podcasts[0].title}</Typography>} 
                    subheader={<Typography variant='body2' style={{color: theme.palette.primary.dark, fontSize: '18px'}}>{podcasts[0].category}</Typography>} 
                    avatar={<Avatar variant="rounded" style={{backgroundColor: theme.palette.secondary.dark}}>#{podcasts[0].rank}</Avatar>}/>
                    <CardMedia className={classes.media} image={podcasts[0].logo}/>
                    <CardContent>
                        <Typography variant='body1'>
                            {podcasts[0].description}
                        </Typography>
                        <Typography variant='body2' style={{marginTop: '1em'}}>
                            Published by: {podcasts[0].publisher}
                        </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small" style={{fontFamily: 'Raleway', color: theme.palette.secondary.dark}} href={podcasts[0].website} target='_blank'>Go to website</Button>
                    <Button size="small" style={{fontFamily: 'Raleway', color: theme.palette.secondary.dark}} href={podcasts[0].itunes_url} target='_blank'>Listen in iTunes</Button>
                    </CardActions>
                </Card>

            </Grid>


        </Grid>
    );
}

export default Podcasts;