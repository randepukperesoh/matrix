export const TechItem = ({ item }: { item: string }) => {
  return (
    <span
      className="px-4 py-2 bg-black border border-gray-800 text-gray-300 rounded-lg"
      style={{ fontSize: "15px" }}
    >
      {item}
    </span>
  );
};
