import * as React from 'react';


interface AuthorizationData {
    channelId: string,
    clientId: string,
    token: string,
    userId: string
}

interface ContextData {
    arePlayerControlsVisible: boolean,
    bitrate: number,
    bufferSize: number,
    displayResolution: string,
    game: string,
    hlsLatencyBroadcaster: number,
    hostingInfo: {
        hostedChannelId: number,
        hostingChannelId: number
    },
    isFullscreen: boolean,
    isMuted: boolean,
    isPaused: boolean,
    isTheatreMode: boolean,
    language: string,
    mode: string,
    playbackMode: string,
    theme: string,
    videoResolution: string,
    volume: number
}

interface ITwitchInterface {
    ext: any
}

interface ITwitchCallbacks {
    extOnAuthorized(data: AuthorizationData): void,
    extOnContext(context: ContextData, changed: string[]): void
    extOnError(error: number): void
}

class TwitchInterface
    extends React.Component<ITwitchInterface>
    implements ITwitchCallbacks {

    constructor(props: ITwitchInterface) {
        super(props);
    }

    extOnAuthorized(data: AuthorizationData) {

    }

    extOnContext(context: ContextData, changed: string[]) {

    }

    extOnError(error: number) {
        
    }
}
