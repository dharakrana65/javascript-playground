const p = Promise.reject("rejected");
function onSuccess(data) {
    console.log(data);
}
function onFailur(error) {
    console.error(error);
}
function onCatched(error) {
    console.log("error catched")
}
p
.then(onSuccess,onFailur)
.catch(onCatched)