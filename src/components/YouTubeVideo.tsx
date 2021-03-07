import React, { CSSProperties } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: any;
  }
}

interface IVideoProps {
  id: string;
  className?: string;
  style?: CSSProperties;
}

class YouTubeVideo extends React.Component<IVideoProps> {
  player: any;

  componentDidMount() {
    const tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    console.log("Inititalized YouTube");

    window.onYouTubeIframeAPIReady = () => {
      this.player = new window.YT.Player(`video-${this.props.id}`, {
        videoId: this.props.id,
      });
      console.log("API ready");
    };
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  render() {
    return (
      <div
        id={`video-${this.props.id}`}
        className={this.props.className}
        style={this.props.style}
      />
      )
  }
}

export default YouTubeVideo;