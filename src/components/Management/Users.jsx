import React, { useState, useEffect } from "react";
import { fetAllUser, deleteUser,allUser } from "../../services/userService";
import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.3";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import { Link } from "react-router-dom";
import './Users.scss'
import { toast } from "react-toastify";
import ModelDelete from '../Management/Popup'
import { data } from "autoprefixer";
import CreateUserModal from "./CreateUserModal";
import { Button } from "react-bootstrap";
const User = () => {
  const [listUsers, setListUsers] = useState([]);
  //xử lí phân trang
  const [currentPage , setCurrentPage] = useState(1);
  const [currentLimit , setCurrentLimit ]= useState(5);
  const [totalPage , setTotalPage ]= useState(0);

  // xử lí bật mở 
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  //xử lí dữ liệu 
  const [dataModel , setDataModel] = useState(null)


  //edit
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [actionModalUser , setActionModalUser] =useState('CREATE')
  const [dataModalUser, setDataModalUser ] = useState({})
  
  useEffect(() => {
    fetchUser();
  }, [currentPage]);

  const fetchUser = async () => {
    try {
      const response = await fetAllUser( currentPage,currentLimit);
      console.log(response)
      if (response && response && response.EC === 0) {
        setListUsers(response.DT.users);
        setTotalPage(response.DT.totalPages)
        
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };



  const handlePageClick = async(event) => {
    setCurrentPage(+event.selected +1)
    // console.log(+event.selected +1)
    // await fetAllUser(+event.selected +1);
  };

  //xử lí đóng thêm , đưa dữ liệu trở về null
  const handleClose = () => {
    setShow(false);
    setDataModel(null) 
    // setDataModalUser({})
  }
  // xử lí xoá user
  const handleDelete = async(user)=>{
    handleShow();
    console.log(user)
    setDataModel(user)
  }
  const handleEditUser = async(user)=>{
    setDataModalUser(user); // Truyền dữ liệu người dùng vào modal sửa đổi
    setActionModalUser('EDIT'); // Đặt action là EDIT để biết modal đang ở chế độ chỉnh sửa
    setShowCreateUserModal(true);
    console.log(">>>check user:",user)
  }
  // fetch api và xử lí 
  const ConfirmDeleteUser = async ()=>{
    if (dataModel) {
      try {
        await deleteUser(dataModel.id);
        toast.success('User deleted successfully!');
        await fetAllUser();
        window.location.reload()
      } catch (error) {
        toast.error('Failed to delete user. Please try again.');
      } finally {
        handleClose();
      }
    }
  };
  const handleCreateUserClose = () => {
    setShowCreateUserModal(false);
    // setDataModalUser({});
    // console.log(dataModalUser)
  
  };
  const handleCreateUserShow = () => setShowCreateUserModal(true);

  return (
    <>
      <div className="flex flex-col">
        <h1 className=" flex justify-center mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          User Table
        </h1>
        <div className="flex justify-items-start px-7 ">
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={()=>{
          setShowCreateUserModal(true)
          setActionModalUser('CREATE')
        }}>  Create User</button>
        </div> 
 <div className="-my-1 overflow-x-auto sm:-mx-6 lg:-mx-1">
  
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      No
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {listUsers && listUsers.length > 0 ? (
                    listUsers.map((user, index) => (
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="">
                              <div className="text-sm font-medium text-gray-900">
                                {index +1}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                          {user.id}
                          </div>
                         
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {user.email}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.Group ? user.Group.name : ''}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          
                          <div className="inline-flex space-x-3 ">
                            <div>
                            <button className="text-indigo-600 hover:text-indigo-900" onClick={()=>{handleEditUser(user)}}>                       
                              Edit
                                </button>
                             
                          </div>
                            <div>
                              <button className="text-indigo-600 hover:text-indigo-900" onClick={()=>{handleDelete(user)}}>                       
                              Delete
                                </button>
                            </div>
                          </div>
                        </td>
                      
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"
                      >
                        Not found Users
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  
      <>
      {totalPage > 0 &&
      <div className="pagination mt-3 flex justify-center">
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPage}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      
      </div>
      }
    </>
      <ModelDelete show = {show}  handleClose={handleClose} ConfirmDeleteUser ={ConfirmDeleteUser}  dataModel ={dataModel}/>
      <CreateUserModal show={showCreateUserModal} handleClose={handleCreateUserClose} fetchUser={fetchUser} action={actionModalUser} dataModalUser={dataModalUser} />

    </>
  );
};

export default User;
