interface Props {
  title: string;
  items: string[];
}

export function FeedbackList({
  title,
  items,
}: Props) {

  return (
    <div
      className="
      border
      rounded-lg
      p-6
      "
    >

      <h2
        className="
        text-xl
        font-semibold
        mb-4
        "
      >
        {title}
      </h2>

      <ul
        className="
        space-y-3
        "
      >

        {items.map(
          (
            item,
            index
          ) => (
            <li
              key={index}
            >
              • {item}
            </li>
          )
        )}

      </ul>

    </div>
  );
}