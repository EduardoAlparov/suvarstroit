export default async () => {
    const playerBoxes = document.querySelectorAll('.js-video-box');

    if(playerBoxes.length > 0) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        tag.defer = true;
        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        Array.from(playerBoxes).forEach( playerBox => {
            let videoId,
                player,
                btn = playerBox.parentElement.querySelector('button'),
                videoContainer = playerBox.firstElementChild;

            videoContainer.id = getRandomInt(4000);
            videoContainer.dataset.youtubeId ? ( videoId = videoContainer.dataset.youtubeId ) : ( videoId = 'lJIrF4YjHfQ');

            window.onYouTubeIframeAPIReady = function() {
                player = new YT.Player( videoContainer.id, {
                    width: 1000,
                    height: 530,
                    videoId: videoId,
                    playerVars: { 'autoplay': 0, 'controls': 1 },
                });
            }

            btn.addEventListener('click', () => {
                btn.closest('.video-block').classList.add('video-block--is-play');
                player.playVideo();
            })
        })

    } else {
        return;
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}
