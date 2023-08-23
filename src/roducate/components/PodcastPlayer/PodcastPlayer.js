import React, {useRef, useState} from 'react';
import './PodcastPlayer.css';
import {Spinner} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {setIsPlaying} from '@store/actions/media'
import {secondsToHMS} from "../../../utility/Utils";

export const PodcastPlayer = () => {
    const podcastRef = useRef(null);
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);

    const dispatch = useDispatch()

    const store = useSelector(state => state.media)

    const handleProgressChange = (e) => {
        const podcast = podcastRef.current;
        const newPosition = e.target.value;
        podcast.currentTime = newPosition;
        setCurrentTime(newPosition);
    }

    const handleLoadedMetadata = () => {
        const podcast = podcastRef.current;
        if (!podcast) return;

        setIsLoading(false)
    };

    const handlePlayPause = () => {
        if (store.isPlaying) {
            podcastRef.current.pause();
        } else {
            podcastRef.current.play();
        }
    };

    const next = () => {
        if (index === store.mediaList.length - 1)
            return

        setIndex(index + 1);
        setCurrentTime(0)
        setIsLoading(false)

        const podcast = podcastRef.current;
        podcast.currentTime = 0;
    }

    const prev = () => {
        if (index === 0)
            return

        setIndex(index - 1);
        setCurrentTime(0)
        setIsLoading(false)

        const podcast = podcastRef.current;
        podcast.currentTime = 0;
    }

    return (
        <div>
            <div className="podcast-player">
                <video style={{borderRadius: 5}} ref={podcastRef} onPlay={() => dispatch(setIsPlaying(true))}
                       onPause={() => dispatch(setIsPlaying(false))} onLoadedMetadata={handleLoadedMetadata}
                       onTimeUpdate={() => setCurrentTime(podcastRef.current?.currentTime)}>
                    <source src={`${process.env.REACT_APP_3BUCKET_URL}${store.mediaList[index]}`} type="audio/mp3"/>
                    Your browser does not support HTML5 podcast.
                </video>

                {!isLoading && <div className="d-flex justify-content-between"
                                    style={{margin: '30px', backgroundColor: 'transparent', minWidth: '600px'}}>
                    <div className="controls">
                        <p className="vp-title">{store.title}</p>
                        <p className="vp-description">{store.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                            <span className="vp-time">{secondsToHMS(podcastRef.current?.currentTime)}</span>
                            <input type="range" min="0" max={podcastRef.current?.duration || 0}
                                   value={currentTime} step="1" onChange={e => handleProgressChange(e)}/>
                            <span>{secondsToHMS(podcastRef.current?.duration || 0)}</span>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        {store.mediaList.length > 1 && <svg onClick={prev} style={{
                            cursor: 'pointer',
                            backgroundColor: `${index === 0 ? 'grey' : '#8840E5'}`,
                            borderRadius: '7px'
                        }} width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M17.772 11.996C17.772 9.82798 17.65 8.09698 17.544 7.00398C16.0296 7.70026 14.5489 8.46778 13.107 9.30398C11.662 10.1348 10.2571 11.0334 8.897 11.997C9.786 12.63 11.217 13.595 13.108 14.687C14.5495 15.5239 16.0298 16.2921 17.544 16.989C17.65 15.896 17.772 14.164 17.772 11.996ZM17.585 4.79998C17.7751 4.7187 17.9816 4.68279 18.188 4.69512C18.3944 4.70744 18.5951 4.76766 18.7742 4.87099C18.9534 4.97432 19.106 5.11794 19.2199 5.29047C19.3339 5.463 19.4062 5.65969 19.431 5.86498C19.545 6.77698 19.772 8.98498 19.772 11.995C19.772 15.009 19.544 17.217 19.432 18.128C19.4071 18.3331 19.3349 18.5297 19.221 18.7021C19.107 18.8746 18.9545 19.0181 18.7756 19.1214C18.5966 19.2247 18.396 19.285 18.1897 19.2974C17.9834 19.3098 17.7771 19.2741 17.587 19.193C16.747 18.837 14.739 17.938 12.108 16.418C9.478 14.9 7.695 13.612 6.967 13.061C6.8018 12.9369 6.66773 12.7761 6.5754 12.5912C6.48307 12.4064 6.435 12.2026 6.435 11.996C6.435 11.7894 6.48307 11.5856 6.5754 11.4007C6.66773 11.2159 6.8018 11.0551 6.967 10.931C7.703 10.377 9.509 9.07198 12.107 7.57098C14.705 6.07098 16.737 5.16098 17.585 4.80098V4.79998ZM4 5.99998C4 5.73477 4.10536 5.48041 4.29289 5.29288C4.48043 5.10534 4.73478 4.99998 5 4.99998C5.26522 4.99998 5.51957 5.10534 5.70711 5.29288C5.89464 5.48041 6 5.73477 6 5.99998V18C6 18.2652 5.89464 18.5196 5.70711 18.7071C5.51957 18.8946 5.26522 19 5 19C4.73478 19 4.48043 18.8946 4.29289 18.7071C4.10536 18.5196 4 18.2652 4 18V5.99998Z"
                                  fill="white"/>
                        </svg>}

                        {store.mediaList.length > 1 && <svg className="m-1" onClick={next} style={{
                            cursor: 'pointer',
                            backgroundColor: `${index === store.mediaList.length - 1 ? 'grey' : '#8840E5'}`,
                            borderRadius: '7px'
                        }} width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M4.569 5.86501C4.59395 5.65981 4.6663 5.46322 4.78035 5.29082C4.89441 5.11842 5.04702 4.97492 5.22611 4.8717C5.40521 4.76847 5.60587 4.70834 5.81222 4.69607C6.01857 4.68381 6.22494 4.71973 6.415 4.80101L6.91 5.01601L7.572 5.31601L8.386 5.70401L8.845 5.93101L9.593 6.31101L10.128 6.59301L10.692 6.89701L11.28 7.22301L11.893 7.57201L12.526 7.94201L13.125 8.30301L13.689 8.65201L14.467 9.14801L15.161 9.60601L15.768 10.02L16.436 10.492L16.826 10.777L17.032 10.931C17.742 11.466 17.742 12.526 17.033 13.061L16.471 13.476L15.846 13.919L15.477 14.173L14.854 14.591L14.15 15.048L13.636 15.372L13.089 15.71L12.507 16.059L11.892 16.419L11.579 16.598L10.679 17.101L10.113 17.407L9.575 17.689L9.069 17.949L8.594 18.186L7.749 18.594L7.212 18.842L6.412 19.193C6.22201 19.2737 6.01587 19.3092 5.80984 19.2965C5.6038 19.2839 5.40352 19.2236 5.2248 19.1203C5.04607 19.017 4.8938 18.8736 4.77999 18.7014C4.66618 18.5292 4.59395 18.3329 4.569 18.128L4.489 17.43L4.418 16.663L4.365 15.974L4.315 15.194L4.287 14.625L4.263 14.019L4.244 13.379L4.229 12.354V11.639L4.244 10.614L4.274 9.66601L4.3 9.07901L4.33 8.52901L4.382 7.77901L4.436 7.12301L4.506 6.40001L4.569 5.86501V5.86501ZM19 5.00001C19.2449 5.00004 19.4813 5.08997 19.6644 5.25272C19.8474 5.41548 19.9643 5.63976 19.993 5.88301L20 6.00001V18C19.9997 18.2549 19.9021 18.5 19.7272 18.6854C19.5522 18.8707 19.3131 18.9822 19.0586 18.9972C18.8042 19.0121 18.5536 18.9293 18.3582 18.7657C18.1627 18.6022 18.0371 18.3701 18.007 18.117L18 18V6.00001C18 5.73479 18.1054 5.48044 18.2929 5.2929C18.4804 5.10537 18.7348 5.00001 19 5.00001V5.00001ZM6.456 7.00401L6.396 7.68501L6.356 8.21001L6.319 8.78901L6.286 9.41901L6.259 10.098L6.239 10.824L6.229 11.594L6.228 11.996L6.233 12.788L6.24 13.168L6.26 13.895L6.286 14.575L6.319 15.205L6.376 16.053L6.436 16.777C6.44249 16.8477 6.44915 16.9184 6.456 16.989L7.072 16.702L7.544 16.474L8.061 16.217L8.623 15.93L9.225 15.613L9.865 15.266L10.541 14.887L11.241 14.483L11.906 14.087L12.527 13.707L13.103 13.344L13.632 13.001L14.113 12.681L14.744 12.249L15.103 11.997L14.741 11.742L14.106 11.307C14.0275 11.2541 13.9488 11.2015 13.87 11.149L13.363 10.816L12.518 10.279C12.418 10.217 12.318 10.154 12.214 10.091L11.574 9.70401L10.893 9.30401L10.206 8.91401C10.0955 8.85231 9.98487 8.79097 9.874 8.73001L9.236 8.38401L8.634 8.06701L7.806 7.64701L7.076 7.29401L6.65 7.09401L6.456 7.00401V7.00401Z"
                                  fill="white"/>
                        </svg>}

                        <button className="vp-play-ctl-btn" onClick={handlePlayPause}>{store.isPlaying ?
                            <svg width="100" height="100" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8 4C8.24493 4.00003 8.48134 4.08996 8.66437 4.25272C8.84741 4.41547 8.96434 4.63975 8.993 4.883L9 5V19C8.99972 19.2549 8.90212 19.5 8.72715 19.6854C8.55218 19.8707 8.31305 19.9822 8.05861 19.9972C7.80416 20.0121 7.55362 19.9293 7.35817 19.7657C7.16271 19.6021 7.0371 19.3701 7.007 19.117L7 19V5C7 4.73478 7.10536 4.48043 7.29289 4.29289C7.48043 4.10536 7.73478 4 8 4ZM16 4C16.2449 4.00003 16.4813 4.08996 16.6644 4.25272C16.8474 4.41547 16.9643 4.63975 16.993 4.883L17 5V19C16.9997 19.2549 16.9021 19.5 16.7272 19.6854C16.5522 19.8707 16.313 19.9822 16.0586 19.9972C15.8042 20.0121 15.5536 19.9293 15.3582 19.7657C15.1627 19.6021 15.0371 19.3701 15.007 19.117L15 19V5C15 4.73478 15.1054 4.48043 15.2929 4.29289C15.4804 4.10536 15.7348 4 16 4Z"
                                    fill="white"/>
                            </svg>
                            : <svg width="100" height="100" viewBox="0 0 100 100" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M31.5621 23.7832C30.7023 32.4884 30.2823 41.2314 30.3038 49.979C30.3038 61.6498 31.0121 70.7998 31.5621 76.1832C39.5294 72.5663 47.3101 68.5515 54.8746 64.154C62.4627 59.8027 69.8276 55.0732 76.9413 49.9832C69.8286 44.8886 62.4652 40.1535 54.8788 35.7956C47.312 31.4047 39.53 27.3955 31.5621 23.7832ZM23.6246 19.8332C23.7363 18.8867 24.0675 17.9794 24.5917 17.1835C25.116 16.3876 25.8189 15.7251 26.6444 15.2488C27.4699 14.7725 28.3952 14.4956 29.3466 14.4401C30.2981 14.3846 31.2493 14.552 32.1246 14.929C36.5496 16.8207 46.4663 21.3165 59.0496 28.579C71.6371 35.8457 80.4913 42.1915 84.3371 45.0707C87.6204 47.5332 87.6288 52.4165 84.3413 54.8873C80.5329 57.7498 71.7871 64.0123 59.0496 71.3707C46.2996 78.729 36.4996 83.1706 32.1163 85.0373C28.3413 86.6498 24.1163 84.204 23.6246 80.1332C23.0496 75.3748 21.9746 64.5707 21.9746 49.979C21.9746 35.3957 23.0454 24.5957 23.6246 19.8332Z"
                                      fill="white"/>
                            </svg>
                        }</button>
                    </div>
                </div>
                }
            </div>
            {isLoading && <div className="d-flex m-1"><Spinner style={{margin: 'auto'}}/></div>}
        </div>
    );
};