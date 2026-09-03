interface Props {
  role: string;
  status: string;
}

export function InterviewCard({
  role,
  status,
}: Props) {

  return (
    <div
      className="
      border
      rounded-lg
      p-4
      "
    >

      <h3
        className="
        font-semibold
        "
      >
        {role}
      </h3>

      <p>
        {status}
      </p>

    </div>
  );
}