const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center justify-center min-h-[300px] ">
      <p className="text-md text-center">{message}</p>
    </div>
  );
};

export default EmptyState;
