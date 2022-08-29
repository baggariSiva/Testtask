import "./styles.scss";

type ImageCardProps = {
  src: string;
};
const ImageCard = ({ src }: ImageCardProps) => {
  return (
    <div className="image-div">
      <img className="image" src={src} alt="not found"></img>
    </div>
  );
};

export default ImageCard;
