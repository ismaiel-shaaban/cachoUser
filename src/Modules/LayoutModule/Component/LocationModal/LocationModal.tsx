import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import styles from "./LocationModal.module.css";
import useEventEmitter, { emitEvent } from "src/Hooks/useEventEmmiter";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Script from "next/script";
import useAuthValue, {
  getAuthValue,
  setAuthValue,
} from "src/Modules/AuthModule/Hooks/useAuthValue";
import { useRouter } from "next/router";
import Image from "next/image";
import images from "src/Assets/images";
import { strings } from "src/Utils/Localization";
import useUpdateLocationMutation from "src/Modules/AuthModule/Hooks/useUpdateLocationMutation";

const LOCATION_EVENT = "location-event";
export const locationEventModal = () => {
  emitEvent(LOCATION_EVENT);
};

function LocationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const { location, loggedIn } = useAuthValue();
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_MAP_API_KEY;
  const router = useRouter();
  const { mutate } = useUpdateLocationMutation();
  useEventEmitter(LOCATION_EVENT, () => {
    setIsOpen(true);
  });

  const handleSelect = (data: string) => {
    geocodeByAddress(data)
      .then((results: any) => getLatLng(results[0]))
      .then((latLng: any) => {
        if (loggedIn) {
          mutate(
            { latitude: latLng?.lat, longitude: latLng?.lng },
            {
              onSuccess: (response) => {
                const { status } = response;
                if (status === 200) {
                  setAuthValue({
                    ...getAuthValue(),
                    latitude: latLng?.lat,
                    longitude: latLng?.lng,
                    location: data,
                  });
                  setIsOpen(false);
                }
              },
            }
          );
          // if (router.pathname !== "/landingpage") {
          //   router.push("/landingpage");
          // }
        } else {
          setAuthValue({
            ...getAuthValue(),
            latitude: latLng?.lat,
            longitude: latLng?.lng,
            location: data,
          });
          setIsOpen(false);
        }
      })
      .catch((error: any) => console.error("Error", error));
  };
  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
      />
      {/* ===== modal box start ============ */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          open={isOpen}
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-[400px] transform overflow-hidden rounded-2xl bg-[#F4F5F9]  text-left align-middle shadow-xl transition-all">
                  <PlacesAutocomplete
                    value={currentLocation}
                    onChange={setCurrentLocation}
                    // @ts-ignore
                    onSelect={(
                      address: string,
                      placeId: string,
                      suggestion: any
                    ) => {
                      setCurrentLocation("");
                      handleSelect(suggestion?.formattedSuggestion?.mainText);
                    }}
                    debounce={500}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }: any) => (
                      <div>
                        <div className={`${styles.locationSearchBx}`}>
                          <input
                            {...getInputProps({
                              placeholder: `${strings.search_other_location}`,
                              className: "location-search-input",
                            })}
                          />
                          <div className=" absolute top-[50%] right-[35px] translate-y-[-45%]">
                            <Image
                              src={images.searchIcon}
                              alt="search pop up icon"
                              width={"16.67px"}
                              height={"16.67px"}
                            />
                          </div>
                        </div>
                        <div
                          className={`px-[24px] border-t border-t-[#D3D3D3] bg-transparent`}
                        >
                          {loading && <div>Loading...</div>}
                          {(suggestions ?? []).length !== 0 ? (
                            suggestions.map(
                              (suggestion: any, index: number) => {
                                return (
                                  <div
                                    key={`item${index}`}
                                    {...getSuggestionItemProps(suggestion, {
                                      className:
                                        "py-[8px] font-normal text-[15px] text-[#888888] cursor-pointer",
                                    })}
                                  >
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              }
                            )
                          ) : currentLocation !== "" && !loading ? (
                            <p>No Data Found</p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>

                  <button
                    type="button"
                    className="py-[15px] w-full border-t border-t-[#D3D3D3] font-semibold text-[16px] leading-[150%] text-lightPrimary"
                    onClick={() => setIsOpen(false)}
                  >
                    {strings?.close}
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* ===== modal box end ============ */}
    </>
  );
}

export default LocationModal;
