const refresh=async()=>{
  let notification = document.getElementById('notification');
  if(notification){
    setTimeout(() => {
      // Apply the animation by changing the CSS properties
      notification.style.opacity = '0';
      setTimeout(() => {
        notification.remove();
      }, 700); // 500 milliseconds (0.5 seconds) matches the animation duration
    }, 2000); // Wait for 2 seconds before starting the animation
    }
}

refresh();
