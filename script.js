var t = 0;

var throw_actions = ['throws', 'hucks'];
var cut_actions = ['cuts', 'sprints', 'runs', 'goes'];
var block_actions = ['intercepts', 'blocks'];
var catch_actions = ['catches', 'drops', 'bobbles', 'lays out for'];
var subject_actions = ['boxes out', 'skies'];
var defensive_actions = ['gets', 'generates'];
var end_actions = ['lays out', 'bids'];
var call_actions = ['calls a', 'contests the', 'does not contest the'];
var disc_actions_air = ['floats', 'flies', 'slices', 'goes'];
var disc_actions_ground = ['goes', 'lands'];
var disc_actions_being = ['is', 'is not'];

var disc_actions_air_locations = ['out of bounds', 'in the sky', 'through the air'];
var disc_actions_ground_locations = ['on the ground'];
var disc_actions_being_results = ['caught', 'dropped', 'bobbled', 'blocked'];

var names_for_disc = ['the frisbee', 'the disc', 'the flatball'];

var type_description = ['an IO', 'an OI', 'a high-release', 'a low-release', 'an off-hand', 'a floaty', 'a lasery', 'a wobbly'];
var types = ['forehand', 'backhand', 'hammer', 'scoober', 'thumber', 'push pass', 'greatest', 'throw'];

var calls = ['foul', 'strip', 'pick', 'stall'];

var d = ['a block', 'a layout D', 'a Callahan', 'a run-through D', 'a hand-block', 'a foot-block'];

var catch_types = ['a pancake catch', 'a one-handed grab', 'a claw catch'];

var cut_types = ['under', 'away', 'deep', 'up-the-line', 'strike', 'dump', 'in', 'out'];

var start_subject = ['The handler', 'The cutter', 'Number', 'The thrower'];
var end_subject = ['a handler', 'a cutter', 'number', 'a receiver', 'the target'];

var prepositions = ['to', 'towards', 'at'];


function rand_range(maximum) {
    "use strict";
    return Math.floor(Math.random() * (maximum + 1));
}

function range(start, end) {
    var array = [];
    var i = start;
    while (i < end) {
        array.push(i);
        i++;
    }
    return array;
}

function choose(array) {
    "use strict";
    return array[rand_range(array.length - 1)];
}

function get_start() {
    var start = choose(start_subject);
    var start_num;
    if (start == 'Number') {
        start_num = choose(range(1,100));
        start += ' ' + start_num;
    }
    return start;
}

function commentary(prev_sentence) {
    "use strict";
    var last, text, main = document.getElementById('main');
    if (25 > t) {
        t += 1;
    } else {
        main.removeChild(document.getElementById('main').firstChild);
    }
    // POSSIBLE SENTENCES
    // 1. (start_subject) + (throw_actions) + (type_description)? + (types) + ((prepositions) + (end_subject))?
    // 2. (start_subject) + (cut_actions) + (cut_types)
    // 3. (start_subject) + (block_actions) + 'the' + (names_for_disc)
    // 4. (start_subject) + (catch_actions) + (names_for_disc) | (catch_types) | 'the' + (type_description)? + (types)
    // 5. (start_subject) + (subject_actions) + (end_subject)
    // 6. (start_subject) + (defensive_actions) + (d)
    // 7. (start_subject) + (end_actions)
    // 8. (start_subject) + (call_actions) + (calls)
    // 9. capitalize(names_for_disc) + ((disc_actions_air) + (disc_actions_air_locations) | (disc_actions_ground) + (disc_actions_ground_locations)) | (prepositions) + (end_subject)
    // 10. capitalize(names_for_disc) + (disc_actions_being) + (disc_actions_being_results)

    var sentence = choose(range(1,11));
    var text = '';

    switch (sentence) {
        case 1:
            text += get_start() + ' ' + choose(throw_actions);
            if (choose(range(1,3)) == 1) {
                text += ' ' + choose(type_description);
            } else {
                text += ' a';
            }
            text += ' ' + choose(types);
            if (choose(range(1,3)) == 1) {
                text += ' ' + choose(prepositions);
                var end = choose(end_subject);
                text += ' ' + end;
                if (end == 'number') {
                    var end_num = choose(range(1,100));
                    while (end_num != start_num) {
                        end_num = choose(range(1,100));
                    }
                    text += ' ' + end_num;
                }
            }
            break;
        case 2:
            text += get_start() + ' ' + choose(cut_actions) + ' ' + choose(cut_types);
            break;
        case 3:
            text += get_start() + ' ' + choose(block_actions) + ' ' + choose(names_for_disc);
            break;
        case 4:
            text += get_start() + ' ' + choose(catch_actions);
            switch (choose(range(1,4))) {
                case 1:
                    text += ' ' + choose(names_for_disc);
                    break;
                case 2:
                    text += ' ' + choose(catch_types);
                    break;
                case 3:
                    text += ' the ';
                    if (choose(range(1,3)) == 1) {
                        text += ' ' + choose(type_description);
                    }
                    text += ' ' + choose(types);
                    break;
            }
            break;
        case 5:
            text += get_start() + ' ' + choose(subject_actions);
            var end = choose(end_subject);
            text += ' ' + end;
            if (end == 'number') {
                var end_num = choose(range(1,100));
                while (end_num != start_num) {
                    end_num = choose(range(1,100));
                }
                text += ' ' + end_num;
            } 
            break;
        case 6:
            text += get_start() + ' ' + choose(defensive_actions) + ' ' + choose(d);
            break;
        case 7:
            text += get_start() + ' ' + choose(end_actions);
            break;
        case 8:
            text += get_start() + ' ' + choose(call_actions) + ' ' + choose(calls);
            break;
        case 9:
            var disc_name = choose(names_for_disc);
            text += disc_name.charAt(0).toUpperCase() + disc_name.slice(1);
            if (rand_range(1) == 0) {
                text += ' ' + choose(disc_actions_air) + ' ' + choose(disc_actions_air_locations);
            } else {
                text += ' ' + choose(disc_actions_ground) + ' ' + choose(disc_actions_ground_locations);
            }
            if (rand_range(1) == 0) {
                text += ' ' + choose(prepositions);
                var end = choose(end_subject);
                text += ' ' + end;
                if (end == 'number') {
                    text += ' ' + choose(range(1,100));
                } 
            }
            break;
        case 10:
            var disc_name = choose(names_for_disc);
            text += disc_name.charAt(0).toUpperCase() + disc_name.slice(1) + ' ' + choose(disc_actions_being) + ' ' + choose(disc_actions_being_results);
            break;
    }
    
    last = document.createElement('div');
    text += '.';
    last.innerHTML = text;
    main.appendChild(last);
}

function produce_commentary() {
    "use strict";
    commentary();
    setInterval(commentary, 2000);
}
