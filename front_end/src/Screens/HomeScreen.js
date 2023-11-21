import { useDispatch, useSelector } from "react-redux";
import Banner from "../Components/Home/Banner";
import PopularMovies from "../Components/Home/PopularMovies";
import Promos from "../Components/Home/Promos";
import TopRated from "../Components/Home/TopRated";
import Layout from "../Layout/Layout";
import React, { useEffect } from "react";
import {
  getAllMoviesAction,
  getTopRatedMovieAction,
} from "../Redux/Actions/MoviesActions";
import toast from "react-hot-toast";

function HomeScreen() {
  const dispatch = useDispatch();

  const {
    isLoading: topLoading,
    isError: topError,
    movies: topMovies,
  } = useSelector((state) => state.getTopRatedMovie);

  const { isLoading, isError, movies } = useSelector(
    (state) => state.getAllMovies
  );

  useEffect(() => {
    dispatch(getAllMoviesAction({}));
    dispatch(getTopRatedMovieAction());
    if (isError || topError) {
      toast.error("Something went wrong!");
    }
  }, [dispatch, isError, topError]);
  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <Banner movies={movies} isLoading={isLoading} />
        <PopularMovies movies={movies} isLoading={isLoading} />
        <Promos />
        <TopRated movies={topMovies} isLoading={topLoading} />
      </div>
    </Layout>
  );
}

export default HomeScreen;
