import React, {useEffect, useState, useContext, useCallback} from 'react'
import {UserContext} from '../../App'

const Profile = ()=>{
    const [mypics, setPics] = useState([])
    const {state, dispatch} = useContext(UserContext)

    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
        .then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
        })
    },[])

    return(
        <div style={{maxWidth:"550px", margin:"0px auto"}}>
            <div style={{
                    display: "flex",
                    justifyContent:"space-around",
                    margin:"18px 0px",
                    borderBottom: "1px solid grey"
                }}>
                <div >
                    <img style={{
                        width: "150px", 
                        height:"150px", 
                        borderRadius:"75px"
                    }}
                    src="images/hoodwink.png"/>
                </div>
                <div>
                    <h4>{state.name?state.name : "Loading"}</h4>

                    <div style={{display:"flex", justifyContent:"space-between", width:"106%"}}>
                        <h6>1 posts</h6>
                        <h6>1 followers</h6>
                        <h6>1 following</h6>
                    </div>

                </div>
            </div>
        
            <div className="gallery">
                {
                    mypics.map(item=>{
                        return(
                            item.photo != "" && item.photo != "No photo"?
                            <img key={item._id} className="imageItem" src={item.photo} alt={item.title}/>:
                            <div key={item._id} className="noImageItem"
                            style={{minHeight:"100px", lineHeight: "90px", backgroundColor:"#ebebeb", textAlign:"center", verticalAlign:"middle"}}
                            >
                                {item.title}
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Profile