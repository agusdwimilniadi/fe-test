import { Button, Modal } from 'flowbite-react';
import { Link, useParams } from 'react-router-dom';
import { instance } from '../../../utils/instance';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useState } from 'react';

const CardPost = ({
  title,
  body,
  id,
  userId,
  handleDelete,
  setPostData,
  postData,
}) => {
  const params = useParams();
  const [openModalEdit, setOpenModalEdit] = useState('');
  const formikEdit = useFormik({
    initialValues: {
      title,
      body,
      userId,
    },
    onSubmit: async (values) => {
      try {
        await instance.put(`posts/${params.id}`, values);
        setOpenModalEdit('');
        // EDIT STATE AND UPDATE DATA
        setPostData(postData.map((item) => (item.id === id ? values : item)));
        formikEdit.resetForm();
        toast.success('Success edit post');
      } catch (error) {
        toast.error('Failed edit post, try again later');
      }
    },
  });
  return (
    <>
      <Modal show={openModalEdit === id} onClose={() => setOpenModalEdit('')}>
        <Modal.Header>Add Post </Modal.Header>
        <Modal.Body>
          <form onSubmit={formikEdit.handleSubmit} className=" mx-auto">
            <div className="mb-5">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formikEdit.values.title}
                onChange={formikEdit.handleChange}
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
                onChange={formikEdit.handleChange}
                name="body"
                value={formikEdit.values.body}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Save
              </button>
              <Button color="gray" onClick={() => setOpenModalEdit(false)}>
                Decline
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <div className="flex flex-col justify-between max-w-sm p-6   group bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <Link to={`/post/detail/${id}`} className="">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 line-clamp-1 dark:text-white">
            {title}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-2  transition-all">
            {body}
          </p>
        </Link>
        <br />
        <div className="grid grid-cols-2 items-center justify-center gap-3">
          <button
            onClick={() => handleDelete(id)}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Delete
          </button>
          <Button onClick={() => setOpenModalEdit(id)} className="my-5">
            Edit Post
          </Button>
        </div>
      </div>
    </>
  );
};

export default CardPost;
