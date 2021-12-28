import React, { useEffect, useState } from "react";
export const RequestContext = React.createContext();

const Requests = (props) => {
  const [requests, setRequests] = useState([]);

  const addRequest = (request) => {
    setRequests([...requests, request]);
  };

  const update = requests =>{
    setRequests(requests);
  }

  let state = {
    requests: requests,
    addRequest: addRequest,
    update:update
  };

  return (
    <RequestContext.Provider value={state}>
      {props.children}
    </RequestContext.Provider>
  );
};

export default Requests;
