import { Link, useParams } from "react-router"
import places from "../data/places.json"
import { useState } from "react"

export const PlaceDetails = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const { placeId } = useParams()
    const place = places.find(
        (place)=>place.id === Number(placeId)
    )
    if (!place) {
        return (
            <main className="min-h-screen bg-zinc-50 px-4 py-8">
                <p className="text-center text-zinc-600">
                    Place not found
                </p>
            </main>
        )
    }
    return (
        <main className="min-h-screen bg-zinc-50 px-4 py-8 sm:px-6">
            <article className="mx-auto max-w-4xl">
                <Link
                    to="/"
                    className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"              
                >
                    Back to places
                </Link>

                <img src={place.images[selectedImageIndex]} alt={place.name} className="mt-6 aspect-video w-full rounded-lg object-cover" />
                <div
                    className="mt-3 flex gap-3 overflow-x-auto pb-2"
                    aria-label= "Place image gallery"
                >
                    {place.images.map((image, index) => (
                        <button
                            key={image}
                            type="button"
                            onClick={() => setSelectedImageIndex(index)}
                            aria-label={`Show image ${index + 1}`}
                            aria-pressed={selectedImageIndex === index}
                            className={`shrink-0 overflow-hidden rounded-md border-2 ${selectedImageIndex === index ? "border-emerald-600" :
                                "border-transparent hover:border-zinc-300"
                                }`}
                        >
                            <img
                                src={image}
                                alt=""
                                className="h-20 w-28 object-cover"
                            
                            />
                        </button>
                    ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-2 text-sm font-semibold">
                    <span className="text-emerald-700">{place.category}</span>
                    <span className="text-zinc-300">|</span>
                    <span className="text-zinc-500">{place.area}</span>
                </div>

                <h1 className="mt-2 text-3xl font-bold text-zinc-950 sm:text-4xl">
                    {place.name}
                </h1>
                <p className="mt-5 leading-7 text-zinc-600">{place.description}</p>
                
                <dl className="mt-8 border-y border-zinc-200 py-5">
                    <div className="flex justify-between gap-4">
                        <dt className="font-medium text-zinc-500">Price</dt>
                        <dd className="font-semibold text-zinc-900">{ place.price}</dd>
                    </div>
                    <div className="mt-4 flex justify-between gap-4">
                        <dt className="font-medium text-zinc-500">Contact</dt>
                        <dd className="text-right font-semibold text-zinc-900">
                         {place.contact}
                        </dd>
                    </div>
                </dl>

                <a
                    href={place.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-block rounded-md bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800"
                
                >
                    Get directions
                </a>

            </article>
        </main>
    )
}