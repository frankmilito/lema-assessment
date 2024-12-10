type CardProps = {
  title: string;
  content: string;
  onDelete: VoidFunction;
};

const Card = ({ title, content, onDelete }: CardProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 ">{title}</h2>
        {onDelete && (
          <button
            className="text-gray-400 hover:text-red-500"
            onClick={onDelete}
          >
            <img src="/actions.svg" alt="" width={20} height={20} />
          </button>
        )}
      </div>
      <p className="text-gray-600 text-sm ">{content}</p>
    </div>
  );
};

export default Card;
