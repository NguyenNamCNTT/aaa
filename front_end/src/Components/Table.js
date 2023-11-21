import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GoEye } from "react-icons/go";
import { Link } from "react-router-dom";

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";

const Rows = (movie, i, onDeleteHandler, admin) => {
  return (
    <tr key={i}>
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={movie.titleImage}
            alt={movie?.name}
          />
        </div>
      </td>
      <td className={`${Text} truncate`}>{movie.name}</td>
      <td className={`${Text} text-center`}>{movie.category}</td>
      <td className={`${Text} text-center`}>{movie.language}</td>
      <td className={`${Text} text-center`}>{movie.year}</td>
      <td className={`${Text} text-center`}>{movie.time}</td>
      <td
        className={`${Text} float-right flex-rows gap-2`}
        style={{ marginTop: "7px" }}
      >
        {admin ? (
          <>
            <Link
              to={`/edit/${movie?._id}`}
              className="border border-border bg-dry flex-rows gap-2 text-border py-1 px-2 rounded"
            >
              Edit <FaEdit className="text-green-500" />
            </Link>
            <button
              onClick={() => onDeleteHandler(movie?._id)}
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
            >
              <MdDelete className="text-green-500" />
            </button>
          </>
        ) : (
          <>
            <Link
              to={`/watch/${movie?._id}`}
              className="border border-subMain bg-dry flex-rows gap-2 text-white py-1 px-2 rounded"
            >
              Watch{" "}
              <GoEye className="bg-subMain text-white rounded flex-colo w-6 h6" />
              <Link></Link>
            </Link>
            {/* <button
              onClick={() => onDeleteHandler(movie?._id)}
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
            >
              <MdDelete/>
            </button> */}
          </>
        )}
      </td>
    </tr>
  );
};

function Table({ data, onDeleteHandler, admin }) {
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-dryGray">
            <th scope="col" className={`${Head} `}>
              Image
            </th>
            <th scope="col" className={`${Head}`}>
              Name
            </th>
            <th scope="col" className={`${Head} text-center`}>
              Category
            </th>
            <th scope="col" className={`${Head} text-center`}>
              Language
            </th>
            <th scope="col" className={`${Head} text-center`}>
              Year
            </th>
            <th scope="col" className={`${Head} text-center`}>
              TIME
            </th>
            <th scope="col" className={`${Head} text-end`}>
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((movie, i) => Rows(movie, i, onDeleteHandler, admin))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
