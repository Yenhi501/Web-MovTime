import { Carousel, Row } from "antd";
import { CarouselRef } from "antd/es/carousel";
import { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ListEpisodesType } from "../index";
import "./index.scss";

export const EspList = ({ listEpisodes,watchingData }: ListEpisodesType) => {
  const { episodeId } = useParams();
  const listRef = useRef<CarouselRef>(null);
  return (
    <div className="list-esp">
      <Carousel className="list-content" dots={false} ref={listRef}>
        <div>
          <Row justify="center">
          <Link to={`/movie/trailer/${watchingData.movieId}`}>
              <div className="items-esplist">
                <img src={watchingData.backgroundURL} alt="" className="poster-item" />

                <div
                  className={`item-esplist ${
                    episodeId === "trailer" ? "current-item" : ""
                  }`}
                >
                  <span>Trailer</span>
                </div>
              </div>
            </Link>
            {listEpisodes?.map((value) => (
              <Link to={`/movie/${value.movie_id}/${value.episode_id}`}>
                <div className="items-esplist">
                  <img src={value.poster_url} alt="" className="poster-item" />

                  <div
                    className={`item-esplist ${
                      episodeId !== undefined &&
                      value.episode_id !== undefined &&
                      value.episode_id === parseInt(episodeId)
                        ? "current-item"
                        : ""
                    }`}
                  >
                    <span>{value.title}</span>
                    {/* <div> {moment(value.release_date).format('YYYY')}</div> */}
                    <span>{value.duration} phút</span>
                    {/* {value.num_view} */}
                  </div>
                </div>
              </Link>
            ))}
          </Row>
        </div>
      </Carousel>
    </div>
  );
};
