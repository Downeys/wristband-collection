import { Howl } from 'howler';

export const createHowl = (src: string) => new Howl({
    src: [src],
    format: ['webm', 'mp3'],
    html5: true,
    onplay: function() {
        // console.log("Howl Begun!")
    },
    onpause: function(){
        // console.log("Howl paused")
    },
    onend: function() {
        // console.log('Howl Finished!');
    }            
});