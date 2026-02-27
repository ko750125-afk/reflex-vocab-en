/**
 * English Vocab App Common Utilities
 * Strict MP3-based Sequential Playback Engine
 * No Web Speech API or AudioContext used for maximum compatibility.
 */

const Utils = {
    isAudioPlaying: false,

    /**
     * Sequential playback of words using MP3 files
     * @param {string|string[]} input - Single word or array of words
     */
    speak: async (input) => {
        if (!input || Utils.isAudioPlaying) return;
        Utils.isAudioPlaying = true;

        const words = Array.isArray(input) ? input : input.split(/\s+/);

        // Visual feedback: disable trigger buttons while playing
        const startBtn = document.getElementById('start-lever') || document.getElementById('btn-start-game');
        const allTtsBtns = document.querySelectorAll('.btn-tts');

        if (startBtn) startBtn.style.opacity = '0.3';
        allTtsBtns.forEach(b => b.style.opacity = '0.3');

        try {
            for (const word of words) {
                const cleanWord = word.replace(/[?.!,]/g, '').trim();
                if (!cleanWord) continue;

                const audio = new Audio(`sounds/${encodeURIComponent(cleanWord)}.mp3`);
                await new Promise((resolve) => {
                    audio.onended = resolve;
                    audio.onerror = () => {
                        console.warn(`Audio missing: ${cleanWord}.mp3`);
                        resolve();
                    };
                    audio.play().catch(e => {
                        console.error("Playback blocked by browser policy:", e);
                        resolve();
                    });
                });
            }
        } catch (e) {
            console.error("Audio sequence error:", e);
        } finally {
            Utils.isAudioPlaying = false;
            if (startBtn) startBtn.style.opacity = '1';
            allTtsBtns.forEach(b => b.style.opacity = '1');
        }
    },

    /**
     * Placeholder for sound effects (Legacy AudioContext removed)
     */
    playSound: (type) => {
        console.log(`Sound Effect Requested: ${type} (AudioContext Disabled for Stability)`);
    }
};
