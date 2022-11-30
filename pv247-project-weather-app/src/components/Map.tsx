import { FC } from 'react';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	LayersControl,
	ScaleControl
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Container } from '@mui/material';

const DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
	iconSize: [24, 36],
	iconAnchor: [12, 36]
});

L.Marker.prototype.options.icon = DefaultIcon;

const location: L.LatLngExpression = [48.84893, 17.13244];

const mapLayers = [
	{ owa: 'temp_new', name: 'Temperature' },
	{ owa: 'precipitation_new', name: 'Precipitation' },
	{ owa: 'pressure_new', name: 'Pressure' },
	{ owa: 'wind_new', name: 'Wind' },
	{ owa: 'clouds_new', name: 'Clouds' }
];
const apiKey = 'f8d581c6a5f819893fdbba63dc78bfe7';

type MapProps = {
	name: string;
	lat: number;
	lon: number;
};
const Map: FC<MapProps> = ({ name, lat, lon }) => (
	<Container sx={{ width: '100%' }}>
		<MapContainer
			center={location}
			zoom={3}
			scrollWheelZoom={false}
			style={{ height: '50vh', width: '100%' }}
		>
			<ScaleControl position="topleft" />
			<LayersControl position="topright">
				<LayersControl.Overlay name="Base Map" checked>
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				</LayersControl.Overlay>
				{mapLayers.map(({ owa, name }, k) => (
					<LayersControl.Overlay name={name} key={k}>
						<TileLayer
							url={`https://tile.openweathermap.org/map/${owa}/{z}/{x}/{y}.png?appid=${apiKey}`}
						/>
					</LayersControl.Overlay>
				))}
				<Marker position={[lat, lon]}>
					<Popup>{name}</Popup>
				</Marker>
			</LayersControl>
		</MapContainer>
	</Container>
);

export default Map;
