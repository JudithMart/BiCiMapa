import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

export const useDraggableMarker = ({
	mapRef,
	mapReady,
	markerPosition,
	mode = "picker",
	onLocationSelect,
}) => {
	const markerRef = useRef(null);
	const clickHandlerRef = useRef(null);

	useEffect(() => {
		if (!mapReady) return;
		if (mode !== "picker") return;

		const map = mapRef.current;
		if (!map) return;

		const syncMarker = (lng, lat) => {
			if (!markerRef.current) {
				markerRef.current = new mapboxgl.Marker({ draggable: true })
					.setLngLat([lng, lat])
					.addTo(map);

				markerRef.current.on("dragend", () => {
					const lngLat = markerRef.current?.getLngLat();

					if (!lngLat) return;

					onLocationSelect?.(lngLat.lng, lngLat.lat);
				});
			}

			markerRef.current.setLngLat([lng, lat]);
		};

		if (markerPosition?.length === 2) {
			syncMarker(markerPosition[0], markerPosition[1]);
		} else if (markerRef.current) {
			markerRef.current.remove();
			markerRef.current = null;
		}

		const handleMapClick = (e) => {
			const lng = e.lngLat.lng;
			const lat = e.lngLat.lat;

			syncMarker(lng, lat);
			onLocationSelect?.(lng, lat);
		};

		if (clickHandlerRef.current) {
			map.off("click", clickHandlerRef.current);
		}

		clickHandlerRef.current = handleMapClick;
		map.on("click", handleMapClick);

		return () => {
			if (clickHandlerRef.current) {
				map.off("click", clickHandlerRef.current);
				clickHandlerRef.current = null;
			}
		};
	}, [mapReady, mode, markerPosition, mapRef, onLocationSelect]);

	useEffect(() => {
		return () => {
			markerRef.current?.remove();
			markerRef.current = null;
		};
	}, []);
};
