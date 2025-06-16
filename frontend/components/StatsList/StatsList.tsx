type Stats = Record<string, number>;

interface StatsListProps {
  stats: Stats;
}

export default function StatsList({ stats }: StatsListProps) {
  return (
    <ul className="space-y-2 mb-8">
      {Object.entries(stats).map(([country, count]) => (
        <li
          key={country}
          className="flex justify-between p-3 gap-24 bg-white rounded shadow"
        >
          <span className="font-semibold uppercase">{country}</span>
          <span>{count}</span>
        </li>
      ))}
    </ul>
  );
}
