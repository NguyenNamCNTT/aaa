import React, { useEffect } from "react";
import SideBar from "./SideBar";
import Table from "../../Components/Table";

import { useDispatch, useSelector } from "react-redux";
import { deleteFavoriteMoviesAction, getFavoriteMoviesAction } from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "../../Components/Notfications/Loader";
import { Empty } from './../../Components/Notfications/Empty';

function FavoritesMovie() {
  const dispatch = useDispatch();

  const { isLoading, isError, likedMovies } = useSelector(
    (state) => state.userGetFavoriteMovies
  );

  //delete
  const { isLoading:deleteLoading, isError:deleteError, isSuccess } = useSelector(
    (state) => state.userDeleteFavoriteMovies
  );
//delete movies handler
const deleteMoviesHanlder = () => {
  window.confirm("Are you want to delete all movies ?") &&
  dispatch(deleteFavoriteMoviesAction())
}
  useEffect(() => {
    dispatch(getFavoriteMoviesAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError ? "GET_FAVORITE_MOVIES_RESET" : "DELETE_USER_RESET",
      });
    }
  }, [dispatch, isError, deleteError]);
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Favovites Movies</h2>
          {likedMovies?.length > 0 && 
            <button 
            disabled = {deleteLoading}
            onClick={deleteMoviesHanlder}
            className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded">
              {
                deleteLoading ? "Deleting..." : "Delete All"
              }
            </button>
          }
        </div>
        {isLoading ? (
          <Loader />
        ) : likedMovies?.length > 0 ? (
          <Table data={likedMovies} admin={false} />
        ) : (
          <Empty message="No favorite movie"/>
        )}
      </div>
    </SideBar>
  );
}

export default FavoritesMovie;
