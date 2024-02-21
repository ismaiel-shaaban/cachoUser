import React from "react";
import NewStores from "./NewStores/NewStores";
import NearbyStores from "./NearbyStores/NearbyStores";
import HotOffers from "./HotOffers/HotOffers";

function Stores() {
  return (
    <>
      <section className="bg-white pb-[49px]">
        <div className="main-container">
          
          <NewStores />
          <NearbyStores />
        </div>
      </section>
    </>
  );
}

export default Stores;
