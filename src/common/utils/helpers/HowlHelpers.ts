import { Howl } from 'howler';

export const createHowl = (mp3: string, onEnd: () => void) => {
    // console.log("New howl created")
    return new Howl({
        src: [mp3],
        format: ['mp3'],
        html5: true,
        preload: true,
        onend: onEnd           
    })
};