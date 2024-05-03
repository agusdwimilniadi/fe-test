import { useParams } from 'react-router-dom';
import Layout from '../../components/molecules/Layout';
import useGetData from '../../hooks/useGetData';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { instance } from '../../utils/instance';
import { toast } from 'react-toastify';
import CardComments from '../../components/molecules/CardComments';

const DetailPost = () => {
  const params = useParams();
  const { isLoading, data } = useGetData();
  const [dataAPI, setDataAPI] = useState({
    detail: {},
    comments: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const post = await data(`posts/${params.id}`);
      const comments = await data(`comments?postId=${params.id}`);

      if (data) {
        setDataAPI({
          detail: post,
          comments: comments,
        });
      } else {
        console.log(data);
      }
    };
    fetchData();
  }, [data, params.id]);

  // ADD COMMENT
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      body: '',
      postId: params.id,
    },
    onSubmit: async (values) => {
      try {
        await instance.post(`posts/${params.id}/comments`, values);
        toast.success('Success add comment');
        formik.resetForm();
        setDataAPI({
          ...dataAPI,
          comments: [values, ...dataAPI.comments],
        });
      } catch (error) {
        toast.error('Failed add comment, try again later');
      }
    },
  });

  // HANDLE DELETE COMMENT
  const handleDelete = async (id) => {
    const confirmation = confirm(
      'Are you sure you want to delete this comment?'
    );
    if (!confirmation) {
      return;
    }
    try {
      await instance.delete(`comments/${id}`);
      setDataAPI({
        ...dataAPI,
        comments: dataAPI.comments.filter((item) => item.id !== id),
      });
      toast.success('Success delete comment');
    } catch (error) {
      console.log(error);
      toast.error('Failed delete comment');
    }
  };

  // HANDLE EDIT
  const [openModalEdit, setOpenModalEdit] = useState('');

  return (
    <Layout>
      <h1 className="text-center text-3xl font-bold my-3">Detail Post</h1>
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          <div className="border p-5 rounded">
            <p>Title : {dataAPI.detail.title}</p>
            <p>Body : {dataAPI.detail.body}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="my-5">Comments:</h3>
            <form
              onSubmit={formik.handleSubmit}
              className="flex gap-3 flex-col  "
            >
              <div className="flex gap-3">
                <input
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  name="name"
                  required
                  type="text"
                  className="border p-3 rounded w-full"
                  placeholder="Name"
                />
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  name="email"
                  required
                  type="text"
                  className="border p-3 rounded w-full"
                  placeholder="Email"
                />
              </div>
              <input
                type="text"
                required
                value={formik.values.body}
                onChange={formik.handleChange}
                name="body"
                className="border p-3 rounded w-full"
                placeholder="Write a comment..."
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-3 rounded"
              >
                Comment
              </button>
            </form>
            {dataAPI.comments.map((item) => (
              <CardComments
                key={item.id}
                item={item}
                handleDelete={handleDelete}
                openModalEdit={openModalEdit}
                setOpenModalEdit={setOpenModalEdit}
                setDataAPI={setDataAPI}
                dataAPI={dataAPI}
              />
            ))}
          </div>
        </>
      )}
    </Layout>
  );
};

export default DetailPost;
