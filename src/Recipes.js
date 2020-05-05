import React, { Component } from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';


class Recipes extends React.Component{

function(){
<Query

query={gql`
  
  {
    recipes{
      id
      title
    }
  }
  `}>

    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p> Something went wrong</p>

      return (
        <ul>
          {data.recipes.map(({ id, title}) => 
          <li key={id}>{title}</li>
          )}
        </ul>
      )
    }}

  </Query>

}}

export default Recipes; 