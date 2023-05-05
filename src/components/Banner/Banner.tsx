import { useState, useEffect } from "react";
import "./Banner.scss";
import { axiosReq, requests } from "src/assets";
import { IBannerMovie } from "src/assets/types/interfaces";

const base_url = "https://image.tmdb.org/t/p/original/";

export default function Banner() {
  const [movie, setmovie] = useState<IBannerMovie>();

  useEffect(() => {
    async function fetchData() {
      const request = await axiosReq.get(requests.fetchNetflixOriginals);
      setmovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
    }

    fetchData();
  }, []);

  function trancate(str: string, n: number): string {
    return str?.length > n ? str.slice(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${base_url}${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner__contects">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {trancate(movie?.overview!, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom"></div>
    </header>
  );
}
