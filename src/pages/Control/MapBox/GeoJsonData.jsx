import { useEffect } from 'react';
import { getMapAction } from '../../../stores/map/actionMap';
import { useDispatch, useSelector } from 'react-redux';

export default function GeoJSONData() {
	const dispatch = useDispatch();
	const { dataMap } = useSelector((state) => state.map);

	useEffect(() => {
		dispatch(getMapAction());
	}, [dispatch]);

	const features = [];

	for (const province_data of dataMap) {
		const province_id = province_data["id"];
		const province_name = province_data["name"];
		const province_type = province_data["type"];
		const province_code = province_data["code"];
		const province_geometry = province_data["geometry"];
		const province_fullname = province_data["full_name"]
		const feature = {
			"type": "Feature",
			"properties": {
				"id": province_id,
				"name": province_name,
				"type": province_type,
				"code": province_code,
				"full_name": province_fullname,
			},
			"geometry": province_geometry,
		};
		features.push(feature);
	}

	const geojson = {
		"type": "FeatureCollection",
		"features": features,
	};

	return geojson
}
