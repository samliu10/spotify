# Spotify Playlist Generator
An application built using the [Spotify Web API](https://developer.spotify.com/documentation/web-api/quick-start/).

## Table of Contents
1. [Overview](#Overview)
2. [Demo](#Demo)
3. [Available Scripts](#Available-Scripts)
6. [Credits](#Credits)

## Overview
### Description
Tired of listening to the same songs? This playlist generator creates a brand 
new playlist of 20 songs recommended just for you based on the songs in one of 
your current playlists. Login with your Spotify account to allow the application 
to access your library. Then just type in your Spotify user ID, the name of the 
playlist you want your recommendations based on, and the name of your new 
playlist! The details of the recommended songs show up at the bottom of the 
page, and the new playlist is automatically saved to your Spotify library. 

### Features
- Song recommendations are generated based on randomly selected 
seed tracks from the chosen playlist and the average audio features of songs 
in the playlist, e.g. danceability, acousticness, loudness, speechiness, 
energy, etc. 
- The application also supports form validation and error handling for 
calls to the Spotify Web API. 
- Authorization is supported by [React Spotify Auth](https://www.npmjs.com/package/react-spotify-auth).

## Demo
### Login Screen
<img src="/frontend/src/assets/login.png" width=450/>

### Create Playlist
<img src="/frontend/src/assets/get_recs.GIF" width=450/>

### Listen to Playlist
<img src="/frontend/src/assets/playlist.png" width=450/>

## Available Scripts
In the project directory, you can run:

### `yarn install`
Installs all dependencies.

### `yarn start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Credits
This playlist generator was created by Samantha Liu during Winter 2020. 
