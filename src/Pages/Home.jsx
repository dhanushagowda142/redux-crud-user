import React, { useEffect, useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

import { useDispatch, useSelector } from 'react-redux'
import { retriveUsers,deleteUser } from '../Action/UserAction'

function Home() {
  const dispatch = useDispatch() //dispatches actions

//   const [users, setUsers] = useState([])

  const users = useSelector(item => item.users || [])
  const [index,setIndex] = useState(0)  // beginning index

  const itemsPerPage = 5
  const endIndex = index + itemsPerPage; // ending index
  const pCount = Math.ceil( users.length / itemsPerPage) // page count

  // curremt active page items
  const currentUsers = users.slice(index,endIndex)

  // page item handler
  const pageItemHandler = (e) => {
    console.log(`selected item=`,e.selected) // pageitem index
    let newIndex = (e.selected * itemsPerPage) % users.length;
    setIndex(newIndex)
  }

  // callback
  const initUser = useCallback(() => {
    dispatch(retriveUsers())
  },[])


  useEffect(()=> {
    initUser()
  },[initUser])

// delete
const deleteHandler = async (id) => {
  if(window.confirm(`Are you sure to delete user id?`)) {
   dispatch(deleteUser(id))
   .unwrap()
   .then(res =>{
    toast.success(res.msg)
    initUser()
   }).catch(err => toast.error(err.msg))
  } else {
    toast.warning(`delete terminated`)
  }
}

  return (
    <div className='container'>
      <div className="row mt-4">
        <div className="col-md-12 text-center">
          <div className="table table-responsive">
            <table className="table-bordered table-striped table-hovered">
              <thead>
                <tr>
                  <th colSpan={6}>
                    <h4 className='display-4 text-success text-center'>Users Data</h4>
                  </th>
                  </tr>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
              </thead>
              <tbody>
                {
                  currentUsers && currentUsers.map((item,index) => {
                    return (
                      <tr key={index} className='text-center'>
                        <td> {item._id} </td>
                        <td> {item.name} </td>
                        <td> {item.email} </td>
                        <td> {item.mobile} </td>
                        <td> {item.isActive ? <strong className='text-success'>Active</strong> : <strong className='text-danger'>Blocked</strong>} </td>
                        <td>
                          <NavLink to={`/edit/${item._id}`} className="btn btn-sm btn-info" title='Edit'>
                            <i className="bi bi-pencil"></i>
                          </NavLink>

                          <button onClick={() => deleteHandler(item._id)} className="btn btn-sm btn-danger" title='Delete'>
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr> 
                    )
                  })
                }
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={6}>
                  <ReactPaginate
                 pageCount={pCount} 
                 onPageChange={pageItemHandler}
                 className='pagination justify-content-center'
                 pageClassName='page-item'
                 pageLinkClassName='page-link'
                 nextClassName='page-item'
                 nextLinkClassName='page-link'
                 previousClassName='page-item'
                 previousLinkClassName='page-link'
                 activeClassName='active'
                 activeLinkClassName='active'
                 breakLabel="..."
                 pageRangeDisplayed={3}
                 />
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home