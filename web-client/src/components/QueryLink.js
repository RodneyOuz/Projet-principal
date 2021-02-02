import React from 'react';
import {Link} from "react-router-dom";

export const QueryLink = props =>
  <Link {...props} to={{...props.to, search: JSON.stringify(props.query)}} />;
