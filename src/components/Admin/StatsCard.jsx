function StatsCard({
  title,
  value
}) {
  return (
    <div
      className="
      bg-white
      p-8
      rounded-xl
      shadow
      "
    >
      <h3 className="text-gray-500">
        {title}
      </h3>

      <div className="text-4xl font-bold mt-3">
        {value}
      </div>
    </div>
  );
}

export default StatsCard;