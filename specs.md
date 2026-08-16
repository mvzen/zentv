# ZenTV media player

A simple website that allows viewing of video files (encoded as m3u8, in multiple bitrates for adaptive streaming). A simple video gallery will display the video thumbnails and on click, display a video player that plays the video. The name of the site is "ZenTV".

- The video player should support adaptive streaming
- The video player needs to be open source
- Use React and modern frameworks [that can be deployed to CloudFlare Pages]
- No server side, all simple front-end

## Videos & assets

The video files follow some pattern:
- https://videos.mvzen.com/${id}/master.m3u8
The thumbnail for the video:
- https://videos.mvzen.com/${id}/preview.jpg

There are five videos with following ids:
- flo60
- lily80
- christine70
- coco40
- sensdelafamille

## Design

The design should be modern but simple, lightweight, responsive (for mobile).
The atmosphere / design language should be dark, like a theatre. Plex is a good example of similar design language.
