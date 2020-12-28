import React, {useState, useEffect} from 'react'

const Home = ()=>{
    const [data, setData] = useState([])
    useEffect(()=>{
        fetch('/allpost',{
            headers:{
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        })
        .then(res=>res.json())
        .then(result=>{
            console.log("FRICKER" + data)
            setData(result.posts)
        })
    },[])

    return(
        <div className="home">
            {
                data.map(item=>{
                    return(
                        <div className="card home-card" key={item._id}>
                            <h5>{item.postedBy.name}</h5>
                            
                            <div className="card-image">
                                {
                                    item.photo != "" && item.photo != "No photo"?
                                    <img src={item.photo}/>:
                                    <div/>
                                }
                            </div>

                            <div className="card-content">
                                <i className="material-icons" style={{color: "#64b5f6"}}>favorite</i>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                <input type="text" placeholder="Add a comment"/>

                            </div>
                        </div>
                    )
                })
            }
            
        </div>
    )
}

export default Home