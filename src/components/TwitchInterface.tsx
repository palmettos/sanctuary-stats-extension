import * as React from 'react';
import { ExtensionHelper } from '../VideoOverlayEntry';
import { VideoOverlay } from './VideoOverlay';


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
    ext: ExtensionHelper
}

interface ITwitchCallbacks {
    authorizedHook(data: AuthorizationData): void,
    contextHook(context: ContextData, changed: string[]): void
    errorHook(error: number): void
}

export class TwitchInterface
    extends React.Component<ITwitchInterface>
    implements ITwitchCallbacks {

    constructor(props: ITwitchInterface) {
        super(props);

        this.props.ext.onAuthorized(this.authorizedHook);
        this.props.ext.onContext(this.contextHook);
    }

    render() {
        return <VideoOverlay />
    }

    authorizedHook(data: AuthorizationData) {
        console.log('Authorization data: -----');
        console.log(data);
    }

    contextHook(context: ContextData, changed: string[]) {
        console.log('Context data: -----');
        console.log(context);
    }

    errorHook(error: number) {
        console.log('Error data: -----');
        console.log(error);
    }
}
