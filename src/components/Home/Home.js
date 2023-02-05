import React from 'react';
import ResponsiveAppBar from '../AppBar/AppBar';
import { Recipes } from '../Recipes/Recipes';

export const Home = () => {
  return (
    <>
      <ResponsiveAppBar />
      <Recipes />
    </>
  );
};
