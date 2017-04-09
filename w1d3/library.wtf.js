var library = {
  tracks: { t01: { id: "t01",
                   name: "Code Monkey",
                   artist: "Jonathan Coulton",
                   album: "Thing a Week Three" },
            t02: { id: "t02",
                   name: "Model View Controller",
                   artist: "James Dempsey",
                   album: "WWDC 2003"},
            t03: { id: "t03",
                   name: "Four Thirty-Three",
                   artist: "John Cage",
                   album: "Woodstock 1952"}
          },
  playlists: { p01: { id: "p01",
                      name: "Coding Music",
                      tracks: ["t01", "t02"]
                    },
               p02: { id: "p02",
                      name: "Other Playlist",
                      tracks: ["t03"]
                    }
             }
}

// adds an existing track to an existing playlist

var addTrackToPlaylist = function (trackId, playlistId) {
  var playlist = library.playlists[playlistId];
  var track = library.tracks[trackId];
  for (key in track){

    if(playlist.tracks.hasOwnProperty(track[key])){
      return;
    }
    playlist.tracks.push(track[key]);
  }
}

var returnTrack = function(proto_obj, item){
  var ret = {} // empty object
  for(var prop in proto_obj){ 
    
    ret[prop] = proto_obj[prop]; 
  }
  return ret;
}

addTrackToPlaylist("t01", "p02");

