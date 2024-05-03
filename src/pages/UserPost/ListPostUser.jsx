import { useParams } from 'react-router-dom';
import useGetData from '../../hooks/useGetData';
import { useEffect, useState } from 'react';
import CardPost from '../../components/molecules/CardPost';
import { Button, Modal } from 'flowbite-react';
import { useFormik } from 'formik';
import { instance } from '../../utils/instance';
import { toast } from 'react-toastify';

const ListPostUser = () => {
  const params = useParams();
  const { isLoading, data } = useGetData();
  const [userData, setUserData] = useState({});
  const [postData, setPostData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const resultData = await data(`users/${params.id}`);
      const resultPost = await data(`posts?userId=${params.id}`);

      if (data) {
        setUserData(resultData);
        setPostData(resultPost);
      } else {
        console.log(resultData);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // POST DATA
  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
      userId: params.id,
    },
    onSubmit: async (values) => {
      try {
        const res = await instance.post('posts', values);
        setOpenModal(false);
        // add to begining
        setPostData([{ ...values, id: res.data.id }, ...postData]);
        toast.success('Success add new post');
        formik.resetForm();
      } catch (error) {
        toast.error('Failed post, try again later');
      }
    },
  });

  // DELETE DATA
  const handleDelete = async (id) => {
    const confirmation = confirm('Are you sure you want to delete this post?');
    if (!confirmation) {
      return;
    }
    try {
      await instance.delete(`posts/${id}`);
      setPostData(postData.filter((item) => item.id !== id));
      toast.success('Success delete post');
    } catch (error) {
      console.log(error);
      toast.error('Failed delete post');
    }
  };

  // EDIT DATA

  return (
    <>
      <h1 className="text-center my-5 font-bold text-3xl">
        Post by {userData.name}
      </h1>

      <div className="flex justify-end">
        <Button onClick={() => setOpenModal(true)} className="my-5">
          Add Post
        </Button>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add Post {userData.name}</Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit} className=" mx-auto">
            <div className="mb-5">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                onChange={formik.handleChange}
                type="text"
                id="title"
                name="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Body
              </label>
              <textarea
                onChange={formik.handleChange}
                name="body"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Decline
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {isLoading
          ? 'Loading...'
          : postData.map((item) => {
              return (
                <CardPost
                  postData={postData}
                  setPostData={setPostData}
                  handleDelete={handleDelete}
                  id={item.id}
                  title={item.title}
                  body={item.body}
                  key={item.id}
                  userId={params.id}
                />
              );
            })}
      </div>
    </>
  );
};

export default ListPostUser;
