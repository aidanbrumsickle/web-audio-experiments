var AC = window.AudioContext || window.webkitAudioContext;

var ctx = new AC();

var oscillator = ctx.createOscillator();
var gain = ctx.createGain();
oscillator.connect(gain);

oscillator.type = 'triangle';
oscillator.frequency.value = 220; // Hz

var semitone = Math.pow(2, 1/12);

var notes = {
    'A':  220,
    'A#': 220*Math.pow(2, 1/12),
    'B':  220*Math.pow(2, 2/12),
    'C':  220*Math.pow(2, 3/12),
    'C#': 220*Math.pow(2, 4/12),
    'D':  220*Math.pow(2, 5/12),
    'D#': 220*Math.pow(2, 6/12),
    'E':  220*Math.pow(2, 7/12),
    'F':  220*Math.pow(2, 8/12),
    'F#': 220*Math.pow(2, 9/12),
    'G':  220*Math.pow(2, 10/12),
    'G#': 220*Math.pow(2, 11/12),
    'A2': 440,
    'A#2': 440*Math.pow(2, 1/12),
    'B2':  440*Math.pow(2, 2/12),
    'C2':  440*Math.pow(2, 3/12)
};

gain.gain.value = 0;

gain.connect(ctx.destination);
oscillator.start();

// 65 83 68 70 71 72 74 75 76 186 222

var keydownCount = 0;
var keys = [];

document.addEventListener('keydown', function (e) {
    switch (e.keyCode) {
        case 65:
            oscillator.frequency.setValueAtTime(notes['A'], ctx.currentTime + 0.0001);
            break;
        case 83:
            oscillator.frequency.setValueAtTime(notes['B'], ctx.currentTime + 0.0001);
            break;
        case 68:
            oscillator.frequency.setValueAtTime(notes['C'], ctx.currentTime + 0.0001);
            break;
        case 70:
            oscillator.frequency.setValueAtTime(notes['D'], ctx.currentTime + 0.0001);
            break;
        case 71:
            oscillator.frequency.setValueAtTime(notes['E'], ctx.currentTime + 0.0001);
            break;
        case 72:
            oscillator.frequency.setValueAtTime(notes['F'], ctx.currentTime + 0.0001);
            break;
        case 74:
            oscillator.frequency.setValueAtTime(notes['G'], ctx.currentTime + 0.0001);
            break;
        case 75:
            oscillator.frequency.setValueAtTime(notes['A2'], ctx.currentTime + 0.0001);
            break;
        case 76:
            oscillator.frequency.setValueAtTime(notes['B2'], ctx.currentTime + 0.0001);
            break;
        case 186:
            oscillator.frequency.setValueAtTime(notes['C2'], ctx.currentTime + 0.0001);
            break;

        default:
            return;
    }
    if (!keys[e.keyCode]) {
        keys[e.keyCode] = true;
        keydownCount++;
        var note = document.getElementById('note' + e.keyCode);
        if (note) {
            note.className = 'on';
        }
    }
    if (gain.gain.value !== 1) {
        gain.gain.cancelScheduledValues(ctx.currentTime);
        gain.gain.linearRampToValueAtTime(1.0, ctx.currentTime + 0.3);
    }
});

document.addEventListener('keyup', function (e) {
    var k = e.keyCode;
    if (keys[k]) {
        keys[k] = false;
        keydownCount--;
        var note = document.getElementById('note' + k);
        if (note) {
            note.className = '';
        }
        if (keydownCount === 0) {
            gain.gain.cancelScheduledValues(ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
        }
    }
});

