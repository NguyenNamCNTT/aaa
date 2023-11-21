import React, { useEffect, useMemo, useState } from "react";
import Layout from "../Layout/Layout";
import Filters from "../Components/Filters";
import Movie from "../Components/Movie";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesAction } from "../Redux/Actions/MoviesActions";
import toast from "react-hot-toast";
import Loader from "../Components/Notfications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import {
  LanguageData,
  RatesData,
  TimesData,
  YearData,
} from "../Data/FilterData";
import { useParams } from "react-router-dom";

function MoviesPage() {
  const { search } = useParams();
  const dispatch = useDispatch();
  const [year, setYear] = useState(YearData[0]);
  const [times, setTimes] = useState(TimesData[0]);
  const [rates, setRates] = useState(RatesData[0]);
  const [language, setLanguage] = useState(LanguageData[0]);

  // all movies
  const { isLoading, isError, movies } = useSelector(
    (state) => state.getAllMovies
  );
  // queries
  const queries = useMemo(() => {
    const query = {
      time: times ? times.title.replace(/\D/g, "") : "",
      year: year ? year.title.replace(/\D/g, "") : "",
      rate: rates ? rates.title.replace(/\D/g, "") : "",
      language: language
        ? language.title === "Sort by language"
          ? ""
          : language.title
        : "",
      search: search ? search : "",
    };
    return query;
  }, [times, year, rates, language, search]);
  // useEffect
  useEffect(() => {
    // errors
    if (isError) {
      toast.error(isError);
    }
    //get all movie
    dispatch(getAllMoviesAction(queries));
  }, [dispatch, isError, queries]);

  const datas = {
    language: language,
    setLanguage: setLanguage,
    rates: rates,
    setRates: setRates,
    times: times,
    setTimes: setTimes,
    year: year,
    setYear: setYear,
  };
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filters data={datas} />
        <p className="text-lg font-medium my-6">
          Total{" "}
          <span className="font-bold text-subMain">
            {movies ? movies?.length : 0}
          </span>{" "}
          items Found{search && `for "${search}"`}
        </p>
        {isLoading ? (
          <div className={"w-full gap-6 flex-colo min-h-screen"}>
            <Loader />
          </div>
        ) : movies?.length > 0 ? (
          <>
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
              {movies.map((movie, index) => (
                <Movie key={index} movie={movie} />
              ))}
            </div>
          </>
        ) : (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <div className="w-24 h-24 p-5 rounded-full mb-4 bg-main text-subMain text-4xl flex-colo">
              <RiMovie2Line />
            </div>
            <p className="text-border text-sm">
              It seem like we dont have movie
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MoviesPage;
