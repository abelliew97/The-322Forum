import React, {useState, useContext, Component} from 'react'
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import Filter from "../screenComponents/filter.js"



const Right = () => {
    const [following, setF] = useState((localStorage.getItem("followingNames")+"").split(","))
    const { state, dispatch } = useContext(UserContext);

    
    return(
        <div style={{
            flexGrow: "2",
            alignItems:"start",
            borderLeft:"1px solid gray",
            padding:"10px",
            minWidth:"15%",
          }}>
            <h6>
              Filter
            </h6>

            <Filter/>

 
            <h6 style={{
              marginTop:"30px"
            }}>
              Followed
            </h6>
    
            {following.map((item, index) =>{
              //COloring
              const colour = "#"+Math.floor(Math.random()*16777215).toString(16)

              return(
                <Link
                  to={
                    "/profile/" + JSON.parse(localStorage.getItem("user")).following[index]
                  }
                  onClick={() => {
                  }}
                >
                  <div style={{
                    display:"flex",
                    flexDirection:"row",
                    alignItems:"center"
                  }}>
                    <div style={{
                      minWidth:"40px",
                      maxWidth:"40px",                      
                      height:"40px",
                      borderRadius:"20px",
                      backgroundColor:colour,
                      display:"flex",
                      alignItems:"center",
                      margin:"5px 20px 5px 15px"
                    }}
                    >
                      <p style={{
                        margin:"auto",
                        fontWeight:"bolder"
                      }}>{item.substring(0,2)}</p>
                    </div>
                    <p className="collection-item">{item}</p>
                  </div>
                </Link>
              )
            })}
    
        </div>
    )
}

export default Right