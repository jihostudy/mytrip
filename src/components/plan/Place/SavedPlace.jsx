import React from "react";

// components
import PlaceCard from "./PlaceCard";

const SavedPlace = ({ saveClickHandler, filteredList }) => {
  return (
    <div className="flex h-full flex-col gap-2 overflow-y-scroll">
      {filteredList.map((place) => (
        <PlaceCard
          key={place.name}
          placeData={place}
          saveClickHandler={saveClickHandler}
        />
      ))}
    </div>
  );
};

export default SavedPlace;
