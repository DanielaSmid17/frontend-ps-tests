import {createMuiTheme} from "@material-ui/core/styles";

const myRed = '#F20544'
const myBlue = '#05DBF2'
const myLightGrey = '#A6A6A6'
const myGrey = '#595959'
const genFont = 'Raleway'
const specFont = 'Sacramento'

export default createMuiTheme({
    palette: {
        common: {
            blue: myBlue,
            red: myRed
        },
        primary: {
            main: myRed
        },
        secondary: {
            main: myBlue
        }
    },
    typography: {
        h2: {
            fontFamily: genFont,
            color: myGrey,
            fontWeight: 700,
            lineHeight: 1.5,
            fontSize: '16px'
        },
        tab: {
            color: '#FFFFFF',
            textTransform: "none",
            fontFamily: genFont,
            fontWeight: 700,
            "&:hover": {
                fontWeight: 800
            }
        }
    }
})