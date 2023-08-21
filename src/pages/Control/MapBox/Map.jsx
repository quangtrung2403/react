import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import mapboxgl from 'mapbox-gl';
import './Map.scss';
import GeoJSONData from './GeoJsonData';
import { mapKey } from '../../../Api/param';
import { ClickMap } from '../../../components/handleClickMap';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

export default function Map() {
	mapboxgl.accessToken = mapKey;
	const mapContainer = useRef(null);
	const map = useRef(null);
	const [lng, setLng] = useState(108.1248);//kinh do
	const [lat, setLat] = useState(15.9575);// vi do
	const geojson = GeoJSONData();

	const handelClickMap = (e) => {
		ClickMap(map.current, e)
	};

	useEffect(() => {
		if (!map.current && geojson) {
			map.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: 'mapbox://styles/mapbox/streets-v12',
				center: [lng, lat],
				zoom: 4.87,
				hash: 'current-position',
				attributionControl: false,
				transformRequest: (url, resourceType) => {
					if (resourceType === 'Source' && url.startsWith('http://myHost')) {
						return {
							url: url.replace('http', 'https'),
							headers: { 'my-custom-header': true },
							credentials: 'include'
						};
					}
				}
			});

			// hiện thị khoảng cách trên mản đồ tương ứng vs khoảng cách trên mặt đất
			const scale = new mapboxgl.ScaleControl({
				minWidth: "100px",
				unit: 'imperial' // đơn vị đo km
			});
			map.current.addControl(scale, 'bottom-right');
			scale.setUnit('metric');

			//  search Map
			map.current.addControl(
				new MapboxGeocoder({
					accessToken: mapKey,
					mapboxgl: mapboxgl
				}),
			);

			// xac dinh vi tri hien tai
			map.current.addControl(new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: true
				},
				trackUserLocation: true,
				showUserHeading: true
			}), 'bottom-right')

			//  phong to man hinh
			map.current.addControl(new mapboxgl.FullscreenControl({
				container: document.querySelector('#map')
			}), 'bottom-right')

			// Add navigation control (the +/- zoom buttons)
			map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
			map.current.on('load', () => {
				map.current.addSource('province', {
					type: 'geojson',
					data: geojson
				})
				map.current.addLayer({
					id: 'province-location',
					type: 'fill',
					source: 'province',
					paint: {
						'fill-color': 'rgb(218,37,29)',
						'fill-opacity': 0.6
					}
				})
				map.current.addLayer({
					id: 'province-name',
					type: 'symbol',
					source: 'province',
					layout: {
						"text-field": ['format', ['get', 'name'], { 'font-scale': 1 }],
						'text-size': 12,
					},
					paint: {
						'text-color': '#0A3161',
					}
				});
				map.current.on('click', handelClickMap);
				const draw = new MapboxDraw({
					displayControlsDefault: false,
					controls: {
						point: true,
						line_string: true,
						polygon: true,
						trash: true
					},
				});
				map.current.addControl(draw);
			})
			map.current.on('move', () => {
				setLng(map.current.getCenter().lng.toFixed(4));
				setLat(map.current.getCenter().lat.toFixed(4));
			});
		}
	}, [geojson, lat, lng]);

	return (
		<div id='map' className='container-fluid p-0 m-0'>
			<div className="map-sidebar">
				Vĩ Độ: {lat} | Kinh Độ: {lng}
			</div>
			<div ref={mapContainer} className="map-container" />
		</div>
	);
}
