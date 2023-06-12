import "../imports/startup/client";

// scroll events :
// some peeps will be on their laptop, with a trackpad
// some peeps will be on their computer, with a keyboard and mouse
// some peeps will be on their phone / tablet, with touch events
// some peeps will be disabled and won't be able to use this website.
function replaceYScrollWithXScroll() {
    let accumulatedDeltaY = 0;
    let lastTimestamp = 0;
  
    function wheel(event) {

      // we want to return straight away if we detect a touch pad to keep the native 
      // directionnal scroll which is much better than our hacky side scroll.
      isTouchPad = event.wheelDeltaY ? event.wheelDeltaY === -3 * event.deltaY : event.deltaMode === 0
      if (isTouchPad) {
        // apparently this is also triggered by maj+scroll.
        console.log("isTouchPad ", isTouchPad, " removing event listener to keep the nice native scroll.")
        document.removeEventListener('wheel', wheel, { passive: false });
        return
      }
      
      const timestamp = performance.now();
      const delta = Math.sign(event.deltaY);
  
      if (delta !== 0) {
        event.preventDefault();
  
        if (timestamp - lastTimestamp > 100) {
          accumulatedDeltaY = 0;
        }
  
        accumulatedDeltaY += Math.abs(event.deltaY);
        lastTimestamp = timestamp;
  
        const slowScrollThreshold = 100; // Adjust this value to control the threshold for slow scrolling
        const mediumScrollThreshold = 300; // Adjust this value to control the threshold for medium scrolling
        const fastScrollThreshold = 500; // Adjust this value to control the threshold for fast scrolling
        const slowScrollAmount = 50; // Adjust this value to control the scroll amount for slow scrolling
        const mediumScrollAmount = 500; // Adjust this value to control the scroll amount for medium scrolling
        const fastScrollAmount = 1200; // Adjust this value to control the scroll amount for fast scrolling
  
        let scrollAmount = slowScrollAmount;

        if (accumulatedDeltaY < slowScrollThreshold) {
            scrollAmount = slowScrollAmount;
        }
        if (accumulatedDeltaY >= fastScrollThreshold) {
          scrollAmount = fastScrollAmount;
        } else if (accumulatedDeltaY >= mediumScrollThreshold) {
          scrollAmount = mediumScrollAmount;
        }
  
        window.scrollBy({
          left: delta * scrollAmount,
          behavior: 'smooth'
        });
      }
    }
  
    document.addEventListener('wheel', wheel, { passive: false });
  }
  
  // Call the function to replace Y scrolling with X scrolling
  replaceYScrollWithXScroll();
  