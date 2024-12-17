import Helper from "shared/helper";
import { apiUrl as serverApi } from "config";

const GetEntityInfo = async (name) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}${name}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}



 


	    
	 	
	
		
/* Practitioners */

const GetPractitionersCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Practitioners/$count`;
        if (query) url = `${serverApi}Practitioners/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetPractitionersMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Practitioners`;
        if (query) url = `${serverApi}Practitioners?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetPractitionerSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Practitioners(${id})`;
        if (params) {
            url = `${serverApi}Practitioners(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetPractitionerSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.PractitionerId;
        let method = "POST";
        let url = `${serverApi}Practitioners`;
        if (input.PractitionerId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Practitioners(${input.PractitionerId})`;
        } else if (input.PractitionerId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Practitioners(${input.PractitionerId})`;
        }

        delete input['PractitionerId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.PractitionerId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   							// For Nested APIs
			/* $navPropName */

const SetPractitionerBookingJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, PractitionerId, AppointmentId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}PractitionerBookings`;
        let data = { AppointmentId, PractitionerId: PractitionerId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}PractitionerBookings(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}PractitionerBookings(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetPractitionerBookingJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}PractitionerBookings?$filter=PractitionerId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        		
	
	    
	 	
	
		
/* Appointments */

const GetAppointmentsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Appointments/$count`;
        if (query) url = `${serverApi}Appointments/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetAppointmentsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Appointments`;
        if (query) url = `${serverApi}Appointments?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetAppointmentSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Appointments(${id})`;
        if (params) {
            url = `${serverApi}Appointments(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetAppointmentSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.AppointmentId;
        let method = "POST";
        let url = `${serverApi}Appointments`;
        if (input.AppointmentId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Appointments(${input.AppointmentId})`;
        } else if (input.AppointmentId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Appointments(${input.AppointmentId})`;
        }

        delete input['AppointmentId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.AppointmentId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   		
	
	    
	 	
	
		
/* Users */

const GetUsersCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Users/$count`;
        if (query) url = `${serverApi}Users/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetUsersMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Users`;
        if (query) url = `${serverApi}Users?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetUserSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Users(${id})`;
        if (params) {
            url = `${serverApi}Users(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetUserSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.UserId;
        let method = "POST";
        let url = `${serverApi}Users`;
        if (input.UserId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Users(${input.UserId})`;
        } else if (input.UserId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Users(${input.UserId})`;
        }

        delete input['UserId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.UserId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
	
	
	    
	 	
	
		
/* Services */

const GetServicesCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Services/$count`;
        if (query) url = `${serverApi}Services/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetServicesMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Services`;
        if (query) url = `${serverApi}Services?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetServiceSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Services(${id})`;
        if (params) {
            url = `${serverApi}Services(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetServiceSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.ServiceId;
        let method = "POST";
        let url = `${serverApi}Services`;
        if (input.ServiceId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Services(${input.ServiceId})`;
        } else if (input.ServiceId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Services(${input.ServiceId})`;
        }

        delete input['ServiceId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.ServiceId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   							// For Nested APIs
			/* $navPropName */

const SetServiceSlotsJoin = async (input) => {     return new Promise(async (resolve) => {
        
        const { Id, ServiceId, PractitionerId, Deleted } = input;
        
        let method = "POST";
        let url = `${serverApi}ServiceSlotss`;
        let data = { PractitionerId, ServiceId: ServiceId };

        if (Id && !Deleted) {
            method = "PATCH";
            url = `${serverApi}ServiceSlotss(${Id})`;
        } else if (Id && Deleted) {
            method = "DELETE";
            data = {};
            url = `${serverApi}ServiceSlotss(${Id})`;
        }
        
        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.Id });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, Id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetServiceSlotsJoin = async (idValue) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}ServiceSlotss?$filter=ServiceId eq ${idValue}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		                        		
	
 


// Below is a reference function - a possible business logic for ecom reference app
const GetProductStatus = async (productId) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}ProductOnBoardings?$filter=ProductId eq ${productId}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                let _tmp = { Status: '' };
                if (json.value && json.value.length > 0) {
                    _tmp = json.value[0];
                }
                return resolve({ status: res.ok, values: _tmp });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}




const GetMetaData = async () => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}$metadata`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            if (res.status === 200) {
                const values = await res.text();
                return resolve({ status: res.ok, values });
            }

            return resolve({ status: false, statusText: "Failed fetching data" });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

/* Prodict List View Details */
const GetProductOnBoardings = async () => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}ProductOnBoardings`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

export {
 GetEntityInfo,  GetPractitionersCount, GetPractitionersMulti, GetPractitionerSingle, SetPractitionerSingle, SetPractitionerBookingJoin, GetPractitionerBookingJoin, GetAppointmentsCount, GetAppointmentsMulti, GetAppointmentSingle, SetAppointmentSingle, GetUsersCount, GetUsersMulti, GetUserSingle, SetUserSingle, GetServicesCount, GetServicesMulti, GetServiceSingle, SetServiceSingle, SetServiceSlotsJoin, GetServiceSlotsJoin, GetProductStatus, GetMetaData, GetProductOnBoardings
};
