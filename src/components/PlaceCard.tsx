import {Link} from 'react-router'
type PlaceCardProps = {
    name: string,
    description: string,
    price: string,
    category: string,
    area: string,
    mapsUrl: string,
    imageUrl: string,
    contact: string,
    isSaved: boolean,
    id: number
    onToggleSaved: () => void
}

export const PlaceCard = ({id,name,category,area,description,price,mapsUrl,imageUrl,contact,isSaved,onToggleSaved}:PlaceCardProps) => {
    return (
  <article className="flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
    <img
      src={imageUrl}
      alt={name}
      className="aspect-4/3 w-full object-cover"
    />

    <div className="flex flex-1 flex-col p-5">
      <div className="flex items-center gap-2 text-xs font-semibold">
        <span className="text-emerald-700">{category}</span>
        <span className="text-zinc-300">|</span>
        <span className="text-zinc-500">{area}</span>
      </div>

      <h2 className="mt-2 text-xl font-bold text-zinc-950">
        {name}
      </h2>

      <p className="mt-3 text-sm leading-6 text-zinc-600">
        {description}
      </p>

      <p className="mt-4 font-semibold text-zinc-900">
        {price}
      </p>

      <details className="mt-4 border-t border-zinc-100 pt-3">
        <summary className="cursor-pointer text-sm font-medium text-zinc-700">
          View details
        </summary>
        <p className="mt-2 text-sm text-zinc-600">
          Contact: {contact}
        </p>
      </details>

      <div className="mt-auto flex items-center gap-3 pt-5">
                    <Link
                        to={`/places/${id}`}
                        className='text-sm font-semibold text-emerald-700 hover-text-emerald-900'>
                        View place
                    </Link>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
        >
          Directions
        </a>

        <button
          type="button"
          onClick={onToggleSaved}
          className={`ml-auto rounded-md px-3 py-2 text-sm font-semibold ${
            isSaved
              ? "bg-zinc-200 text-zinc-800 hover:bg-zinc-300"
              : "bg-emerald-700 text-white hover:bg-emerald-800"
          }`}
        >
          {isSaved ? "Remove from saved" : "Save place"}
        </button>
      </div>
    </div>
  </article>
)
}