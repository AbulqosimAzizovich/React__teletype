import React, { useEffect, useState } from "react";
import usePostsApi from "../../service/post";
import Card from "../../components/Card";
import { Ping } from "@uiball/loaders";
import { Select, Input } from "antd";
import useUsersApi from "../../service/users";
import ContentLoader from "react-content-loader";

const Home = () => {
  const { getPosts } = usePostsApi();
  const { getAllUsers } = useUsersApi();
  const [data, setData] = useState([]);
  const [datas, setDatas] = useState(data);
  const [users, setUsers] = useState([]);

  const searchData = (value) => {
    setTimeout(() => {
      const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );

      setDatas(filteredData);
    }, 500);
  };

  const searchData2 = (e) => {
    e.preventDefault();
    setTimeout(() => {
      const filteredData = data.filter((item) =>
        item.user.username
          .toLowerCase()
          .includes(e.target.children[0].value.toLowerCase())
      );

      setDatas(filteredData);
    }, 500);
  };

  useEffect(() => {
    getPosts().then((res) => setData(res.data));
    getAllUsers().then((res) => setUsers(res.data));
  }, []);

  return (
    <>
      <div className="flex items-center flex-col w-[full] max-w-[800px] mx-auto gap-[10px] mt-[40px]">
        <div className="flex items-center w-full gap-[15px]">
          <input
            type="text"
            className="w-full rounded-lg"
            placeholder="Search for title..."
            onKeyUp={(e) => searchData(e.target.value)}
          />
        </div>
        <form
          onSubmit={(e) => searchData2(e)}
          className="flex items-center justify-end w-full gap-[15px]"
        >
          <input
            type="text"
            list="authors"
            className="w-[250px] rounded-lg"
            placeholder="Search for authors..."
          />
          <datalist id="authors">
            {users?.map((v) => (
              <option>{v?.username}</option>
            ))}
          </datalist>
        </form>
      </div>
      <div className="w-[full] max-w-[800px] mx-auto">
        {datas.length > 0 ? (
          datas?.map((post, index) => (
            <Card key={index} {...post} postID={post.id} />
          ))
        ) : data.length > 0 ? (
          data?.map((post, index) => (
            <Card key={index} {...post} postID={post.id} />
          ))
        ) : (
          <div className="w-full flex items-center justify-center h-screen fixed top-0 left-0">
            <Ping className="mx-auto" size={155} speed={2} color="black" />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
