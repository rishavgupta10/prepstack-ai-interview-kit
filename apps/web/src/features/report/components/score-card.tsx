interface Props {
  label: string;
  score: number;
}

export function ScoreCard({
  label,
  score,
}: Props) {

  return (
    <div
      className="
      border
      rounded-lg
      p-6
      "
    >

      <p
        className="
        text-sm
        text-gray-500
        "
      >
        {label}
      </p>

      <h2
        className="
        text-3xl
        font-bold
        "
      >
        {score}/5
      </h2>

    </div>
  );
}