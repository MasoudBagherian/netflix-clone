const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    return resolve('promise 1');
  }, 3000);
});
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    return reject('promise 2');
  }, 1000);
});
const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    return resolve('promise 3');
  }, 4000);
});
promise1.then((result) => console.log(result));
// Promise.all([promise3, promise2, promise1])
//   .then((results) => {
//     results.forEach((res) => {
//       console.log(res);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
