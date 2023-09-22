import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, message } from "antd";
import usePostsApi from "../../../service/post";

const EditPost = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef(null);
  const { editPost, getOnePostById } = usePostsApi();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [title, setTitle] = useState("");

  useEffect(() => {
    getOnePostById(id).then((res) => setData(res.data));
  }, []);

  const editPostFunc = async () => {
    if (editorRef.current && title.length > 0) {
      try {
        setIsLoading(true);
        const res = await editPost(
          {
            title,
            body: editorRef.current.getContent(),
            user_id: localStorage.getItem("my_id"),
          },
          id
        );

        const data = res.data;
        data && message.success("Post edited successfully");
        data.length && setIsLoading(false);
        return navigate("/");
      } catch (error) {
        setIsLoading(false);
        message.error(error.message);
        console.log(error);
      }
    } else {
      message.error("Please fill all inputs!");
    }
  };

  if (!localStorage.getItem("token")) {
    return <Navigate to="/sign-in" />;
  }
  return (
    <div className="w-full max-w-[800px] mx-auto">
      <input
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        className="mt-[50px] mb-7 p-2 px-4 focus:ring-0 focus:outline-none border-gray-300 rounded-lg w-full placeholder:text-gray-300 placeholder:text-[30px] text-[30px]"
        placeholder="Post title"
        required
        value={title}
      />
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={data?.body}
        init={{
          height: 300,
          menubar: false,
          plugins: [
            "a11ychecker",
            "advlist",
            "advcode",
            "advtable",
            "autolink",
            "checklist",
            "export",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "powerpaste",
            "fullscreen",
            "formatpainter",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | casechange blocks | bold italic backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />

      <Button
        className="w-full p-5 flex items-center justify-center text-[18px] mt-[30px]"
        type="primary"
        onClick={() => editPostFunc()}
        loading={isLoading}
        disabled={isLoading}
      >
        Edit post
      </Button>
    </div>
  );
};

export default EditPost;
