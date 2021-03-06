import data from "./data";

function playSwap(step) {
    [data.values[step.first], data.values[step.second]] = [data.values[step.second], data.values[step.first]];
    data.values[step.first].swap = false;
    data.values[step.second].swap = false;
    setTimeout(playAnim, data.speed);
}

function playAnim() {
    if (data.steps.length > 0) {
        const step = data.steps.pop();
        switch (step.type) {
            case "swap":
                data.values[step.first].swap = true;
                data.values[step.second].swap = true;
                setTimeout(() => {
                    playSwap(step);
                }, data.speed);
                break;
            case "compare":
                data.values[step.first].compare = true;
                data.values[step.second].compare = true;
                setTimeout(() => {
                    data.values[step.first].compare = false;
                    data.values[step.second].compare = false;
                    playAnim();
                }, data.speed);
        }
    }
}


export function playAnims() {
    data.steps.reverse(); 
    playAnim();
}