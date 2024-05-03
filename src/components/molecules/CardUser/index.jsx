import { Link } from 'react-router-dom';

const CardUser = ({
  name,
  username,
  email,
  street,
  suite,
  city,
  zipCode,
  website,
  company,
  id,
}) => {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5">
      <div className="flex flex-col items-center text-center justify-between">
        <div className="flex flex-col items-center text-center">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="/assets/images/default.jpeg"
            alt="user-image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {name} ({username})
          </h5>
          <Link
            to={`mailto:${email}`}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            {email}
          </Link>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center">
            {street}, {suite}, <br />
            {city}, {zipCode}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Company : {company}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Website :{' '}
            <Link
              className="hover:text-blue-500 hover:underline"
              target="_blank"
              to={'https://' + website}
            >
              {website}
            </Link>
          </span>
        </div>
        <div className="flex mt-4 md:mt-6 gap-3">
          <Link
            to={`/post/${id}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Detail Post
          </Link>
          <Link
            to={`/album/${id}`}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Album
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardUser;
