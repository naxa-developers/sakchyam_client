import saveAs from 'file-saver';
import html2canvas from 'html2canvas';

const downloadOverviewSection = (
  chartid,
  imageTitle,
  toggleElement,
) => {
  if (toggleElement) {
    toggleElement.forEach(el => {
      document.querySelector(el).style.display = 'none';
    });
  }
  setTimeout(() => {
    html2canvas(document.querySelector(chartid), {
      // logging: true,
      // letterRendering: 1,
      allowTaint: true,
      // scale: window.devicePixelRatio,
      // windowWidth: window.innerWidth,
      // windowHeight: window.innerHeight + 120,
      // x: 20,
      // y: 70,
      // width: window.innerWidth + 40,
      // height: window.innerHeight + 40,
      // foreignObjectRendering: true,
      // useCORS: true,
    }).then(canvas => {
      canvas.toBlob(function(blob) {
        saveAs(blob, `${imageTitle}.png`);
      });

      if (toggleElement) {
        toggleElement.forEach(el => {
          document.querySelector(el).style.display = 'block';
        });
      }
    });
  }, 500);
};
export default downloadOverviewSection;
