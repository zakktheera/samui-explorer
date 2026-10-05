import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type PlacesContextValue = {
  savedPlaceIds: number[];
  placeNotes: Record<number, string>;
  toggleSavedPlace: (placeId: number) => void;
  updatePlaceNote: (placeId: number, note: string) => void;
};

const PlacesContext = createContext<PlacesContextValue | undefined>(undefined);

type PlacesProviderProps = {
  children: ReactNode;
};

export const PlacesProvider = ({ children }: PlacesProviderProps) => {
  const [savedPlaceIds, setSavedPlaceIds] = useState<number[]>(() => {
    const storedIds = localStorage.getItem("savedPlaceIds");
    return storedIds ? JSON.parse(storedIds) : [];
  });

  const [placeNotes, setPlaceNotes] = useState<Record<number, string>>(() => {
    const storedNotes = localStorage.getItem("placeNotes");
    return storedNotes ? JSON.parse(storedNotes) : {};
  });

  useEffect(() => {
    localStorage.setItem("savedPlaceIds", JSON.stringify(savedPlaceIds));
  }, [savedPlaceIds]);

  useEffect(() => {
    localStorage.setItem("placeNotes", JSON.stringify(placeNotes));
  }, [placeNotes]);

  const toggleSavedPlace = (placeId: number) => {
    setSavedPlaceIds((currentIds) =>
      currentIds.includes(placeId)
        ? currentIds.filter((id) => id !== placeId)
        : [...currentIds, placeId],
    );
  };

  const updatePlaceNote = (placeId: number, note: string) => {
    setPlaceNotes((currentNotes) => ({
      ...currentNotes,
      [placeId]: note,
    }));
  };

  return (
    <PlacesContext.Provider
      value={{
        savedPlaceIds,
        placeNotes,
        toggleSavedPlace,
        updatePlaceNote,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePlaces = () => {
  const context = useContext(PlacesContext);

  if (context === undefined) {
    throw new Error("usePlaces must be used inside PlacesProvider");
  }

  return context;
};