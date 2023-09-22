import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useUsersApi from "../../service/users";
import { Ping } from "@uiball/loaders";
import Card from "../../components/Card";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { openModalFunc } from "../../store/modalSlice";

const Profile = () => {
  const { id } = useParams();
  const { getOneUserById, followToUser } = useUsersApi();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const { openModal } = useSelector((state) => state.reducer);

  const [title, setTitle] = useState("");
  const [isFollow, setIsFollow] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getOneUserById(id).then((res) => setData(res.data));
    getOneUserById(localStorage.getItem("my_id")).then((res) => {
      res.data.followings.find((v) =>
        v.following.id === id ? setIsFollow(true) : setIsFollow(false)
      );
    });
  }, [id, isLoading]);

  const showModal = (str) => {
    dispatch(openModalFunc(true));
    setTitle(str);
  };

  const follow = async () => {
    try {
      setIsLoading(true);
      const res = await followToUser({ following_id: id });
      const data = await res.data;
      data && setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        title={title}
        open={openModal}
        width="700px"
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={() => dispatch(openModalFunc(false))}
      >
        <div className="flex flex-col gap-[10px] mt-[30px]">
          {title === "Followers"
            ? data?.followers?.map((user) => (
                <p
                  onClick={() => {
                    navigate(`/user/profile/${user.follower.id}`);
                    window.location.reload();
                  }}
                  className="p-2 px-3 cursor-pointer shadow-md rounded-lg border hover:border-black"
                >
                  {user?.follower?.username}
                </p>
              ))
            : data?.followings?.map((user) => (
                <p
                  onClick={() => {
                    navigate(`/user/profile/${user.following.id}`);
                    window.location.reload();
                  }}
                  className="p-2 px-3 cursor-pointer shadow-md rounded-lg border hover:border-black"
                >
                  {user?.following?.username}
                </p>
              ))}
        </div>
      </Modal>

      {data.id ? (
        <div className="flex gap-[40px] w-full mt-[40px] relative">
          <div className="w-full max-w-[400px] mt-[30px] fixed">
            <div className="relative">
              <div className="h-[180px]">
                <img
                  className="rounded-lg"
                  src="https://source.unsplash.com/1600x700/?nature,water"
                  alt=""
                />
              </div>
              <div className="mx-[20px] bg-[rgba(255,255,255,0.7)] shadow-md p-2 backdrop-blur-[3px] rounded-[20px] absolute bottom-[-40px] w-[calc(100%-40px)]">
                <h1 className="text-[25px] font-semibold text-center">
                  {data?.full_name}
                </h1>
                <h2 className="text-center text-[20px] font-semibold text-gray-500">
                  {data?.username}
                </h2>
              </div>
            </div>

            <div className="mt-[80px] px-8 flex items-center justify-between">
              <div className="flex items-center px-2 py-1 rounded-md">
                <p>
                  <span className="font-bold">{data?.blog.length}</span> posts
                </p>
              </div>
              <div
                onClick={() => showModal("Followers")}
                className="flex items-center px-2 py-1 cursor-pointer rounded-md hover:bg-[rgba(0,0,0,0.1)]"
              >
                <p>
                  <span className="font-bold">{data?.followers.length}</span>{" "}
                  followers
                </p>
              </div>
              <div
                onClick={() => showModal("Followings")}
                className="flex items-center px-2 py-1 cursor-pointer rounded-md hover:bg-[rgba(0,0,0,0.1)]"
              >
                <p>
                  <span className="font-bold">{data?.followings.length}</span>{" "}
                  followings
                </p>
              </div>
            </div>
            {localStorage.getItem("my_id") !== id && (
              <Button
                disabled={isFollow === true}
                loading={isLoading}
                onClick={() => follow()}
                className="mt-9 w-full"
                type="primary"
              >
                {isFollow === true ? "Followed" : "Follow"}
              </Button>
            )}
          </div>

          <div className="ml-[450px] w-full">
            {data?.blog.map((post, index) => (
              <Card
                key={index}
                {...post}
                postID={post.id}
                user={{ id, username: data?.usename }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center h-screen fixed top-0 left-0">
          <Ping className="mx-auto" size={155} speed={2} color="black" />
        </div>
      )}
    </>
  );
};

export default Profile;
