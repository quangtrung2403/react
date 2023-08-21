export const ClickMap = (map, e) => {
	let features = map.queryRenderedFeatures(e.point, {
		layers: ['province-location'],
	});

	if (!features.length) {
		return;
	}
};