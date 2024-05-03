import { useParams } from 'react-router-dom';
import useGetData from '../../hooks/useGetData';
import { useEffect, useState } from 'react';
import CardAlbum from '../../components/molecules/CardAlbum';

const ListAlbum = () => {
  const params = useParams();
  const { isLoading, data } = useGetData();
  const [userData, setUserData] = useState({});
  const [albumData, setAlbumData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resultData = await data(`users/${params.id}`);
      const resultAlbum = await data(`posts?userId=${params.id}`);

      if (data) {
        setUserData(resultData);
        setAlbumData(resultAlbum);
      } else {
        console.log(resultData);
      }
    };
    fetchData();
  }, [data, params.id]);
  return (
    <div>
      <h1 className="text-center my-5 font-bold text-3xl">
        Album by {userData.name}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {isLoading
          ? 'Loading...'
          : albumData.map((item) => {
              return (
                <CardAlbum title={item.title} id={item.id} key={item.id} />
              );
            })}
      </div>
    </div>
  );
};

export default ListAlbum;
