import Link from "next/link"

const types = [
    "zakelijk-vervoer",
    "vip-vervoer",
    "minivan-luxery",
    "ladies-taxi",
]

export default function VervoerTypeOverview() {
  return (
    <ul>
      {types.map(type => (
        <li key={type}>
          <Link href={`/nl/vervoerstype/${type}`}>
            {type}
          </Link>
        </li>
      ))}
    </ul>
  )
}
