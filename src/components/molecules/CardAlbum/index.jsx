import { Button } from 'flowbite-react';

const CardAlbum = ({ title, id }) => {
  return (
    <div className="border border-gray-300 p-5 rounded flex  gap-5 flex-col justify-between">
      <h1>
        {' '}
        Album Title : <br />
        {title}
      </h1>
      <Button href={`/album/detail/${id}`} color="light">
        Detail Album
      </Button>
    </div>
  );
};

export default CardAlbum;
