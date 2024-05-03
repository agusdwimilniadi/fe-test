import { useEffect, useState } from 'react';
import CardUser from '../../components/molecules/CardUser';
import UserSkeleton from '../../components/molecules/CardUser/UserSkeleton';
import useGetData from '../../hooks/useGetData';

const ListUser = () => {
  const { data, isLoading } = useGetData();
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resultData = await data('users');
      if (data) {
        setDataUser(resultData);
      } else {
        console.log(resultData);
      }
    };
    fetchData();
  }, [data]);
  return (
    <>
      <div>
        <h1 className="text-3xl text-center my-10 font-bold">List User</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {isLoading
          ? [...Array(4)].map((_, index) => <UserSkeleton key={index} />)
          : dataUser.map((user) => {
              return (
                <CardUser
                  id={user.id}
                  city={user.address.city}
                  company={user.company.name}
                  email={user.email}
                  name={user.name}
                  street={user.address.street}
                  suite={user.address.suite}
                  username={user.username}
                  zipCode={user.address.zipcode}
                  website={user.website}
                  key={user.id}
                />
              );
            })}
      </div>
    </>
  );
};

export default ListUser;
