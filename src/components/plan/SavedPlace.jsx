import React from "react";

// components
import PlaceCard from "../UI/PlaceCard";

const SavedPlace = ({ saveClickHandler, filteredList }) => {
  return (
    <div className="flex h-[90%] flex-col gap-2 overflow-y-scroll">
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
