import React, { Fragment } from 'react';
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap,
    Marker
} from 'react-google-maps';
import { PositionModel } from '../Models/position.model';

const AppMaps: React.FC<PositionModel> = ({lat, lng, address}:PositionModel) => {
    return (
        <Fragment>
            <h3 className="address">Seu endereço: {address}</h3>
            <GoogleMap
                defaultZoom={16}
                defaultCenter={{lat: lat, lng:lng}} >

                <Marker position={{lat: lat, lng:lng}} />

            </GoogleMap>
        </Fragment>
    );
}


export default withScriptjs(withGoogleMap(AppMaps));


