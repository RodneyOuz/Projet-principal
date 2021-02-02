import React from 'react';
import {apiGET} from "../hoc/get";

const _Users = props =>
  <div>
    {console.log(props)}
    Users page!
  </div>;

export const Dog = apiGET('/dog')(_Users);
