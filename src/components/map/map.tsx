import { useEffect, useRef } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { City, OfferType } from '../../types/offer-type';

type CityLocation = {
    city: City;
    offers: OfferType[];
    selectedOffer?: OfferType | null;
    blockMap: string;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20,40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20,40]
});

export default function Map({city, offers, selectedOffer, blockMap}: CityLocation) {
  const mapRef = useRef(null);

  const map = useMap({mapRef, city});

  useEffect(() => {
    if(map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });
        marker.setIcon(
          selectedOffer !== undefined && offer.id === selectedOffer?.id
            ? defaultCustomIcon
            : currentCustomIcon
        ).addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  return (
    <section className={`${blockMap}__map map`} ref={mapRef}/>
  );
}
