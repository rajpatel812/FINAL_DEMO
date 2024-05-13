"use client"

import React, { useEffect, useRef } from 'react';
import '../../style.css';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { ZegoSuperBoardManager } from "zego-superboard-web";

// get token
function generateToken(tokenServerUrl: any, userID: any) {
  // Obtain the token interface provided by the App Server
  return fetch(`${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`, {
    method: 'GET',
  }).then((res) => res.json());
}


function randomID(len: any) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function App() {
  const myMeetingRef = useRef(null);

  useEffect(() => {
    const roomID = window.localStorage.getItem("token") || randomID(5);
    const userID = randomID(5);
    const userName = randomID(5);

    // generate token
    generateToken('https://nextjs-token.vercel.app/api', userID).then((res) => {
      const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
        1484647939,
        res.token,
        roomID,
        userID,
        userName
      );
      // create instance object from token
      const zp = ZegoUIKitPrebuilt.create(token);

      console.log("zppppppppppp", zp)

      // start the call

      zp.joinRoom({

        //   whiteboardConfig: {            
        //     showAddImageButton: true, 
        //  },
        container: myMeetingRef.current,
        sharedLinks: [
          {
            name: 'Personal link',
            url: window.location.origin + window.location.pathname + '?roomID=' + roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });
      zp.addPlugins({ ZegoSuperBoardManager });
    });
    console.log("======>", window.location.origin + window.location.pathname + '?roomID=' + roomID)
  }, []);


  return (
    <div
      className="myCallContainer"
      ref={myMeetingRef}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
