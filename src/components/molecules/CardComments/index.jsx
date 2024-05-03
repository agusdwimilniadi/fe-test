import { Button, Modal } from 'flowbite-react';
import { useParams } from 'react-router-dom';
import { instance } from '../../../utils/instance';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

const CardComments = ({
  item,
  openModalEdit,
  setOpenModalEdit,
  handleDelete,
  setDataAPI,
  dataAPI,
}) => {
  const params = useParams();
  const formikEdit = useFormik({
    initialValues: {
      name: item.name,
      email: item.email,
      body: item.body,
      commentId: item.id,
    },
    onSubmit: async (values) => {
      try {
        await instance.put(`comments/${params.id}`, values);
        setOpenModalEdit('');
        // EDIT STATE AND UPDATE DATA
        setDataAPI({
          ...dataAPI,
          comments: dataAPI.comments.map((item) =>
            item.id === openModalEdit ? values : item
          ),
        });
        formikEdit.resetForm();
        toast.success('Success edit comment');
      } catch (error) {
        toast.error('Failed edit comment, try again later');
      }
    },
  });
  return (
    <div key={item.id} className="text-sm border p-5 flex flex-col rounded">
      <Modal
        show={openModalEdit === item.id}
        onClose={() => setOpenModalEdit('')}
      >
        <Modal.Header>Add Post </Modal.Header>
        <Modal.Body>
          <form onSubmit={formikEdit.handleSubmit} className=" mx-auto">
            <div className="mb-5">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                User
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={item.name}
                onChange={formikEdit.handleChange}
                disabled
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Comments
              </label>
              <textarea
                name="body"
                value={formikEdit.values.body}
                onChange={formikEdit.handleChange}
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
      <div>
        <p className="font-bold">{item.name}</p>
        <p className="text-gray-500 text-xs">{item.email}</p>
        <hr />
        <p className="my-3">{item.body}</p>
      </div>

      <div className="flex gap-3 items-center justify-center">
        <button
          onClick={() => setOpenModalEdit(item.id)}
          className="text-blue-500"
        >
          Edit
        </button>
        <button onClick={() => handleDelete(item.id)} className="text-red-500">
          Delete
        </button>
      </div>
    </div>
  );
};

export default CardComments;
