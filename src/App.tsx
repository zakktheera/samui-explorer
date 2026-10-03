import { Header } from "./components/Header";
import { PlaceCard } from "./components/PlaceCard";
import places from "./data/places.json";
import { useEffect, useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArea, setSelectedArea] = useState("All");
  const [savedPlaceIds, setSavedPlaceIds] = useState<number[]>(() => {
    const storedIds = localStorage.getItem("savedPlaceIds")
    return storedIds?JSON.parse(storedIds):[]
  });
  useEffect(() => {
    localStorage.setItem(
      "savedPlaceIds",
      JSON.stringify(savedPlaceIds)
    )
  }, [savedPlaceIds]);
  const [placeNotes, setPlaceNotes] = useState<Record<number, string>>(() => {
    const storedNotes = localStorage.getItem("placeNotes")
    return storedNotes?JSON.parse(storedNotes):{}
  });
  useEffect(() => {
    localStorage.setItem(
      "placeNotes",
      JSON.stringify(placeNotes)
    )
  },[placeNotes])
  const [temperature, setTemperature] = useState<number | null>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const [weatherError, setWeatherError] = useState("");

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=9.54&longitude=100.01&current=temperature_2m",
        );
        if (!response.ok) {
          throw new Error("Weather request failed");
        }

        const data: {
          current: {
            temperature_2m: number;
          };
        } = await response.json();

        setTemperature(data.current.temperature_2m);
      } catch {
        setWeatherError("Unable to load the weather");
      } finally {
        setIsWeatherLoading(false);
      }
    };

    loadWeather();
  }, []);
  const savedPlaces = places.filter((place) =>
    savedPlaceIds.includes(place.id),
  );
  const filteredPlaces = places.filter((place) => {
    const normalizedPlaceName = place.name.toLowerCase();
    const normalizedTextInput = searchTerm.toLowerCase();
    const matchedSearch = normalizedPlaceName.includes(normalizedTextInput);
    const matchedCategory =
      selectedCategory === "All" || place.category === selectedCategory;
    const matchedArea = selectedArea === "All" || place.area === selectedArea;

    return matchedSearch && matchedCategory && matchedArea;
  });
  const toggleSavedPlace = (placeId: number) => {
    setSavedPlaceIds((currentIds) => {
      if (currentIds.includes(placeId)) {
        return currentIds.filter((id) => id !== placeId);
      }

      return [...currentIds, placeId];
    });
  };
  const updatePlaceNote = (placeId: number, note: string) => {
    setPlaceNotes((currentNotes) => ({
      ...currentNotes,
      [placeId]: note,
    }));
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-6 text-zinc-900 sm:px-6 lg:px-8">
      <Header />
      <main className="mx-auto max-w-6xl space-y-8 pt-8">
        <section aria-labelledby="weather-heading">
          <h2
            id="weather-heading"
            className="text-lg font-semibold text-zinc-950"
          >
            Koh Samui Weather
          </h2>

          {isWeatherLoading && (
            <p className="text-sm text-zinc-600">Loading weather...</p>
          )}

          {weatherError && (
            <p className="text-sm text-zinc-700">{weatherError}</p>
          )}

          {!isWeatherLoading && !weatherError && temperature !== null && (
            <p className="font-medium text-cyan-900">
              Current temperature: {temperature}°C
            </p>
          )}
        </section>
        <section
  aria-labelledby="saved-heading"
  className="border-y border-zinc-200 bg-white px-5 py-5"
>
  <div className="flex items-center justify-between">
    <h2
      id="saved-heading"
      className="text-xl font-bold text-zinc-950"
    >
      Saved Places
    </h2>

    <span className="text-sm text-zinc-500">
      {savedPlaces.length} saved
    </span>
  </div>

  {savedPlaces.length === 0 ? (
    <p className="mt-2 text-sm text-zinc-500">
      No saved places yet
    </p>
  ) : (
    <ul className="mt-4 grid list-none gap-4 p-0 sm:grid-cols-2">
      {savedPlaces.map((place) => (
        <li
          key={place.id}
          className="rounded-lg border border-zinc-200 bg-zinc-50 p-4"
        >
          <p className="font-semibold text-zinc-900">
            {place.name}
          </p>

          <label
            htmlFor={`note-${place.id}`}
            className="mt-3 block text-sm font-medium text-zinc-700"
          >
            Personal note
          </label>

          <textarea
            id={`note-${place.id}`}
            value={placeNotes[place.id] ?? ""}
            placeholder="Try this on Saturday"
            onChange={(e) =>
              updatePlaceNote(place.id, e.currentTarget.value)
            }
            className="mt-2 min-h-24 w-full resize-y rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
          />
        </li>
      ))}
    </ul>
  )}
</section>
        <section aria-labelledby="explore-heading">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium text-emerald-700">Discover the island</p>
              <h2 id="explore-heading" className="text-2xl font-bold text-zinc-950">Explore places</h2>
            </div>
          <p className="text-sm text-zinc-500">
            {filteredPlaces.length} places
          </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
            <label className="space-y-2 text-sm font-medium text-zinc-700">
              Search places
              <input
                id="search-places"
                type="search"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.currentTarget.value)}
                className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-zinc-700">
              Category 
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.currentTarget.value)}
                className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              >
              <option value="All">All</option>
              <option value="Restaurant">Restaurant</option>
              <option value="Activity">Activity</option>
              <option value="Wellness">Wellness</option>
              </select>
            </label>
            <label className="space-y-2 text-sm font-medium text-zinc-700">
              Area 
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.currentTarget.value)}
                className="block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-zinc-950 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              >
              <option value="All">All</option>
              <option value="Maenam">Maenam</option>
              <option value="Bophut">Bophut</option>
              <option value="Samui Nearby">Samui Nearby</option>
              </select>
            </label>
          </div>
        </section>
        {filteredPlaces.length === 0 && <p className="border border-dashed border-zinc-300 px-4 py-8 text-center text-zinc-500">No places found</p>}
        <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlaces.map((place) => {
            return (
              <li key={place.id}>
                <PlaceCard
                  id={place.id}
                  name={place.name}
                  category={place.category}
                  area={place.area}
                  description={place.description}
                  price={place.price}
                  contact={place.contact}
                  mapsUrl={place.mapsUrl}
                  imageUrl={place.imageUrl}
                  isSaved={savedPlaceIds.includes(place.id)}
                  onToggleSaved={() => toggleSavedPlace(place.id)}
                />
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
