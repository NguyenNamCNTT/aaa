import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import MovieInfo from "../Components/Single/MovieInfo";
import { useParams } from "react-router-dom";
import MovieRates from "./../Components/Single/MovieRates";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "./../Redux/Actions/MoviesActions";
import Loader from "../Components/Notfications/Loader";
import { RiMovie2Line } from "react-icons/ri";

function SingleMovie() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const sameClass = "w-full gap-6 flex-colo min-h-screen";

  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );

  useEffect(() => {
    dispatch(getMovieByIdAction(id));
    // Quay về đầu trang khi component được hiển thị
    window.scrollTo(0, 0);
  }, [dispatch, id]);

  return (
    <Layout>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full Obg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">Something went wrong</p>
        </div>
      ) : (
        <>
          <MovieInfo movie={movie} />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieRates movie={movie} />
          </div>
        </>
      )}
    </Layout>
  );
}

export default SingleMovie;
