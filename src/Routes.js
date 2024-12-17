import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "screens/landing_page";
import {
ServiceTiles, 
ServiceInfoForm
} from "screens";

const Component = (props) => {

    return (
        <Routes>
            

                                                <Route path="/OMVIWellBeingServicesHub/html" element={<LandingPage {...props} title={'LandingPage'} nolistbar={true} />} />
            
                <Route path="/info1" element={<ServiceInfoForm {...props} title={'ServiceForm'} />} />
                <Route path="/services1" element={<ServiceTiles {...props} title={'Services'} />} />
        </Routes>
    )

};

export default Component;
