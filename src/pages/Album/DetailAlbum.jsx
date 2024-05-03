import { useEffect, useState } from 'react';
import Layout from '../../components/molecules/Layout';
import useGetData from '../../hooks/useGetData';
import { useParams } from 'react-router-dom';

const DetailAlbum = () => {
  const params = useParams();
  const { isLoading, data } = useGetData();
  const [photoData, setPhotoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await data(`photos?albumId=${params.id}`);

      if (data) {
        setPhotoData(res);
      } else {
        console.log(res);
      }
    };
    fetchData();
  }, [data, params.id]);
  return (
    <Layout>
      <h1 className="text-3xl text-center my-5">Detail Album</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {isLoading
          ? 'Loading...'
          : photoData.map((item) => (
              <div
                key={item.id}
                className="border p-3 flex flex-col items-center justify-center text-center"
              >
                <img src={item.thumbnailUrl} alt={`thumbnail-${item.id}`} />
                <h1>non sunt voluptatem placeat consequuntur rem incidunt</h1>
              </div>
            ))}
      </div>
    </Layout>
  );
};

export default DetailAlbum;
