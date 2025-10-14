//앨범 상세

const Album = ({ params }) => {
  const { albumId } = params;
  return <div className="pt-80">{albumId}</div>;
};

export default Album;
