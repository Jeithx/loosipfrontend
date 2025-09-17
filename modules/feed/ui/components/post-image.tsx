interface PostImageProps {
  image?: string;
}

const PostImage = ({ image }: PostImageProps) => {
  if (!image) return null;
  return (
    <>
      {image && (
        <div className="w-full aspect-[4/3] bg-gray-100 relative">
          <img
            src={image}
            alt="post"
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </>
  );
};

export default PostImage;
