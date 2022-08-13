const axios = require('axios')
const fs = require("fs");
//Functions of APP - Everything Important
export async function shuffleArray(item) {
    var j, x, i;

    for (i = item.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = item[i];
        item[i] = item[j];
        item[j] = x;
    }
    return item;
}

export async function chooseRandomItem(array) {

    var item = array[Math.floor(Math.random() * array.length)];
    return item
}

export async function loopMethod(method, props, time) {

    function loop() {
        setTimeout(async function () {
            await method(props);
            loop();
        }, time);
    }

    loop();
}

export function numberWith(x, value) {

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, value);
}

export async function loopMethodEach(method, props, time, index, limit) {

    function loop() {
        setTimeout(async function () {
            await method(props, index);

            index++
            if (index => limit) {
                loop();
            } else {
                console.log(`[] Data Done`);
            }
        }, time);
    }

    loop();
}

export async function propsObject(obj, props) {
    return props.split('.').reduce((x, a) => x, obj);
}

export async function axiosGet(api) {

    let data = null;
    await axios.get(api).then((api_data_) => {
        data = api_data_
    })

    return data
}
