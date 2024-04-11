import React, { useEffect, useState } from 'react'
import UserApi from '../API/UserApi'
import { useParams,useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Update() {
    const [user,setUser] = useState({
        name: "",
        email: "",
        mobile: ""
    })
    const navigate = useNavigate()
    const params = useParams()

    // read single user data
    const readData = async () => {
        await UserApi.readSingle(params.id)
           .then(res => {
            console.log(`single user=`, res.data)
            setUser(res.data.user)
           }).catch(err => toast.error(err.response.data.msg))
    }

    useEffect(() => {
        readData()
    },[])

    const readInput = (e) => {
        const {name, value}= e.target
        setUser({...user, [name]:value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            console.log(`new user =`, user)
            await UserApi.updateUser(user,params.id)
                .then(res => {
                    toast.success(res.data.msg)
                    navigate(`/`)
                }).catch(err => {
                    toast.error(err.response.data.msg)
                })
        } catch (err) {
            toast.error(err.message)
        }
    }

  return (
    <div className="container">
       <div className="row">
          <div className="col-md-12 text-center">
              <h3 className="display-3 text-center"> Update User</h3>
              <p className="text-dark"> { params.id } </p>
          </div>
       </div>
         
       <div className="row"> 
            <div className="col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-body">
                        <form autoComplete="off" onSubmit={submitHandler}>
                        <div className="form-group mt-2">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" value={user.name} onChange={readInput} id="name" className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" value={user.email} onChange={readInput} id="email" className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="mobile">Mobile</label>
                                <input type="number" name="mobile" value={user.mobile} onChange={readInput} id="mobile" className="form-control" required />
                            </div>
                            <div className="form-group mt-2">
                                <input type="submit" value="Update User" className="btn btn-success" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>  
    </div>
  )
}

export default Update