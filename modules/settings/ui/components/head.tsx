interface HeadProps {
  title: string;
  description: string;
}

const Head = ({ title, description }: HeadProps) => {
  return (
    <div className="flex flex-col items-start gap-0.5 p-2.5 pt-4 border-b border-gray-200">
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="text-base text-gray-500">{description}</p>
    </div>
  );
};

export default Head;
