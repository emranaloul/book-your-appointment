import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { If, Then, Else } from "react-if";

const Acl = (props) => {
  const context = useContext(AuthContext);
  let okToRender = false;

  try {
    okToRender =
      context.loggedIn && props.role ? props.role === "Admin" : false;
  } catch (error) {
    console.error("not Authorized");
  }
  return (
    <If condition={okToRender}>
      <Then>{props.children}</Then>
    </If>
  );
};

export default Acl;
