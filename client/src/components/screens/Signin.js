import React, {useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'

const Signin = ()=>{
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = () => {
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            M.toast({html: "Invalid email"})
            return
        }
        fetch("/signin",{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error})
            }
            else{   //Success
                //Store local data
                localStorage.setItem("jwt", data.token) //JWT: Java web token
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type:"USER", payload:data.user})

                M.toast({html:"Signed in successfully!"})
                history.push('/')
            }
            console.log(data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className="parentCard">
            <div className="card auth-card input-field">
                <h2>USMForum</h2>

                <input type="text" 
                placeholder="email"
                value={email}
                onChange={
                    (e)=>setEmail(e.target.value)
                }/>
                

                <input type="password" 
                placeholder="password"
                value={password}
                onChange={
                    (e)=>setPassword(e.target.value)
                }/>

                <button className="btn waves-effect waves-light #64b5f6 blue lighten-2"
                onClick={()=>PostData()}
                >
                    Sign in
                </button>

                <h6>
                    <Link to="/signup">Don't have an account?</Link>
                </h6>
            </div>
        </div>
    )
}

export default Signin