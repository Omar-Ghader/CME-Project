import React from 'react'
import axios from 'axios'
import './design.css'
import Modal from 'react-modal'
import {useState,useEffect} from 'react'
import {TextField} from "@material-ui/core"
import {MenuItem} from '@material-ui/core';
import {Button} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
Modal.setAppElement('#root')
function PostList ({restInfo,returnAllRest})   {
  const Types = ['types','lebanese','american','italian','japanese']
    const pageNumbers=[];
    const [title,setTitle] = useState(" ")
    const [buttonState,setButtonState] = useState()
    const [selectState,setSelectState] = useState("")
    const[restaurants,setRestaurants] = useState([])
    const [restaurantsPage,setRestaurantsPage] = useState(1);
    const [restaurantsPerPage] = useState(4);
    const [currentRest,setCurrentRest] = useState();
    const [currentType,setCurrentType] = useState();
    const indexOfLastPost= restaurantsPage * restaurantsPerPage;
    const indexOfFirstPost = indexOfLastPost - restaurantsPerPage
    const [modalOpen,setModalOpen] = useState(false);
    useEffect(() =>{
     axios.get(`http://localhost:8080/api/restaurants/get-all-restaurants`)
 .then(response => {
     setRestaurants(response.data)
    })
 .catch(error => {console.log(error)})
 },[])
 for(let i=1;i<= Math.ceil(restaurants.length/restaurantsPerPage);i++){
  pageNumbers.push(i)
}
const currentRestaurants = restaurants.slice(indexOfFirstPost,indexOfLastPost)
const paginate =(pageNumber) =>{
  setRestaurantsPage(pageNumber)
}
returnAllRest(restaurants)
        return (
        <div>
          <div className="blueArea">
            <TextField   variant="outlined" className="text1" label="Search" onChange={event => 
              { setTitle(event.target.value)
                setButtonState("false")
              }   
            } />

            <TextField
            variant="outlined"
            className="text2"
          select
          label="Types"
          onClick={(event)=>setSelectState(event.target.value)}>
          {Types.map((option) => (
            <MenuItem value={option} className="flexed">
              {option}
            </MenuItem>
          ))}
        </TextField>

          <Button variant="contained"   className="button"  onClick={() => setButtonState("true") }>
            Search
          </Button>
          </div>
      
    {
    (buttonState === "true")?
    restaurants.map(restaurant => {
                    
        if (restaurant.name.includes(title) && restaurant.type.includes(selectState)  ){
      
                return(  
    <div className="flex-container">
    <Card className="card" onClick={() => 
     { setModalOpen(true)
      setCurrentRest(restaurant.name)
      setCurrentType(restaurant.type)
    }  
    }>
    <CardContent>
    <div className="imgHolder"></div>
    <div className="content">
     <div className="name">{restaurant.name}</div>
     <Button onClick={()=>(restInfo(restaurant,Date().toLocaleString()))}>
     <i class="fa fa-check-circle fa-2x"></i>
     </Button>
     </div>
    </CardContent>
  </Card>
                </div>
                )
            
            
        }
    }):   <div className="flex-container">
    {   currentRestaurants.length?
        currentRestaurants.map(restaurant => 
    <Card className="card" onClick={() => 
    {
    setModalOpen(true)
     setCurrentRest(restaurant.name)
     setCurrentType(restaurant.type)
    }
  }>
    <CardContent>
    <div className="imgHolder"></div>
    <div className="content">
     <div className="name">{restaurant.name}</div>
     <Button onClick={()=>(restInfo(restaurant,Date().toLocaleString()))}>
     <i class="fa fa-check-circle fa-2x"></i>
     </Button>
     </div>
    </CardContent>
  </Card>
):null
    }
   </div>
}
          <nav>
              <ul className="pagination">
                {pageNumbers.map(number => <li key={number} className="page-item">
                <a onClick={()=> paginate(number) }  className="page-link">
                            {number}
                        </a>
                </li>)}
              </ul>
            </nav> 
<Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}
 style={
   {
     overlay:{
      backgroundColor:'white'
     },
     content:{
       backgroundColor:'rgb(25,179,229)',
       width:'700px',
       position:'absolute',
       top:'10%',
       left:'10%'
     }
   }
 }
 >
   <div class="flexed">
    <div className="imgHolder2"></div>
    <div>
<div className="field">{currentRest}</div>
    <div className="field">{currentType}</div>
    <div className="field">Average Cost for two</div>
    <div className="field">Address</div>
    <div className="field">Phone Number</div>
    </div>
    </div>
 </Modal>


        </div>
        )

}

export default PostList
