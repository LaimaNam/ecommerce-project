const saleCounter = () => {
  let countDownDate = new Date('Nov 25, 2021 16:37:52').getTime();

  // Run function every second
  let countTimeUntillSaleEnds = setInterval(function () {
    let now = new Date().getTime();
    let timeleft = countDownDate - now;

    // Calculating the days, hours, minutes and seconds left
    let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    // let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    // Result is output to the specific element
    document.getElementById('days').innerText = days + 'd ';
    document.getElementById('hours').innerText = hours + 'h ';
    document.getElementById('mins').innerText = minutes + 'm ';
    // document.getElementById('secs').innerText = seconds + 's';

    // Display the message when countdown is over
    if (timeleft < 0) {
      clearInterval(countTimeUntillSaleEnds);
      document.getElementById('days').innerHTML = '';
      document.getElementById('hours').innerHTML = '';
      document.getElementById('mins').innerHTML = '';
      // document.getElementById('secs').innerHTML = '';
      document.getElementById('end').innerHTML =
        'Sale ended, but next week we will have a big surprise for you!';
    }
  }, 1000);
};

export default saleCounter;
