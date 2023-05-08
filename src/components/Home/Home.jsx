import React from 'react';
import MenuBar from '#components/MenuBar/MenuBar';
import { Recipes } from '#components/Recipes/Recipes';
import Dialogs from '#components/Dialogs';

export const Home = () => (
  <>
    <MenuBar />
    <Recipes />
    <Dialogs />
  </>
);
