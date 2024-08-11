import { Howl } from 'howler';

export const createHowl = (src: string, onEnd: (soundId?: number) => void) => {
    // console.log("New howl created")
    return new Howl({
        src: [src],
        format: ['mp3'],
        html5: true,
        onplay: function() {
            // console.log("Howl Begun!")
        },
        onpause: function(){
            // console.log("Howl paused")
        },
        onend: onEnd           
    })
};