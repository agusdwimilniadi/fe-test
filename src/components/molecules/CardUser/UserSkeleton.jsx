const UserSkeleton = () => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5">
      <div className="flex flex-col items-center animate-pulse ">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="/assets/images/default.jpeg"
          alt="user-image"
        />
        <div className="flex flex-col gap-3 mt-3 items-center">
          <div className=" bg-gray-200 rounded-full dark:bg-gray-700 w-48 h-3"></div>
          <div className=" bg-gray-200 rounded-full dark:bg-gray-700 w-20 h-2"></div>
          <div className=" bg-gray-200 rounded-full dark:bg-gray-700 w-28 h-2"></div>
          <div className=" bg-gray-200 rounded-full dark:bg-gray-700 w-44 h-2"></div>
          <div className=" bg-gray-200 rounded-full dark:bg-gray-700 w-28 h-2"></div>
        </div>

        <div className="flex mt-4 md:mt-6">
          <button
            to="#"
            disabled
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Detail Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSkeleton;
