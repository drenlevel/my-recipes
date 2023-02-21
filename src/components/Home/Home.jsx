import React from 'react';
import ResponsiveAppBar from '#components/AppBar/AppBar';
import { Recipes } from '#components/Recipes/Recipes';

export const Home = () => (
  <>
    <ResponsiveAppBar />
    <Recipes />
  </>
);
