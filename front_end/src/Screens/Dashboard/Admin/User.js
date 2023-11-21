import React, { useEffect, useState } from "react";
import SideBar from "../SideBar";
import Table2 from "../../../Components/Table2";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAction,
  getAllUsersAction,
} from "../../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "../../../Components/Notfications/Loader";
import { Empty } from "../../../Components/Notfications/Empty";

function Users() {
  const dispatch = useDispatch();
  const { isLoading, isError, users } = useSelector(
    (state) => state.adminGetAllUsers
  );

  //delete
  const { isError: deleteError, isSuccess } = useSelector(
    (state) => state.adminDeleteUser
  );

  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const deleteMoviesHandler = (id) => {
    if (window.confirm("Are you sure you want to delete user?")) {
      dispatch(deleteUserAction(id));
    }
  };

  //useEffect
  useEffect(() => {
    dispatch(getAllUsersAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USER_RESET",
      });
    }
    if (isSuccess) {
      setDeleteSuccess(true);
    }
  }, [dispatch, isError, deleteError, isSuccess]);

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(getAllUsersAction());
      setDeleteSuccess(false);
    }
  }, [deleteSuccess, dispatch]);

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">User List</h2>
        {isLoading ? (
          <Loader />
        ) : users?.length > 0 ? (
          <Table2
            data={users}
            users={true}
            onDeleteFunction={deleteMoviesHandler}
          />
        ) : (
          <Empty message={"You dont have any user"} />
        )}
      </div>
    </SideBar>
  );
}

export default Users;
