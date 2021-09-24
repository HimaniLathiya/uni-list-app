import Grid from '@material-ui/core/Grid';
import './SchoolComponent.css'

const randomColor = ['#f2849e','#7ecaf6', '#7bd0c1', '#c75b9b', '#ae85ca', '#8499e7'];
function GridItem({ item }) {
  console.log("item", item);
  var randomNumber = Math.floor(Math.random()*randomColor.length);
    return (
      <Grid item xs={12} sm={6} md={3}>
        <div className="tilesBackground" style={{backgroundColor: randomColor[randomNumber]}}>
          <text>{item.name}</text>
        </div>
      </Grid>
    );
  }

export default function SchoolComponent({uniList}) {
    return <Grid container spacing={1}>
    {uniList.map((item) => <GridItem  item={item}/>)}
  </Grid>;
  }