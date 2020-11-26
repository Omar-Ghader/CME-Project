import React from 'react'
import './design.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
function VisitedRestaurants({currentRest,date}) {
    var i =0;
    return (
<div>
    <div className="flex-container" >
{
 currentRest.map(restaurent => {
    return(
        <Card className="card cardNew">
            <CardContent>
            <div className="imgHolder"></div>
            <div className="content">
             <div className="name">
                 Name: {restaurent.name}
                 <br />
                 Date: {date[i]}
                <br /><br/>
                {i++}
                 </div>
             </div>
            </CardContent>
          </Card>
    )
})
}
</div>
        </div>
    )
}

export default VisitedRestaurants
