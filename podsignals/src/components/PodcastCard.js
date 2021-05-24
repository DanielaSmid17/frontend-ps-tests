import React from 'react'

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import Typography from "@material-ui/core/Typography";
import {useTheme, makeStyles} from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

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

export default function PodcastCard(props) {
    const classes = useStyles()
    const theme = useTheme()

    const { podcast } = props

    return (
        <div>
            <Card className={classes.root} key={podcast.id}>
                        <CardHeader 
                        title={<Typography variant='h2' style={{fontWeight: 1000}}>{podcast.title}</Typography>} 
                        subheader={<Typography variant='body2' style={{color: theme.palette.primary.dark, fontSize: '18px'}}>{podcast.category.category_name}</Typography>} 
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
            
        </div>
    )
}
