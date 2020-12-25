import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const AUTH = 'f884055f9c494705b782ef621c6b663f';

  /** Defines the type of a Spotify playlist object. */
  type Playlist = {
    collaborative: boolean,
    description: string,
    external_urls: any,
    href: string,
    id: string,
    images: any,
    name: string,
    owner: any,
    public: boolean | null,
    snapshot_id: string,
    tracks: any,
    type: string,
    uri: string
  }

  /** Defines the type of a Spotify artist object. */
  type Artist = {
    external_urls: any,
    href: string,
    id: string,
    name: string,
    type: string,
    uri: string
  }

  /** Defines the type of a Spotify track object. */
  type Track = {
    album: any,
    artists: Artist[],
    available_markets: string[],
    disc_number: number,
    duration_ms: number,
    explicit: boolean,
    external_ids: any,
    external_urls: any,
    href: string,
    id: string,
    is_playable: boolean,
    linked_from: any,
    restrictions: any,
    name: string,
    popularity: number,
    preview_url: string,
    track_number: number,
    type: string,
    uri: string
  }

  /** Defines the type of a Spotify playlist track object. */
  type PlaylistTrack = {
    added_at: any,
    added_by: any,
    is_local: boolean,
    track: Track
  }

  /** Defines the type of a Spotify audio features object. */
  type AudioFeatures = {
    duration_ms: number,
    key: number,
    mode: number,
    time_signature: number,
    acousticness: number,
    danceability: number,
    energy: number,
    instrumentalness: number,
    liveness: number,
    loudness: number,
    speechiness: number,
    valence: number,
    tempo: number,
    id: string,
    uri: string,
    track_href: string,
    analysis_url: string,
    type: string
  }

  /** Get playlists by user ID. 
   * 
   * Returns a max of 50 playlists as an array of Playlist objects.
  */
  const getPlaylistsById = async (userId: string) => {
    await fetch(`https://api.spotify.com/v1/users/${userId}/playlists?limit=50`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': AUTH
        }
      }
    )
      .then(res => res.json())
      .then(json => json.items)
      .catch(error => console.log(`Error getting playlists by user id (${userId}): ${error}`))
  }

  /** Get playlist id by playlist name.
   * 
   * Filters through a user's playlists (max 50 playlists) and returns the 
   * id of the first one matching [name]. Raises exception if no such playlist 
   * exists.
   */
  const getPlaylistIdByName = (name: string, playlists: Playlist[]) => {
    const playlistArr: Playlist[] = playlists.filter(playlist => playlist.name === name)
    if (playlistArr.length === 0) {
      throw new Error(`Error getting playlist id by name: the playlist ${name} does not exist.`)
    }
    else {
      return playlistArr[0].id;
    }
  }

  /** Get full details of the tracks in a playlist by playlist id. 
   * 
   * Returns a max of 100 tracks as an array of Track objects. 
  */
  const getTracksByPlaylistId = async (id: string) => {
    await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': AUTH
        }
      }
    )
      .then(res => res.json())
      .then(json => json.items)
      .then((playlistTracks: PlaylistTrack[]) => playlistTracks.map(
        (playlistTrack: PlaylistTrack) => playlistTrack.track)
      )
      .catch(error => console.log(`Error getting tracks by playlist id (${id}): ${error}`))

  }

  /** Get audio feature information for a track by track id.
   * 
   * Returns information as an AudioFeature object.
   */
  const getAudioFeaturesByTrackId = async (id: string) => {
    await fetch(`https://api.spotify.com/v1/audio-features/${id}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': AUTH
        }
      }
    )
      .then(res => res.json())
      .catch(error => console.log(`Error getting audio features by track id (${id}): ${error}`))
  }

  /** Get the following mean audio features for an array of Audio Feature 
   * objects: duration, key, mode, time signature, acousticness, danceability, 
   * energy, instrumentalness, liveness, loudness, speechiness, valence, 
   * and tempo. 
   * 
   * Returns information as a single JSON object.
   *  */
  const getMeanAudioFeatures = (objs: []) => {
    const result: { [key: string]: number } = {
      duration: 0,
      key: 0,
      mode: 0,
      timeSig: 0,
      acousticness: 0,
      danceability: 0,
      energy: 0,
      instrumentalness: 0,
      liveness: 0,
      loudness: 0,
      speechiness: 0,
      valence: 0,
      tempo: 0
    }

    for (let obj of objs) {
      for (let k in result) {
        result[k] += obj[k];
      }
    }

    for (let k in result) {
      result[k] = result[k] / objs.length;
    }

    return result;

  }

  /** Randomly selects 5 tracks from an array of Track objects and returns 
   * an array of their ids.
   * 
   * Requires: [tracks] is an array of size >= 5.
   */
  const generateTrackSeeds = (tracks: Track[]) => {
    const result: string[] = []
    for (let i = 0; i < 5; i++) {
      let num = Math.floor(Math.random() * 5);
      result.push(tracks[num].id)
    }
    return result;
  }

  /** Get recommended tracks based on 5 seed tracks and audio features. 
   * 
   * Returns an array of objects representing the recommended tracks. 
  */
  const getTrackRecs = async (seeds: string[],
    features: { [key: string]: number }) => {
    await fetch(`https://api.spotify.com/v1/recommendations?
    seed_tracks=${seeds[0]},${seeds[1]},${seeds[2]},${seeds[3]},${seeds[4]}&
    acousticness=${features.acousticness}&danceability=${features.danceability}&
    duration_ms=${features.duration}&energy=${features.energy}&
    instrumentalness=${features.instrumentalness}&key=${features.key}&
    liveness=${features.liveness}&loudness=${features.loudness}&
    mode=${features.mode}&popularity=${features.popularity}&
    speechiness=${features.speechiness}&tempo=${features.tempo}&
    time_signature=${features.timeSig}&valence=${features.valence}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': AUTH
        }
      }
    )
      .then(res => res.json())
      .then(json => json.tracks)
      .then((tracks: Track[]) => tracks.map((track: Track) => ({
        id: track.id,
        name: track.name,
        uri: track.uri,
        artist: track.artists[0]
      })))
      .catch(error => console.log(`Error getting track recommendations: ${error}`))
  }

  /** Create a new playlist with no tracks for a Spotify user by user id.
   * 
   * Returns the id of the new playlist.
   */
  const createPlaylistByUserId = async (id: string, requestBody: any) => {
    await fetch(`https://api.spotify.com/v1/users/${id}/playlists`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': AUTH
        },
        body: JSON.stringify(requestBody)
      }
    )
      .then(res => res.json())
      .then(json => json.id)
      .catch(error => console.log(`Error creating playlist by user id (${id}): ${error}`))
  }

  /** Add tracks to a playlist using the playlist id.
   * 
   * Returns a snapshot id of the playlist after it has been updated. 
   */
  const addTracksToPlaylist = async (id: string, requestBody: any) => {
    await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': AUTH
        },
        body: JSON.stringify(requestBody)
      }
    )
      .then(res => res.json())
      .catch(error => console.log(`Error adding tracks to playlist by id (${id}): ${error}`))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
