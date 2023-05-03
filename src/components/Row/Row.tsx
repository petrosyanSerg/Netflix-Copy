import { useState, useEffect, useRef, RefObject } from "react";
import YouTube from "react-youtube";
import { IoIosClose } from "react-icons/io";
import movieTrailer from "movie-trailer";

import "./Row.scss";
import { axiosReq } from "src/assets";
import { IRowMovie } from "src/assets/types/interfaces";

interface IRowProps {
  title: string;
  fetchUrl: string;
  islargeRow: boolean;
}

const base_url: string = "https://image.tmdb.org/t/p/w500/";

export default function Row({ title, fetchUrl, islargeRow }: IRowProps) {
  const [movies, setmovies] = useState<IRowMovie[]>([]);
  const [trailerUrl, settrailerUrl] = useState<string>("");
  const [timeToPlay, settimeToPlay] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const request = await axiosReq.get(fetchUrl);
      setmovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "490",
    width: "60%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie: IRowMovie) => {
    if (trailerUrl) {
      settrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || "")
        .then((url: string) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          settrailerUrl(urlParams.get("v")!);
        })
        .catch((err: Error) => console.log(err));
    }
  };

  const elRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const el = elRef.current;

    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 3,
          behavior: "smooth",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters" ref={elRef as RefObject<HTMLDivElement>}>
        {movies.map((movie) => {
          return (
            <img
              className={`row__poster ${islargeRow && "row_posterlarge"}`}
              key={movie.id}
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                handleClick(movie);
                settimeToPlay(true);
              }}
              src={`${base_url}${
                islargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.title}
            />
          );
        })}
      </div>
      {trailerUrl && timeToPlay && (
        <div className="video_box">
          <span
            onClick={() => {
              settimeToPlay(false);
            }}
          >
            <IoIosClose />
          </span>
          <YouTube
            videoId={trailerUrl}
            onEnd={() => settimeToPlay(false)}
            opts={opts}
            className="player"
          />
        </div>
      )}
    </div>
  );
}
