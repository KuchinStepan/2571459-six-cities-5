import {useEffect, useRef} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useAppStoreSelector, useMap} from '@hooks';
import {MarkerUrl} from '@constants';
import {Offer} from '@types';


type MapProps = {
  offers: Offer[];
  width: string;
  height: string;
  hoveredOffer?: Offer | null;
}

export function Map({offers, width, height, hoveredOffer}: MapProps){
  const mapRef = useRef<HTMLDivElement | null>(null);
  const hoveredDynamicOffer = useAppStoreSelector((state) => state.offers.hoveredOffer);
  hoveredOffer ||= hoveredDynamicOffer;
  const selectedCity = useAppStoreSelector((state) => state.app.selectedCity);
  const map = useMap(mapRef, {lat: selectedCity.location.latitude, lng: selectedCity.location.longitude, zoom: 12});

  const defaultIcon = leaflet.icon({
    iconUrl: MarkerUrl.Default,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const selectedIcon = leaflet.icon({
    iconUrl: MarkerUrl.Current,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      map.setView([selectedCity.location.latitude, selectedCity.location.longitude], 12);

      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === hoveredOffer?.id)
              ? selectedIcon
              : defaultIcon,
          })
          .addTo(map);
      });
    }
  }, [selectedIcon, defaultIcon, map, offers, hoveredDynamicOffer, selectedCity, hoveredOffer?.id]);

  return (
    <div
      style={{ height: height, width: width }}
      ref={mapRef}
    >
    </div>
  );
}
