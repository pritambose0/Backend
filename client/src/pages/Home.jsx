import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import axiosInstance from "../services/axiosInstance";
import { Link } from "react-router-dom";

function Home() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setError("");
    axiosInstance
      .get("/videos")
      .then((res) => {
        setVideos(res.data?.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // console.log("VIDEOS", videos);

  return (
    <>
      <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        {error && (
          <div className="flex h-full items-center justify-center text-center">
            <h1 className="text-2xl font-bold text-red-500">Error Occurred </h1>
          </div>
        )}
        {loading ? (
          <div className="flex h-screen items-center justify-center text-center">
            <h1 className="text-2xl font-bold">Loading...</h1>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
            {videos?.map((video) => (
              <Link to={`videos/${video._id}`} key={video._id}>
                <VideoCard
                  duration={Math.round(video.duration)}
                  author={video.owner[0]?.fullName}
                  avatar={video.owner[0]?.avatar}
                  thumbnailSrc={video.thumbnail?.url}
                  title={video.title}
                  views={video.views}
                  timeAgo={video.createdAt}
                />
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Home;
