export default function Timeout(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    });
}