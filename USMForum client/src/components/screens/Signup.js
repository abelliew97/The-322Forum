import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup = ()=>{
    const history = useHistory()
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const PostData = () => {
        if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            M.toast({html: "Invalid email"})
            return
        }
        fetch("/signup",{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error})
            }
            else{   //Success
                M.toast({html:data.message})
                history.push('/signin')
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
                placeholder="username" 
                value={name}
                onChange={
                    (e)=>setName(e.target.value)
                }>
                </input>

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
                    Sign up
                </button>

                <h6>
                    <Link to="/signin">Already have an account?</Link>
                </h6>
            </div>
        </div>
    )
}

export default Signup