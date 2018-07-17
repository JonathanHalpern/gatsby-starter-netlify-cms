import React from 'react';

import MapMarker from './MapMarker';

import demoFancyMapStyles from '../styles/map';

const { compose, withStateHandlers } = require('recompose');
const { withScriptjs, withGoogleMap, GoogleMap } = require('react-google-maps');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`;

const MapWithAnOverlayView = compose(
  withStateHandlers(
    ({ challengeFrontmatter }) => ({
      toggles: challengeFrontmatter.map(() => false),
    }),
    {
      onToggle: ({ toggles }) => indexToToggle => ({
        toggles: toggles.map((value, index) => {
          if (indexToToggle === index) {
            return !value;
          }
          return false;
        }),
      }),
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    defaultZoom={2}
    defaultCenter={{ lat: 10, lng: 80 }}
    defaultOptions={{ styles: demoFancyMapStyles }}
  >
    {props.challengeFrontmatter.map(
      (frontmatter, index) =>
        frontmatter.coordinates && (
          <MapMarker
            frontmatter={frontmatter}
            key={frontmatter.path}
            isToggled={props.toggles[index]}
            onToggle={() => {
              props.onToggle(index);
            }}
          />
        )
    )}
  </GoogleMap>
));

const Map = props => (
  <MapWithAnOverlayView
    googleMapURL={googleMapURL}
    loadingElement={<div style={{ height: '100%' }} />}
    containerElement={<div style={{ height: '400px' }} />}
    mapElement={<div style={{ height: '100%' }} />}
    challengeFrontmatter={props.completedChallenges.map(challenge => challenge.node.frontmatter)}
  />
);
export default Map;
